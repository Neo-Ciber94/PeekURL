import { Context } from './context';
import * as trpc from '@trpc/server';
import { authMiddleware } from './middlewares/auth.middleware';

/**
 * Helper function to create a router with context.
 */
export function createRouter() {
    return trpc.router<Context>();
}

/**
 * Helper function to create a router with context that requires authentication.
 */
export function createProtectedRouter() {
    return trpc.router<Context>()
        .middleware(authMiddleware);
}