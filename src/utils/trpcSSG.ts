import { appRouter } from '../server/routers/app.router';
import { createSSGHelpers } from '@trpc/react/ssg';
import { Context } from 'src/server/context';
import superjson from 'superjson';

export function trpcSSG() {
    return createSSGHelpers({
        router: appRouter,
        ctx: {} as unknown as Context,
        transformer: superjson,
    })
}