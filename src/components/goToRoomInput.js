import React from 'react'

const goToRoom = (history, roomId) => {
  history.push(`/${roomId}`)
}


export function goToRoomInput({history}) {
  let roomId= "afser";

  return (<div className="enter-room-container">
    <form>
          <input type="text" value={roomId} placeholder="Room id" />
          <button onClick={() => { goToRoom(history, roomId)
          }}>Enter</button>
          </form>
        </div>)
}