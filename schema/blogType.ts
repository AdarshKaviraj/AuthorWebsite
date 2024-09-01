import {defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule
    .required()
    .error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'PublicationDate',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'ContentBody',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'Summary',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'FurtherReading',
      type: 'array',
      of: [{type: 'block'}]
    }),
  ],
})