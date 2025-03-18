import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'

function App() {
 const [products, setDProducts] = useState([])

 useEffect(() => {
  axios.get("https://fakestoreapi.com/products") 
    .then(response => {
      setDProducts(response.data);  
    })
    .catch(error => console.error("Errore nel caricamento dei dati:", error));
}, []);

  return (
    <>
     <main>
    <h1 className='text-center'>Prodotti</h1>
    <ul>
        {products.map((product, index) => 
          <li key={index}>{product.title}</li>
        )}
    </ul>
    <nav>
        <Link to={`/Cart`} >CARRELLO</Link> 
      </nav>

     </main>
    </>
  )
}

export default App
