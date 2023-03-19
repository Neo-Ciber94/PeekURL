import fetch from "node-fetch";
import { serverConfig } from "src/config/server.config";
import logger from "src/server/logging";
import { RedisService } from "./redis/redis.service";
import net from "net";
import { isLocalIpAddress } from "@utils/isLocalIpAddress";
import redisInstance from "src/server/database/redis";
import { localConfig } from "src/config/local.config";

export interface Language {
  code: string;
  name: string;
  native: string;
}

export interface Location {
  geoname_id: number;
  capital: string;
  languages: Language[];
  country_flag: string;
  country_flag_emoji: string;
  country_flag_emoji_unicode: string;
  calling_code: string;
  is_eu: boolean;
}

export interface TimeZone {
  id: string;
  current_time: Date;
  gmt_offset: number;
  code: string;
  is_daylight_saving: boolean;
}

export interface Currency {
  code: string;
  name: string;
  plural: string;
  symbol: string;
  symbol_native: string;
}

export interface Connection {
  asn: number;
  isp: string;
}

export interface IpGeolocationInfo {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: Location;
  time_zone: TimeZone;
  currency: Currency;
  connection: Connection;
}

class IpLookUpRedisService extends RedisService<IpGeolocationInfo> {
  constructor() {
    super({
      baseKey: "ipstack-ip-geolocation-info",
      client: redisInstance,
    });
  }
}

const IP_STACK_URL = "http://api.ipstack.com";
const redisService = new IpLookUpRedisService();

export class IpLookUpService {
  async getIpGeolocation(ip: string): Promise<IpGeolocationInfo | null> {
    // To prevent send an invalid ip address
    if (!net.isIP(ip) || isLocalIpAddress(ip)) {
      if (localConfig.IS_DEVELOPMENT) {
        logger.debug(`Cannot get ip geolocation info from local host: ${ip}`);
      }

      return null;
    }

    try {
      let result = await redisService.get(ip);

      if (result) {
        logger.info(`Cache hit for ${ip}`);
        return result;
      }

      logger.info(`Cache miss for ${ip}`);

      const apiKey = serverConfig.IP_STACK_API_KEY;
      const url = `${IP_STACK_URL}/${ip}?access_key=${apiKey}`;
      const res = await fetch(url);

      result = (await res.json()) as IpGeolocationInfo;
      await redisService.set(ip, result);
      logger.info(`Cached geolocation info for ${ip}`);
      return result as IpGeolocationInfo;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }
}

export const ipLookUpService = new IpLookUpService();
