import Link from 'next/link'
import Copy from '@/public/copy.svg'
import Image from 'next/image'
import { useRef } from 'react'

const InspectorTable = ({
  t,
  inspectors,
  currentDomain,
  lng,
  checkId,
  chapterNumber,
  deleteInspector,
  copyToClipboard,
}) => {
  const linkRefs = useRef({})

  return (
    <div className="overflow-x-auto mt-5 md:mt-0">
      <table className="min-w-full bg-white border-t rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">{t('nameInspector')}</th>
            <th className="px-4 py-2 text-left">{t('personalLink')}</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {inspectors.map((inspector) => {
            const link = `${currentDomain}/${lng}/checks/${checkId}/${chapterNumber}/${inspector.id}`
            return (
              <tr key={inspector.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 w-1/3 text-ming-blue">{inspector.name}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <Link
                      href={`/checks/${checkId}/${chapterNumber}/${inspector.id}`}
                      ref={(el) => (linkRefs.current[inspector.id] = el)}
                    >
                      {link}
                    </Link>
                    <button
                      className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => copyToClipboard(link)}
                    >
                      <Copy className="h-5 w-5 inline-block" />
                    </button>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-4">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => deleteInspector(inspector.id)}
                      className="hidden sm:block bg-red-500 hover:bg-red-600 text-white px-2 py-1 sm:px-2 sm:py-1 rounded-md"
                    >
                      {t('delete')}
                    </button>
                    <Image
                      key={inspector.id}
                      src="/delete.svg"
                      alt="Delete Icon"
                      width={24}
                      height={24}
                      onClick={() => deleteInspector(inspector.id)}
                      className="block sm:hidden h-5 w-5 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default InspectorTable