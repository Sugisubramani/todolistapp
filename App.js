import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  // Fetch todo items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        setListItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  const handleApi = async (method, url, data = {}) => {
    try {
      const res = await axios({ method, url, data });
      return res.data;
    } catch (err) {
      console.error(`Error during ${method} request:`, err);
    }
  };

  // Add a new item
  const addItem = async (e) => {
    e.preventDefault();
    if (!itemText) return;
    const newItem = await handleApi("post", "http://localhost:5500/api/item", { item: itemText });
    if (newItem) setListItems([...listItems, newItem]);
    setItemText("");
  };

  // Update an item
  const updateItem = async (e) => {
    e.preventDefault();
    const updatedItem = await handleApi("put", `http://localhost:5500/api/item/${isUpdating}`, { item: updateItemText });
    if (updatedItem) {
      setListItems(listItems.map((item) => (item._id === isUpdating ? updatedItem : item)));
      setIsUpdating("");
      setUpdateItemText("");
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    await handleApi("delete", `http://localhost:5500/api/item/${id}`);
    setListItems(listItems.filter((item) => item._id !== id));
  };

  const renderUpdateForm = (id) => (
    <form className="update-form" onSubmit={updateItem}>
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => setUpdateItemText(e.target.value)}
        value={updateItemText}
      />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={addItem}>
        <input
          type="text"
          placeholder="Add Todo Item"
          onChange={(e) => setItemText(e.target.value)}
          value={itemText}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.length > 0 ? (
          listItems.map((item) => (
            <div key={item._id} className="todo-item">
              {isUpdating === item._id ? (
                renderUpdateForm(item._id)
              ) : (
                <>
                  <p className="item-content">{item.item}</p>
                  <button onClick={() => setIsUpdating(item._id)}>Update</button>
                  <button onClick={() => deleteItem(item._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}

export default App;
