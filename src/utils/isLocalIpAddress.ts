const LOCAL_ADDR = /[localhost|127\.0\.0\.1|::ffff:127\.0\.0.1|::1](:\d)?/;

export function isLocalIpAddress(ip: string): boolean {
  return LOCAL_ADDR.test(ip);
}
