import { NextResponse } from 'next/server'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
const payload = await getPayload({ config: configPromise })

const collections = ['media']

export const revalidate = 0
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

/**
 * RUN THIS ROUTE TO SEED THE DATABASE WITH SOME MEDIA
 * http://localhost:3000/api/seed
 * GET /api/seed route for seeding the database
 */
export async function GET(req: Request) {
  console.log('Seeding starts...')

  // clear the database
  await Promise.all(
    collections.map(async (collection) =>
      payload.delete({
        collection: collection as 'media',
        where: {},
      }),
    ),
  )
  console.log('Database cleared from media...')

  // seeding media
  const mediaPromises = []
  for (let i = 1; i <= 80; i++) {
    const imageNumber = i.toString().padStart(5, '0')
    const imagePath = path.resolve(
      __dirname,
      `./../../../../../../public/images/Image${imageNumber}.jpg`,
    )
    mediaPromises.push(
      payload.create({
        collection: 'media',
        filePath: imagePath,
        data: { text: `image-${i}` },
      }),
    )
  }

  const images = await Promise.all(mediaPromises)

  images.forEach((image, index) => {
    console.log(`Image ${index + 1} ID:`, image.id)
  })

  console.log('Seeding ends...')

  return NextResponse.json({ done: true })
}
