import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import '../styles/App.scss'
import { useGetProductsQuery } from '../redux/storageSlice';

function App() {

  const { data, error, isLoading } = useGetProductsQuery();

 useEffect(()=>{
  if (data) {
    console.log('Dati ricevuti:', data);
  } else {console.log('dati non ricevuti')}
  
  },[data])
  
  return (
    <>
     <main>
      <div className='d-flex justify-content-between'>
        <h1 className='text-center'>Prodotti</h1>
        <div className='cart mx-5 mt-3'>
          <div>
            <div>Articolo:</div>
            <div>Prezzo:</div>
            <div>Pezzi acquistati:</div>
          </div>
          
          <div>TOTALE CARRELLO:</div>
        </div>
      </div>
  
      <section className='d-flex flex-wrap gap-1 justify-content-center p-5'>
        {data?.map((product, index) => (
          <div key={index} className="ms-card m-3">
            <img className='img-fluid' src={product.image} alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Prezzo: {product.price}</p>
              <p className="card-text">Pezzi disponibili: {product.rating.count}</p>
              {/* <button onClick={addToCart} className="mb-2 btn btn-primary">AGGIUNGI AL CARRELLO</button> */}
              {/* <button onClick={removeToCart} className="btn btn-danger">RIMUOVI DAL CARRELLO</button> */}
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
