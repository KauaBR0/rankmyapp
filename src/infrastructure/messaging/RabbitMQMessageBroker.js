const MessageBroker = require("../../domain/ports/MessageBroker");
const amqp = require("amqplib");
const logger = require("../utils/logger");

class RabbitMQMessageBroker extends MessageBroker {
  constructor(uri) {
    super();
    this.uri = uri;
    this.exchange = "order_events";
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    if (this.connection && this.channel) return;

    try {
      this.connection = await amqp.connect(this.uri);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(this.exchange, "topic", {
        durable: true,
      });
      logger.info("Connected to RabbitMQ");
    } catch (error) {
      logger.error("Failed to connect to RabbitMQ", { error: error.message });
      throw error;
    }
  }

  async publish(routingKey, message) {
    try {
      await this.connect();

      const buffer = Buffer.from(JSON.stringify(message));
      this.channel.publish(this.exchange, routingKey, buffer, {
        persistent: true,
      });
    } catch (error) {
      logger.error("RabbitMQ Publish Error", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}

module.exports = RabbitMQMessageBroker;
