import React from 'react'

import { SquaresPlusIcon } from '@components/assets/SquarePlusIcon'
import GradientCard from '@components/common/GradientCard/GradientCard'

const Iframe = () => {
  const data = [
    {
      name: 'Vanilla iFrame',
      href: '/tool/iframe/vanilla',
      description: 'Embed the Huddle01 web app to your Vanilla Javascript Project.',
      icon: SquaresPlusIcon,
      pattern: {
        y: 22,
        squares: [[0, 1]]
      }
    },

    {
      href: '/tool/iframe/react',
      name: 'React iFrame',
      description: 'Embed the Huddle01 web app to your React Application.',
      icon: SquaresPlusIcon,
      pattern: {
        y: 16,
        squares: [
          [0, 1],
          [1, 3]
        ]
      }
    }
  ]

  return (
    <>
      <div>
        Integrate Huddle01 into your website or application with ease using our iFrame feature. With just a few lines of
        code, you can embed Huddle01&apos;s web app directly into your app.
      </div>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        {data.map((resource) => (
          <GradientCard key={resource.href} resource={resource} />
        ))}
      </div>
    </>
  )
}

export default Iframe
