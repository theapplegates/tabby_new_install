/**
 * This code is responsible for revalidating the cache when a post is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the Name & Description
 * 4. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 5. Choose Dataset to "production" or choose the one you prefer.
 * 6. Trigger on: "Create", "Update", and "Delete"
 * 7. Set Filter: _type == "post"
 * 8. Projection: Leave empty
 * 9. Status: Keep it enabled
 * 10. HTTP method: POST
 * 11. HTTP Headers: Leave empty
 * 12. API version: v2021-03-25
 * 13. Include drafts: No
 * 14. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random one if you haven't)
 * 15. Save the cofiguration
 * 16. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 17. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response("Webhook secret missing", { status: 503 });

  const { body, isValidSignature } = await parseBody<{ slug?: { current?: string } }>(request, secret);
  if (!isValidSignature) return new Response("Invalid signature", { status: 401 });

  const slug = body?.slug?.current;
  if (typeof slug !== "string" || !slug.length) return new Response("Invalid slug", { status: 400 });

  const postPath = `/post/${encodeURIComponent(slug)}`;
  revalidatePath(postPath);
  revalidatePath("/");
  return new Response(`Updated routes: ${postPath}, /`);
}
