import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.scss';
import { useGetProductsQuery } from '../redux/storageSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { addItemOnStore, buyItem } from '../redux/itemsSlice.js';
import {addItemCart} from '../redux/cartSlice.js';

function App() {
  const dispatch = useDispatch();
  const { data: apiItems, isLoading } = useGetProductsQuery();
  //magazzino(store)
  const localItems = useSelector((state) => state.items);
  
  //carrello
  const cart = useSelector((state) => state.cart)

  const handlebuyItem = (itemId, item) => { //gestire anche carrello
    console.log(itemId);
    dispatch(buyItem(itemId));
    dispatch(addItemCart(item))
  };

  //funzione che prende tutti gli elementi selezionati dallo store e
  // crea un oggetto con title: titolo item, count :numero pezzi con stesso titolo, price: prezzo item
  const filterCart = (array) => {
    let counts = {}; // Oggetto per contare i titoli e salvare il prezzo

    array.forEach(item => {
        if (!counts[item.title]) {
          counts[item.title] = { count: 1, price: item.price }; // Salviamo il prezzo unitario
        } else {
          counts[item.title].count += 1; // Incrementiamo solo il conteggio
        }
    });
    // Converto in un array di oggetti
    return Object.keys(counts).map(title => ({
      title,
      count: counts[title].count,
      price: counts[title].price
    }));
  };

  const totalCart = (array) =>{
    let result = 0

    for (let i = 0; i < array.length; i++) {
      result = result + array[i].price
    }
    return result.toFixed(2)
  }
  
  // Sincronizza i dati di RTK Query con il reducer tradizionale
  useEffect(() => {
    if (apiItems) {
      apiItems.forEach(item => {
        dispatch(addItemOnStore(item));
      });
    }
  }, [apiItems, dispatch]);

  //verifica lo stato aggiornato
  useEffect(() => {
    console.log( localItems, cart);
    filterCart(cart)
  }, [localItems, cart]);

  return (
    <>
      <main className='d-flex'>
        <section className='d-flex flex-wrap gap-1 justify-content-center p-5'>
          {localItems?.map((product, index) => (
            <div key={`${product.id}-${index}`} className="ms-card m-3">
              <img className='img-fluid' src={product.image} alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Prezzo: {product.price} €</p>
                <p className="card-text">Pezzi disponibili: {product.rating.count}</p>
                <button
                  onClick={() => handlebuyItem(product.id, product)}
                  className="btn btn-success"
                >
                  ACQUISTA
                </button>
              </div>
            </div>
          ))}
        </section>

        <aside>
        <div>
            <h4>CARRELLO</h4>
            {filterCart(cart).map((product, index) => (
              <div key={index}>
                <div><strong>{product.title}</strong></div>  
                <span> x{product.count}</span>  
                <span> - Prezzo: €{product.price.toFixed(2)}</span>  
              </div>
            ))}
          </div>

            <div className='mt-3'><b>TOTALE: {totalCart(cart)} €</b></div>
            <nav className='mt-3'>
               <Link to={`/Cart`}>VAI AL CARRELLO</Link>
            </nav>

        </aside>
   
      </main>
    </>
  );
}

export default App;