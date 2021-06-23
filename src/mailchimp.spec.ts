import * as Mailchimp from '@mailchimp/mailchimp_transactional/src';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { MAILCHIMP_TOKEN, MailchimpModule } from './';

describe('Mailchimp forRoot', () => {
  let mailchimpService: Mailchimp;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MailchimpModule.forRoot('MAILCHIPM_API_KEY')],
    }).compile();

    mailchimpService = moduleRef.get<Mailchimp>(MAILCHIMP_TOKEN);
  });

  describe('mailchimpService', () => {
    it('method ping exists', async () => {
      expect(mailchimpService.users.ping).toBeDefined();
    });

    it('method is a function', async () => {
      expect(mailchimpService.users.ping).toBeInstanceOf(Function);
    });

    it('pingPong should return "PONG"', async () => {
      const result = 'PONG';
      jest.spyOn(mailchimpService, 'pingPong').mockImplementation(() => result);

      expect(await mailchimpService.pingPong()).toBe(result);
    });

    it('users.ping() should return "PONG"', async () => {
      const result = 'PONG';
      jest
        .spyOn(mailchimpService.users, 'ping')
        .mockImplementation(() => result);

      expect(await mailchimpService.users.ping()).toBe(result);
    });
  });
});

describe('Mailchimp forRootAsync', () => {
  let mailchimpService: Mailchimp;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MailchimpModule.forRootAsync({ useFactory: () => 'MAILCHIPM_API_KEY' }),
      ],
    }).compile();

    mailchimpService = moduleRef.get<Mailchimp>(MAILCHIMP_TOKEN);
  });

  describe('mailchimpService', () => {
    it('method ping exists', async () => {
      expect(mailchimpService.users.ping).toBeDefined();
    });

    it('method is a function', async () => {
      expect(mailchimpService.users.ping).toBeInstanceOf(Function);
    });

    it('pingPong should return "PONG"', async () => {
      const result = 'PONG';
      jest.spyOn(mailchimpService, 'pingPong').mockImplementation(() => result);

      expect(await mailchimpService.pingPong()).toBe(result);
    });

    it('users.ping() should return "PONG"', async () => {
      const result = 'PONG';
      jest
        .spyOn(mailchimpService.users, 'ping')
        .mockImplementation(() => result);

      expect(await mailchimpService.users.ping()).toBe(result);
    });
  });
});

describe('Mailchimp forRootAsync imports ConfigModules', () => {
  let mailchimpService: Mailchimp;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MailchimpModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => config.get('API_KEY'),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    mailchimpService = moduleRef.get<Mailchimp>(MAILCHIMP_TOKEN);
  });

  describe('mailchimpService', () => {
    it('method ping exists', async () => {
      expect(mailchimpService.users.ping).toBeDefined();
    });

    it('method is a function', async () => {
      expect(mailchimpService.users.ping).toBeInstanceOf(Function);
    });

    it('pingPong should return "PONG"', async () => {
      const result = 'PONG';
      jest.spyOn(mailchimpService, 'pingPong').mockImplementation(() => result);

      expect(await mailchimpService.pingPong()).toBe(result);
    });

    it('users.ping() should return "PONG"', async () => {
      const result = 'PONG';
      jest
        .spyOn(mailchimpService.users, 'ping')
        .mockImplementation(() => result);

      expect(await mailchimpService.users.ping()).toBe(result);
    });
  });
});
