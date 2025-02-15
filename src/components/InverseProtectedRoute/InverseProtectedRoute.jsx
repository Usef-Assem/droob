import React from 'react'
import { Navigate } from 'react-router-dom'

export default function InverseProtectedRoute(props) {
    if(localStorage.getItem("Token")){
        return <Navigate to={"/"}/>
    }
    else{
        return props.children
    }
}
