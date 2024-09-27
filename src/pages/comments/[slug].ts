import { client } from "@utils/sanity.ts";

// Get static paths for dynamic routes
export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "comment"].post._ref`);
  const uniqueSlugs = Array.from(new Set(slugs)); // Get unique slugs

  const paths = uniqueSlugs.map((slug) => ({
    params: { slug },
  }));

  return paths; // Return the paths array directly
}

// Fetch comments
export async function get({ params }: any) {
  const { slug } = params;
  const query = `*[_type == "comment" && post._ref == $slug && approved == true]`;
  const data = await client.fetch(query);
  const comments = await client.fetch(query, { slug });
  return new Response(JSON.stringify(comments));
}

// Post a new comment
export async function post(request:any) {
  const { name, email, comment, postSlug, parentCommentId } = await request.json();
  const doc = {
    _type: 'comment',
    name,
    email,
    comment,
    post: {
      _type: 'reference',
      _ref: postSlug
    },
    parentComment: parentCommentId ? { _type: 'reference', _ref: parentCommentId } : undefined,
    approved: false // Comments need to be manually approved
  };
  
  await client.create(doc);
  return new Response(JSON.stringify({ status: 'Comment submitted, pending approval.' }));
}
