import axios from "axios"
import React from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes")
}

const fetchSuperFriends = () => {
  return axios.get("http://localhost:4000/friends")
}

export const ParallelQueriesPage = () => {
  const { data: heros } = useQuery("superheroes", fetchSuperHeros)
  const { data: friends } = useQuery("friends", fetchSuperFriends)

  return (
    <>
      <h1>ParallelQueries.page</h1>

      <h4>Heros</h4>
      {heros?.data?.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}

      <h4>friends</h4>
      {friends?.data?.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}
    </>
  )
}
