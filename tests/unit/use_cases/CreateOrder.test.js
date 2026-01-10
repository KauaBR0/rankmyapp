const CreateOrder = require("../../../src/application/use_cases/CreateOrder");
const Order = require("../../../src/domain/entities/Order");

describe("CreateOrder Use Case", () => {
  let orderRepository;
  let createOrder;

  beforeEach(() => {
    orderRepository = {
      save: jest.fn(),
    };
    createOrder = new CreateOrder(orderRepository);
  });

  it("should create and save an order", async () => {
    const orderData = {
      customer: { name: "John", email: "john@example.com", address: "Addr" },
      items: [{ productId: "p1", quantity: 1, unitPrice: 10 }],
      payment: { method: "cash" },
    };

    const result = await createOrder.execute(orderData);

    expect(orderRepository.save).toHaveBeenCalledTimes(1);
    expect(orderRepository.save).toHaveBeenCalledWith(expect.any(Order));
    expect(result.status).toBe("created");
  });

  it("should throw an error if data is invalid", async () => {
    const invalidData = {
      customer: { email: "invalid" },
    };

    await expect(createOrder.execute(invalidData)).rejects.toThrow();
  });
});
