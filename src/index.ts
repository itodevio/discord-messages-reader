import 'dotenv/config';
import WebSocket from 'ws';
import { Message } from './classes';
import { fruits, items } from './utils';

const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

const messageReceived = (data: any) => {
  const message = new Message(data);

  console.log({ ...message.toJson() })
} 

ws.once('open', () => {
  ws.send(
    JSON.stringify({
      "op": 2,
      "d": {
        "token": process.env.TOKEN,
        "properties": {
          "os": "windows",
          "browser": "disco",
          "device": "disco"
        },
        "intents": 33280
      }
    })
  );
});

ws.on('message', (raw_data: any) => {
  const data = JSON.parse(raw_data);

  const { t, op, d } = data;

  switch (op) {
    case 10:
      const { heartbeat_interval } = d;
      heartbeat(heartbeat_interval)
      break;
  }

  switch (t) {
    case 'MESSAGE_CREATE':
      if (d.channel_id === process.env.CHANNEL_ID) { // remove this line if you don't want to filter a specific channel
        messageReceived(d);
      }
      break;
  }

})

ws.on('close', (err: any) => console.log('closed', err))
ws.on('error', (err: any) => console.log('err', err))
ws.on('unexpected-response', (err: any) => console.log('unex', err))
const heartbeat = (ms: number) => {
  return setInterval(() => ws.send(JSON.stringify({ op: 1, d: null })), ms)
}
