import axios from "axios"
import React from "react"
import { useQueries } from "react-query"

const fetchSuperHeros = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`)
}

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResluts = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHeros(id),
      }
    })
  )

  console.log(queryResluts)

  return (
    <>
      <h1>ParallelQueries.page</h1>

      {queryResluts.map((hero, index) => {
        return <div key={index}>{hero?.data?.data?.name}</div>
      })}
    </>
  )
}
