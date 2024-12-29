import { Injectable } from '@nestjs/common';
import { SendGridClient } from './sendgrid-client';
import { MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class MailService {
    constructor(private readonly sendGridClient: SendGridClient) { }

    async sendTestEmail(
        recipient: string,
        subject: string = 'Test email',
        body: string = 'This is a test mail'
    ): Promise<void> {
        const mail: MailDataRequired = {
            to: recipient,
            from: process.env.SENDGRID_SENDER_EMAIL_ID,
            subject,
            content: [{ type: 'text/plain', value: body }],
        };
        await this.sendGridClient.send(mail);
    }

    async sendEmailWithTemplate(
        templateId: string,
        recipient: string,
        subject: string = 'Test email with template',
        body: string = 'This is a test mail with template'
    ): Promise<void> {
        const mail: MailDataRequired = {
            to: recipient,
            from: process.env.SENDGRID_SENDER_EMAIL_ID,
            templateId,
            dynamicTemplateData: { body, subject }, // The data to be used in the template
        };
        await this.sendGridClient.send(mail);
    }
}
