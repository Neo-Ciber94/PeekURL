import { TRPCError } from "@trpc/server";
import { z } from "zod";
import logger from "../../logging";
import { shortenUrl } from "../../utils/shortenUrl";
import { createRouter } from "../createRouter";

export const urlRouter = createRouter()
    .mutation('.generate', {
        input: z.object({
            url: z.string()
        }),
        resolve: async ({ ctx, input }) => {
            const originalUrl = input.url;
            const userId = ctx.currentUserId;

            if (userId == null) {
                throw new TRPCError({
                    code: 'FORBIDDEN'
                })
            }

            try {
                const shortUrl = shortenUrl(originalUrl);
                const result = await ctx.prisma.shortUrl.create({
                    data: {
                        originalUrl,
                        shortUrl,
                        createdByUserId: userId,
                    }
                });

                logger.debug(`New short url ${result.shortUrl}`,);

                return result;
            } catch (e) {
                console.error(e);

                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: "Invalid url"
                })
            }
        }
    })
    .query('.get', {
        input: z.object({ shortUrl: z.string() }),
        resolve: async ({ ctx, input }) => {
            const userId = ctx.currentUserId;

            if (userId == null) {
                throw new TRPCError({
                    code: 'FORBIDDEN'
                })
            }

            const shortenUrl = await ctx.prisma.shortUrl.findFirst({
                where: {
                    active: true,
                    createdByUserId: userId,
                    shortUrl: input.shortUrl
                }
            });

            if (shortenUrl == null) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Cannot find the url'
                })
            }

            return shortenUrl;
        }
    })