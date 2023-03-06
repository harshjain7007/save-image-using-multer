import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Multer = () => {
const [ data, setData ] = useState([])
useEffect(()=> {
    axios.get("http://localhost:5000/getmulter")
    .then((res) => setData(res.data))
    .catch((err) => console.log(err, "it has an Error"))

}, [])
  return (
    <div>
    <h1>Welcome</h1>
      { data.map((singleData) => {
        console.log(singleData.img.data.data)
        let base64String = btoa(
            String.fromCharCode(...new Uint8Array(singleData.img.data.data))
            );
        return <img src={`data:image/png;base64,${base64String}`} alt="img" style={{ width: "300px", height: "200px" }} />
      }) }
    </div>
  )
}

export default Multer
