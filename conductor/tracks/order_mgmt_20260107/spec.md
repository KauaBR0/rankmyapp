# Track Spec: Build the core Order Management Service

## Overview
This track focuses on implementing the core functionality of the Order Management Service. The service will be built using Node.js and Express, following Hexagonal Architecture principles to ensure a clean separation between business logic and infrastructure.

## Functional Requirements
- **Order Creation (POST /orders):**
    - Receive customer info (name, email, shipping address).
    - Receive item list (product ID, quantity, unit price).
    - Receive payment info.
    - Validate data (min 1 item, positive quantities, valid email).
    - Store order in MongoDB with status "created".
- **Order Status Retrieval (GET /orders/:id):**
    - Fetch and return order details by ID.
- **Order Status Update (PATCH /orders/:id/status):**
    - Update order status (Created -> Processing -> Shipped -> Delivered).
    - Publish an event to RabbitMQ containing the Order ID, New Status, and Timestamp.
- **Healthcheck (GET /health):**
    - Simple endpoint returning service status.

## Technical Requirements
- **Architecture:** Hexagonal (Core/Domain, Ports, Adapters).
- **Language/Framework:** Node.js, Express.
- **Persistence:** MongoDB with Mongoose.
- **Messaging:** RabbitMQ using `amqplib`.
- **Testing:** Jest, target >80% coverage.
- **DevOps:** Docker and Docker Compose.

## Acceptance Criteria
- API endpoints function according to the spec.
- Data is correctly persisted in MongoDB.
- Events are successfully published to RabbitMQ on status changes.
- Unit tests cover at least 80% of the code.
- Service runs within a Docker container.
