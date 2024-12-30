import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendGridClient } from './sendgrid-client';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from '../../common/enums/queue-name.enum';
import { MailConsumer } from './mail.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.MAIL,
    })
  ],
  providers: [MailService, SendGridClient, MailConsumer],
  exports: [MailService]
})
export class MailModule { }
