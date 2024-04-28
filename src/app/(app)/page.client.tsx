'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { Home } from 'payload-types'

export const HomeHeader = ({ home }: { home: Home }) => {
  const { data } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
    depth: 1,
    initialData: home,
  })

  return <h1>{data.title}</h1>
}
