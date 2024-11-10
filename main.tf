terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
variable "windows_username" {
  description = "The username for which to grant permissions"
  type        = string
  default     = "zacha"  # Replace with a default username or leave it empty
}

provider "aws" {
  region     = "eu-west-1"
  access_key = "AKIAXZEFH5MUCJL6HQUR"
  secret_key = "Y9SB1nzejCYyOOu8vFsg6az2Rv+4u4LwHFpmgTpq"
}

// To Generate Private Key
resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

variable "key_name" {
  description = "Name of the SSH key pair"
}

// Create Key Pair for Connecting EC2 via SSH
resource "aws_key_pair" "key_pair" {
  key_name   = var.key_name
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

// Save PEM file locally
resource "local_file" "private_key" {
  content  = tls_private_key.rsa_4096.private_key_pem
  filename = var.key_name

  provisioner "local-exec" {
  command = "icacls ${var.key_name} /inheritance:r /grant:r ${var.windows_username}:(F)"
  }
}

# Create a security group
resource "aws_security_group" "sg_ec2" {
  name        = "sg_ec2"
  description = "Security group for EC2"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "public_instance" {
  ami                    = "ami-06ec8aeac208fbbd3"
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.key_pair.key_name
  vpc_security_group_ids = [aws_security_group.sg_ec2.id]

  tags = {
    Name = "public_instance"
  }

  root_block_device {
    volume_size = 100
    volume_type = "gp2"
  }

  provisioner "local-exec" {
    command = "touch dynamic_inventory.ini"
  }

  provisioner "remote-exec" {
    inline = [
      "echo 'EC2 instance is ready.'"
    ]

    connection {
      type        = "ssh"
      host        = self.public_ip
      user        = "ubuntu"
      private_key = tls_private_key.rsa_4096.private_key_pem
    }
  }
}

data "template_file" "inventory" {
  template = <<-EOT
    [ec2_instances]
    ${aws_instance.public_instance.public_ip} ansible_user=ubuntu ansible_private_key_file=${path.module}/${var.key_name}
    EOT
}

resource "local_file" "dynamic_inventory" {
  depends_on = [aws_instance.public_instance]

  filename = "dynamic_inventory.ini"
  content  = data.template_file.inventory.rendered

  provisioner "local-exec" {
  command = "icacls ${local_file.dynamic_inventory.filename} /inheritance:r /grant:r ${var.windows_username}:(F)"
  }
}

resource "null_resource" "run_ansible" {
  depends_on = [local_file.dynamic_inventory]

  provisioner "local-exec" {
    command = "ansible-playbook -i dynamic_inventory.ini deploy-app.yml"
    working_dir = path.module
  }
}
