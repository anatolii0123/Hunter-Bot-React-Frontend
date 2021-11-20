import {
    Route,
    Redirect
} from "react-router-dom";
import { useState, useEffect } from 'react'

import { getAuth } from "../api";
import Loading from "../components/Loading";
const ProtectedRoute = props => {
    const [status, setStatus] = useState(0)
    useEffect(() => {
        getAuth().then((res) => {
            if (res.data.msg === "authorized") {
                setStatus(1)
            }
            else {
                setStatus(2)
            }
        });
    }, []);
    if (status === 0) {
        return <Loading />
    }
    if (status === 1) {
        return <Route {...props} />
    }
    window.location.href = `/api/auth/discord`
}

export default ProtectedRoute