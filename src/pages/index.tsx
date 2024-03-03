'use client'
import { useEffect } from 'react'
import { createRoom } from '@components/createRoom'
import { useRouter } from 'next/navigation'
import GetStartedData from '@components/Data/apiData.json'
import LandingCards from '@components/revamp/LandingCards/LandingCards'
import SubCard from '@/components/revamp/LandingCards/SubCard'
import Guides from '@/components/revamp/LandingCards/Guides'

const Home = () => {
  const router = useRouter()
  const getRoom = async () => {
    const roomId = await createRoom()
    console.log('roomId', roomId)
    router.push(`/${roomId}`)
  }
  return (
    <LandingCards title="Get started quickly" type="Guide" className="flex-col mt-10">
      <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 mt-6">
        {[
          { title: 'Video Meeting', url: '/React/react-walkthrough', img: 'Video Meeting.png' },
          { title: 'Audio Spaces', url: '/guides/audio-spaces', img: 'Audio Spaces.png' },
          { title: 'Token-gated Room', url: '/guides/token-gated', img: 'Token-gated Room.png' }
        ].map(({ title, url, img }) => (
          <SubCard key={title} title={title} url={url} img={img} />
        ))}
      </div>

      {/* <Guides /> */}
    </LandingCards>
  )
}
//<button onClick={getRoom}>Create Room</button>
export default Home
