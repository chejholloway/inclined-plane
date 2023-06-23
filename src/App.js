import React, { useState, useEffect } from 'react'
import useFetch from './hooks/useFetch'
import './App.css'

function App() {
  const FLAG_URL =
    'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/776173'
  const { data: flag, loading, error } = useFetch(FLAG_URL)
  const [animatedFlag, setAnimatedFlag] = useState('')

  useEffect(() => {
    if (flag && flag.length > 0) {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < flag.length) {
          setAnimatedFlag((prevFlag) => prevFlag + flag[currentIndex - 1])
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 500)

      return () => {
        clearInterval(interval)
      }
    }
  }, [flag])

  if (loading) return 'Loading...'
  if (error) return 'Error!'
  return (
    <ul>
      {animatedFlag &&
        animatedFlag.split('').map((letter, i) => {
          return <li key={i}>{letter}</li>
        })}
    </ul>
  )
}

export default App
