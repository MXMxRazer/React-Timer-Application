import { useState, useEffect } from "react"
import ringer from './beep.mp3';
import '../index.css'

export default function Imp() {

    const [start, setStart] = useState(false); 
    const [showTimer, setShowTimer] = useState(false); 

    const [timerState, setTimerSet] = useState({
        year: "", 
        month: "",
        day: "", 
        hour: "", 
        min: "", 
        sec: ""
    }); 

    // const deadline = 'March, 15, 2023 01:23:00'; 
    const deadline = `${timerState.month}, ${timerState.day}, ${timerState.year} ${timerState.hour}:${timerState.min}:${timerState.sec}`;

    const getReset = () => {

        setStart(prev => !prev);

        setTimerSet(prev => ({
            year: "0000", 
            month: "00", 
            day: "00", 
            hour: "00", 
            min: "00", 
            sec: "00"
        }))
    }

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now(); 

        setTimerSet(prev => ({
            day: Math.floor(time / (1000 * 60 * 60 * 24)), 
            hour: Math.floor((time / (1000 * 60 * 60)) % 24), 
            min: Math.floor((time / 1000 / 60) % 60), 
            sec: Math.floor((time / 1000) % 60)
        }))

        setShowTimer(prev => true); 

    }

    useEffect(() => {

        console.log(timerState); 

            if (start) {
                const interval = setInterval(() => getTime(deadline), 1000); 
            
                return () => clearInterval(interval); 
            }

    }, [start]); 

    return (
        <div className="main">
        <form className="form">
            <h3>Year: </h3>
            <input
            id="inputs"        
            name="year"
            onChange={e => {
                setTimerSet(prev => ({
                    ...prev, 
                    year: (e.target.value)
                }))
            }}
            ></input> 
            <h3>Month: </h3>
            <input
            id="inputs"        
            name="month"
            onChange={e => {
                setTimerSet(prev => ({
                    ...prev, 
                    month: (e.target.value)
                }))
            }}
            ></input> 
            <h3>Day: </h3>
            <input
            id="inputs"        
            name="day"
            onChange={e => {
                setTimerSet(prev => ({
                    ...prev, 
                    day: (e.target.value)
                }))
            }}
            ></input> 
            <h3 id="h">Hour: </h3>
            <input
            id="inputs"        
            name="hour"
            onChange={e => {
                setTimerSet(prev => ({
                    ...prev, 
                    hour: parseInt(e.target.value)
                }))
            }}
            ></input> 
            <h3 id="m">Minute: </h3>
            <input
            id="inputs"
            name="min"
            onChange={e => {
                setTimerSet(prev => ({
                    ...prev, 
                    min: e.target.value
                }))
            }}
            ></input> 
            <h3 id="s">Second: </h3>
            <input
            id="inputs"
            name="sec"
            onChange={e => {
                setTimerSet(prev => ({
                    ...prev, 
                    sec: e.target.value
                }))
            }}
            ></input>          
        </form>
            <button onClick={() => {
                setStart(prev => !prev); 
            }}
            className="click"
            >
                Click me!
            </button>
            <div className="clock">
            {
                showTimer &&
                <div className="super-clock-box">
                    <div class="clock-box">
                        <h3>Days: </h3>
                        <h1 id="clock-values">{timerState.day}</h1>
                    </div>
                    <div className="super-clock-box">
                        <h3>Hour: Min: Sec</h3>
                        <h1 id="clock-values">{String(timerState.hour).padStart(2, '0')} : {String(timerState.min).padStart(2, '0')} : {String(timerState.sec).padStart(2, '0')} </h1>
                    </div>
                    <div className="buttons">
                        <button
                            className="click"
                            onClick={e => getReset()}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            }
            </div>
            {/* {tttime && <div className="time-up">TIME'S UP !</div>} */}
            <div className="last-buttons">
            {/* {tune ? <button onClick={turning} className="btm-button" id="b1">Start</button> : <button onClick={turning} className="btm-button" id="b1">Pause</button>} */}
            {/* <button onClick={reset} className="btm-button" id="b2">Reset</button> */}
            </div>
        </div>
    )
}
