import { useEffect } from 'react';
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
  // crea un oggetto con chiave:titolo e valore:counter, per creare conteggio elementi nel carrello
  const filterCart = (array) => {
    let counts = {}; // Oggetto per contare i titoli
    array.forEach(item => {
      if (item.title) {
        counts[item.title] = (counts[item.title] || 0) + 1;
      }
    });
    // Restituiamo un array di oggetti con `title` e `count`
    return Object.keys(counts).map(title => ({ title, count: counts[title] }));
  };
  
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
      <main>
        <div className='d-flex justify-content-between'>
          <h1 className='text-center'>Prodotti</h1>
          <div className='cart mx-5 mt-3'>
          <div>
            <h4>ARTICOLI NEL CARRELLO</h4>
            {filterCart(cart).map((product, index) => (
              <div key={index}>
                <span><strong>{product.title}</strong></span> <span> x{product.count}</span>
              </div>
            ))}
          </div>
            <div>TOTALE CARRELLO:</div>
          </div>
        </div>

        <section className='d-flex flex-wrap gap-1 justify-content-center p-5'>
          {localItems?.map((product, index) => (
            <div key={`${product.id}-${index}`} className="ms-card m-3">
              <img className='img-fluid' src={product.image} alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Prezzo: {product.price}</p>
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
        <nav>
          <Link to={`/Cart`}>CARRELLO</Link>
        </nav>
      </main>
    </>
  );
}

export default App;