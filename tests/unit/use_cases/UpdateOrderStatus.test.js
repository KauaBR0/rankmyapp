const UpdateOrderStatus = require("../../../src/application/use_cases/UpdateOrderStatus");

describe("UpdateOrderStatus Use Case", () => {
  let orderRepository;
  let messageBroker;
  let updateOrderStatus;

  beforeEach(() => {
    orderRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    messageBroker = {
      publish: jest.fn(),
    };
    updateOrderStatus = new UpdateOrderStatus(orderRepository, messageBroker);
  });

  it("should update order status and publish an event", async () => {
    const mockOrder = {
      id: "123",
      status: "created",
      updateStatus: jest.fn().mockImplementation(function (s) {
        this.status = s;
      }),
      updatedAt: new Date(),
    };
    orderRepository.findById.mockResolvedValue(mockOrder);

    const result = await updateOrderStatus.execute("123", "processing");

    expect(orderRepository.findById).toHaveBeenCalledWith("123");
    expect(mockOrder.status).toBe("processing");
    expect(orderRepository.update).toHaveBeenCalledWith(mockOrder);
    expect(messageBroker.publish).toHaveBeenCalledWith(
      "order.status.updated",
      expect.objectContaining({
        orderId: "123",
        newStatus: "processing",
      }),
    );
    expect(result.status).toBe("processing");
  });

  it("should throw an error if order is not found", async () => {
    orderRepository.findById.mockResolvedValue(null);

    await expect(
      updateOrderStatus.execute("999", "processing"),
    ).rejects.toThrow("Order not found");
  });
});
