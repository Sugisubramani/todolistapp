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
    const items = await Todo.find();
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