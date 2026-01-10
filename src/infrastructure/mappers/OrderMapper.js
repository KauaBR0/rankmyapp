const Order = require("../../domain/entities/Order");

class OrderMapper {
  static toPersistence(order) {
    return {
      customer: order.customer,
      items: order.items,
      payment: order.payment,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  static toDomain(persistenceOrder) {
    const order = new Order({
      customer: persistenceOrder.customer,
      items: persistenceOrder.items,
      payment: persistenceOrder.payment,
    });

    // Set status and dates manually since the constructor defaults them
    order.id = persistenceOrder._id.toString();
    order.status = persistenceOrder.status;
    order.createdAt = persistenceOrder.createdAt;
    order.updatedAt = persistenceOrder.updatedAt;

    return order;
  }
}

module.exports = OrderMapper;
