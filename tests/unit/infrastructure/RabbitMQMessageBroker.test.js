const RabbitMQMessageBroker = require("../../../src/infrastructure/messaging/RabbitMQMessageBroker");
const amqp = require("amqplib");

jest.mock("amqplib");
jest.mock("../../../src/infrastructure/utils/logger");

describe("RabbitMQMessageBroker", () => {
  let broker;
  let mockChannel;
  let mockConnection;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockChannel = {
      assertExchange: jest.fn().mockResolvedValue({}),
      publish: jest.fn().mockReturnValue(true),
      close: jest.fn().mockResolvedValue({}),
    };

    mockConnection = {
      createChannel: jest.fn().mockResolvedValue(mockChannel),
      close: jest.fn().mockResolvedValue({}),
    };

    amqp.connect.mockResolvedValue(mockConnection);

    broker = new RabbitMQMessageBroker("amqp://localhost");
  });

  it("should publish a message and reuse connection", async () => {
    await broker.publish("test.topic", { data: "test" });
    await broker.publish("test.topic", { data: "test2" });

    expect(amqp.connect).toHaveBeenCalledTimes(1);
    expect(mockConnection.createChannel).toHaveBeenCalledTimes(1);
    expect(mockChannel.publish).toHaveBeenCalledTimes(2);
  });
});
