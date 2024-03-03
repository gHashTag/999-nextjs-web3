import ExternalLinks from "../helpers/externalLinks";
import FooterIcons from "./assets/FooterIcons";

export type TSocialDataType = {
  id: number;
  icon: JSX.Element;
  link: string;
};

export type TNavData = {
  id: number;
  name: string;
  href: string;
}[];

export type TNavigationType = {
  [key: string]: TNavData;
};

const { twitter, insta, linkedin, youTube } = FooterIcons;

export const NavigationData: TNavigationType = {
  support: [
    {
      id: 5,
      name: 'GitHub',
      href: 'https://github.com/Huddle01',
    },
    {
      id: 6,
      name: "Twitter",
      href: "https://twitter.com/huddle01com",
    },
  ],
  company: [
    { id: 7, name: "About Us", href: "https://huddle01.com/about-us" },
    {
      id: 8,
      name: "Terms & Conditions",
      href: "https://huddle01.com/terms",
    },
    {
      id: 9,
      name: "Privacy Policy",
      href: "https://huddle01.com/privacy",
    },
  ],
};

export const SocialData: TSocialDataType[] = [
  { id: 1, icon: twitter, link: ExternalLinks.twitterLink },
  { id: 2, icon: insta, link: ExternalLinks.instaLink },
  { id: 3, icon: linkedin, link: ExternalLinks.linkedinLink },
  { id: 4, icon: youTube, link: ExternalLinks.ytLink },
];
