# Product Guidelines - E-commerce Order Management Service

## API Design Standards
- **Standardized Responses:** All API responses MUST follow a consistent JSON structure containing `data`, `message`, and optionally `errors` fields.
- **RESTful Principles:** Utilize appropriate HTTP methods (POST, GET, PATCH) and return correct HTTP status codes (201 Created, 200 OK, 400 Bad Request, 404 Not Found, 500 Internal Server Error) to communicate the outcome of requests clearly.

## Error Handling & Observability
- **Centralized Error Middleware:** Implement a global error-handling middleware to intercept all exceptions, ensuring that internal implementation details are not exposed to the user and that responses remain consistent.
- **Structured Logging:** Use a logging library to produce structured JSON logs. This is essential for traceability in microservice environments and facilitates easy integration with monitoring tools.

## Code Quality & Consistency
- **Automated Enforcement:** Use **ESLint** and **Prettier** to enforce code style and formatting automatically.
- **Pre-commit Hooks:** Integrate **Husky** and **lint-staged** to run linting and formatting checks before every commit, ensuring that only high-quality, formatted code is merged into the repository.
- **Hexagonal Integrity:** Maintain strict separation between the domain logic (Core) and infrastructure (Adapters). External dependencies like databases and message brokers must be accessed through well-defined Ports.

## Messaging Protocols
- **Messaging Abstraction:** All interactions with RabbitMQ MUST be abstracted behind an internal interface (Port). The domain layer should only know about the intent to publish an event, while the specific RabbitMQ adapter handles the technical implementation.
