import { createMirrorMap } from '~/utils';

describe(createMirrorMap.name, () => {
  it("should create a map from array, using array values as record's both key and value", () => {
    const result = createMirrorMap(['key1', 'key2']);

    expect(result.key1).toEqual('key1');
    expect(result.key2).toEqual('key2');
  });
});
