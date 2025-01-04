import Command from './Command.js';
import sendMessage from '../SendMessage.js';

class EndSupportCommand extends Command {
  constructor(from) {
    super();
    this.from = from;
  }

  async execute() {
    await sendMessage(this.from, 'Suporte finalizado com sucesso!');
  }
}

export default EndSupportCommand;