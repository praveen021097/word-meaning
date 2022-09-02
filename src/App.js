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
  const [hindi,setHindi] = useState("")



  async function Translate() {
try{
     const input_language='en'
       const output_language = 'hi'
       const res = await fetch("https://libretranslate.de/translate",{
        method:'POST',
          body: JSON.stringify({
            q:word,
           source:input_language,
           target:output_language,
            format: "text",
           }),
           headers: {
             "Content-Type":'application/json'
            }
        });
      const { translatedText} = await res.json();
      setHindi(translatedText)
    // console.log(translatedText)
   }
  catch (err){console.log("err:",err)}
}








  const searchWord=(e)=>{
    e.preventDefault()
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((r)=>{
      setWData(r.data[0])
      Translate()
    }).catch((e)=>{
      console.log(e)
    })

    
  }

  
// https://goweather.herokuapp.com/weather/${word}
// console.log(word)
// console.log(wData)
const playAudio =()=>{
let audio =new Audio(wData.phonetics[0].audio);
audio.play();
}
  return (
    <div className="App">
      
  
      <div className='main'>
         <div><h1>Search Word</h1></div>
         <div className='main1'>
           <form onSubmit={searchWord}>
           <div style={{display:'flex'}}>
           <input type={"text"} ref={textRef} onChange={(e)=> setWord(e.target.value)}/>
              <div  onClick={searchWord}><img className='search' src="data:image/png;base64,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"/>
             </div>
           </div>
           </form>
         </div>
       </div>
     {wData && (<div>
      
        <div className='div1' style={{width:"70%",margin:"auto",textAlign:"left",display:"flex"}}><h2> Word : {"  "}{wData.word}{" "} ({hindi})</h2><div onClick={playAudio}><img className='voice' src="https://cdn.pixabay.com/photo/2017/01/10/03/54/icon-1968243_1280.png"/></div></div>
         <div className='div2' style={{width:"70%",margin:"auto",textAlign:"left",display:"flex"}}><h3>Definition {" "} </h3><h4 style={{fontWeight:"bold"}}>{wData.meanings[0].definitions[0].definition}</h4></div>
       <div className='div3' style={{width:"70%",margin:"auto",textAlign:"left",display:"flex"}}><h3>Antonyms {" "} </h3><h4>{wData.meanings[0].antonyms[0]}</h4></div>
       <div className='div4' style={{width:"70%",margin:"auto",textAlign:"left",display:"flex"}} ><h3>Synonyms {" "}</h3><h4> {wData.meanings[0].synonyms[0]},{wData.meanings[0].synonyms[1]},{wData.meanings[0].synonyms[2]} </h4></div>
       <div className='div5' style={{width:"70%",margin:"auto",textAlign:"left",display:"flex"}}><h3>Part Of Speech{" "} </h3><h4>{wData.meanings[0].partOfSpeech}</h4></div>
    
    
      
      
      
      
     </div>)}
    </div>
  );
}

export default App;
