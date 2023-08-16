import crypto from 'crypto'

export const generateRandomHash = (): string => {
  return crypto.randomBytes(32).toString('hex')
}
