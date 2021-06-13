import { ModuleMetadata, Type } from '@nestjs/common';

export type MailchimpOptions = string;

export interface MailchimpOptionsFactory {
  createMailchimpOptions(): Promise<MailchimpOptions> | MailchimpOptions;
}

export interface MailchimpAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<MailchimpOptionsFactory>;
  useClass?: Type<MailchimpOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MailchimpOptions> | MailchimpOptions;
}
