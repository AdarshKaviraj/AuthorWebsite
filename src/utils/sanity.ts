import { sanityClient } from "sanity:client";
import {createClient} from '@sanity/client'
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}


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


export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}

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

