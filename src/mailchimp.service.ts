import { Injectable, Inject, Logger } from '@nestjs/common';
import { MAILCHIMP_OPTIONS } from './mailchimp.constants';

import * as Mailchimp from '@mailchimp/mailchimp_transactional/src';
import { MailchimpOptions } from './mailchimp.interfaces';

interface IMailchimpService {
  instance(): Mailchimp;
}

@Injectable()
export class MailchimpService implements IMailchimpService {
  private serviceInstance: any;

  constructor(
    @Inject(MAILCHIMP_OPTIONS) private options: MailchimpOptions,
  ) {
    this.serviceInstance = Mailchimp(this.options);
    /**
     * example of added custom function
     */
    this.serviceInstance.pingPong = this.pingPong.bind(this);
  }

  instance(): Mailchimp {
    if (!this.serviceInstance) {
      this.serviceInstance = Mailchimp(this.options);
    }
    return this.serviceInstance;
  }

  async pingPong(): Promise<any> {
    return await this.serviceInstance.users.ping();
  }
}
