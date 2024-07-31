export const isUrl = (str: string): boolean => str.includes('http')

export const isInstagramHandle = (str: string): boolean => str.startsWith('@')

export const createLinkObject = (item: string): { type: 'link'; text: string; url: string } => {
  if (isInstagramHandle(item)) {
    const instagramId = item.slice(1)
    return {
      type: 'link',
      text: item,
      url: `https://www.instagram.com/${instagramId}`,
    }
  }
  return {
    type: 'link',
    text: item,
    url: isUrl(item) ? item : `https://${item}`,
  }
}

export const createTextObject = (item: string): { type: 'text'; text: string } => ({
  type: 'text',
  text: item,
})

export const processInfoSource = (infoSource: string) =>
  infoSource
    .trim()
    .split(/\s+/)
    .reduce((acc, item) => {
      if (isUrl(item) || isInstagramHandle(item)) {
        acc.push(createLinkObject(item))
      } else {
        if (acc.length > 0 && acc[acc.length - 1].type === 'text') {
          acc[acc.length - 1].text += ' ' + item
        } else {
          acc.push(createTextObject(item))
        }
      }
      return acc
    }, [] as Array<{ type: 'link' | 'text'; text: string; url?: string }>)
