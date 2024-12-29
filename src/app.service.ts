import { Injectable } from '@nestjs/common';
import { MailService } from './modules/mail/mail.service';

@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async sendMail(email: string): Promise<void> {
    await this.mailService.sendTestEmail(email)
  }

  async sendEmailWithTemplate(email: string): Promise<void> {
    await this.mailService.sendEmailWithTemplate(process.env.SENDGRID_OTP_TEMPLATE_ID, email)
  }
}
