import { GET_STUFF } from './constants'

export function getStuff(x, y) {
  return {
    type: GET_STUFF,
    payload: {"x" : x, "y" : y}
  }
}