import { formatTranslationMessages } from '../i18n';

jest.mock('../translations/vi.json', () => ({
  message1: 'default message',
  message2: 'default message 2',
}));

const viTranslationMessages = {
  message1: 'default message',
  message2: '',
};

describe('formatTranslationMessages', () => {
  it('should build only defaults when DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages('en', { a: 'a' });

    expect(result).toEqual({ a: 'a' });
  });

  it('should combine default locale and current locale when not DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages('', viTranslationMessages);

    expect(result).toEqual({
      message1: 'default message',
      message2: 'default message 2',
    });
  });
});
