Node.js Application Deployment with Docker and Ansible
This project demonstrates a fully automated deployment of a Node.js application using Docker and Ansible. The application code is containerized in Docker and deployed to a remote server with Ansible playbooks for simplified and repeatable deployments.

Project Structure
plaintext
Copy code
├── app/                 # Node.js application source code
│   ├── index.js         # Application entry file
│   ├── package.json     # Node.js dependencies and scripts
│   ├── Dockerfile       # Docker image configuration for the application
├── ansible/
│   └── deploy_nodejs_app.yml  # Ansible playbook for Docker-based deployment
├── README.md            # Documentation for the project
Prerequisites
Ensure you have the following installed on your local machine and/or remote server:

Node.js and npm: Required to develop and test the application.
Docker: Used to containerize the application.
Ansible: Automates the deployment tasks.
Remote Server: SSH-accessible server with Docker capabilities.
Getting Started
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-repo-url.git
cd your-repo
2. Set Up and Test Application Locally
Navigate to the app directory and install Node.js dependencies:

bash
Copy code
cd app
npm install
To start the application locally, use:

bash
Copy code
node index.js
The application should run on port 8080.

3. Docker Configuration
The Dockerfile in the app directory is configured to:

Set up the Node.js environment.
Install the required dependencies.
Copy application files.
Expose port 8080 for the application.
Run the application using Node.js.
Dockerfile
Dockerfile
Copy code
# Base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Set environment variable
ENV PORT=8080

# Expose port
EXPOSE 8080

# Run the application
CMD ["node", "index.js"]
4. Build and Test Docker Container Locally
To build and test the Docker container locally:

bash
Copy code
docker build -t nodejs-app-image .
docker run -p 8080:8080 nodejs-app-image
Visit http://localhost:8080 to confirm the application is accessible.

5. Ansible Deployment Setup
The Ansible playbook deploy_nodejs_app.yml in the ansible/ folder automates the process of setting up and running the Dockerized application on a remote server.

Ansible Playbook (deploy_nodejs_app.yml)
yaml
Copy code
---
- name: Deploy Node.js application using Docker
  hosts: all
  become: true
  vars:
    app_name: "nodejs-app"
    docker_image_name: "nodejs-app-image"
    app_code_path: "/home/ubuntu/app"
    container_port: 8080

  tasks:
    - name: Ensure Docker is installed
      apt:
        name: docker.io
        state: present
        update_cache: yes

    - name: Copy application code
      copy:
        src: "../app"
        dest: "{{ app_code_path }}"
        mode: 0755
        owner: ubuntu
        group: ubuntu

    - name: Build Docker image
      docker_image:
        path: "{{ app_code_path }}"
        name: "{{ docker_image_name }}"
        state: present

    - name: Run Docker container
      docker_container:
        name: "{{ app_name }}"
        image: "{{ docker_image_name }}"
        state: started
        exposed_ports:
          - "{{ container_port }}"
        published_ports:
          - "{{ container_port }}:{{ container_port }}"
        restart_policy: always
        detach: true
Playbook Explanation
Install Docker: Ensures Docker is installed on the target server.
Copy Application Code: Copies the local application code to the target server's specified directory.
Build Docker Image: Builds a Docker image from the application code on the target server.
Run Docker Container: Runs the application in a Docker container, exposing the specified port.
6. Run the Ansible Playbook
Run the following command to deploy the application to your server:

bash
Copy code
ansible-playbook ansible/deploy_nodejs_app.yml -i your_inventory_file
Replace your_inventory_file with the path to your Ansible inventory file containing the server details.

Variables
app_name: Name of the Docker container.
docker_image_name: Name of the Docker image to build and run.
app_code_path: Path where the application code is stored on the server.
container_port: Port on which the application runs.
Contributing
Contributions are welcome! Feel free to fork this repository, make your changes, and submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

