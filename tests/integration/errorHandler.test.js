const request = require("supertest");

// Mock the entire container to control the controller behavior
const mockCreate = jest.fn();
jest.mock("../../src/infrastructure/di/container", () => ({
  orderController: {
    create: (req, res, next) => mockCreate(req, res, next),
  },
}));

const app = require("../../src/app");

describe("Global Error Handling", () => {
  it("should return 500 and standardized JSON for unhandled errors", async () => {
    // Simulate an async error that Express catches (or passed to next)
    mockCreate.mockImplementation((req, res, next) => {
      const error = new Error("Something went wrong");
      error.statusCode = 500;
      next(error);
    });

    const response = await request(app).post("/orders").send({});

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: "error",
      message: "Something went wrong",
    });
  });

  it("should return 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: "error",
      message: "Not Found",
    });
  });
});
