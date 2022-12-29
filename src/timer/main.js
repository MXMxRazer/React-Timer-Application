import { useEffect, useState } from "react"
import ringer from './beep.mp3';
import '../index.css'

export default function Imp() {
    const audio = new Audio(ringer); 

    const [values, funcs] = useState(
        {
            hours: '00',
            mins: '00', 
            secs: '00', 
        }
    )

    const [val, fun] = useState({
        h: 0,  
        m: 0,
        s: 0,
    })

    const [tune, tFunc] = useState(false);
    const [rSet, rFunc] = useState(false);
    const [click, cFunc] = useState(true);
    
    const clicking = () => {
        cFunc (
            prev => !prev
        )
    }

    const typing = (event) => {
        val.h = event.target.value
    }
    
    const typing2 = (event) => {
        val.m = event.target.value
    }
    const typing3 = (event) => {
        val.s = event.target.value
    } 


        const turning = () => {
            window.localStorage.setItem("Time", JSON.stringify(values));
            console.log("here is the Function");  
                tFunc (
                    prev => !prev
                ); 
        };

        const reset = () => {
            rFunc (
                prev => !prev
            );
            funcs (
                prev => {
                    return {
                        secs: '00', 
                    }
                }
            )
            console.log(values); 
        }

        const [tttime, Tfunc] = useState(false); 
        var counter = 0, temp = val.s; 
        var a = (values.secs == '00') ? 0 : values.secs; 
        var b = (values.mins == '00') ? 0 : values.mins; 
        var c = (values.hours == '00') ? 0 : values.hours;  
        var seconds  = 0;  
        useEffect( ()=> {
            const interval = setInterval(() => { 
                if (click) {
                    clearInterval(interval)
                }else {
                    if (val.h == c && val.m == b && val.s == a) {
                        audio.play(); 
                        console.log("Time's UP!");
                        a = 0;
                        counter++;  
                        if (counter % 2 === 0) {
                            console.log("break")
                            val.s = 5; 
                        } else {
                            val.s = temp;  
                        }
                        if (counter === 4) {
                            clearInterval(interval);
                            console.log("Cleared!");
                            Tfunc (
                                prev => true
                            )
                        }
                    }    
                if (tune) {
                    clearInterval(interval);
                }else {
                    a++;   
                }
                if (a > 60) { 
                    audio.play();
                    b++; 
                    values.mins = b;
                    a = 0;  
                    if (b > 60) {
                        c++; 
                        values.hours = c;
                    }
                }}
                funcs (
                    prev => {
                        return {
                            ...prev, 
                            hours: (c < 10) ? '0'+c : c,  
                            mins:  (b < 10) ? '0'+b : b,
                            secs:  (a < 10) ? '0'+a : a,
                        }
                    }
                )
                ;
            }, 1000); 
            return () => clearInterval(interval); 
        }, [tune, click]); 
    

    return (
        <div className="main">
        <form className="form">
            <h3 id="h">Hours: </h3>
            <input
            id="inputs"        
            name="hour"
            onChange={typing}
            ></input> 
            <h3 id="m">mins: </h3>
            <input
            id="inputs"
            onChange={typing2}
            name="minute"
            ></input> 
            <h3 id="s">sec: </h3>
            <input
            id="inputs"
            onChange={typing3}
            name="second"
            ></input>          
        </form>
            <button onClick={() => {
                clicking(); 
            }}
            className="click"
            >
                Click me!
            </button>
            <div className="clock">
            <h1 id="clock-values">{values.hours} : {values.mins} {values.secs} </h1>
            </div>
            {tttime && <div className="time-up">TIME'S UP !</div>}
            <div className="last-buttons">
            {tune ? <button onClick={turning} className="btm-button" id="b1">Start</button> : <button onClick={turning} className="btm-button" id="b1">Pause</button>}
            <button onClick={reset} className="btm-button" id="b2">Reset</button>
            </div>
        </div>
    )
}
