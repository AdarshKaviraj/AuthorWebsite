import { client } from "@utils/sanity.ts";

export async function POST({ request, url }) {
  const contentType = request.headers.get('content-type');
  console.log('Content-Type:', contentType);

  if (!contentType || !['application/x-www-form-urlencoded', 'multipart/form-data'].some(type => contentType.includes(type))) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid Content-Type' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const comment = formData.get('comment');
  const postId = url.searchParams.get('postId'); // Get the post ID from the URL parameters

  try {
    await client.create({
      _type: 'comment',
      name,
      email,
      comment,
      post: {
        _type: 'reference',
        _ref: postId,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to submit comment', error);
    return new Response(JSON.stringify({ success: false, error: error.message, stack: error.stack }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
