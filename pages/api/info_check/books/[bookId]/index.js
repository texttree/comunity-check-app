import serverApi from '@/helpers/serverApi'

export default async function handler(req, res) {
  const {
    query: { bookId },
    method,
  } = req
  try {
    switch (method) {
      case 'GET':
        let supabase
        try {
          supabase = await serverApi(req, res)
        } catch (error) {
          return res.status(401).json({ error })
        }
        const { data, error } = await supabase.rpc('get_notes_count_for_book', {
          book_id: bookId,
        })

        if (error) {
          throw error
        }

        return res.status(200).json(data)

      default:
        res.setHeader('Allow', ['GET'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
