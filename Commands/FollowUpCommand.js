import Command from './Command.js';
import sendMessage from '../SendMessage.js';

class FollowUpCommand extends Command {
  constructor(from) {
    super();
    this.from = from;
  }

  execute() {
    sendMessage(this.from, 'Sua solicitação está sendo processada. Por favor, aguarde um atendente.');
  }
}

export default FollowUpCommand;