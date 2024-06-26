import React, { useState } from 'react';
import AddItem from './components/AddItem';
import UpdateItem from './components/UpdateItem';
import DeleteItem from './components/DeleteItem';
import ItemList from './components/ItemList';

function App() {
    const [currentItemId, setCurrentItemId] = useState(null);

    const handleSelectItem = (id) => {
        setCurrentItemId(id);
    };

    return (
        <div className="App">
            <h1>Item Management</h1>
            <AddItem />
            <UpdateItem />
            <DeleteItem />
            <ItemList onSelectItem={handleSelectItem} />
        </div>
    );
}

export default App;
