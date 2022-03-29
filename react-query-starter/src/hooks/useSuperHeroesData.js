import axios from "axios"
import { useQuery } from "react-query"

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes")
}

export const useSuperHerosData = ({ onSuccess, onError, enabled }) => {
  return useQuery(["super-heroes"], fetchSuperHeros, {
    onSuccess,
    onError,
    enabled,
    // select: (data) => {
    //   const superheroeNames = data.data.map((hero) => hero.name)

    //   return superheroeNames
    // },
  })
}
