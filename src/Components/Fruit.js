import React from 'react'

export default function Friut({ fruit, toggleFruit }) {
    function handleFruitClick() {
        toggleFruit(fruit.id)
    }

    return <div>
        <label>
            <input type="checkbox" checked={fruit.complete} onChange={handleFruitClick} />

            {fruit.name}
            
        </label>
    </div>

}