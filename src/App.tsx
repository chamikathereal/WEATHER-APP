import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router';
import Home from './pages/Home';
import City from './pages/City';
// // import logo from './logo.svg';
import './App.css'


const App: React.FC = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home />} />,
        <Route path="city/:id" element={<City />} />
      </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>

  );
}

export default App;