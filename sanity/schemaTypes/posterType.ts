import { defineField, defineType } from 'sanity'

export const posterType = defineType({
  name: 'poster',
  title: 'Poster / Offer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this poster (e.g., "Onam Offer 2026")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Turn this on to display the poster on the homepage.',
      initialValue: true,
    }),
    defineField({
      name: 'image',
      title: 'Poster Image',
      type: 'image',
      description: 'The image to display. Optimized for mobile status sizes.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        }
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Optional Link',
      type: 'url',
      description: 'If you want the poster to link somewhere when clicked (e.g., a specific collection).',
    }),
  ],
})
