import { Config } from "src/config";
import * as winston from "winston";
import Transport from "winston-transport";
import { AxiomTransport } from "./axiom.transport";

const customTransports: Transport[] = [];

if (Config.isVercel) {
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
