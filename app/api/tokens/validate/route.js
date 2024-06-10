import { supabaseService } from '@/app/supabase/service'

/**
 * @swagger
 * /api/tokens/validate:
 *   get:
 *     summary: Validate user token
 *     description: Checks if the provided token exists and belongs to the user.
 *     tags:
 *       - Token Validation
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *       - in: header
 *         name: x-comcheck-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token to be validated
 *     responses:
 *       200:
 *         description: Token is valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *       401:
 *         description: Unauthorized or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error message
 */

export async function GET(req) {
  const userId = req.headers.get('x-user-id')
  const access_token = req.headers.get('x-comcheck-token')

  if (!userId || !access_token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { error: tokenError } = await supabaseService
      .from('tokens')
      .select('id')
      .eq('user_id', userId)
      .eq('id', access_token)
      .single()

    if (tokenError) {
      return Response.json({ error: 'Invalid token' }, { status: 401 })
    }

    return Response.json({ status: 200, message: 'Token is valid' })
  } catch (error) {
    return Response.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    )
  }
}
