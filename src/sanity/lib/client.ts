import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN , // Never add the NEXT_PUBLIC prefix to your private environment variables, especially tokens. Instead, create route handlers to communicate with Sanity on the server side, not the client side. 
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
