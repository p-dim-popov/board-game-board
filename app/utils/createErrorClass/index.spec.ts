import { createErrorClass } from './index';

describe(createErrorClass.name, () => {
  it('should create class factory', () => {
    const TestError = createErrorClass('TestError', []);

    expect(TestError.create).toBeInstanceOf(Function);
  });

  it('should expose Class extending Error', () => {
    const TestError = createErrorClass('TestError', []);

    expect(TestError.Class.prototype).toBeInstanceOf(Error);
  });

  describe('create', () => {
    const TestError = createErrorClass('TestError', [
      'very bad',
      'not that bad',
    ]);

    it('should create error from passed type', () => {
      const error = TestError.create('not that bad');

      expect(error.type).toEqual('not that bad');
    });

    it('should have created errors extending custom error class', () => {
      const error = TestError.create('very bad');

      expect(error).toBeInstanceOf(TestError.Class);
    });
  });
});
