const OrderStatus = {
  CREATED: "created",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
};

const ValidTransitions = {
  [OrderStatus.CREATED]: [OrderStatus.PROCESSING],
  [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
};

class Order {
  constructor({ customer, items, payment }) {
    this.validateCustomer(customer);
    this.validateItems(items);

    this.customer = customer;
    this.items = items;
    this.payment = payment;
    this.status = OrderStatus.CREATED;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStatus(newStatus) {
    if (!Object.values(OrderStatus).includes(newStatus)) {
      throw new Error(`Invalid order status: ${newStatus}`);
    }

    const allowedTransitions = ValidTransitions[this.status] || [];
    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(
        `Invalid status transition from ${this.status} to ${newStatus}`,
      );
    }

    this.status = newStatus;
    this.updatedAt = new Date();
  }

  validateCustomer(customer) {
    if (!customer || !customer.email || !this.isValidEmail(customer.email)) {
      throw new Error("Invalid customer email");
    }
  }

  validateItems(items) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    items.forEach((item) => {
      if (
        !item.quantity ||
        item.quantity < 1 ||
        !Number.isInteger(item.quantity)
      ) {
        throw new Error("Item quantity must be a positive integer");
      }
      if (item.unitPrice === undefined || item.unitPrice < 0) {
        throw new Error("Item unit price must be positive");
      }
    });
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = Order;
module.exports.OrderStatus = OrderStatus;
