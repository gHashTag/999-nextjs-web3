import "@/styles/globals.css";
// import "@/styles/styles.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import NProgress from "@components/nprogress";
import ResizeHandler from "@components/resize-handler";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import BackgroundBeams from "@components/ui/background-beams";
import BackgroundBeamsTwo from "@components/ui/background-beams-two";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/utils/cn";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import {
  authenticateUser,
  initWeb3Auth,
  subscribeToEvents,
} from "@/utils/auth";

const huddleClient = new HuddleClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { setLoggedIn } = useWeb3Auth();

  useEffect(() => {
    initWeb3Auth();
    const unsubscribe = subscribeToEvents(async () => {
      await authenticateUser();
      setLoggedIn(true);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <HuddleProvider client={huddleClient}>
        <HMSRoomProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              <main className="dark text-foreground bg-background">
                <BackgroundBeams />
                <Component {...pageProps} />
                <ResizeHandler />
                <NProgress />
                {/* <BackgroundBeamsTwo /> */}
              </main>
            </NextThemesProvider>
          </NextUIProvider>
        </HMSRoomProvider>
      </HuddleProvider>
    </div>
  );
}
