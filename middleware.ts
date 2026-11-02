import { NextRequest, NextResponse } from "next/server";

const API_HOST = "api.tryafterlight.com";

const REALM = "Baby Braithwaite";
const USERNAME = "harry";
const PASSWORD = "0000";

const knownEndpoints: { method: string; regex: RegExp }[] = [
  { method: "POST", regex: /^\/v1\/generations\/?$/ },
  { method: "GET", regex: /^\/v1\/generations\/[A-Za-z0-9_-]+\/?$/ },
  { method: "GET", regex: /^\/v1\/generations\/[A-Za-z0-9_-]+\/assets\/?$/ },
];

function requestId() {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += b.toString(16).padStart(2, "0");
  return `req_${out.slice(0, 22)}`;
}

function json(body: unknown, status: number, extraHeaders: Record<string, string> = {}) {
  return new NextResponse(JSON.stringify(body, null, 2) + "\n", {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Request-Id": requestId(),
      "Afterlight-Version": "2026-05-17",
      ...extraHeaders,
    },
  });
}

function handleApiHost(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname;
  const method = request.method;
  const auth = request.headers.get("authorization") ?? "";
  const hasBearer = /^Bearer\s+\S+/i.test(auth);

  if (method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Allow": "GET, POST, OPTIONS",
        "Cache-Control": "no-store",
      },
    });
  }

  if (!hasBearer) {
    return json(
      {
        error: {
          type: "authentication_error",
          message:
            "No API key provided. Include an 'Authorization: Bearer <key>' header. Request access at https://tryafterlight.com/api",
          docs: "https://tryafterlight.com/api",
        },
      },
      401,
      { "WWW-Authenticate": 'Bearer realm="Afterlight"' },
    );
  }

  const pathMatches = knownEndpoints.some((e) => e.regex.test(path));
  const exactMatch = knownEndpoints.find(
    (e) => e.method === method && e.regex.test(path),
  );

  if (exactMatch) {
    return json(
      {
        error: {
          type: "authentication_error",
          message:
            "Invalid API key. Request access at https://tryafterlight.com/api",
          docs: "https://tryafterlight.com/api",
        },
      },
      401,
      { "WWW-Authenticate": 'Bearer realm="Afterlight", error="invalid_token"' },
    );
  }

  if (pathMatches) {
    return json(
      {
        error: {
          type: "method_not_allowed",
          message: `Method ${method} is not allowed on ${path}.`,
          docs: "https://tryafterlight.com/api",
        },
      },
      405,
    );
  }

  return json(
    {
      error: {
        type: "not_found",
        message: `Unknown endpoint: ${method} ${path}. See https://tryafterlight.com/api`,
        docs: "https://tryafterlight.com/api",
      },
    },
    404,
  );
}

function handleBabyBraithwaite(request: NextRequest): NextResponse {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const idx = decoded.indexOf(":");
    const user = idx === -1 ? decoded : decoded.slice(0, idx);
    const pass = idx === -1 ? "" : decoded.slice(idx + 1);
    if (user === USERNAME && pass === PASSWORD) {
      return NextResponse.next();
    }
  }
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? request.nextUrl.hostname).toLowerCase();
  const hostname = host.split(":")[0];

  if (hostname === API_HOST) {
    return handleApiHost(request);
  }

  const path = request.nextUrl.pathname;
  if (
    path.startsWith("/machine/baby-braithwaite") ||
    path.startsWith("/api/machine/baby-braithwaite")
  ) {
    return handleBabyBraithwaite(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
