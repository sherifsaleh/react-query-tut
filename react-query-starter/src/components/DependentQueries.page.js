import axios from "axios"
import React from "react"
import { useQuery } from "react-query"

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], () => {
    return fetchUserByEmail(email)
  })

  const channelId = user?.data?.channelId

  const { data: coursesData } = useQuery(
    ["courses", channelId],
    () => {
      return fetchCoursesByChannelId(channelId)
    },
    {
      enabled: !!channelId,
    }
  )

  console.log(typeof coursesData)
  console.log(coursesData)

  return (
    <>
      <h1>Dependent Queries</h1>
      <h2 key={user?.data?.id}>{user?.data?.id}</h2>
      <h3>{channelId}</h3>

      {coursesData?.data?.courses.map((course) => {
        return <li key={course}>{course}</li>
      })}
    </>
  )
}
