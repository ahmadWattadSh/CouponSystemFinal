import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../store/auth";

const Timer = () => {
    const [minutes, setMinutes] = useState(30);
    const [seconds, setSeconds] = useState(0);
    const dispatchTimeOut = useDispatch()
    const history = useHistory()

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    dispatchTimeOut(authActions.logout())
                    history.push("/login")
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            color: "blue"
        }}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    )
}

export default Timer;

function dispatch(arg0: { payload: undefined; type: string; }) {
    throw new Error("Function not implemented.");
}