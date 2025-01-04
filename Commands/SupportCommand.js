import Command from './Command.js';
import sendMessage from '../SendMessage.js';

class SupportCommand extends Command {
  constructor(from) {
    super();
    this.from = from;
  }

  async execute() {
    await sendMessage(this.from, 'Qual é o problema?');
  }
}

export default SupportCommand;