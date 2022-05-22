import  { useState,useEffect } from 'react'


export default function Memeinput(){
    const [meme,setmeme]=useState({
         topText:"",
         bottomText:"",
         randomImage:  "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function onSubmit()
    {
       const randomNo=Math.floor(Math.random()*allMemes.length)
        const url=allMemes[randomNo].url
        setmeme(prevMeme=>({
            ...prevMeme,
            randomImage:url
        }))
    }
    function handleChange(event)
    {
        const {name, value} = event.target
        setmeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    
    }
    return(
     <main>  
        <div className="meme">
          <input type="text" placeholder="enter top text" className="memeInput" name="topText" value={meme.topText} onChange={handleChange}/>
          <input type="text" placeholder="enter bottom text" className="memeInput" name="bottomText" value={meme.bottomText} onChange={handleChange} />
          <button className="memeSubmit" onClick={onSubmit}>Get a new meme image</button>
        </div>
        <div className="memeDisplay">
            <img src={meme.randomImage} className="memeImg"/>
            <h2 className="text memeTop">{meme.topText}</h2>
            <h2 className= "text memeBottom">{meme.bottomText}</h2>
        </div>
    </main>
    );


}