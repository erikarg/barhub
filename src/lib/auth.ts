export type DemoSession = {
  user: {
    name: string;
    email: string;
  };
  createdAt: number;
};

const SESSION_COOKIE = "barhub_session";
const SESSION_STORAGE_KEY = "barhub_session";

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function getSessionStorageKey() {
  return SESSION_STORAGE_KEY;
}

export function readSessionFromLocalStorage(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}

export function writeSessionToLocalStorage(session: DemoSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearSessionFromLocalStorage() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function setSessionCookie(maxAgeSeconds = 60 * 60 * 24 * 7) {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE}=1; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

export function clearSessionCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function createDemoSession(params: {
  name?: string;
  email: string;
}): DemoSession {
  return {
    user: {
      name: params.name?.trim() || params.email.split("@")[0] || "Demo User",
      email: params.email.trim(),
    },
    createdAt: Date.now(),
  };
}


