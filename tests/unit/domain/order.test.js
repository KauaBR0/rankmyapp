const Order = require("../../../src/domain/entities/Order");

describe("Order Entity", () => {
  const validOrderData = {
    customer: {
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St",
    },
    items: [{ productId: "p1", quantity: 2, unitPrice: 50 }],
    payment: {
      method: "credit_card",
      status: "pending",
    },
  };

  it("should create a valid order entity", () => {
    const order = new Order(validOrderData);
    expect(order.customer.name).toBe("John Doe");
    expect(order.status).toBe("created");
    expect(order.createdAt).toBeDefined();
  });

  it("should throw an error if email is invalid", () => {
    const invalidData = {
      ...validOrderData,
      customer: { ...validOrderData.customer, email: "invalid-email" },
    };
    expect(() => new Order(invalidData)).toThrow("Invalid customer email");
  });

  it("should throw an error if items list is empty", () => {
    const invalidData = { ...validOrderData, items: [] };
    expect(() => new Order(invalidData)).toThrow(
      "Order must have at least one item",
    );
  });

  it("should throw an error if item quantity is less than 1", () => {
    const invalidData = {
      ...validOrderData,
      items: [{ productId: "p1", quantity: 0, unitPrice: 50 }],
    };
    expect(() => new Order(invalidData)).toThrow(
      "Item quantity must be a positive integer",
    );
  });

  it("should throw an error if item unit price is negative", () => {
    const invalidData = {
      ...validOrderData,
      items: [{ productId: "p1", quantity: 1, unitPrice: -10 }],
    };
    expect(() => new Order(invalidData)).toThrow(
      "Item unit price must be positive",
    );
  });

  describe("Status Transitions", () => {
    it("should update to processing from created", () => {
      const order = new Order(validOrderData);
      order.updateStatus("processing");
      expect(order.status).toBe("processing");
    });

    it("should throw error for invalid status", () => {
      const order = new Order(validOrderData);
      expect(() => order.updateStatus("invalid")).toThrow(
        "Invalid order status",
      );
    });

    it("should throw error for invalid transition (created -> delivered)", () => {
      const order = new Order(validOrderData);
      expect(() => order.updateStatus("delivered")).toThrow(
        "Invalid status transition from created to delivered",
      );
    });

    it("should follow full flow: created -> processing -> shipped -> delivered", () => {
      const order = new Order(validOrderData);
      order.updateStatus("processing");
      order.updateStatus("shipped");
      order.updateStatus("delivered");
      expect(order.status).toBe("delivered");
    });
  });
});
