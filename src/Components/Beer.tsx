import React, { useEffect, useState } from 'react';
import axios from 'axios' 
import { Bebidas} from '../types/bebidas'

const Beer = () => {
    
    const [cerveja, SetCervejas] = useState<any>([])
    function BuscaCerveja() {
        axios.get('https://api.punkapi.com/v2/beers/?per_page=8')
            .then(resposta => SetCervejas(resposta.data))
      }
  return (
      
    <div className="food-beer-list food-shop">
      
      <h1>Tipos de Cerveja</h1>
     
      <button onClick={() => BuscaCerveja() } >Buscar Cerveja</button>
      <div className="beers-list " >
          {cerveja !== null && cerveja.map((item: Bebidas) => (
              
        
         <div className="beer" key={item.id} >
            <img src={item.image_url} alt="Buzz" />
            <h3>{item.name}</h3>
            
            <span>{item.tagline}</span>
            <small>{item.description}</small>
          </div>
         
          
          ))}
         </div>
      </div>
    
    
  );
}

export default Beer;