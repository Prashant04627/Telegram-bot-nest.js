import { Injectable } from '@nestjs/common';
const TelegramBot = require('node-telegram-bot-api');
const token ='6625433129:AAHxglrWu3NM5rCCA8CtiZYHHqhs1DW9IHw'
const axios = require("axios")
import { Data } from './data.model';



@Injectable()

export class telegramData{
    data: Data[] = [];
    insertData(name:string,api:number,created:number,lastUsed:number){
        const newData = new Data(this.data.length+1,name,api,created,lastUsed)
        this.data.push(newData);
    }
}


export class TelegramService {
    
    private bot:any
    constructor(){
        this.bot = new TelegramBot(token, {polling: true});
        
this.bot.onText(/\/start/ , (message) =>{
    
    const chatId = message.chat.id;
    this.bot.sendMessage(chatId , "Hello, My name is AST_bot, your daily weather bot. If you want weather report, reply /weather and the city name.")
     
})

this.bot.onText(/\/weather(.+)/ , async (msg, match) =>{
    const chatId= msg.chat.id;
   const resp=match[1];
  
   try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${resp}&appid=e3b1516d2f85c9db051406f4f138814a`)
    const temp = Math.round(response.data.main.temp - 273);
    const pressure= response.data.main.pressure;
    const humidity = response.data.main.humidity;
    const visibility = response.data.visibility;
    const windSpeed = response.data.wind.speed;
    console.log(response);
    this.bot.sendMessage(chatId,`The Temperature of ${resp} is ${temp} *C and the Pressure is ${pressure}, with Humidity of ${humidity}.
The Wind flows with a speed of ${windSpeed} with the Visibility of ${visibility}
Do you want to suscribe to get daily weather update? If yes type /suscribe with the name of the city.`);
   } catch (error) {
   this.bot.sendMessage(chatId,"no city found")
   console.log(error);
   }
   
} )
this.bot.onText(/\/suscribe/ , (message) =>{
    var chatId = message.chat.id;
    this.bot.sendMessage(chatId , "Thank you for suscribing for the daily weather update")
     console.log(message.chat.first_name);
})
    }

}
