// Tipe untuk rule validation di Sanity
export interface SanityRule {
  required: () => SanityRule;
  custom: (fn: (value: any) => boolean | string) => SanityRule;
  min: (min: number) => SanityRule;
  max: (max: number) => SanityRule;
  length: (exactLength: number) => SanityRule;
  greaterThan: (limit: number) => SanityRule;
  lessThan: (limit: number) => SanityRule;
  integer: () => SanityRule;
  precision: (limit: number) => SanityRule;
  positive: () => SanityRule;
  negative: () => SanityRule;
  unique: () => SanityRule;
  uri: (options?: {scheme: string[]}) => SanityRule;
  regex: (pattern: RegExp, options?: {name?: string; invert?: boolean}) => SanityRule;
  error: (message: string) => SanityRule;
  warning: (message: string) => SanityRule;
}
