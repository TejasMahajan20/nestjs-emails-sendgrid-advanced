import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':email')
  async sendMail(@Param('email') email: string): Promise<string> {
    await this.appService.sendMail(email);
    return `Email successfully dispatched to: ${email}`;
  }

  @Get('template/:email')
  async sendEmailWithTemplate(@Param('email') email: string): Promise<string> {
    await this.appService.sendEmailWithTemplate(email);
    return `Email successfully dispatched to: ${email}`;
  }
}
