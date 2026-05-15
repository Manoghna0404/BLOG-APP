import React from 'react'
import {useRouteError} from "react-router"

function ErrorBoundary() {
    const {data,status,statusText}=useRouteError();
  return (
    <div className='text-2xl text-center shadow-2xl justify-center text-red-500 m-30 p-30 '>
        <p>{data}</p>
        <p>{status}</p>
        <p>{statusText}</p>
    </div>
  )
}

export default ErrorBoundary