import { useState } from "react"
import { Link } from "react-router-dom"
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData"

export const RQMutatePage = () => {
  const [name, setName] = useState("")
  const [alterEgo, setAlterEgo] = useState("")

  const onSuccess = (data) => {
    console.log("✅ After data fetching", data)
  }

  const onError = (error) => {
    console.log("Encountering error", error)
  }

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData({
      onSuccess,
      onError,
      enabled: true,
    })

  const {
    mutate: addHero,
    isError: isErrorAddHero,
    error: errorAddHero,
  } = useAddSuperHeroData()

  const handleAddHeroCLick = () => {
    const hero = { name, alterEgo }
    addHero(hero)
  }

  if (isLoading) {
    return <h2>Loading ...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h1>Muate page</h1>
      {data?.data?.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        )
      })}

      {isFetching && <span>Fetching data</span>}

      <button onClick={refetch}>Fetch Heroes</button>

      <h2>Add super hero</h2>

      {isErrorAddHero && <span>{errorAddHero.message}</span>}

      <br />
      <input
        type="text"
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        value={alterEgo}
        placeholder="Alter ego"
        onChange={(e) => setAlterEgo(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAddHeroCLick}>Add hero</button>
    </>
  )
}
