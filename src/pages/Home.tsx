'use client'
import { useEffect } from 'react'
import { createRoom } from '@components/createRoom'
import { useRouter } from 'next/navigation'
import { Theme, ThemePanel } from '@radix-ui/themes'
import RoomMenu from '@pages/RoomMenu'
import NavigationMenu from '@pages/NavigationMenu'

const Home = () => {
  const router = useRouter()
  const getRoom = async () => {
    const roomId = await createRoom()
    console.log('roomId', roomId)
    router.push(`/${roomId}`)
  }
  return (
    <div>
      <Theme appearance="dark" accentColor="lime" grayColor="sand" radius="large" scaling="95%">
        <div style={{ margin: '30px' }} />
        <NavigationMenu />
        <RoomMenu />
        {/* <ThemePanel /> */}
      </Theme>
    </div>
  )
}

export default Home
