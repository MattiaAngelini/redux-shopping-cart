import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import './assets/styles/App.scss'

function App() {
 const [products, setDProducts] = useState([])

 useEffect(() => {
  axios.get("https://fakestoreapi.com/products") 
    .then(response => {
      setDProducts(response.data);  
    })
    .catch(error => console.error("Errore nel caricamento dei dati:", error));
}, []);

useEffect(()=>{
console.log(products)
},[products])

  return (
    <>
     <main>
      <div className='d-flex justify-content-between'>
        <h1 className='text-center'>Prodotti</h1>

        <div className='cart mx-5 mt-3'>
          <div>0</div>
        </div>

      </div>
  
      <section className='d-flex flex-wrap gap-1 justify-content-center p-5'>
        {products.map((product, index) => (
          <div key={index} className="ms-card m-3">
            <img className='img-fluid' src={product.image} alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Prezzo: {product.price}</p>
              <p className="card-text">Pezzi disponibili: {product.rating.count}</p>
              <button className="btn btn-primary">AGGIUNGI AL CARRELLO</button>
            </div>
          </div>
        ))}
      </section>
    <nav>
        <Link to={`/Cart`} >CARRELLO</Link> 
      </nav>

     </main>
    </>
  )
}

export default App
