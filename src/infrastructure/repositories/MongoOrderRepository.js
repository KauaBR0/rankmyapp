const OrderRepository = require("../../domain/ports/OrderRepository");
const OrderModel = require("../database/models/OrderModel");
const OrderMapper = require("../mappers/OrderMapper");

class MongoOrderRepository extends OrderRepository {
  async save(order) {
    const orderData = OrderMapper.toPersistence(order);
    const createdOrder = await OrderModel.create(orderData);
    order.id = createdOrder._id.toString();
    return order;
  }

  async findById(id) {
    const orderData = await OrderModel.findById(id).exec();
    if (!orderData) return null;

    return OrderMapper.toDomain(orderData);
  }

  async update(order) {
    await OrderModel.findByIdAndUpdate(order.id, {
      status: order.status,
      updatedAt: new Date(),
    }).exec();
  }
}

module.exports = MongoOrderRepository;
