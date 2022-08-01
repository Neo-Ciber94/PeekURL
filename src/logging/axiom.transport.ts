import Transport from "winston-transport";
import winston from "winston";
import { log } from "next-axiom";

type LogLevel = keyof Pick<winston.Logger, "error" | "warn" | "info" | "debug">;

export class AxiomTransport extends Transport {
  log(info: winston.LogEntry, next: () => void) {
    setImmediate(() => this.emit("logged", info));
    const { level, message, exception, stack, ...props } = info;

    switch (level as LogLevel) {
      case "error":
        log.error(message);
        break;
      case "warn":
        log.warn(message);
        break;
      case "info":
        log.info(message);
        break;
      case "debug":
        log.debug(message);
        break;
    }

    next();
  }
}
