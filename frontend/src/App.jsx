import { useEffect, useState } from 'react';
import { getItems } from './api';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to load items: ' + err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <h1>Item Manager</h1>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>Error: {error}</div>}
      <ItemForm onItemAdded={fetchItems} />
      <ItemList items={items} onRefresh={fetchItems} />
    </div>
  );
}

export default App;
