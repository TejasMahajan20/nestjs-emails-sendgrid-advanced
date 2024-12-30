import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueueName } from '../../common/enums/queue-name.enum';
import { EmailJobName } from './enums/email-job-name.enum';

@Injectable()
export class MailService {
    constructor(
        @InjectQueue(QueueName.MAIL) private mailQueue: Queue
    ) { }

    async sendTestEmail(
        recipient: string
    ): Promise<void> {
        await this.mailQueue.add(
            EmailJobName.MAIL,
            {
                recipient,
            }
        );
    }

    async sendEmailWithTemplate(
        recipient: string
    ): Promise<void> {
        await this.mailQueue.add(
            EmailJobName.TEMPLATE_MAIL,
            {
                templateId : process.env.SENDGRID_OTP_TEMPLATE_ID,
                recipient,
            }
        );
    }
}
