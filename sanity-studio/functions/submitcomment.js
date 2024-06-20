import client from 'part:@sanity/base/client'

const sanityClient = client.withConfig({apiVersion: '2021-03-25'})

export default async function submitComment(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({message: 'Only POST requests allowed'});
        return;
    }

    const {name, email, comment, postId} = JSON.parse(req.body);

    // Validate input
    if (!name || !email || !comment || !postId) {
        res.status(400).send({message: 'Missing fields'});
        return;
    }

    try {
        const doc = {
            _type: 'comment',
            name: name,
            email: email,
            comment: comment,
            post: {
                _type: 'reference',
                _ref: postId
            }
        };

        await sanityClient.create(doc);
        res.status(200).send({message: 'Comment submitted'});
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).send({message: 'Could not submit comment'});
    }
}
