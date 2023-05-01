// export const queryKeys = {
//   todos: ['todos'] as const,
//   todoById: (todoId: string) => ['todos', todoId] as const,
// }

// // 이런식으로 사용하면 된다.
// useQuery(queryKeys.todos, fetchTodos)
// useQuery(queryKeys.todoById(todoId), () => fetchTodoById(todoId))

export const queryKeys = {
  itemCategory: ['itemCategory'] as const,
}
