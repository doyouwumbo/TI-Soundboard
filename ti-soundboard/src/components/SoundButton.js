import { Button } from '@mui/material';
import React, { useRef } from 'react'
import { AudioContext } from './AudioContextProvider';


export default function SoundButton(props) {

  const {audio, audioName, setAudioName, isPlaying, setIsPlaying} = React.useContext(AudioContext);
  const musicRef = useRef(audio);

  function playSound() {
    if (audioName !== props.clipName) {
      musicRef.current.pause();
      musicRef.current.src = process.env.PUBLIC_URL + `/music/${props.clipName}`;
      musicRef.current.volume = 0.25
      setAudioName(props.clipName);
      musicRef.current.play();
      setIsPlaying(true);
    }else {
      isPlaying ? setIsPlaying(false) : setIsPlaying(true);
      if (isPlaying) {
        musicRef.current.pause();
      } else {
        musicRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  return (
    <div className="soundButton">
      <Button variant='contained' onClick={playSound} sx={{mt: '20px', ml: '20px'}}>{props.clipName}</Button>
    </div>
  )
}
