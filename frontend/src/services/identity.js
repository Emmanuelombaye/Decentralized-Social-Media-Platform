import { generateKeyPair, exportPublicKey, exportPrivateKey } from "../utils/crypto";

const IDENTITY_KEY = "dsm_identity";

export async function createIdentity() {
  const keyPair = await generateKeyPair();

  const publicKey = await exportPublicKey(keyPair.publicKey);
  const privateKey = await exportPrivateKey(keyPair.privateKey);

  const identity = {
    id: publicKey,
    publicKey,
    privateKey,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(IDENTITY_KEY, JSON.stringify(identity));
  return identity;
}

export function getIdentity() {
  const stored = localStorage.getItem(IDENTITY_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function clearIdentity() {
  localStorage.removeItem(IDENTITY_KEY);
}
