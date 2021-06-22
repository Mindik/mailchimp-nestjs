import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { MAILCHIMP_OPTIONS, MAILCHIMP_TOKEN } from './mailchimp.constants';
import {
  MailchimpAsyncOptions,
  MailchimpOptions,
  MailchimpOptionsFactory,
} from './mailchimp.interfaces';
import { MailchimpService } from './mailchimp.service';

export const connectionFactory = {
  provide: MAILCHIMP_TOKEN,
  useFactory: (mailchimpService) => mailchimpService.instance(),
  inject: [MailchimpService],
};

@Global()
@Module({
  providers: [connectionFactory, MailchimpService],
  exports: [connectionFactory, MailchimpService],
})
export class MailchimpModule {
  /**
   * Registers a configured Mailchimp Module for import into the current module
   */
  public static forRoot(options: MailchimpOptions): DynamicModule {
    return {
      module: MailchimpModule,
      providers: [{ provide: MAILCHIMP_OPTIONS, useValue: options }],
    };
  }

  /**
   * Registers a configured Mailchimp Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static forRootAsync(options: MailchimpAsyncOptions): DynamicModule {
    return {
      module: MailchimpModule,
      imports: options.imports ?? [],
      providers: [...this.createProviders(options)],
    };
  }

  private static createProviders(options: MailchimpAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options: MailchimpAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MAILCHIMP_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: MAILCHIMP_OPTIONS,
      useFactory: async (optionsFactory: MailchimpOptionsFactory) =>
        await optionsFactory.createMailchimpOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
