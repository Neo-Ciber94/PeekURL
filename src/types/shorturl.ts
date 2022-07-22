import { AccessLog, ShortUrl } from "@prisma/client";

export type ShortUrlWithLogs = ShortUrl & {
    logs: AccessLog[] | null
    _count: {
        logs: number
    }
}