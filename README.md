# Macedonia Explorer

**Macedonia Explorer** is a web-based tourist knowledge graph for exploring destinations, attractions, activities and regions in North Macedonia.

The application connects tourist entities through relationships and allows users to explore them using search, filters, an interactive knowledge graph and a map.

## Features

* Explore tourist destinations and attractions
* Search and filter tourist entities
* View detailed information about locations
* Explore relationships through an interactive knowledge graph
* View locations on a map
* REST API for tourist entities and relationships
* Persistent data storage using PostgreSQL
* Containerized deployment with Docker
* Kubernetes deployment with Ingress

## Technologies

* **Frontend:** React, TypeScript, Vite
* **Backend:** Java, Spring Boot
* **Database:** PostgreSQL
* **Graph:** React Flow
* **Maps:** Leaflet
* **Containerization:** Docker, Docker Compose
* **CI/CD:** GitHub Actions
* **Container Registry:** Docker Hub
* **Deployment:** Kubernetes


## Running the Application

### Docker Compose

The easiest way to run the complete application locally is using Docker Compose.

From the project root:

```bash
docker compose up --build
```

This starts the frontend, backend and PostgreSQL database.

The application is available at:

```text
http://localhost:5173
```

To stop the application:

```bash
docker compose down
```

### Kubernetes

The application can also be deployed to a Kubernetes cluster.

The Kubernetes configuration is located in the `k8s/` directory.

The deployment includes:

* Frontend Deployment and Service
* Backend Deployment and Service
* PostgreSQL StatefulSet
* Persistent storage
* ConfigMap and Secret
* NGINX Ingress

The application is accessed through:

```text
http://macedonia-explorer.local
```

## CI/CD

GitHub Actions is used to automatically build the Docker images and publish them to Docker Hub whenever changes are pushed to the `main` branch.

## Repository

[Macedonia Explorer — GitHub](https://github.com/bekjarska221153/macedonia-explorer.git?utm_source=chatgpt.com)
