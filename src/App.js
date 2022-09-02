import React, { useEffect } from 'react';
import './App.css';
import {useState} from "react";
import { useRef } from 'react';
import axios from 'axios';
import {FcSpeaker} from "react-icons/fc"
function App() {
  const [word,setWord] =useState("");
  const [wData,setWData]=useState("");
  const textRef=useRef();

  const searchWord=()=>{
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((r)=>{
      setWData(r.data[0])
    }).catch((e)=>{
      console.log(e)
    })
  }

  
// https://goweather.herokuapp.com/weather/${word}
console.log(word)
console.log(wData)
const playAudio =()=>{
let audio =new Audio(wData.phonetics[0].audio);
audio.play();
}
  return (
    <div className="App">
      <h1>Search Word</h1>
  
      <input type={"text"} ref={textRef} onChange={(e)=> setWord(e.target.value)}/>
      <button onClick={searchWord}>search</button>
     {wData && (<div>
      <h2>{wData.word}{" "}{}<button onClick={playAudio}><FcSpeaker size={"26px"}/></button></h2>
      <h4>Definition :</h4>
      <p>{wData.meanings[0].definitions[0].definition}</p>
      <h4>Example :</h4>
      <p>{wData.meanings[0].definitions[0].example}</p>
     </div>)}
    </div>
  );
}

export default App;
