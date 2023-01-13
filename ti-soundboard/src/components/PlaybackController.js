/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material'
import { AudioContext } from './AudioContextProvider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Box } from '@mui/system'
import { keyframes, css } from "@emotion/react";
import '../App.css'
import React, {useRef} from 'react'

export default function PlaybackController() {

  const {audio, audioName, isPlaying, setIsPlaying} = React.useContext(AudioContext);
  const musicRef = useRef(audio);

  function playSound() {
    musicRef.current.play();
    setIsPlaying(true);
  }

  function pauseSound() {
    musicRef.current.pause();
    setIsPlaying(false);
  }

  const slide = keyframes`
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(-100%);
    }
  `

  const animatedText = css`
    animation: ${slide} 6000ms linear;
    transform: translateX(-100%);
    animation-iteration-count: infinite;
  `

  return (


    <div className="playbackController">
      <Box sx={{
        display: 'flex',
        flexWrap: 'nowrap', 
        alignItems: 'center',
        backgroundColor: "#2c333d", 
        margin: '50px',
        height: '100px',
        width: '300px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
          }}>
        <Box>
          {
            audioName === "" && 
            <PlayArrowIcon disabled={true} sx={{fontSize: '60px', mr: '20px'}} onClick={playSound}></PlayArrowIcon>
          }

          {
            !isPlaying && audioName !== "" && 
            <PlayArrowIcon sx={{fontSize: '60px', mr: '20px'}} onClick={playSound}></PlayArrowIcon>
          }

          {
            isPlaying && audioName !== "" && <PauseIcon sx={{fontSize: '60px', mr: '20px'}} onClick={pauseSound}></PauseIcon>
          }
        </Box>
        <Typography sx={{color: 'white', mr: '5px'}}>
          Current audio: {audioName === "" && <b>Nothing yet!</b>}
        </Typography>
        <Box sx={{overflow: 'hidden', display: 'flex'}}>
          <Typography sx={{color: 'white'}} css={animatedText}>
            <b>{audioName.substring(0, audioName.length - 4)}</b>
          </Typography>
        </Box>
      </Box>
    </div>
  )
}
