import type { RecoilState } from 'recoil';
import { DefaultValue, selectorFamily } from 'recoil';
import type { ConditionalAccess } from '~/interfaces';

type SliceSelectorValue<T, K extends keyof NonNullable<T>> = ConditionalAccess<
T,
K
>;

type SliceSelector = <T, Keys extends keyof NonNullable<T>>(
  param: readonly [RecoilState<T>, Keys]
) => RecoilState<SliceSelectorValue<T, Keys>>;

export const sliceSelector: SliceSelector = selectorFamily({
  key: 'sliceSelector',
  get:
    <T, Keys extends keyof NonNullable<T>>([state, key]: readonly [
    RecoilState<T>,
    Keys,
  ]) =>
    (opts): SliceSelectorValue<T, Keys> => opts.get(state)?.[key] as SliceSelectorValue<T, Keys>,
  set:
    ([state, key]) =>
      (opts, newValue) => {
        if (newValue instanceof DefaultValue) {
          return;
        }

        const currentState = opts.get(state);
        if (typeof currentState === 'undefined') {
          return;
        }

        opts.set(state, { ...currentState, [key]: newValue });
      },
});
