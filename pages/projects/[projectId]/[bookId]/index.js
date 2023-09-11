import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import LeftArrow from 'public/left.svg'

const BookDetailsPage = () => {
  const [bookName, setBookName] = useState('Test')
  const router = useRouter()
  const { projectId, bookId } = router.query
  const _checks = [
    { id: 3, num: 1, name: 'Общественная', date: '22.08.2023', checkActivity: 4 },
    { id: 4, num: 2, name: 'Редакторская', date: '28.08.2023', checkActivity: 2 },
    { id: 5, num: 3, name: 'Лингвистическая', date: '31.08.2023', checkActivity: 1 },
    { id: 6, num: 4, name: 'Пасторская', date: '22.09.2023', checkActivity: 3 },
  ]
  const [checks, setChecks] = useState(_checks)
  const handleCreateBook = () => {}

  return (
    <div className="bg-gray-200 min-h-screen py-8">
      <div className="max-w-6xl mx-auto p-4">
        <Link
          href={`/projects/${projectId}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mb-4 rounded-md inline-flex items-center"
        >
          <LeftArrow className="h-5 w-5 mr-1" />
          Назад
        </Link>
        <h1 className="text-3xl font-bold mb-4">{bookName}</h1>
        <h2 className="text-2xl font-semibold mb-2">Проверки книги</h2>
        <div className="bg-white p-4 rounded-lg shadow-md mt-2">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-center">Номер</th>
                <th className="border p-2 text-center">Название</th>
                <th className="border p-2 text-center">Дата окончания</th>
                <th className="border p-2 text-center">Скачать заметки</th>
                <th className="border p-2 text-center">Активность (кол-во проверок)</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((check) => (
                <tr key={check.id}>
                  <td className="border p-2 text-center">{check.num}</td>
                  <td className="border p-2 text-center">
                    <Link
                      href={`/projects/${projectId}/${bookId}/${check.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {check.name}
                    </Link>
                  </td>
                  <td className="border p-2 text-center">{check.date}</td>
                  <td className="border p-2 text-center">Скачать</td>
                  <td className="border p-2 text-center">{check.checkActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          href={`/projects/${projectId}/${bookId}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md inline-block"
        >
          Начать новую проверку
        </Link>
      </div>
    </div>
  )
}

export default BookDetailsPage
