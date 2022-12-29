import useSound from 'use-sound'; 
import { useState } from 'react';
import ringer from '../n.mp3';

export default function Demo() {
    const audio = new Audio(ringer); 
    audio.loop = true;
    return (
        <button onClick={() => {audio.loop=true; audio.play();}}>This</button>
    );
  }