
export type Loadable<T> = {
    state: 'loading';
} | {
    state: 'hasError';
    error: unknown;
} | {
    state: 'hasData';
    data: Awaited<T>;
};
