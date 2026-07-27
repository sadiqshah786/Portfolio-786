import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

// Extract text from a PDF as ordered lines. LinkedIn exports are two-column
// (narrow sidebar on the left, main content on the right), so we read the
// left column top-to-bottom first, then the right column — which matches the
// natural reading order of a LinkedIn "Save to PDF" profile.
export async function extractPdfLines(file) {
  const buf = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise
  const allLines = []

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p)
    const viewport = page.getViewport({ scale: 1 })
    const split = viewport.width * 0.34 // sidebar/main boundary
    const content = await page.getTextContent()

    const left = {}
    const right = {}
    content.items.forEach((it) => {
      if (!it.str || !it.str.trim()) return
      const x = it.transform[4]
      const y = Math.round(it.transform[5])
      const bucket = x < split ? left : right
      if (!bucket[y]) bucket[y] = []
      bucket[y].push({ x, str: it.str })
    })

    const toLines = (bucket) =>
      Object.keys(bucket)
        .map(Number)
        .sort((a, b) => b - a) // top of page first (y decreases downward)
        .map((y) =>
          bucket[y]
            .sort((a, b) => a.x - b.x)
            .map((i) => i.str)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim()
        )
        .filter(Boolean)

    allLines.push(...toLines(left), ...toLines(right))
  }

  return allLines
}
