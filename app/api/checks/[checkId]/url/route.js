/**
 * @swagger
 * /api/checks/{checkId}/url:
 *   get:
 *     summary: Generate link for public check page
 *     tags:
 *       - Links
 *     parameters:
 *       - in: path
 *         name: checkId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7890-abcd-1234567890ab"
 *         description: Check ID
 *       - in: query
 *         name: chapterNumber
 *         required: false
 *         schema:
 *           type: string
 *           example: "1"
 *         description: Chapter number (default is 1)
 *       - in: query
 *         name: lng
 *         required: false
 *         schema:
 *           type: string
 *         description: Language
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
 *                   example: https://example.com/en/checks/a1b2c3d4-e5f6-7890-abcd-1234567890ab/1
 *       400:
 *         description: Missing required parameters
 *       500:
 *         description: Internal server error
 */

export async function GET(request) {
  const { searchParams, pathname, origin } = new URL(request.url)
  const pathSegments = pathname.split('/')
  const checkId = pathSegments[pathSegments.length - 2]

  let chapterNumber = searchParams.get('chapterNumber')
  const lng = searchParams.get('lng')

  if (!checkId) {
    return new Response(
      JSON.stringify({ error: 'Missing required parameter: checkId' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  chapterNumber = chapterNumber || '1'

  let link
  if (lng) {
    link = `${origin}/${lng}/checks/${checkId}/${chapterNumber}`
  } else {
    link = `${origin}/checks/${checkId}/${chapterNumber}`
  }

  return new Response(JSON.stringify({ link }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
