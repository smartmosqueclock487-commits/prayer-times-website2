'use client'

import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function Home() {
  const [locations, setLocations] = useState<any[]>([])

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase.from('locations').select('*')
      if (error) console.error(error)
      else setLocations(data || [])
    }
    fetchLocations()
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>My Prayer Timetables</h1>
      <p>Database connection test:</p>
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>{loc.city}, {loc.country}</li>
        ))}
      </ul>
      {locations.length === 0 && <p>No locations found. (Add one in Supabase to see it here!)</p>}
    </main>
  )
}