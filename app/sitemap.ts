import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zonextest.vercel.app'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/mcdonalds-zrenjanin`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects/mcdonalds-ruklada`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects/kfc-zrenjanin`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects/zlatiborski-konaci`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/projects/knez-petrol-simanovci`,
      lastModified: new Date(),
      priority: 0.6,
    },
  ]
}
