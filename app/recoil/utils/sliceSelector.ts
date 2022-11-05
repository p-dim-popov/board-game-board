import type {
  RecoilState,
  RecoilValue,
  UnwrapRecoilValue,
  RecoilValueReadOnly,
} from 'recoil';
import { DefaultValue, selectorFamily } from 'recoil';
import type { ConditionalAccess } from '~/interfaces';

type SliceSelectorValue<T, K extends keyof NonNullable<T>> = ConditionalAccess<
T,
K
>;

type SliceSelector = <
  R extends RecoilValue<any>,
  Keys extends keyof NonNullable<UnwrapRecoilValue<R>>,
>(
  param: readonly [R, Keys]
) => R extends RecoilState<any>
  ? RecoilState<SliceSelectorValue<UnwrapRecoilValue<R>, Keys>>
  : RecoilValueReadOnly<SliceSelectorValue<UnwrapRecoilValue<R>, Keys>>;

export const sliceSelector: SliceSelector = selectorFamily({
  key: 'sliceSelector',
  get:
    ([state, key]) =>
      (opts) =>
        opts.get(state)?.[key],
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

        // Heavily relying on TypeScript to forbid me use RecoilValueReadOnly with read/write hooks/utils
        opts.set(state as RecoilState<any>, { ...currentState, [key]: newValue });
      },
}) as SliceSelector;
