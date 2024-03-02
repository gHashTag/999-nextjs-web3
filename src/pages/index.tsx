'use client'

import { createRoom } from '../component/createRoom'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    const getRoom = async () => {
      const roomId = await createRoom()
      console.log('roomId', roomId)
      router.push(`/${roomId}`)
    }
    getRoom()
  }, [])
}

export default Home
