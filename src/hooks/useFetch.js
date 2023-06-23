import { useState, useEffect } from 'react'

/**
 * Custom hook for fetching data from a URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {{ data: any, loading: boolean, error: Error }} An object containing data, loading state, and error state.
 */
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    /**
     * Fetch data from the provided URL.
     *
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    const fetchData = async () => {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const html = await response.text()
        const flag = [...html]

        setData(flag)
      } catch (err) {
        console.error('Fetch Error', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  // Assert that loading is a boolean and error is either null or an instance of Error
  console.assert(
    typeof loading === 'boolean',
    'Loading state should be a boolean.'
  )
  console.assert(
    error === null || error instanceof Error,
    'Error state should be null or an instance of Error.'
  )

  return { data, loading, error }
}

export default useFetch
