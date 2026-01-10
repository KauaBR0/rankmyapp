const MongoOrderRepository = require("../../../src/infrastructure/repositories/MongoOrderRepository");
const Order = require("../../../src/domain/entities/Order");

// Mock Mongoose model
jest.mock("../../../src/infrastructure/database/models/OrderModel", () => ({
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

const OrderModel = require("../../../src/infrastructure/database/models/OrderModel");

describe("MongoOrderRepository", () => {
  let repository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new MongoOrderRepository();
  });

  it("should save an order", async () => {
    const order = new Order({
      customer: { name: "John", email: "john@example.com", address: "Addr" },
      items: [{ productId: "p1", quantity: 1, unitPrice: 10 }],
      payment: { method: "cash" },
    });

    OrderModel.create.mockResolvedValue({ _id: "123" });

    await repository.save(order);

    expect(OrderModel.create).toHaveBeenCalled();
    expect(order.id).toBe("123");
  });

  it("should find an order by id", async () => {
    const mockData = {
      _id: "123",
      status: "created",
      customer: { name: "John", email: "john@example.com", address: "Addr" },
      items: [{ productId: "p1", quantity: 1, unitPrice: 10 }],
      payment: { method: "cash" },
      toObject: () => ({ status: "created", _id: "123" }),
    };
    OrderModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockData),
    });

    const result = await repository.findById("123");

    expect(OrderModel.findById).toHaveBeenCalledWith("123");
    expect(result.status).toBe("created");
  });

  it("should update an order", async () => {
    const order = { id: "123", status: "processing" };
    OrderModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue({}),
    });

    await repository.update(order);

    expect(OrderModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      expect.any(Object),
    );
  });
});
