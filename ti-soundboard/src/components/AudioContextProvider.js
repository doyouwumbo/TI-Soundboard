import React, { createContext, useState } from 'react'

export const AudioContext = createContext(null);

export default function AudioContextProvider(props) {

    const audio = new Audio();
    const [audioName, setAudioName] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    

    const value = {audio, audioName, setAudioName, isPlaying, setIsPlaying};

  return (
    <AudioContext.Provider value={value}>{props.children}</AudioContext.Provider>
  )
}
