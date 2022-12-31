const globalChatModel = [];
class ChatService {

  async create(messages) {
    globalChatModel = messages;
  }

  async addMessage(message) {
    if(globalChatModel.length == 1000) {
      globalChatModel.shift();
    }
    globalChatModel.push(message);
  }

  async getMessages() {
    return globalChatModel;
  }
}

module.exports = new ChatService();
