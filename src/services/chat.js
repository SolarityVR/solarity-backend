class ChatService {
  globalChatModel = [];

  async create(messages) {
    this.globalChatModel = messages;
  }

  async addMessage(message) {
    if(globalChatModel.length == 1000) {
      this.globalChatModel.shift();
    }
    this.globalChatModel.push(message);
  }
}

module.exports = new ChatService();
