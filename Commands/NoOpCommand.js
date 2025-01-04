import Command from './Command.js';

class NoOpCommand extends Command {
  execute() {
    // Do nothing
  }
}

export default NoOpCommand;