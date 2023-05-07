import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect(props) {

  let navigate = useNavigate();

  useEffect(()=>{
    return navigate('/')
  })

  return (
    <div>Redirect</div>
  )
}
