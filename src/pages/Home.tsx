'use client'

import { Theme, ThemePanel } from '@radix-ui/themes'
import RoomMenu from '@pages/RoomMenu'
import NavigationMenu from '@pages/NavigationMenu'

const Home = () => {
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
