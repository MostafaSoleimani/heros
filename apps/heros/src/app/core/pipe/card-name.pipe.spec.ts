import { CardNamePipe } from './card-name.pipe';

describe('CardNamePipe', () => {
  const pipe = new CardNamePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "abc" to "abc"', () => {
    expect(pipe.transform('abc')).toBe('abc');
  });

  it('transforms "abc (def)" to "abc"', () => {
    expect(pipe.transform('abc (def)')).toBe('abc ');
  });

  it('transforms "undefined" to "abc"', () => {
    expect(pipe.transform(undefined)).toBe('');
  });
});
