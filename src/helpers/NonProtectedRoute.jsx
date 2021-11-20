import {
    Route
} from "react-router-dom";
import { useState, useEffect } from 'react'

import { getAuth } from "../api";

const ProtectedRoute = props => {
    const [status, setStatus] = useState(0)
    useEffect(() => {
        getAuth().then((res) => {
            if (res.data.msg === "authorized") {
                setStatus(2)
            }
            else {
                setStatus(1)
            }
        });
    }, []);
    if (status === 0) {
        return <div>Loading...</div>
    }
    if (status === 1) {
        return <Route {...props} />
    }
    return <div>Should Login</div>
}

export default ProtectedRoute