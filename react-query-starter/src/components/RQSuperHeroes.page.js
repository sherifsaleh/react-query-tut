import { Link } from "react-router-dom"
import { useSuperHeroesData } from "../hooks/useSuperHeroesData"
export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("✅ After data fetching", data)
  }

  const onError = (error) => {
    console.log("Encountering error", error)
  }

  const { isLoading, data, isError, error, isFetching } = useSuperHeroesData({
    onSuccess,
    onError,
    enabled: true,
  })

  if (isLoading || isFetching) {
    return <h2>Loading ...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>

      {data?.data?.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}

      {/* {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>
      })} */}
    </>
  )
}
