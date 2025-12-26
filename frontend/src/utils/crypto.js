// utils/crypto.js

export async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "Ed25519",
    },
    true,
    ["sign", "verify"]
  );

  return keyPair;
}

export async function exportPublicKey(publicKey) {
  const raw = await window.crypto.subtle.exportKey("raw", publicKey);
  return bufferToBase64(raw);
}

export async function exportPrivateKey(privateKey) {
  const pkcs8 = await window.crypto.subtle.exportKey("pkcs8", privateKey);
  return bufferToBase64(pkcs8);
}

export async function signData(privateKey, data) {
  const encoded = new TextEncoder().encode(data);
  const signature = await window.crypto.subtle.sign(
    "Ed25519",
    privateKey,
    encoded
  );
  return bufferToBase64(signature);
}

export async function verifySignature(publicKey, data, signature) {
  const encoded = new TextEncoder().encode(data);
  return await window.crypto.subtle.verify(
    "Ed25519",
    publicKey,
    base64ToBuffer(signature),
    encoded
  );
}

/* Helpers */
function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64) {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}
