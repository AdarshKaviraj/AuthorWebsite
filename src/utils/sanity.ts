

// sanity.js
import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
    projectId: 'nm989itl',
    dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-06-01', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getBlogs() {
  const posts = await client.fetch('*[_type == "blog"]')
  return posts
}

export async function getBlog(id: string) {
  const post = await client.fetch(`*[_type == "blog" && _id == $id]`, {id})
  return post
}



//schema of my blog.

// {

//   "_updatedAt": "2024-06-01T13:42:09Z",
//   "name": "Exciting AI Stuff",
//   "_id": "334d901a-6e61-46b2-9039-ba7a69f17919",
//   "slug": {
//     "current": "/first",
//     "_type": "slug"
//   },
//   "image": {
//     "_type": "image",
//     "asset": {
//       "_ref": "image-579dbb84e85f9b8314ed3f06f17723ef1b853729-4545x3028-jpg",
//       "_type": "reference"
//     }
//   },
//   "PublicationDate": "2024-06-01T13:41:00.000Z",
//   "_createdAt": "2024-06-01T13:42:09Z"
// },
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
