import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({post}) => {
  return (
    <div className="max-w-2xl shadow-lg transition-all duration-700 hover:scale-105 relative overflow-hidden bg-cover bg-no-repea">
    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/posts/${post.slug}`}>
        <img className="rounded-t-lg h-56 object-cover w-full transition duration-300 ease-in-out hover:scale-110" src={post.image} alt={post.title} />
      </Link>
      <div className="p-5">
        <Link to={`/posts/${post.slug}`}>
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white line-clamp-2">{post.title}</h5>
        </Link>
        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400"></p>
        <Link to={`/posts/${post.slug}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default PostCard
