import '@/styles/globals.css'
import '@/styles/styles.css'
import type { AppProps } from 'next/app'
import { HMSRoomProvider } from '@100mslive/react-sdk'
import { HuddleClient, HuddleProvider } from '@huddle01/react'
import NProgress from '@components/nprogress';
import ResizeHandler from '@components/resize-handler';

const huddleClient = new HuddleClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  options: {
    activeSpeakers: {
      size: 8
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HuddleProvider client={huddleClient}>
      <HMSRoomProvider>
        <Component {...pageProps} />
        <ResizeHandler />
        <NProgress />
      </HMSRoomProvider>
    </HuddleProvider>
  )
}
