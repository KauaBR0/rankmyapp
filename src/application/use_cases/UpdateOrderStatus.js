class UpdateOrderStatus {
  constructor(orderRepository, messageBroker) {
    this.orderRepository = orderRepository;
    this.messageBroker = messageBroker;
  }

  async execute(id, newStatus) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }

    order.updateStatus(newStatus);

    await this.orderRepository.update(order);

    await this.messageBroker.publish("order.status.updated", {
      orderId: id,
      newStatus: newStatus,
      timestamp: order.updatedAt,
    });

    return order;
  }
}

module.exports = UpdateOrderStatus;
