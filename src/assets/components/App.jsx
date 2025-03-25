import { useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.scss';
import { useGetProductsQuery } from '../redux/storageSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { addItemOnStore, buyItem } from '../redux/itemsSlice.js';
import {addItemCart, removeItemCart} from '../redux/cartSlice.js';

function App() {
  const dispatch = useDispatch();
  const { data: apiItems, isLoading } = useGetProductsQuery();
  //magazzino(store)
  const localItems = useSelector((state) => state.items);
  //carrello
  const cart = useSelector((state) => state.cart)

  //tasto acquista
  const handlebuyItem = (itemId, item) => { //gestire anche carrello
    dispatch(buyItem(itemId));
    dispatch(addItemCart(item))
  };

  //tasto elimina del carrello
  const deleteItem = (product) => {
    const originalItem = cart.find(item => item.title === product.title);
    
    if (originalItem) {
      dispatch(removeItemCart(originalItem)); // Rimuovi l'oggetto da carrello
      dispatch(addItemOnStore(originalItem)); // Aggiungi l'oggetto al magazzino
    }
  };

  // Creazione oggetto per render carrello: prende tutti gli elementi selezionati dallo store e
  // crea un oggetto con title: titolo item, count :numero pezzi con stesso titolo, price: prezzo item
  const filterCart = (array) => {
    let counts = {}; 
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

  //totale
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
        <section>
          <h1 className='text-center p-3'>My Shop</h1>
       <div className='d-flex flex-wrap gap-1 justify-content-center'>
       {localItems?.map((product, index) => (
            <div key={`${product.id}-${index}`} className="ms-card m-3">
              <img className='img-fluid' src={product.image} alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Prezzo: {product.price} €</p>
                <p className="card-text">Pezzi disponibili: {product.rating.count}</p>
                <div className='d-flex justify-content-center'>
                  <button
                    onClick={() => handlebuyItem(product.id, product)}
                    className="btn btn-success"
                  >
                    ACQUISTA
                   </button>
                </div>
              
              </div>
            </div>
          ))}
       </div>
      
        </section>
        <aside>
          <div>
            <div className='cart'>
              <h4 className='text-center'>CARRELLO</h4>

              {filterCart(cart).map((product, index) => (
                <div className='itemCart m-1' key={index}>
                  <div><strong>{product.title}</strong></div>  
                  <div className='d-flex justify-content-between'>
                    <span> - Prezzo: €<strong>{product.price.toFixed(2)}</strong></span> 
                    <span> x<strong>{product.count}</strong></span> 
                  </div>
                  <button  onClick={() => deleteItem(product)} className='btn btn-danger'>Rimuovi</button> 
                </div>
              ))}
            </div>

              <div className='mt-3'><b>TOTALE: {totalCart(cart)} €</b></div>
              <nav className='mt-3'>
                <Link to={`/Cart`}>VAI AL CARRELLO</Link>
              </nav>
          </div>
        </aside>
      </main>
    </>
  );
}

export default App;