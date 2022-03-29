import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"
const fetchColors = (pageNumber) => {
  console.log(pageNumber)
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const {
    data: colorsData,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["colors", pageNumber],
    () => {
      return fetchColors(pageNumber)
    },
    {
      keepPreviousData: true,
    }
  )

  if (isLoading) {
    return <h2>Loadding...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <h1>PaginatedQueries.page</h1>

      <h4>Colors</h4>
      {colorsData?.data?.map((color) => {
        return <li key={color.id}>{color.label}</li>
      })}

      <button
        onClick={() => setPageNumber((page) => page - 1)}
        disabled={pageNumber === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setPageNumber((page) => page + 1)}
        disabled={pageNumber === 5}
      >
        Next
      </button>
    </>
  )
}
