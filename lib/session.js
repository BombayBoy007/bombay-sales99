import crypto from "node:crypto";
const COOKIE="bombaysales_admin";
const MAX_AGE=43200;
const secret=()=>process.env.SESSION_SECRET||process.env.ADMIN_PASSWORD||"";
export function makeSession(){const ts=String(Date.now());const sig=crypto.createHmac("sha256",secret()).update(ts).digest("hex");return ts+"."+sig}
export function validSession(value){if(!value||!secret())return false;const [ts,sig]=value.split(".");if(!ts||!sig||Date.now()-Number(ts)>MAX_AGE*1000)return false;const expected=crypto.createHmac("sha256",secret()).update(ts).digest("hex");return sig.length===expected.length&&crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected))}
export function cookieHeader(value,maxAge=MAX_AGE){return COOKIE+"="+value+"; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age="+maxAge}
export function isAdmin(request){const raw=request.headers.get("cookie")||"";const match=raw.split(";").map(x=>x.trim()).find(x=>x.startsWith(COOKIE+"="));return validSession(match?.slice(COOKIE.length+1))}
