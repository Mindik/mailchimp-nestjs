import { MAILCHIMP_TOKEN } from './mailchimp.constants';
import { Provider } from '@nestjs/common';
import { MailchimpService } from './mailchimp.service';
import { MailchimpOptions } from './mailchimp.interfaces';

export function createMailchimpProviders(options: MailchimpOptions): Provider {
  console.log('createMailchimpProviders');
  return {
    provide: MAILCHIMP_TOKEN,
    useValue: new MailchimpService(options),
  };
}
