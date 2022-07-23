import { NextApiHandler, NextApiRequest } from "next";
import prismaInstance from "../../../database/prisma";
import * as geoip from 'geoip-lite';
import logger from "../../../logging";

const PATHNAME = "/api/q";

const handler: NextApiHandler = async (req, res) => {
    if (req.url == null) {
        return res.status(404).end();
    }

    const prisma = prismaInstance;
    const shortUrl = req.url.slice(PATHNAME.length);

    const shortenUrl = await prisma.shortUrl.findFirst({
        where: {
            active: true,
            shortUrl
        }
    })

    if (shortenUrl == null) {
        return res.status(404).end();
    }

    logger.debug(req.headers);

    // Redirect
    res.redirect(shortenUrl.originalUrl);

    // Log access

    const ipAddress = getIp(req);
    const userAgent = getUserAgent(req);
    const geo = ipAddress ? geoip.lookup(ipAddress) : null;

    const access = await prisma.accessLog.create({
        data: {
            shortUrlId: shortenUrl.id,
            ipAddress,
            userAgent,
            city: geo?.city,
            country: geo?.country,
            latitude: geo?.ll[0],
            longitude: geo?.ll[1],
            region: geo?.region
        }
    });

    logger.debug(`[${req.method}] access to ${shortenUrl.shortUrl} - ${access.ipAddress}`);
}

function getIp(req: NextApiRequest): string | undefined {
    let forwarded = req.headers["x-forwarded-for"]

    if (Array.isArray(forwarded)) {
        forwarded = forwarded[0];
    }

    return forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
}

function getUserAgent(req: NextApiRequest): string | undefined {
    const userAgent = req.headers["x-forwarded-for"];

    if (Array.isArray(userAgent)) {
        return userAgent.join(", ");
    }

    return userAgent;
}

export default handler;