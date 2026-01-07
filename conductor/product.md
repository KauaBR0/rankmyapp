# Initial Concept

Implement an e-commerce order management service as specified in the technical test 'Teste Técnico – Desenvolvedor Backend Sênior'. 

Key features include:
- Creating orders (POST /orders)
- Consulting order status (GET /orders/:id)
- Updating order status (PATCH /orders/:id/status)
- Simple healthcheck (GET /health)
- Notifying other services via RabbitMQ when a status is updated.

Technical requirements:
- Language: Node.js (Express) or Python (FastAPI/Flask)
- Database: MongoDB
- Architecture: Hexagonal Architecture (Ports and Adapters)
- Messaging: RabbitMQ
- Testing: Min 60% unit test coverage
- Infrastructure: Docker and Docker Compose
- Principles: SOLID, Clean Code, Layer Separation.

---

# Product Guide - E-commerce Order Management Service

## Product Vision
To provide a robust, scalable, and well-architected backend service for managing e-commerce orders, serving as a demonstration of high-level technical proficiency in modern backend development.

## Target Audience
- **Technical Evaluators:** The primary audience for this project is the engineering team reviewing the technical test to assess architectural decisions, code quality, and tool proficiency.
- **Simulated Services:** Other components of an e-commerce ecosystem (e.g., Payment or Inventory) that would interact with this service in a microservices environment.

## Core Goals
- **Architectural Excellence:** Implement the service using Hexagonal Architecture (Ports and Adapters) to ensure business logic is isolated from external dependencies.
- **Asynchronous Communication:** Demonstrate effective use of RabbitMQ for publishing order status updates to other services.
- **Data Persistence:** Utilize MongoDB for flexible and scalable order data storage.
- **Standardized API:** Deliver a clean RESTful API using Node.js and Express, following industry best practices for endpoint design and status codes.

## Key Features
- **Order Creation:** Endpoint to receive and process new order data.
- **Order Tracking:** Ability to retrieve detailed information and current status of specific orders.
- **Status Management:** Workflow for updating order status (e.g., from "Created" to "Processing") with automatic event notification via RabbitMQ.
- **Health Monitoring:** A dedicated healthcheck endpoint to verify service availability.

## Non-Functional Requirements
- **Test-Driven Reliability:** Maintain a minimum of 60% unit test coverage to ensure logic correctness.
- **Infrastructure as Code:** Fully containerized setup using Docker and Docker Compose for easy deployment and reproduction of the environment.
- **Scalable Design:** Design the service with performance and scalability in mind, adhering to SOLID principles and clean code standards.
- **Comprehensive Documentation:** Provide clear instructions, architecture diagrams, and API documentation to facilitate understanding and evaluation.
