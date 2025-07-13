import React from 'react'

interface BlockPreviewProps {
  imageSrc: string
  altText: string
}

export const BlockPreview = ({ imageSrc, altText }: BlockPreviewProps) => {
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={altText}
        style={{
          maxWidth: '100%',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  )
}
