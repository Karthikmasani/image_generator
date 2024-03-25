
import React from "react"
function Meme() {

    const [meme, setMeme] = React.useState({
        topText:"",
        bottomText: "",
        randomImage:"http://i.imgflip.com/1bij.jpg" 

    })
    const[allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        async function get_memes(){
            const res = await  fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        get_memes()
    }, [])

    console.log(allMemes) 
    
    
    function  memeimage(){
        const randomnumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomnumber].url
        setMeme(prevmeme => ({
            ...prevmeme, 
            randomImage:url
        }))
        
    }
    function handleChange(event) {
        const {name, value} = event.target
            setMeme(prevmeme => ({
                ...prevmeme,
                [name]: value
            }))
        }
    



    return(
        <main>
            <div className="form">
                
                   
                <input
                    type="text" 
                        
                    placeholder="hey you!"
                    className="form--input"
                    name = "topText"
                    value = {meme.topText}
                    onChange={handleChange}

                 />
        
                <input 
                        
                    className="form--input"
                    placeholder="Bottom Text" 
                    type="text" 
                    name = "bottomText"
                    value = {meme.bottomText}
                    onChange={handleChange}
                />

                <button
                 onClick={memeimage}
                 className="form--button">
                    Get a new meme image 🖼
                </button>
                <div className="meme">
                    <img src={meme.randomImage} className="meme--image" alt="" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
                
            </div>
        </main>
        
    )
}

export default Meme