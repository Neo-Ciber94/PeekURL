import { PrismaClient } from '@prisma/client';
import prismaInstance from '../database/prisma';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NextApiRequest, NextApiResponse } from 'next';

interface ContextResult {
    prisma: PrismaClient
    req: NextApiRequest,
    res: NextApiResponse
    currentUserId?: string
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export type AuthorizedContext = Context & Required<Pick<Context, 'currentUserId'>>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
    { req, res }: trpcNext.CreateNextContextOptions,
): Promise<ContextResult> {
    // for API-response caching see https://trpc.io/docs/caching

    return {
        req,
        res,
        prisma: prismaInstance
    };
}