export type transaction = {
  key: string,
  amount: number,
  from: string,
  to: string,
  time: number,
  type: string
}

export type user = {
  key: string,
  value: number,
  badges: number[] | null
}
