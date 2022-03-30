import axios from "axios"
import { useMutation, useQuery } from "react-query"

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes")
}

export const useSuperHeroesData = ({ onSuccess, onError, enabled }) => {
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

const addSuperHero = (hero) => {
  return axios.post(`http://localhost:4000/superheroes`, hero)
}

export const useAddSuperHeroData = () => {
  return useMutation(addSuperHero)
}
