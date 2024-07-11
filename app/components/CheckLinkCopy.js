'use client'
import { forwardRef } from 'react'
import Link from 'next/link'

const CheckPageLink = forwardRef(
  ({ lng, checkId, chapterNumber, currentDomain, copyToClipboard, t }, ref) => {
    const link = `${currentDomain}/${lng}/checks/${checkId}/${chapterNumber}`
    return (
      <div className="flex flex-col sm:flex-row my-4">
        <div className="overflow-hidden border p-2 mr-1 rounded-md sm:flex-grow">
          <Link
            href={`/checks/${checkId}/${chapterNumber}`}
            ref={ref}
            className="truncate block"
          >
            {link}
          </Link>
        </div>
        <button
          className="bg-ming-blue hover:bg-deep-space text-white px-4 py-2 rounded-md sm:ml-2 mt-2 sm:mt-0 self-start"
          onClick={() => copyToClipboard(link)}
        >
          {t('copy')}
        </button>
      </div>
    )
  }
)

CheckPageLink.displayName = 'CheckPageLink'

export default CheckPageLink