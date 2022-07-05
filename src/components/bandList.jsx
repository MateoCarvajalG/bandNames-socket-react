import React, { useState } from 'react'
import { useEffect } from 'react'

const BandList = ({data,deleteBand,vote,changeNameBand}) => {
  const [bands, setbands] = useState(data)

  const changeName =(evt,id)=>{
    const newName = evt.target.value
    setbands(bands=>bands.map(band=>{
      if(band.id === id){
        band.name= newName
      }
      return band
    }))
  }

  const onBlur=(id,name)=>{
    console.log(id,name)
    //TODO: disparar el evento del socket
    changeNameBand(id,name)
  }


  useEffect(() => {
    setbands(data)
  }, [data])
  
  const createRows = ()=>{
    return (
      bands.map(band=>(
      <tr key={band.id}>
        <td>
          <button 
            className="btn btn-primary"
            onClick={()=> vote(band.id)}
          > +1</button>
        </td>
        <td>
          <input 
            type="text" 
            className='form-control'
            value={band.name}
            onChange={(evt)=>changeName(evt,band.id)}
            onBlur={()=>onBlur(band.id,band.name)}

          />
        </td>
        <td> <h3>{band.votes}</h3></td>
        <td>
          <button 
            className='btn btn-danger'
            onClick={()=>deleteBand(band.id)}
          >Borrar</button>
        </td>
      </tr>
      ))
    );
  }
  return (
    <>
        <table className='table table-stripped'>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Votos</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {createRows()}
            </tbody>
        </table>
    </>
  )     
}

export default BandList