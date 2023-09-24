async function getBoard(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function getBoardNames(url:string): Promise<{ data: {
  _id: string,
  slug: string,
}[]
} | { data: undefined }> {
  const res = await fetch(url)
  if (!res.ok) {
    return {data: undefined}
  }
  return res.json()
}

export {getBoard, getBoardNames}


