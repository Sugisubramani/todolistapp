const router = require('express').Router();
const Todo = require('../models/todomodel');

// Add a new todo item
router.post('/api/item', async (req, res) => {
  try {
    const item = new Todo({ item: req.body.item });
    const savedItem = await item.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all todo items
router.get('/api/items', async (req, res) => {
  try {
    const items = await Todo.find().sort({ _id: -1 }); // Latest first
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a todo item
router.put('/api/item/:id', async (req, res) => {
  try {
    const updatedItem = await Todo.findByIdAndUpdate(req.params.id, { item: req.body.item }, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle complete status of a todo item
router.put('/api/item/complete/:id', async (req, res) => {
  try {
    const item = await Todo.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    item.completed = !item.completed; // Toggle completion status
    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a todo item
router.delete('/api/item/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
