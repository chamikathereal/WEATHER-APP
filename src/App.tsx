import React, {useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {

  const [city, setCity] = useState();

  const testApi = async ()=>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=colombo&appid=472af64eabc5a2676ee87c5845a83386`);
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);

  }

  useEffect(()=>{
    testApi();
  },[])


  return (
    <div className="App">
      <header className="App-header">
       
      </header>
    </div>
  );
}

export default App;
