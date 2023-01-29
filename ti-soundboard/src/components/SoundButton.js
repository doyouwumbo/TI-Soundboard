import { Button } from '@mui/material';
import React, { useRef } from 'react'
import { AudioContext } from './AudioContextProvider';


export default function SoundButton(props) {

  const {audio, setAudioName, setIsPlaying} = React.useContext(AudioContext);
  const musicRef = useRef(audio);

  function playSound() {
      musicRef.current.pause();
      
      props.type === 'music' ? musicRef.current.src = process.env.PUBLIC_URL + `/music/${props.clipName}` 
      : musicRef.current.src = process.env.PUBLIC_URL + `/sfx/${props.clipName}`;
      musicRef.current.volume = 0.5;
      setAudioName(props.clipName);
      musicRef.current.play();
      setIsPlaying(true);
  }

  return (
    <div className="soundButton">
      <Button variant='contained' onClick={playSound} sx={{mt: '20px', ml: '20px'}}>{props.clipName}</Button>
    </div>
  )
}
