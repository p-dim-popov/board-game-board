export type Nullish = null | undefined;

export type ConditionalAccess<
  T,
  Keys extends keyof NonNullable<T>,
> = T extends Nullish ? NonNullable<T>[Keys] | undefined : NonNullable<T>[Keys];

export type Distinct<T, Key extends string> = T & { __TYPE__: Key };
