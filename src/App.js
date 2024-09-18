import React, { useState, useRef, useEffect } from 'react';
import FruitList from './Components/FruitList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const LOCAL_STORAGE_KEY = 'fruitApp.fruits';
  const [fruits, setFruits] = useState([]);
  const fruitNameRef = useRef();


  const storedFruits = localStorage.getItem(LOCAL_STORAGE_KEY);
  useEffect(() => {
    if (storedFruits) {
      try {
        const parsedFruits = JSON.parse(storedFruits);
        if (Array.isArray(parsedFruits)) {
          setFruits(parsedFruits);
        }
      } catch (e) {
        console.error("Failed to parse fruits from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fruits));
  }, [fruits]);

  function toggleFruit(id) {
    const newFruits = [...fruits];
    const fruit = newFruits.find((fruit) => fruit.id === id);
    fruit.complete = !fruit.complete;
    setFruits(newFruits);
  }

  function handleAddFruits(e) {
    const name = fruitNameRef.current.value;
    if (name === '') return;
    
    setFruits(prevFruits => [
      ...prevFruits,
      { id: uuidv4(), name: name, complete: false }
    ]);

    fruitNameRef.current.value = null;
  }

  function handleClearFruits() {
    const newFruits = fruits.filter(fruit => !fruit.complete);
    setFruits(newFruits);
  }

  return (
    <div className='container'>
      <FruitList fruits={fruits} toggleFruit={toggleFruit} />
      <input ref={fruitNameRef} type="text" />
      <button onClick={handleAddFruits} className='addButton'> Жагсаалт нэмэх</button>
      <button onClick={handleClearFruits} className='removeButton'>Арилгах</button>
      <div>{fruits.filter(fruit => !fruit.complete).length} -ийг нэмсэн</div>
    </div>
  );
}

export default App;
