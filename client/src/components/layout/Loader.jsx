import React from 'react'

function Loader() {
  return (
    <div class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen dark:bg-gray-900">

    <div class="flex space-x-2 animate-pulse">
        <div class="w-3 h-3 bg-gray-500 rounded-full dark:bg-gray-300"></div>
        <div class="w-3 h-3 bg-gray-500 rounded-full dark:bg-gray-300"></div>
        <div class="w-3 h-3 bg-gray-500 rounded-full dark:bg-gray-300"></div>
    </div>

</div>
  )
}

export default Loader