const SITE_HOST = "tutoring-seo-site.vercel.app";
const SITE_ORIGIN = `https://${SITE_HOST}`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const INDEXNOW_KEY = "PvjeX3SoZpzwir8awyYnSlljtqVWytM9";
const INDEXNOW_KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
const MAX_URLS = 10000;

type IndexNowRequestBody = {
  urls?: unknown;
};

function isSiteUrl(value: string): boolean {
  try {
    return new URL(value).origin === SITE_ORIGIN;
  } catch {
    return false;
  }
}

function badRequest(message: string): Response {
  return Response.json({ ok: false, message }, { status: 400 });
}

export async function GET() {
  return Response.json({
    ok: true,
    message: "IndexNow API is ready",
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as IndexNowRequestBody | null;
  const urls = body?.urls;

  if (!Array.isArray(urls) || urls.length === 0) {
    return badRequest("urls must include at least one URL.");
  }

  if (urls.length > MAX_URLS) {
    return badRequest(`urls cannot include more than ${MAX_URLS} URLs.`);
  }

  if (!urls.every((url) => typeof url === "string" && isSiteUrl(url))) {
    return badRequest(`All URLs must belong to ${SITE_ORIGIN}.`);
  }

  const urlList = urls.map((url) => new URL(url).href);
  const indexNowResponse = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    }),
  });

  if (!indexNowResponse.ok) {
    return Response.json(
      {
        ok: false,
        message: "IndexNow submission failed.",
        status: indexNowResponse.status,
      },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    message: "IndexNow submission accepted.",
    submitted: urlList.length,
  });
}
