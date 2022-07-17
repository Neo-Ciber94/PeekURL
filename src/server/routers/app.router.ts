import { createRouter } from "../createRouter";
import superjson from 'superjson'
import { urlRouter } from "./url.router";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('url', urlRouter)

// export type definition of API
export type AppRouter = typeof appRouter;