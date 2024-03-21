/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use client";
import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";
import { SkipNavContent } from "@reach/skip-nav";
import { NAVIGATION } from "@lib/constants";
import styles from "./layout.module.css";
import Logo from "./icons/icon-logo";
import MobileMenu from "./mobile-menu";
import Footer from "./footer";
import React from "react";
import DemoButton from "./hms/demo-cta";
import RoomCta from "./hms/demo-cta/room-cta";
import { hmsConfig } from "./hms/config";
import ViewSource from "./view-source";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { useSupabase } from "@/hooks/useSupabase";
import { useReactiveVar } from "@apollo/client";
import {
  setUserId,
  visibleHeaderVar,
  visibleSignInVar,
} from "@/apollo/reactive-store";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
  isLive?: boolean;
};

export default function Layout({
  children,
  className,
  hideNav,
  layoutStyles,
  isLive = false,
}: Props) {
  const router = useRouter();
  // const workspaceSlug = useReactiveVar(setUserId);
  // console.log(workspaceSlug, "workspaceSlug");
  const visibleHeader = useReactiveVar(visibleHeaderVar);
  const { toast } = useToast();
  const activeRoute = router.asPath;
  const disableCta = ["/schedule", "/speakers", "/expo", "/jobs"];
  return (
    <>
      <div className={styles.background}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles["header-logos"]}>
              <MobileMenu key={router.asPath} />
              <Link href="/" className={styles.logo}>
                <Logo />
              </Link>
            </div>
            <div className={styles.menu}>
              <NavigationMenu>
                <NavigationMenuList>
                  {NAVIGATION.map(({ name, route }) => (
                    <NavigationMenuItem key={name}>
                      {visibleHeader && (
                        <Link
                          href={{
                            pathname: `/workspaceSlug${route}`,
                          }}
                          legacyBehavior
                          passHref
                        >
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            {name.toUpperCase()}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {(hmsConfig.hmsIntegration &&
              isLive &&
              !disableCta.includes(activeRoute)) ||
            activeRoute === "/" ? (
              <div className={cn(styles["header-right"])}>
                {activeRoute === "/" ? <DemoButton /> : <RoomCta />}
              </div>
            ) : (
              <div />
            )}
          </header>
        )}
        <ViewSource />
        <div className={styles.page}>
          <main className={styles.main} style={layoutStyles}>
            <SkipNavContent />
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          {!activeRoute.startsWith("/stage") && <Footer />}
        </div>
      </div>
    </>
  );
}
