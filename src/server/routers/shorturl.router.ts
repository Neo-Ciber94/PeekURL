import { TRPCError } from "@trpc/server";
import { ShortUrlWithLogs } from "src/types/shorturl";
import { z } from "zod";
import logger from "../../logging";
import { shortenUrl } from "../../utils/shortenUrl";
import { createProtectedRouter } from "../createRouter";

export const urlRouter = createProtectedRouter()
    .mutation('.generate', {
        input: z.object({
            url: z.string()
        }),
        resolve: async ({ ctx, input }) => {
            const originalUrl = input.url;
            const userId = ctx.currentUserId;

            try {
                const shortUrl = await shortenUrl({
                    url: originalUrl
                });

                const result = await ctx.prisma.shortUrl.create({
                    data: {
                        originalUrl,
                        shortUrl,
                        createdByUserId: userId,
                    }
                });

                logger.debug(`Generated short url '${result.shortUrl}'`,);

                return result;
            } catch (e) {
                logger.error(e);

                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: "Invalid url"
                })
            }
        }
    })
    .query('.get_all', {
        input: z.object({
            includeLogs: z.boolean().optional().default(false),
            includeCount: z.boolean().optional().default(false)
        }),
        resolve: async ({ ctx, input }) => {
            const userId = ctx.currentUserId;
            const shortenUrls = await ctx.prisma.shortUrl.findMany({
                where: {
                    active: true,
                    createdByUserId: userId,
                },
                include: {
                    logs: input.includeLogs,
                    _count: input.includeCount && {
                        select: {
                            logs: true
                        }
                    }
                }
            });

            return shortenUrls as ShortUrlWithLogs[]
        }
    })
    .query('.get_by_id', {
        input: z.object({
            id: z.string(),
            includeLogs: z.boolean().optional().default(false),
            includeCount: z.boolean().optional().default(false)
        }),
        resolve: async ({ ctx, input }) => {
            const userId = ctx.currentUserId;
            const shortenUrl = await ctx.prisma.shortUrl.findFirst({
                where: {
                    active: true,
                    id: input.id,
                    createdByUserId: userId,
                },
                include: {
                    logs: input.includeLogs,
                    _count: input.includeCount && {
                        select: {
                            logs: true
                        }
                    }
                }
            });

            if (shortenUrl == null) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Cannot find the url'
                })
            }

            return shortenUrl as ShortUrlWithLogs;
        }
    })
    .query('.get_by_url', {
        input: z.object({
            shortUrl: z.string(),
            includeLogs: z.boolean().optional().default(false),
            includeCount: z.boolean().optional().default(false)
        }),
        resolve: async ({ ctx, input }) => {
            const userId = ctx.currentUserId;
            const shortenUrl = await ctx.prisma.shortUrl.findFirst({
                where: {
                    active: true,
                    createdByUserId: userId,
                    shortUrl: input.shortUrl
                },
                include: {
                    logs: input.includeLogs,
                    _count: input.includeCount && {
                        select: {
                            logs: true
                        }
                    }
                }
            });

            if (shortenUrl == null) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Cannot find the url'
                })
            }

            return shortenUrl as ShortUrlWithLogs;
        }
    })