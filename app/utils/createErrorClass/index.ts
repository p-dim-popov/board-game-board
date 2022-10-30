import { createMirrorMap } from '~/utils/createMirrorMap';

export const createErrorClass = <Name extends `${string}Error`, ErrorType extends string>(
  name: Name,
  errorTypes: readonly ErrorType[],
) => {
  const Errors = createMirrorMap(errorTypes);

  const Class = {
    [name]: class extends Error {
      constructor(public type: keyof typeof Errors) {
        super(type);
      }
    },
  }[name];

  return {
    create: (...args: ConstructorParameters<typeof Class>) =>
      new Class(...args),
    Class,
  };
};
