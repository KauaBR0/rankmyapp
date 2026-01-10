const Order = require("../../domain/entities/Order");

class CreateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderData) {
    const order = new Order(orderData);
    await this.orderRepository.save(order);
    return order;
  }
}

module.exports = CreateOrder;
