export interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload as JwtPayload;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
