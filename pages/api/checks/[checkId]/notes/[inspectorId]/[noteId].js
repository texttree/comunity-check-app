import { supabaseService } from '@/helpers/supabaseService'

export default async function handler(req, res) {
  const {
    query: { noteId, inspectorId, checkId },
    method,
  } = req
  switch (method) {
    case 'DELETE': // Удалить заметку инспектора
      try {
        const { error } = await supabaseService.rpc('delete_note', {
          note_id: noteId,
          inspector_id: inspectorId,
        })
        if (error) {
          throw error
        }
        return res.status(200).end('Note deleted successfully')
      } catch (error) {
        return res.status(500).json({ error })
      }

    default:
      res.setHeader('Allow', ['DELETE'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}