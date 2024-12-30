import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { QueueName } from '../../common/enums/queue-name.enum';
import { SendGridClient } from './sendgrid-client';
import { MailDataRequired } from '@sendgrid/mail';
import { EmailJobName } from './enums/email-job-name.enum';

@Processor(QueueName.MAIL)
export class MailConsumer extends WorkerHost {
    private readonly logger = new Logger(MailConsumer.name);

    constructor(private readonly sendGridClient: SendGridClient) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        const { recipient, templateId } = job.data;
        switch (job.name) {
            case EmailJobName.MAIL:
                await this.sendTestEmail(recipient);
                break;
            case EmailJobName.TEMPLATE_MAIL:
                await this.sendEmailWithTemplate(templateId, recipient);
                break;
            default:
                this.logger.log(`Email successfully dispatched to: ${recipient}`);
                break;
        }

        return {};
    }

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
