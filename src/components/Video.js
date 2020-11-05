import React from 'react';
import VideoCall from '../helpers/VideoCall.js';
import '../styles/video.css';
import io from 'socket.io-client';
import { getDisplayStream } from '../helpers/media-access';
import { ShareScreenIcon, MicOnIcon, MicOffIcon, CamOnIcon, CamOffIcon } from './Icons';
import { connect } from "react-redux";
import UsersDataService from '../service/UsersDataService'

class Video extends React.Component {
  constructor() {


    super();
    this.state = {
      localStream: {},
      remoteStreamUrl: '',
      streamUrl: '',
      initiator: false,
      peer: {},
      full: false,
      connecting: false,
      waiting: false,
      micState: true,
      camState: true,
      isCandidate: true
    };
  }


  videoCall = new VideoCall();

  componentDidMount() {
    const socket = io(process.env.REACT_APP_SIGNALING_SERVER);
    const component = this;
    this.setState({ socket });
   
    console.log("User Data this.props ::", this.props)
    console.log("User Data this.props.location ::", this.props.location)
    console.log("User Data this.props.match ::", this.props.match.params.roomId);
    let userName = null;
    if (this.props.userName != null)
    {
       userName = this.props.match.params.roomId;

    }    else {
      userName = this.props.userName;
    }

    console.log("after setting name",userName);
    UsersDataService.retrieveUserByUserId(userName)
      .then(
        response => {
          console.log("User Data ::", response.data)
          if (response.data && response.data.roleId === "CANDIDATE") {
            console.log("User Data ::", response.data.roleId);
            this.setState({ isCandidate: true })
          }
        }
      )


    const { roomId } = userName;
    console.log("roomId --->", roomId)
    console.log("roomId userName--->", userName)

    this.getUserMedia().then(() => {
      socket.emit('join', { roomId: userName });
    });

    socket.on('init', () => {
      component.setState({ initiator: true });
      console.log("from init method")
    });
    socket.on('ready', () => {
      console.log("from ready method")
      component.enter(userName);
    });
    socket.on('desc', data => {
      console.log("from desc method")

      if (data.type === 'offer' && component.state.initiator) return;
      if (data.type === 'answer' && !component.state.initiator) return;
      component.call(data);
    });
    socket.on('disconnected', () => {
      console.log("from disconnected method")

      component.setState({ initiator: true });
    });
    socket.on('full', () => {
      console.log("from full method")

      component.setState({ full: true });
    });
  }


  getUserMedia(cb) {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.msGetUserMedia ||
        navigator.mozGetUserMedia;
        
      const op = {
        video: {
          width: { min: 160, ideal: 640, max: 1280 },
          height: { min: 120, ideal: 360, max: 720 }
        },
        audio: true
      };
      navigator.mediaDevices.getUserMedia(
        op,
        stream => {
          this.setState({ streamUrl: stream, localStream: stream });
          console.log("stream----", stream);
          this.localVideo.srcObject = stream;
          resolve();
        },
        () => { }
      );
      
    });
  }

  setAudioLocal() {
    if (this.state.localStream.getAudioTracks().length > 0) {
      this.state.localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    this.setState({
      micState: !this.state.micState
    })
  }

  setVideoLocal() {
    if (this.state.localStream.getVideoTracks().length > 0) {
      this.state.localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    this.setState({
      camState: !this.state.camState
    })
  }

  getDisplay() {
    getDisplayStream().then(stream => {
      stream.oninactive = () => {
        this.state.peer.removeStream(this.state.localStream);
        this.getUserMedia().then(() => {
          this.state.peer.addStream(this.state.localStream);
        });
      };
      this.setState({ streamUrl: stream, localStream: stream });
      this.localVideo.srcObject = stream;
      this.state.peer.addStream(stream);
    });
  }

  enter = roomId => {
    this.setState({ connecting: true });
    const peer = this.videoCall.init(
      this.state.localStream,
      this.state.initiator
    );
    this.setState({ peer });

    peer.on('signal', data => {
      const signal = {
        room: roomId,
        desc: data
      };
      this.state.socket.emit('signal', signal);
    });
    peer.on('stream', stream => {
      this.remoteVideo.srcObject = stream;
      this.setState({ connecting: false, waiting: false });
    });
    peer.on('error', function (err) {
      console.log(err);
    });
  };

  call = otherId => {
    this.videoCall.connect(otherId);
  };
  renderFull = () => {
    if (this.state.full) {
      return 'The room is full';
    }
  };




  render() {

    let localVideoComponent = (
      <div className='local-video-wrapper'>
        <video
          autoPlay
          id='localVideo'
          muted
          ref={video => (this.localVideo = video)}
        />
      </div>
    );
    let remoteVideoComponent = (
      <video
        autoPlay
        className={`${
          this.state.connecting || this.state.waiting ? 'hide' : ''
          }`}
        id='remoteVideo' ref={video => (this.remoteVideo = video)}
      />
    );


    return (
      <div className='video-wrapper'>

        {this.state.isCandidate ? localVideoComponent : null}
        {this.state.isCandidate ? remoteVideoComponent : null}

        <div className='controls'>
          <button className='control-btn' onClick={() => { this.getDisplay(); }} >
            <ShareScreenIcon />
          </button>

          <button className='control-btn' onClick={() => { this.setAudioLocal(); }} >
            {this.state.micState ? (<MicOnIcon />) : (<MicOffIcon />)}
          </button>

          <button className='control-btn' onClick={() => { this.setVideoLocal(); }} >
            {this.state.camState ? (<CamOnIcon />) : (<CamOffIcon />)}
          </button>
        </div>
        {this.state.connecting && (
          <div className='status'>
            <p>Establishing connection...</p>
          </div>
        )}
        {this.state.waiting && (
          <div className='status'>
            <p>Waiting for someone...</p>
          </div>
        )}
        {this.renderFull()}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    scheduledRequestData: state.scheduledRequestData,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(Video)