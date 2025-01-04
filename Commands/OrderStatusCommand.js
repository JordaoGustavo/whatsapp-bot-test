import Command from './Command.js';
import sendMessage from '../SendMessage.js';

class OrderStatusCommand extends Command {
  constructor(from) {
    super();
    this.from = from;
  }

  async execute() {
    await sendMessage(this.from, 'Informe o numero do pedido?');
  }
}

export default OrderStatusCommand;