import Command from './Command.js';
import sendMessage from '../SendMessage.js';

class QuestionCommand extends Command {
  constructor(from) {
    super();
    this.from = from;
  }

  async execute() {
    await sendMessage(this.from, 'Informe sua duvida');
  }
}

export default QuestionCommand;