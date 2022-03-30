import axios from "axios"
import { Fragment } from "react"
import { useInfiniteQuery } from "react-query"
const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueriesPage = () => {
  const {
    data: colorsData,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 5) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
  })

  if (isLoading) {
    return <h2>Loadding...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <h1>InfiniteQueriesPage</h1>

      <h4>Colors</h4>
      {colorsData?.pages?.map((group, index) => {
        return (
          <Fragment key={index}>
            {group.data.map((color) => (
              <li key={color.id}>{color.label}</li>
            ))}
          </Fragment>
        )
      })}

      {hasNextPage && (
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Load more
        </button>
      )}

      <p>{isFetching && !isFetchingNextPage ? "Loading ..." : null}</p>
    </>
  )
}
//
