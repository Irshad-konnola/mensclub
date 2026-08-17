import { groq } from 'next-sanity'

export const getActivePostersQuery = groq`
  *[_type == "poster" && isActive == true] | order(_createdAt desc) {
    _id,
    title,
    image,
    link
  }
`

export const getCollectionsQuery = groq`
  *[_type == "collection"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image
  }
`
