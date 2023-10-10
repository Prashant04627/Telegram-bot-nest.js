import { Body, Controller, Get} from '@nestjs/common';
import { telegramData } from './telegram.service';

@Controller()
export class TelegramController {
    
  constructor(private readonly dataService: telegramData) {}

  @Get(`https://api.telegram.org/bot6625433129:AAHxglrWu3NM5rCCA8CtiZYHHqhs1DW9IHw/getChat?chat_id=6656106368`)
  addData(
    @Body('name') name:string,
    @Body('api') api:number,
    @Body('created') created:number,
    @Body('lastUsed') lastUsed:number,
  )  {
    const info= this.dataService.insertData(
        name,api,created,lastUsed
    );
    return{info}
  }
}
