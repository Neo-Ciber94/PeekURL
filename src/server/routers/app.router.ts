import { createRouter } from "../createRouter";
import superjson from 'superjson';
import { urlRouter } from "./shorturl.router";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('shorturl', urlRouter);

// export type definition of API
export type AppRouter = typeof appRouter;