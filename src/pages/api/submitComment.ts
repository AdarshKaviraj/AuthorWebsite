import { client } from "@utils/sanity.ts";

export const prerender = false;

export async function POST({ request, url }: { request: Request; url: URL }) {
  const contentType = request.headers.get('content-type');

  if (!contentType || !['application/x-www-form-urlencoded', 'multipart/form-data'].some(type => contentType.includes(type))) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid Content-Type' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  const formData = await request.formData();
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const comment = formData.get('comment')?.toString();
  const postId = url.searchParams.get('postId');
  const parentCommentId = formData.get('parentCommentId')?.toString();

  try {
    const commentData = {
      _type: 'comment',
      name,
      email,
      comment,
      post: {
        _type: 'reference',
        _ref: postId,
      },
      ...(parentCommentId && {
        parentComment: {
          _type: 'reference',
          _ref: parentCommentId,
        }
      })
    };

    await client.create(commentData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to submit comment', error);
    const err = error as Error;

    return new Response(JSON.stringify({ success: false, error: err.message, stack: err.stack }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
