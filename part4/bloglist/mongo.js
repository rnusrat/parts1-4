const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://notes:${password}@cluster0.kwzw9ku.mongodb.net/blogListApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(url)

Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })