// export const queryKeys = {
//   todos: ['todos'] as const,
//   todoById: (todoId: string) => ['todos', todoId] as const,
// }

// // 이런식으로 사용하면 된다.
// useQuery(queryKeys.todos, fetchTodos)
// useQuery(queryKeys.todoById(todoId), () => fetchTodoById(todoId))

export const queryKeys = {
  itemCategory: ['itemCategory'] as const,
  brandRecentSelected: ['brandRecentSelected'] as const,
  brandTop: ['brandTop'] as const,
  tempItem: ['tempItem'] as const,
  searchBrand: (brandName: string) => ['searchBrand', brandName] as const,
  hotPlace: ['hotPlace'] as const,
  recentPlace: ['recentPlace'] as const,
  interestCeleb: ['interestCeleb'] as const,
  hotCeleb: ['hotCeleb'] as const,
  recentCeleb: ['recentCeleb'] as const,
  searchCeleb: (celebName: string) => ['searchCeleb', celebName] as const,
}
