import "server-only";

import { createClient, type QueryParams } from "next-sanity";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_TOKEN,
  // set CDN to live API in development mode
  // useCdn: process.env.NODE_ENV === "development" ? true : false,
  useCdn: false,
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    // disable cache in development
    // cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",

    cache: "no-cache",
    next: {
      // revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags,
    },
  });
}

export { client };
