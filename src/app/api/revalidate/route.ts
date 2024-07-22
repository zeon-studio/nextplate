import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseBody } from "next-sanity/webhook";

// https://github.com/Evavic44/sanity-nextjs-revalidation/tree/main/app
export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, process.env.SANITY_HOOK_SECRET);

    console.log("req", req);
    console.log("body", body);

    if (!isValidSignature) {
      console.log("Invalid Signature");
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      console.log("Bad Request");
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag(body._type);
    // revalidateTag(`${body._type}:${body.slug}`)
    // revalidateTag("jobPositions");

    const response = NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
