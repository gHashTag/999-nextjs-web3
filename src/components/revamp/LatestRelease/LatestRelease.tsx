import React from 'react'
import axios from 'axios'

// Assets
import LandingIcons from '@components/assets/LandingIcons'
import Image from 'next/image'
import { useData } from 'nextra/data'
import Link from 'next/link'

type PackageVersion = {
  version: string
  date: string
}

const LatestRelease = () => {
  const { releaseData } = useData()

  return (
    <div className="lg:flex hidden p-9 flex-col w-full">
      <div className="text-custom-6 text-sm font-semibold mb-4">Latest Release</div>

      {releaseData.map(({ title, url, version, date }) => (
        <ReleaseStrip key={title} title={title} date={date} version={version} url={url} />
      ))}

      <div className="card mt-10 p-4 flex flex-col items-start gap-y-4 w-full">
        <Image
          src="/docs/images/Calendar.png"
          alt="calendar"
          width={220}
          height={220}
          className="object-contain"
          priority
          quality={100}
        />

        <div className="calendarText text-sm font-medium font-inter">
          Looking for integration help, enterprise support, or more?
        </div>
        <button
          type="button"
          className="calendarBtn py-2 px-4 rounded-md flex items-center gap-2"
          onClick={() => window.open('http://cal.com/yashvendra')}
        >
          <div className="text-xs font-semibold text-rgb-7">Contact Sales</div>
          <div>{LandingIcons['chevron-right-btn']}</div>
        </button>
      </div>
    </div>
  )
}
export default React.memo(LatestRelease)

interface IReleaseStrip {
  version: string
  title: string
  date: string
  url: string
}

const ReleaseStrip: React.FC<IReleaseStrip> = ({ title, version, url, date }) => (
  <Link href={url} className="mb-3 last:mb-0 cursor-pointer  w-full">
    <div>
      <Strip isUpdated version={version} title={title} />
      <Strip date={date} />
    </div>
  </Link>
)

interface IStripProps {
  title?: string
  version?: string
  date?: string
  isUpdated?: boolean
}

const Strip: React.FC<IStripProps> = ({ isUpdated, version, title, date }) => (
  <div className="flex items-center justify-between mt-1.5 w-full ">
    {isUpdated ? (
      <div className="flex items-center gap-2.5">
        <Image
          src={`/docs/images/${title}.png`}
          alt={title ?? 'latest-release-img'}
          width={20}
          height={20}
          className="object-contain"
        />
        <div className="text-slate-300 text-sm font-normal">{title}</div>
      </div>
    ) : (
      <div className="text-[#64748B] text-xs font-normal">{date}</div>
    )}
    {version ? (
      <div className="bg-rgb-9 rounded-2xl py-1 px-2 text-xs text-[#4984FD] font-medium">v {version}</div>
    ) : (
      <div className="cursor-pointer">{LandingIcons['chevron-up']}</div>
    )}
  </div>
)

//getStaticProps method - called inside .mdx page file
export const getLatestReleaseData = ({ params }) => {
  let jsPackageVersion: PackageVersion = { date: '', version: '' }
  let reactPackageVersion: PackageVersion = { date: '', version: '' }
  let serverSdkPackageVersion: PackageVersion = { date: '', version: '' }

  const formatDate = (date?: string) => {
    return date
      ? new Date(Date.parse(date)).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : ''
  }

  const getPackageVersion: (packageName: string) => Promise<PackageVersion> = async (packageName: string) => {
    const { data } = await axios.request({
      method: 'GET',
      url: `https://registry.npmjs.org/${packageName}`
    })
    const version = data['dist-tags'].latest
    return { version, date: data.time[`${version}`] }
  }

  return getPackageVersion('@huddle01/web-core').then((data) => {
    jsPackageVersion = data
    return getPackageVersion('@huddle01/react').then((data) => {
      reactPackageVersion = data
      return getPackageVersion('@huddle01/server-sdk').then((data) => {
        serverSdkPackageVersion = data
        return {
          props: {
            // We add an `ssg` field to the page props,
            // which will be provided to the Nextra `useData` hook.
            ssg: {
              releaseData: [
                {
                  title: 'Javascript',
                  version: jsPackageVersion.version,
                  date: formatDate(jsPackageVersion.date),
                  url: '/Javascript'
                },
                {
                  title: 'React JS',
                  version: reactPackageVersion.version,
                  date: formatDate(reactPackageVersion.date),
                  url: '/React'
                },
                {
                  title: 'React Native',
                  version: reactPackageVersion.version,
                  date: formatDate(reactPackageVersion.date),
                  url: '/React-Native'
                },

                {
                  title: 'Server Sdk',
                  version: serverSdkPackageVersion.version,
                  date: formatDate(serverSdkPackageVersion.date),
                  url: '/Server-SDK'
                }
              ]
            }
          },
          // The page will be considered as stale and regenerated every 600 seconds.
          revalidate: 600
        }
      })
    })
  })
}
