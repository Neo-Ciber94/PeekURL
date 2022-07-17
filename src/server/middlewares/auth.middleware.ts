import { TRPCError } from "@trpc/server";
import { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";
import { AuthorizedContext, Context } from "../context";


export const authMiddleware: MiddlewareFunction<Context, AuthorizedContext, {}> = ({ ctx, next }) => {
    const userId = ctx.currentUserId;

    if (userId == null) {
        throw new TRPCError({
            code: 'FORBIDDEN'
        })
    }

    return next({
        ctx: {
            ...ctx,
            currentUserId: userId
        }
    });
}