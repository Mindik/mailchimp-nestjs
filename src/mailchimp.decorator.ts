import { Inject } from '@nestjs/common';
import { MAILCHIMP_TOKEN } from './mailchimp.constants';

export const InjectMailchimp = () => Inject(MAILCHIMP_TOKEN);
