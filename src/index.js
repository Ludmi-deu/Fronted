import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '../src/assets/styles/logo.css';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavbarComponent from './components/NavBarComponent';
import TipoPropiedadPage from './pages/tipoPropiedad/TipoPropiedadPage';
import NewTipoPropiedad from './pages/tipoPropiedad/NewTipoPropiedad'
import EditTipoPropiedad from './pages/tipoPropiedad/EditTipoPropiedad';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <HeaderComponent/>
      <Routes>
      <Route path="/tipo-propiedad/editar" element={<EditTipoPropiedad />} />
      <Route path="/tipoPropiedad/nuevo" element={<NewTipoPropiedad />}/>
      <Route path="/tipoPropiedad" element={<TipoPropiedadPage />}/>
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
