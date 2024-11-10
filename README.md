<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cloud Infrastructure Deployment Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f9;
            color: #333;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        .section {
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #fff;
            border-radius: 5px;
        }
        .collapsible {
            background-color: #2c3e50;
            color: white;
            cursor: pointer;
            padding: 10px;
            text-align: left;
            border: none;
            outline: none;
            font-size: 1.1em;
            border-radius: 5px;
            margin-top: 5px;
            width: 100%;
        }
        .content {
            padding: 0 15px;
            display: none;
            overflow: hidden;
            background-color: white;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
        }
        .link {
            color: #3498db;
            text-decoration: none;
        }
    </style>
</head>
<body>

<h1>Cloud Infrastructure Deployment Report</h1>
<p>This report documents the deployment of a cloud infrastructure with Terraform, Ansible, Docker, and AWS. The deployment includes CI/CD integration for automated updates and testing.</p>

<div class="section">
    <h2>Contents</h2>
    <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#objectives">Objectives</a></li>
        <li><a href="#architecture">Architecture Overview</a></li>
        <li><a href="#workflow">Components and Workflow</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#infrastructure-setup">Infrastructure Setup</a></li>
        <li><a href="#ci-cd">CI/CD Pipeline</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
    </ul>
</div>

<div class="section" id="introduction">
    <button type="button" class="collapsible">Introduction</button>
    <div class="content">
        <p>This report details a cloud infrastructure deployment using IaC (Infrastructure as Code), configuration management, containerization, and a CI/CD pipeline for automated provisioning and deployment.</p>
    </div>
</div>

<div class="section" id="objectives">
    <button type="button" class="collapsible">Objectives</button>
    <div class="content">
        <p>The deployment involves:</p>
        <ul>
            <li>Terraform for infrastructure provisioning.</li>
            <li>Ansible for configuration management and application deployment.</li>
            <li>Docker for packaging the Node.js application.</li>
            <li>AWS for hosting the EC2 instance.</li>
        </ul>
    </div>
</div>

<div class="section" id="architecture">
    <button type="button" class="collapsible">Architecture Overview</button>
    <div class="content">
        <p>The architecture includes infrastructure as code, configuration management, containerization, and CI/CD for automated deployment.</p>
        <p><strong>GitHub Repository:</strong> <a href="https://github.com/gk69-cz/CaSample_application.git" class="link">Sample Application</a></p>
    </div>
</div>

<div class="section" id="workflow">
    <button type="button" class="collapsible">Components and Workflow</button>
    <div class="content">
        <ul>
            <li><strong>Terraform:</strong> Provision AWS resources like EC2 instances and security groups.</li>
            <li><strong>Ansible:</strong> Automate installation of Docker and deploy the Node.js application.</li>
            <li><strong>Docker:</strong> Package the application in a portable container for deployment.</li>
            <li><strong>CI/CD:</strong> GitHub Actions or Jenkins for testing, building, and deploying changes.</li>
        </ul>
    </div>
</div>

<div class="section" id="prerequisites">
    <button type="button" class="collapsible">Prerequisites</button>
    <div class="content">
        <ul>
            <li>Node.js Project</li>
            <li>GitHub for version control and CI/CD integration</li>
            <li>AWS Account for provisioning resources</li>
            <li>Docker Desktop for containerization</li>
        </ul>
    </div>
</div>

<div class="section" id="infrastructure-setup">
    <button type="button" class="collapsible">Infrastructure Setup</button>
    <div class="content">
        <p><strong>Terraform:</strong> Used to provision the EC2 instance, security groups, and other resources on AWS.</p>
        <p><strong>Key Steps:</strong></p>
        <ol>
            <li>Setup AWS IAM credentials.</li>
            <li>Define infrastructure in <code>main.tf</code>.</li>
            <li>Initialize Terraform, plan, and apply configurations.</li>
        </ol>
    </div>
</div>

<div class="section" id="ci-cd">
    <button type="button" class="collapsible">CI/CD Pipeline</button>
    <div class="content">
        <p>The CI/CD pipeline automates deployment using GitHub Actions. It handles:</p>
        <ul>
            <li>Terraform initialization and application for infrastructure changes</li>
            <li>Docker image build and push</li>
            <li>Ansible playbook execution for configuration</li>
        </ul>
    </div>
</div>

<div class="section" id="conclusion">
    <button type="button" class="collapsible">Conclusion</button>
    <div class="content">
        <p>This deployment leverages Terraform, Docker, and Ansible to automate cloud infrastructure management and application deployment. It ensures scalable, repeatable, and efficient processes.</p>
    </div>
</div>

<script>
    const coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    }
</script>

</body>
</html>
