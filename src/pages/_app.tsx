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
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { setLoggedIn } from "@/apollo/reactive-store";
import { ThemeProvider } from "@/components/theme-provider";

import {
  authenticateUser,
  initWeb3Auth,
  subscribeToEvents,
} from "@/utils/auth";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";

// const huddleClient = new HuddleClient({
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
//   options: {
//     activeSpeakers: {
//       size: 8,
//     },
//   },
// });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    initWeb3Auth(router, toast);
    const unsubscribe = subscribeToEvents(async () => {
      await authenticateUser();
      setLoggedIn(true);
    });
    return unsubscribe;
  }, []);

  return (
    <main className="dark text-foreground bg-background">
      <div>
        {/* <HuddleProvider client={huddleClient}> */}
        <HMSRoomProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {/* <BackgroundBeams /> */}
                <Component {...pageProps} />
                <ResizeHandler />
                <NProgress />
                <Toaster />
                {/* <BackgroundBeamsTwo /> */}
              </ThemeProvider>
            </NextThemesProvider>
          </NextUIProvider>
        </HMSRoomProvider>
        {/* </HuddleProvider> */}
      </div>
    </main>
  );
}
