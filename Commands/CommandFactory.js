import WelcomeCommand from './welcomeCommand.js';
import SupportCommand from './SupportCommand.js';
import FollowUpCommand from './FollowUpCommand.js';
import NoOpCommand from './NoOpCommand.js';
import EndSupportCommand from './EndSupportCommand.js';
import StatusCommand from './StatusCommand.js';
import OrderStatusCommand from './OrderStatusCommand.js';
import QuestionCommand from './QuestionCommand.js';
import AIAnswerCommand from './AIAnswerCommand.js';

class CommandFactory {
  static createCommand(from, message, userState) {
    const lowerCaseBody = message.toLowerCase();
    console.log('userState', userState);

    if (this.isInitialCommand(userState)) {
      return new WelcomeCommand(from);
    } else if (this.isSupportCommand(lowerCaseBody, userState)) {
      return this.getSupportCommand(from, userState);
    } else if (this.isStatusCommand(userState, lowerCaseBody)) {
      return this.getStatusCommand(from, lowerCaseBody, userState);
    } else if (this.isQuestionCommand(lowerCaseBody, userState)) {
      return this.getQuestionCommand(from, lowerCaseBody, userState);
    } else if (this.isEndSupportCommand(lowerCaseBody)) {
      return new EndSupportCommand(from);
    } else if (this.isNoOpCommand(userState)) {
      return new NoOpCommand(from);
    }

    return null;
  }

  static isInitialCommand(userState) {
    return !userState || !userState.lastMessage || userState.lastMessage === 'fallback' || userState.lastMessage === 'EndSupportCommand';
  }

  static isSupportCommand(lowerCaseBody, userState) {
    return lowerCaseBody === '1' || lowerCaseBody.includes('suporte') || userState.lastMessage === 'SupportCommand';
  }

  static getSupportCommand(from, userState) {
    if (userState.lastMessage === 'SupportCommand') {
      return new FollowUpCommand(from);
    } else {
      return new SupportCommand(from);
    }
  }

  static isEndSupportCommand(lowerCaseBody) {
    return lowerCaseBody.includes('sair') || lowerCaseBody.includes('finalizar');
  }

  static isNoOpCommand(userState) {
    return userState.lastMessage === 'FollowUpCommand' || userState.lastMessage === 'NoOpCommand';
  }

  static isStatusCommand(userState, lowerCaseBody) {
    return lowerCaseBody.includes('status') || lowerCaseBody === '2' || userState.lastMessage === 'OrderStatusCommand';
  }

  static getStatusCommand(from, lowerCaseBody, userState) {
    if (userState.lastMessage === 'OrderStatusCommand') {
      return new StatusCommand(from, lowerCaseBody);
    }

    return new OrderStatusCommand(from);
  }

  static isQuestionCommand(lowerCaseBody, userState) {
    return userState.lastMessage === 'QuestionCommand' || lowerCaseBody === '3' || lowerCaseBody.includes('perguntar');
  }

  static getQuestionCommand(from, lowerCaseBody, userState) {
    if (userState.lastMessage === 'QuestionCommand') {
      return new AIAnswerCommand(from, lowerCaseBody);
    }

    return new QuestionCommand(from);
  }
}

export default CommandFactory;