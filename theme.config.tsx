import React from "react";

import SidebarIcons from "@components/assets/SidebarIcons";
import VersionPill from "@components/revamp/VersionPill/VersionPill";
import { useRouter } from "next/router";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";

import Huddle01 from "@components/assets/Huddle01";
import { Footer } from "@components/common/Footer/Footer";

const config: DocsThemeConfig = {
  darkMode: false,
  feedback: {
    content: "",
  },
  // primaryHue: 361,
  logo: function LogoActual() {
    return (
      <div id="huddle01-logo">
        <Huddle01 height={26} />
        <span className="sr-only">Huddle01</span>
      </div>
    );
  },
  head: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { frontMatter, title } = useConfig();
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/docs/images/favicon/favicon.svg" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@huddle01com" />
        <meta name="twitter:creator" content="@huddle01com" />
        <meta property="og:type" content="website" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={frontMatter.description} />
        <meta
          property="og:url"
          content={`https://docs.huddle01.com${router.asPath}`}
        />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:site_name" content="Huddle01Docs" />
      </>
    );
  },

  sidebar: {
    defaultMenuCollapseLevel: 1,
    titleComponent({ title, type: _type }) {
      const isSdkTitles = [
        "Javascript",
        "ReactJS",
        "React Native",
        "Flutter",
        "Server-SDK",
      ].includes(title);

      const version: {
        [key: string]: string;
      } = {
        Javascript: "",
        ReactJS: "",
        "React Native": "",
        Flutter: "beta",
        "Server-SDK": "",
      };

      if (isSdkTitles) {
        return (
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-2.5">
              <span className="rounded-sm overflow-hidden">
                {SidebarIcons[title]}
              </span>
              {title}
            </div>
            {version[title] && <VersionPill version={version[title] ?? ""} />}
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2.5">
          <span>{SidebarIcons[title]}</span>
          {title}
        </div>
      );
    },
  },

  useNextSeoProps() {
    return {
      titleTemplate: `%s – Huddle01's Documentation`,
    };
  },

  editLink: {
    text: "",
  },
  footer: { component: <Footer /> },
  nextThemes: {
    defaultTheme: "dark",
  },
  gitTimestamp: null,
  chat: {
    link: "https://discord.gg/huddle01-890224574761926756",
  },
};

export default config;
