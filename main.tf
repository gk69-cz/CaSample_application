terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}
variable "aws_access_key" {
  type = string
  description = "AWS access key"
  default = null
}

variable "aws_secret_key" {
  type = string
  description = "AWS secret key"
  default = null
}

provider "aws" {
  region     = "eu-west-1"
}


# Generate SSH Key Pair
resource "tls_private_key" "rsa_4096" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "key_pair" {
  key_name   = "deploy_key_20"
  public_key = tls_private_key.rsa_4096.public_key_openssh
}

resource "aws_security_group" "sg_ec2" {
  name = "sg_ec2_new"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
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
  ami                    = "ami-0404dae8586132164"
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.key_pair.key_name
  vpc_security_group_ids = [aws_security_group.sg_ec2.id]

  provisioner "local-exec" {
    command = "echo > ../terraform/dynamic_inventory.ini"
  }

  provisioner "remote-exec" {
    inline = [
      "echo 'Instance ready'"
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
    ${aws_instance.public_instance.public_ip} ansible_user=ubuntu ansible_private_key_file=${path.module}/deploy_key.pem
    EOT
}

resource "local_file" "dynamic_inventory" {
  depends_on = [aws_instance.public_instance]

  filename = "dynamic_inventory.ini"
  content  = data.template_file.inventory.rendered
}

output "instance_public_ip" {
  value = aws_instance.public_instance.public_ip
}
