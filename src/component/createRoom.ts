// 'use server'
console.log('process.env.API_KEY', process.env.API_KEY)

export const createRoom = async () => {
  const response = await fetch('https://api.huddle01.com/api/v1/create-room', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Huddle01 Room'
    }),
    headers: {
      'Content-type': 'application/json',
      'x-api-key': 'c1-T9CzxZCkKbNp5_9OMMYWYI77KZoP8'
    },
    cache: 'no-cache'
  })
  console.log('response', response)
  const data = await response.json()
  console.log('data', data)
  const { roomId } = await data.data
  console.log('roomId', roomId)
  return roomId
}
