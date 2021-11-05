import axios from "axios"

export const getCall = async({path}) => {
  return axios
    .get(`${path}`)
}