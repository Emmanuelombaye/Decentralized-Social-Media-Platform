// services/storage.js

import { signData } from "../utils/crypto";
import { getIdentity } from "./identity";

export async function createPost(content) {
  const identity = getIdentity();
  if (!identity) throw new Error("No identity found. Create one first.");

  const timestamp = new Date().toISOString();
  const dataToSign = JSON.stringify({ content, timestamp });

  const signature = await signData(
    await importPrivateKey(identity.privateKey),
    dataToSign
  );

  return {
    author: identity.id,
    content,
    timestamp,
    signature,
  };
}

/* Helper to import private key from base64 */
async function importPrivateKey(pkBase64) {
  const buffer = base64ToBuffer(pkBase64);
  return await window.crypto.subtle.importKey(
    "pkcs8",
    buffer,
    { name: "Ed25519" },
    true,
    ["sign"]
  );
}

function base64ToBuffer(base64) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}
