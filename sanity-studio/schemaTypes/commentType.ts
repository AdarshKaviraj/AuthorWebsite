import { defineType, defineField } from 'sanity';

export const commentType = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required().error('Name is required'),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: (rule) => rule.required().error('Email is required'),
    }),
    defineField({
      name: 'comment',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'approved',
      type: 'boolean',
      title: 'Approved',
      description: 'Controls visibility of the comment on the site. Comments must be approved to be visible.',
      initialValue: false,
    }),
    defineField({
      name: 'post',
      type: 'reference',
      to: [{ type: 'blog' }],
      title: 'Post',
      validation: (rule) => rule.required().error('A reference to the associated blog post is required'),
    }),
    defineField({
      name: 'parentComment',
      type: 'reference',
      to: [{ type: 'comment' }],
      title: 'Parent Comment',
      description: 'Reference to parent comment if this is a reply.',
      options: {
        filter: 'approved == true'  // Optional filter to only allow replies to approved comments
      }
    }),
  ],
});
