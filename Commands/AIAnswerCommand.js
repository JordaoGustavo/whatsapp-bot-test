import Command from './Command.js';
import sendMessage from '../SendMessage.js';
import openAIClient from '../openAIClient.js';

// List of top questions and answers
const topQuestions = {
  "Qual o horário de funcionamento?": "Nosso horário de funcionamento é de segunda a sexta, das 9h às 18h.",
  "Qual o prazo de entrega?": "O prazo de entrega é de 3 a 7 dias úteis, dependendo da sua localização.",
  "Vocês oferecem suporte técnico?": "Sim, oferecemos suporte técnico via WhatsApp e e-mail.",
  "Quais são as formas de pagamento?": "Aceitamos cartões de crédito, débito e PIX.",
};

class AIAnswerCommand extends Command {
  constructor(from, lowerCaseBody) {
    super();
    this.from = from;
    this.lowerCaseBody = lowerCaseBody;
  }

  async execute() {
    const topQuestionsContext = Object.entries(topQuestions).map(([question, answer]) => {
      return `Q: ${question}\nA: ${answer}`;
    }).join("\n");

    const mockedOrder = {
      status: "Processing",
      shippingStatus: "Shipped",
      shippingSite: "https://tracking.example.com",
      trackingCode: "ABC123456789",
    };

    const orderContext = `Order Status: ${mockedOrder.status}\nShipping Status: ${mockedOrder.shippingStatus}\nTracking Site: ${mockedOrder.shippingSite}\nTracking Code: ${mockedOrder.trackingCode}`;

    const response = await openAIClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um assistente chatbot de WhatsApp. Seu objetivo é responder às dúvidas dos usuários com base nas respostas comuns fornecidas. Você não deve responder caso a pergunta nao encaixe nas respostas comuns, informe que alguém entrará em contato para ajudar com o caso. Se fizer sentido, inclua informações sobre o pedido na resposta." },
        { role: "system", content: `Aqui estão algumas perguntas e respostas comuns:\n${topQuestionsContext}` },
        { role: "system", content: `Informações do pedido:\n${orderContext}` },
        { role: "system", content: 'Nosso sla de atendimento é de 3 horas dentro do horario das 8am as 6pm' },
        { role: "user", content: this.lowerCaseBody },
      ],
    });

    const answer = response.choices[0]?.message?.content || '';
    await sendMessage(this.from, answer);
  }
}

export default AIAnswerCommand;