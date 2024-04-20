import { Link } from "react-router-dom"

const Calltoaction = () => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-xl relative border-2 shadow-lg">
    <div className="text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">
                Want to be Blogger ?
            </span>
            <span className="block text-indigo-700 dark:text-indigo-100">
                It&#x27;s today or never.
            </span>
        </h2>
        <p className="text-xl mt-4 text-gray-950 dark:text-gray-100">
        Every great writer was once a beginner. Start blogging today and let your words pave the path to your journey as a writer, sharing your thoughts, experiences, and insights with the world!.        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-12 inline-flex rounded-md shadow">
                <Link to='/'>
                <button type="button" className="py-4 px-6  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Get started
                </button>
                </Link>

            </div>
        </div>
    </div>
    <img src="https://wallpapercave.com/wp/wp9355881.jpg" className="absolute w-1/3 object-cover top-0 right-0 hidden h-full max-w-1/4 lg:flex lg:justify-end"/>
</div>

  )
}

export default Calltoaction
