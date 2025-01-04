import Command from './Command.js';
import sendMessage from '../SendMessage.js';

class WelcomeCommand extends Command {
  constructor(from) {
    super();
    this.from = from;
  }

  async execute() {
    await sendMessage(
      this.from,
      'Bem-vindo(a) ao nosso atendimento! Como posso te ajudar?\n\nDigite:\n1️⃣ Falar com suporte\n2️⃣ Consultar status do pedido\n3️⃣ Perguntar algo \n\nPara sair ou finalizar digite "sair" ou "finalizar".'
    );
  }
}

export default WelcomeCommand;