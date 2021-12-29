import dotenv from 'dotenv';
import express from 'express';
import { urlencoded, json } from "body-parser";
import cors from 'cors';
import path from 'path';
import { promisifyAll } from 'bluebird';
import mongoose from 'mongoose';


import userRouter from './user/route';
import productRouter from './product/route';

const enviroment = process.argv[2] || 'development'
dotenv.config({
  path: `${__dirname}/config/.env.${enviroment}`,
  node_env: process.argv[2] || 'development'
});

const PORT = process.env.PORT

const dbOptions = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true
};

promisifyAll(mongoose);
mongoose.connect(process.env.DB_HOST, dbOptions);


const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/static', { dotfiles: 'allow' }));


app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})

