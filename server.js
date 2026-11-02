//Task-1
import express from 'express'

const app = express()
app.use(express.json())
const PORT = 3000

const books = [
  {
    id: 101,
    title: "Java Programming",
    author: "Herbert Schildt",
    category: "Programming",
    quantity: 5,
    available: 5
  }
]

//Task-2
app.post('/api/books', (req, res) => {
  const book = req.body
  if (!book.title) return res.status(400).send("Book title is required")
  books.push(book)
  res.status(200).json(book)
})

//Task-3
app.get('/api/books', (req, res) => {
  res.status(200).json(books)
})
app.get('/api/books/:id', (req, res, next) => {
  if (req.params.id === 'search') return next()
  const book = books.find(b => b.id == req.params.id)
  if (!book) return res.status(404).send("Book not found")
  res.status(200).json(book)
})

//Task-4
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id)
  if (!book) return res.status(404).send("Book not found")
  Object.assign(book, req.body)
  res.status(200).json(book)
})

//Task-5
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id)
  if (index === -1) return res.status(404).send("Book not found")
  books.splice(index, 1)
  res.status(200).send("Book deleted successfully")
})
//Task-6
app.get('/api/books/search', (req, res) => {
  const title = req.query.title
  if (!title) return res.status(400).send("Title is required")
  const results = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()))
  res.status(200).json(results)
})

//Task-7
app.post('/api/books/:id/issue', (req, res) => {
  const book = books.find(b => b.id == req.params.id)
  if (!book) return res.status(404).send("Book not found")
  if (book.available <= 0) return res.status(400).send("No copies available to issue")
  book.available--
  res.status(200).json({ message: "Book issued successfully", book })
})
app.post('/api/books/:id/return', (req, res) => {
  const book = books.find(b => b.id == req.params.id)
  if (!book) return res.status(404).send("Book not found")
  if (book.available >= book.quantity) return res.status(400).send("All copies already returned")
  book.available++
  res.status(200).json({ message: "Book returned successfully", book })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))