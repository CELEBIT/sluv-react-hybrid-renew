export const parseHashTags = (input: string) => {
  return input
    .split(/\s+/)
    .filter((word) => word.startsWith('#') && word.length > 1)
    .map((word) => word.replace('#', ''))
}
