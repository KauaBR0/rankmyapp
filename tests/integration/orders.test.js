const request = require("supertest");

// Mocks must be defined before requiring app
const mockCreateOrder = { execute: jest.fn() };
const mockGetOrder = { execute: jest.fn() };
const mockUpdateOrderStatus = { execute: jest.fn() };

jest.mock("../../src/application/use_cases/CreateOrder", () => {
  return jest.fn().mockImplementation(() => mockCreateOrder);
});
jest.mock("../../src/application/use_cases/GetOrder", () => {
  return jest.fn().mockImplementation(() => mockGetOrder);
});
jest.mock("../../src/application/use_cases/UpdateOrderStatus", () => {
  return jest.fn().mockImplementation(() => mockUpdateOrderStatus);
});

// Mock Infrastructure to avoid real connections
jest.mock("../../src/infrastructure/repositories/MongoOrderRepository");
jest.mock("../../src/infrastructure/messaging/RabbitMQMessageBroker");

const app = require("../../src/app");

describe("Orders API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /orders", () => {
    it("should create an order and return 201", async () => {
      const orderData = { customer: { name: "John" } };
      mockCreateOrder.execute.mockResolvedValue({
        id: "123",
        ...orderData,
        status: "created",
      });

      const response = await request(app).post("/orders").send(orderData);

      expect(response.status).toBe(201);
      expect(response.body.data.id).toBe("123");
      expect(response.body.message).toBe("Order created successfully");
    });

    it("should return 400 on validation error", async () => {
      mockCreateOrder.execute.mockRejectedValue(new Error("Invalid data"));

      const response = await request(app).post("/orders").send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid data");
    });
  });

  describe("GET /orders/:id", () => {
    it("should return 200 and the order", async () => {
      mockGetOrder.execute.mockResolvedValue({ id: "123", status: "created" });

      const response = await request(app).get("/orders/123");

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe("123");
    });

    it("should return 404 if not found", async () => {
      mockGetOrder.execute.mockRejectedValue(new Error("Order not found"));

      const response = await request(app).get("/orders/999");

      expect(response.status).toBe(404);
    });
  });

  describe("PATCH /orders/:id/status", () => {
    it("should update status and return 200", async () => {
      mockUpdateOrderStatus.execute.mockResolvedValue({
        id: "123",
        status: "processing",
      });

      const response = await request(app)
        .patch("/orders/123/status")
        .send({ status: "processing" });

      expect(response.status).toBe(200);
      expect(response.body.data.status).toBe("processing");
    });
  });
});
