import { localConfig } from "src/config/local.config";
import * as winston from "winston";
import Transport from "winston-transport";
import { AxiomTransport } from "./axiom.transport";

const customTransports: Transport[] = [];

if (localConfig.IS_VERCEL) {
  customTransports.push(new AxiomTransport());
}

const customFormat = winston.format((info) => {
  const date = new Date().toISOString();
  info.message = `[${date}] ${info.message}`;
  return info;
});

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.colorize(),
    customFormat(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console(), ...customTransports],
});

export default logger;
