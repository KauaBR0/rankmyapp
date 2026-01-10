const CreateOrder = require("../../../application/use_cases/CreateOrder");
const GetOrder = require("../../../application/use_cases/GetOrder");
const UpdateOrderStatus = require("../../../application/use_cases/UpdateOrderStatus");

class OrderController {
  constructor(repository, broker) {
    this.createOrderUseCase = new CreateOrder(repository);
    this.getOrderUseCase = new GetOrder(repository);
    this.updateOrderStatusUseCase = new UpdateOrderStatus(repository, broker);
  }

  async create(req, res, next) {
    try {
      const order = await this.createOrderUseCase.execute(req.body);
      res.status(201).json({
        data: order,
        message: "Order created successfully",
      });
    } catch (error) {
      if (
        error.message.includes("Invalid") ||
        error.message.includes("Order must have")
      ) {
        error.statusCode = 400;
      }
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const order = await this.getOrderUseCase.execute(req.params.id);
      res.status(200).json({ data: order });
    } catch (error) {
      if (error.message === "Order not found") {
        error.statusCode = 404;
      }
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const order = await this.updateOrderStatusUseCase.execute(
        req.params.id,
        req.body.status,
      );
      res.status(200).json({
        data: order,
        message: "Order status updated successfully",
      });
    } catch (error) {
      if (error.message === "Order not found") {
        error.statusCode = 404;
      } else if (error.message.includes("Invalid")) {
        error.statusCode = 400;
      }
      next(error);
    }
  }
}

module.exports = OrderController;
