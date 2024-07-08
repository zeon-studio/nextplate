import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, process.env.SANITY_HOOK_SECRET);

    if (!isValidSignature) {
      console.log("Invalid Signature");
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      console.log("Bad Request");
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
