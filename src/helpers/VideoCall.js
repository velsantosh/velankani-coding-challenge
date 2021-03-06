import Peer from 'simple-peer'

export default class VideoCall {
    peer = null 
    init = (stream, initiator) => {
        this.peer = new Peer({
            initiator: initiator,
            stream: stream,
            trickle: false,
            reconnectTimer: 10000,
            iceTransportPolicy: 'relay',
            config: {
                iceServers: [
                    {
                     //   urls: "stun:stun.stunprotocol.org"
		            	urls: "stun:stun4.l.google.com:19302"
                    },
                    {
                        urls: 'turn:numb.viagenie.ca',
                        credential: 'muazkh',
                        username: 'webrtc@live.com'
                       // credential: 'Mymuna@1983',
                        //username: 'afsar.tanveer@gmail.com'
                    },
                ]
            }
           
        })
        return this.peer
    }
    connect = (otherId) => {
        this.peer.signal(otherId)
    }  
} 