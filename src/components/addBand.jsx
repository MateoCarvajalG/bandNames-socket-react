import React from 'react'
import { useState } from 'react'

export const AddBand = ({createBand}) => {
  const [value, setValue] = useState('')


  const onSubmit =(ev)=>{
    ev.preventDefault()
    if(value.trim().length >0){
      createBand(value)
    }
  }

  return (
    <>
    <h3> Agregar Banda</h3>
    <form onSubmit={onSubmit}>
        <input 
            className='form-control'
            placeholder='nuevo nombre de banda'
            value={value}
            onChange={(ev)=> setValue(ev.target.value)}
        />
    </form>
    </>
  )
}
