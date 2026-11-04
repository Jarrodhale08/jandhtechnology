export const JOIN_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const JOIN_CODE_LENGTH = 6;
export const APP_PACKAGE = "com.jarrodhale.coffeetasting";
export const SITE = "https://www.jandhtechnology.com";

const PATTERN = new RegExp(`^[${JOIN_CODE_ALPHABET}]{${JOIN_CODE_LENGTH}}$`);

// The app's own parser accepts spaces and dashes in a typed code; a link only ever carries the bare code.
export function normalizeJoinCode(input: string): string | null {
  const code = input.replace(/[\s-]+/g, "").toUpperCase();
  return PATTERN.test(code) ? code : null;
}

export function groupJoinCode(code: string): string {
  return `${code.slice(0, 3)} ${code.slice(3)}`;
}

export function joinLinks(code: string): { universal: string; custom: string } {
  return { universal: `${SITE}/coffee-tasting/join/${code}`, custom: `coffeetasting://join/${code}` };
}

// null until the app is live in the App Store; the page then says so instead of linking nowhere.
export const APP_STORE_URL: string | null = null;
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${APP_PACKAGE}`;
