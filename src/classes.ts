export class Message {
  timestamp: string;
  id: string;
  content: string;
  channel_id: string;
  author: string;
  author_id: string;
  guild_id: string

  constructor(message: any) {
    this.timestamp = message.timestamp;
    this.id = message.id;
    this.content = message.content;
    this.channel_id = message.channel_id;
    this.author = message.author.username;
    this.author_id = message.author.id;
    this.guild_id = message.guild_id;
  }

  toJson() {
    return {
      timestamp: this.timestamp,
      id: this.id,
      content: this.content,
      channel_id: this.channel_id,
      author: this.author,
      author_id: this.author_id,
      guild_id: this.guild_id,
    }
  }
}
