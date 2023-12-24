import { useState } from "react"

function Search () {

    const [input, setInput] = useState("");

    function search () {
        
    }

    return (
        <div>
            <input placeholder="search" value={input} onChange={(e)=> setInput(e.target.value)}/>
            <button onClick={search}></button>
        </div>
    )
} 