import { isOnClient } from "./isOnClient";

export const toBase64 = (str: string) =>
  !isOnClient() ? Buffer.from(str).toString("base64") : window.btoa(str);
