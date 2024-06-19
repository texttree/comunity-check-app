/**
 * @swagger
 * /api/checks/{checkId}/{inspectorId}/url:
 *   get:
 *     summary: Generate link for personal check page
 *     tags:
 *       - Links
 *     parameters:
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: string
 *         description: Language code
 *       - in: query
 *         name: checkId
 *         required: true
 *         schema:
 *           type: string
 *         description: Check ID
 *       - in: query
 *         name: chapterNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Chapter number
 *       - in: query
 *         name: inspectorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Inspector ID
 *     responses:
 *       200:
 *         description: Generated link
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 link:
 *                   type: string
 *                   example: https://example.com/en/checks/123/1/inspectorId
 *       400:
 *         description: Missing required parameters
 *       500:
 *         description: Internal server error
 */

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const lng = searchParams.get('lng')
  const checkId = searchParams.get('checkId')
  const chapterNumber = searchParams.get('chapterNumber')
  const inspectorId = searchParams.get('inspectorId')

  if (!lng || !checkId || !chapterNumber || !inspectorId) {
    return Response.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const link = `${origin}/${lng}/checks/${checkId}/${chapterNumber}/${inspectorId}`

  return Response.json({ link })
}