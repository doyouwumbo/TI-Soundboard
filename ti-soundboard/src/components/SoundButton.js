import { Button, Stack} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { AudioContext } from './AudioContextProvider';

const inactiveStyle= {width: '100%', 
  height: '100%',
  backgroundColor: "white",
  boxShadow: 'inset 0px 0px 50px -12px #000000',
  border: 2,
  borderColor: 'black',
  color: 'black',
  fontSize: '14px',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: 'lightgreen',
    boxShadow: 'inset 0px 0px 50px -12px #000000',
  },}

  const activeStyle = {width: '100%', 
  height: '100%',
  backgroundColor: "lightgreen",
  boxShadow: 'inset 0px 0px 50px -12px #000000',
  border: 2,
  borderColor: 'black',
  color: 'black',
  fontSize: '14px',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: 'lightgreen',
    boxShadow: 'inset 0px 0px 50px -12px #000000',
  },}


export default function SoundButton(props) {

  const {audio, setAudioName, audioName, setIsPlaying, setArtistName} = React.useContext(AudioContext);
  const musicRef = useRef(audio);
  const [currentStyle, setCurrentStyle] = useState(inactiveStyle)

  function playSound() {
      musicRef.current.pause();
      props.type === 'music' ? musicRef.current.src = process.env.PUBLIC_URL + `/music/${props.clipName}.mp3` 
      : musicRef.current.src = process.env.PUBLIC_URL + `/sfx/${props.clipName}.mp3`;
      setAudioName(props.clipName);
      props.type === 'music' ? setArtistName(props.artistName) : setArtistName("");
      musicRef.current.play();
      setIsPlaying(true);
  }
  
  useEffect(() => {
    if (audioName === props.clipName) {
      setCurrentStyle(activeStyle);
    } else {
      setCurrentStyle(inactiveStyle);
    }
  }, [audioName, props.clipName])

  return (
    <Stack className="soundButton" sx={{
      mr: '10px', 
      mb: '10px',
      width: '20%',
      height: '121px', 
      }}>
      <Button variant='contained' onClick={playSound} sx={currentStyle} >
        <b>{props.clipName}</b>
      </Button>
    </Stack>
  )
}
