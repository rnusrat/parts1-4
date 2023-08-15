const _ = require('lodash')

const dummy = (blogs) => {
    if(blogs)
    {
        return 1
    }
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
      }
    
      return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let likes = blogs[0]

    blogs.forEach((blog) => {
        if (blog.likes > likes.likes) {
            likes = blog;
        }
    })

    return likes
}

const mostBlogs = (blogs) => {
    const blogCount = _.countBy(blogs, 'author')
    const mostAuthored = _.maxBy(_.keys(blogCount), (author) => blogCount[author])
    
    return {
        author: mostAuthored,
        blogs: blogCount[mostAuthored]
    }
}

const mostLikes = (blogs) => {
    const authorLikes = []

    blogs.forEach((blog) => {
        if (!authorLikes[blog.author]) {
            authorLikes[blog.author] = blog.likes
        }
        else {
            authorLikes[blog.author] = authorLikes[blog.author] + blog.likes
        }
    })

    const mostLikesAuthor = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author])

    return {
        author: mostLikesAuthor,
        likes: authorLikes[mostLikesAuthor]
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }