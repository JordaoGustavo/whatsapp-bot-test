import Command from './Command.js';
import sendMessage from '../SendMessage.js';

class StatusCommand extends Command {
  constructor(from, lowerCaseBody) {
    super();
    this.from = from;
    this.lowerCaseBody = lowerCaseBody;
  }

  async execute() {
    // Message based on order status
    const orderId = this.lowerCaseBody; // Example order ID, replace with actual logic to get order ID
    const orderStatus = await this.getOrderStatus(orderId); // Assume getOrderStatus is a function that fetches the order status
    
    let message;
    switch (orderStatus) {
      case 'processing':
      message = `Seu pedido ${orderId} está sendo processado.`;
      break;
      case 'shipped':
      message = `Seu pedido ${orderId} foi enviado.`;
      break;
      case 'delivered':
      message = `Seu pedido ${orderId} foi entregue.`;
      break;
      default:
      message = `Não conseguimos recuperar o status do pedido ${orderId}.`;
    }

    await sendMessage(this.from, message);
  }

  getOrderStatus(orderId) {
    // Mocked function to simulate fetching order status
    const statuses = ['processing', 'shipped', 'delivered'];
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        resolve(randomStatus);
      }, 1000); // Simulate async operation with 1 second delay
    });
  }
}

export default StatusCommand;