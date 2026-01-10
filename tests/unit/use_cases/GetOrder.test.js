const GetOrder = require("../../../src/application/use_cases/GetOrder");

describe("GetOrder Use Case", () => {
  let orderRepository;
  let getOrder;

  beforeEach(() => {
    orderRepository = {
      findById: jest.fn(),
    };
    getOrder = new GetOrder(orderRepository);
  });

  it("should return an order if it exists", async () => {
    const mockOrder = { id: "123", status: "created" };
    orderRepository.findById.mockResolvedValue(mockOrder);

    const result = await getOrder.execute("123");

    expect(orderRepository.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockOrder);
  });

  it("should throw an error if order is not found", async () => {
    orderRepository.findById.mockResolvedValue(null);

    await expect(getOrder.execute("999")).rejects.toThrow("Order not found");
  });
});
