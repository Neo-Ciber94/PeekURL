import { NextApiHandler, NextApiRequest } from "next";
import prismaInstance from "../../../server/database/prisma";
import logger from "../../../server/logging";
import { ipLookUpService } from "src/server/services/ip-look-up.service";

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
      shortUrl,
    },
  });

  if (shortenUrl == null) {
    return res.status(404).end();
  }

  // Redirect
  res.redirect(shortenUrl.originalUrl);

  // Log access

  const ipAddress = getIp(req);
  const userAgent = getUserAgent(req);
  const geo = ipAddress
    ? await ipLookUpService.getIpGeolocation(ipAddress)
    : null;

  const access = await prisma.accessLog.create({
    data: {
      shortUrlId: shortenUrl.id,
      ipAddress,
      userAgent,
      city: geo?.city,
      country: geo?.country_name,
      latitude: geo?.latitude,
      longitude: geo?.longitude,
      region: geo?.region_name,
      mustRevalidate: geo == null,
    },
  });

  logger.debug(
    `[${req.method}] request to ${shortenUrl.shortUrl} from ${access.ipAddress}`
  );
};

function getIp(req: NextApiRequest): string | undefined {
  let ip =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress;

  if (Array.isArray(ip)) {
    ip = ip[0];
  }

  return ip?.split(",")[0].trim();
}

function getUserAgent(req: NextApiRequest): string | undefined {
  const userAgent = req.headers["user-agent"];

  if (Array.isArray(userAgent)) {
    return userAgent.join(", ");
  }

  return userAgent;
}

export default handler;
