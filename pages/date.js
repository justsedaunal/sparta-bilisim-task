import  React, { useState , useEffect } from 'react'

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div>
            <p class="card__info__time" >  {date.toLocaleTimeString()}</p>
            <p class="card__info__date" > {date.toLocaleDateString()}</p>

        </div>
    )
}

export default DateTime 