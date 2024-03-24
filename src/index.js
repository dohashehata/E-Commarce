import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'jquery/dist/jquery.min.js';
import 'sweetalert2/dist/sweetalert2.all.js';
import 'react-hot-toast/package.json'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserContextProvider } from "./Context/UserContext";
import { CartContexttProvider } from './Context/CartContextt';
import { WishContextProvider } from './Context/WishListContext';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<UserContextProvider>
   <CartContexttProvider>
      <WishContextProvider>
    <App />
    </WishContextProvider>
    </CartContexttProvider>
   </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
