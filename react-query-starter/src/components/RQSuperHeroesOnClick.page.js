import { useSuperHerosData } from "../hooks/useSuperHeroesData"

export const RQSuperHeroesPageOnClick = () => {
  const onSuccess = (data) => {
    console.log("✅ After data fetching", data)
  }

  const onError = (error) => {
    console.log("Encountering error", error)
  }

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHerosData({ onSuccess, onError, enabled: false })

  // to be added to the hook
  //  enabled: false

  if (isLoading || isFetching) {
    return <h2>Loading ...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>

      <button onClick={refetch}>Fetch Heroes</button>

      {data?.data?.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>
      })}
    </>
  )
}
