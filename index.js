import express from 'express';
import amqp from 'amqplib';
import cors from 'cors';
import dotenv from 'dotenv';
import BMI_R from './src/model/BMI_R.js';
import router from './src/routes/Router.js';
dotenv.config();

const app = express();
app.use(express.json('application/json'));
app.use(express.urlencoded({extended:false}));
app.use(cors('http://localhost:3001'));
app.use(router);
const consume = async() => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange('logExchange', 'direct');
    const q = await channel.assertQueue('readQueue');
    channel.consume(q.queue, (message)=>{
        const data = JSON.parse(message.content);
        const { result } = data.message;
        const { _id } = data.message;
        const {logType} = data;
        if( logType === 'create' ){
            BMI_R.create({...result, userId: _id});
        }else if( logType === 'update' ){
            BMI_R.update({...result, userId: _id}, {where: {id: result.id}});
        }else if( logType === 'delete' ){
            BMI_R.destroy({where: {id: result.id}});
        }
        channel.ack(message);

    })
    
}
consume();

app.listen(Number(process.env.PORT), ()=>{
    console.log(`Server Listen on PORT ${process.env.PORT}`);
})

