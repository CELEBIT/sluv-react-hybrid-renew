export interface SignupValues {
  profile: Profile
  terms: Array<Term['id']>
  step: number
}

export interface Term {
  id: string
  link?: string
  title: string
  content?: string
  mandatory: boolean
}

export interface Profile {
  nickname: string
  userImg: string
}
