export interface Term {
  id: string
  link?: string
  title: string
  content?: string
  mandatory: boolean
}

export interface SignupValues {
  nickname?: string
  userImg?: string
  terms: Array<Term['id']>
  step: number
}
