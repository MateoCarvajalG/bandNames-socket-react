import { useEffect, useState } from 'react';
import { AddBand } from  './components/addBand.jsx'
import BandList from './components/bandList.jsx';
import io from 'socket.io-client'

const connectSocketServer=()=>{
  const socket = io.connect('http://localhost:8080',{
    transports:['websocket']
  })
  return socket
}

function App() {
  const [socket] = useState(connectSocketServer)
  const [online, setOnline] = useState(false)
  const [bands, setBands] = useState([])


  const vote = (id)=>{
    socket.emit('votar-banda',id) // incrementa en 1 el voto desde el backend, usando websockets
  }

  const deleteBand = (id)=>{
    socket.emit('delete-band',id) // bora la banda dependiendiendo el id desde el back usando websockets
  }

  const changeName = (id,newName) =>{
    socket.emit('change-name',{id,newName}) // cambia el nombre de la banda desde el back usando websoclket
  }
  
  const createBand =(name)=>{
    socket.emit('create-band',{name})
  }

  
  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
   socket.on('connect',()=>{
    setOnline(true)
   })
  }, [socket])


  useEffect(() => {
    socket.on('disconnect',()=>{
     setOnline(false)
    })
   }, [socket])

   useEffect(() => {
     socket.on('currentBands',(bands)=>{
      setBands(bands)
     })
   }, [socket])
   



  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status:
          {
            online ? 
            <span className="text-success" >Online</span>: <span className="text-danger">Offline</span> 
          }
        </p>
      </div>
      <h1> BandNames</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <BandList 
            data={bands} 
            vote={vote}
            deleteBand={deleteBand}
            changeNameBand={changeName}
          />
        </div>
        <div className="col-4">
          <AddBand
            createBand={createBand}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
