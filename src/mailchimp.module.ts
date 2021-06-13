import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { MailchimpService } from './mailchimp.service';
import { MailchimpOptions, MailchimpAsyncOptions, MailchimpOptionsFactory } from './mailchimp.interfaces';
import { MAILCHIMP_TOKEN, MAILCHIMP_OPTIONS } from './mailchimp.constants';

export const connectionFactory = {
  provide: MAILCHIMP_TOKEN,
  useFactory: async (mailchimpService) => mailchimpService.instance(),
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
      providers: [
        {
          provide: MAILCHIMP_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  /**
   * Registers a configured Mailchimp Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static forRootAsync(options: MailchimpAsyncOptions): DynamicModule {
    return {
      module: MailchimpModule,
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

  private static createOptionsProvider(options: MailchimpAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MAILCHIMP_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
      provide: MAILCHIMP_OPTIONS,
      useFactory: async (optionsFactory: MailchimpOptionsFactory) => await optionsFactory.createMailchimpOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
