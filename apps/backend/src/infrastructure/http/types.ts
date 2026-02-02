// src/interfaces/http/types.ts

export type Param<T extends string> = {
    [K in T]: string;
};