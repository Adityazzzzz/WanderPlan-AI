import TripInput from './components/TripInput'
import { useState } from 'react'

export default function App() {
  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [ans, setAns] = useState([]);


  const searchPlaces = async (query) => {
    if(!query.trim()) return [];

    const res = await fetch(`https://photon.komoot.io/api/?q=${query}&limit=10`);
    const data = await res.json();

    console.log(data.features);
    setAns(data.features)
  }
  console.log("hello")
 

 
  // const showHero = isIdle && !isLoading

  return (
    <div>
      <div><h1>HEllo</h1></div>
          <TripInput value={source} onChange={(e)=>{
            setSource(e.target.value);
            searchPlaces(e.target.value);
          }} />
          <TripInput value={dest} onChange={(e)=>{
            setDest(e.target.value);
            searchPlaces(e.target.value);
          }} />

          {ans.map((place) =>{
            <div
              key={place.properties.osm_id}
              onClick={() => 
                setSource(place.properties.name)
              }  
            >
              <b>{place.properties.name}</b>
              <small>
                {place.properties.city}, {place.properties.country}
              </small>
            </div>
          })}
    </div>
  )
}
