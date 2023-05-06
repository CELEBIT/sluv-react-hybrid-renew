export const queryToObject = (query: string) => {
  const parameters = new URLSearchParams(query)
  return Object.fromEntries(parameters.entries())
}
