import { Link } from "react-router-dom";

const Calltoaction = () => {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-xl flex lg:flex-col md:flex-col border-2 shadow-lg">
      <div className="text-start w-full lg:w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">Want to be Blogger ?</span>
          <span className="block text-indigo-700 dark:text-indigo-100">
            It&#x27;s today or never.
          </span>
        </h2>
        <p className="text-xl mt-4 text-gray-950 dark:text-gray-100">
          Every great writer was once a beginner. Start blogging today and let
          your words pave the path to your journey as a writer, sharing your
          thoughts, experiences, and insights with the world!.{" "}
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <Link to="/search">
              <button type="button">View all posts</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <img
          src="https://st2.depositphotos.com/4107269/7704/i/450/depositphotos_77040729-stock-photo-vacation-entertainment-concept.jpg"
          className=""
        />
      </div>
    </div>
  );
};

export default Calltoaction;
