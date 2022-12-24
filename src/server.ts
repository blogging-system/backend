import { name } from './app';
import express from 'express';
const app = express();

app.get('/', function (req, res) {
  return res.send(`Hi, ${name}`);
});

app.listen(process.env.PORT || 8080, () => console.log('listening on 8080'));
console.log(`Hi, ${name}`);
