const MongoOrderRepository = require("../repositories/MongoOrderRepository");
const RabbitMQMessageBroker = require("../messaging/RabbitMQMessageBroker");
const OrderController = require("../web/controllers/OrderController");

const repository = new MongoOrderRepository();
const broker = new RabbitMQMessageBroker(
  process.env.RABBITMQ_URI || "amqp://localhost",
);

const orderController = new OrderController(repository, broker);

module.exports = {
  orderController,
};
