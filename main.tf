provider "azurerm" {
  features {}
}

# 1. Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "myResourceGroup"
  location = "East US"
}

# 2. Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = "myacrname"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                  = "Basic"
  admin_enabled        = true
}

# 3. App Service Plan
resource "azurerm_app_service_plan" "app_service_plan" {
  name                = "myAppServicePlan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

# 4. Web App for Containers
resource "azurerm_web_app" "web_app" {
  name                = "my-web-app"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.app_service_plan.id

  site_config {
    linux_fx_version = "DOCKER|${azurerm_container_registry.acr.login_server}/nodejs-app:${var.docker_image_tag}"
  }

  app_settings = {
    "DOCKER_REGISTRY_SERVER_URL"         = "https://${azurerm_container_registry.acr.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME"    = azurerm_container_registry.acr.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD"    = azurerm_container_registry.acr.admin_password
  }
}

# 5. Output Web App URL
output "web_app_url" {
  value = azurerm_web_app.web_app.default_site_hostname
}
