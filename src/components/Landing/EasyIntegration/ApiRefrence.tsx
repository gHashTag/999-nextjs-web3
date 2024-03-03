import React from 'react'

import { PaperClipIcon } from '@components/assets/PaperClip'
import GradientCard from '@components/common/GradientCard/GradientCard'

const ApiRefrence = () => {
  const data = [
    {
      href: '/apis/create-room',
      name: 'Create Room APIs',
      description: 'Create Huddle01 meetings programmatically.',
      icon: PaperClipIcon,
      pattern: {
        y: 32,
        squares: [
          [0, 2],
          [1, 4]
        ]
      }
    },
    {
      href: '/apis/join-room-token',
      name: 'Join Room Token API',
      description: 'Generate access tokens to enter Huddle01 meetings.',
      icon: PaperClipIcon,
      pattern: {
        y: 32,
        squares: [
          [0, 2],
          [1, 4]
        ]
      }
    },
    {
      href: '/apis/meeting-details',
      name: 'Meeting Details API',
      description: 'Fetch the summary of a meeting hosted on Huddle01.',
      icon: PaperClipIcon,
      pattern: {
        y: 32,
        squares: [
          [0, 2],
          [1, 4]
        ]
      }
    }
  ]

  return (
    <>
      <div>
        Integrate Huddle01 into your website or application with ease using our APIs. Create meeting rooms, fetch
        meeting details, and token-gate meeting rooms, using the different API endpoints provided by us at Huddle01.
      </div>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((resource) => (
          <GradientCard key={resource.href} resource={resource} />
        ))}
      </div>
    </>
  )
}

export default ApiRefrence
