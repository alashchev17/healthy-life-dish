import { createClient, type QueryParams } from 'next-sanity'

import { apiVersion, dataset, projectId } from '#/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch<T = any>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    cache: 'force-cache', // on next v14 it's force-cache by default, in v15 it has to be set explicitly
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}
