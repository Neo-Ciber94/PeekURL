const LOCAL_ADDR = ["localhost", "127.0.0.1", "::1"];

export function isLocalIpAddress(ip: string): boolean {
  return LOCAL_ADDR.includes(ip);
}
