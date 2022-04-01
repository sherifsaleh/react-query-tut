import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"

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
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // onSuccess way
    // onSuccess: (data) => {

    //   // basic update
    //   //queryClient.invalidateQueries("super-heroes")

    //   // update level 2 reduce network requests
    //   queryClient.setQueriesData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     }
    //   })
    // },

    // Optmasitc update
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes")
      const previousHeroData = queryClient.getQueriesData("super-heroes")

      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        }
      })

      return {
        previousHeroData,
      }
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes")
    },
  })
}
