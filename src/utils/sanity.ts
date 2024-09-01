
//import React from 'react'
//import * as ReactDOM from 'react-dom'
//import {PortableText} from '@portabletext/react'
// sanity.js
import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'
import { useSanityClient } from 'astro-sanity';


export const client = createClient({
    projectId: 'nm989itl',
    dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-06-01', // use current date (YYYY-MM-DD) to target the latest API version
  token: 'skCqNj2czpWhomhPXidPWUodhjLhHzjppmva0WYtA3XjnsTjlBUQzPgI0Qxf3Dj14J9aLwSsKmL3TBoO4Tu8o2ugnBjaXS0YPs1z9yPlYdykDLsqNJNpbqzB00hktScclJHXErsDunnmqsLhuoXCuPy5yclUtWb93hLJLjSkh2LGN4xuRvTQ'
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const data = await client.fetch(`count(*)`)
console.log(`Number of documents: ${data}`)

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getBlogs() {
  const posts = await client.fetch('*[_type == "blog"] {"blogname": name,"slug": slug.current,"PublicationDate": PublicationDate,"imageUrl": image.asset->url,"ContentBody": ContentBody[].children[].text,"Summary": Summary[].children[].text,"FurtherReading": FurtherReading[].children[].text}')
  //console.log(`Name: ${posts}`)
  return posts
}

export async function getBlog(slug: string) {
  const post = await client.fetch(`*[_type == "blog" && slug == $slug]`, {slug})
  return post
}

export type Blog = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: {
    asset: {
      _ref: string;
    };
  };
  PublicationDate: string;
};

export { useSanityClient };

