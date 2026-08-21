import { NextResponse } from 'next/server';

type RateLimitOptions = {
  limit: number;
  scope: string;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

const globalRateLimitState = globalThis as typeof globalThis & {
  __portfolioRateLimitStore?: Map<string, RateLimitEntry>;
};

const store = globalRateLimitState.__portfolioRateLimitStore ?? new Map<string, RateLimitEntry>();
globalRateLimitState.__portfolioRateLimitStore = store;

export function checkRateLimit(request: Request, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  cleanStore(now);

  const key = `${options.scope}:${getClientIp(request)}`;
  const existing = store.get(key);
  const entry = !existing || existing.resetAt <= now
    ? { count: 0, resetAt: now + options.windowMs }
    : existing;

  entry.count += 1;
  store.delete(key);
  store.set(key, entry);

  const allowed = entry.count <= options.limit;
  return {
    allowed,
    limit: options.limit,
    remaining: Math.max(0, options.limit - entry.count),
    resetAt: entry.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
  };
}

export function rateLimitResponse(result: RateLimitResult) {
  return NextResponse.json(
    { error: 'Too many submissions. Please try again later.' },
    {
      status: 429,
      headers: {
        'Cache-Control': 'no-store',
        'RateLimit-Limit': String(result.limit),
        'RateLimit-Remaining': String(result.remaining),
        'RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
        'Retry-After': String(result.retryAfterSeconds)
      }
    }
  );
}

function getClientIp(request: Request) {
  const cloudflareIp = normalizeIp(request.headers.get('cf-connecting-ip'));
  if (cloudflareIp) return cloudflareIp;

  const forwardedIp = normalizeIp(request.headers.get('x-forwarded-for')?.split(',')[0] ?? null);
  return forwardedIp ?? 'unknown';
}

function normalizeIp(value: string | null) {
  const normalized = value?.trim();
  return normalized && normalized.length <= 64 ? normalized : null;
}

function cleanStore(now: number) {
  if (store.size < 5_000) return;

  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }

  while (store.size >= 5_000) {
    const oldestKey = store.keys().next().value as string | undefined;
    if (!oldestKey) break;
    store.delete(oldestKey);
  }
}
