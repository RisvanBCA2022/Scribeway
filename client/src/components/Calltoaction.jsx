import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Calltoaction = () => {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg">
    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Want to be Blogger ? <span className="block text-indigo-700 dark:text-indigo-100">
            It&#x27;s today or never.
          </span> </h2>
            <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">  Every great writer was once a beginner. Start blogging today and let
          your words pave the path to your journey as a writer, sharing your
          thoughts, experiences, and insights with the world!.{" "}</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link to={`${currentUser? '/' : '/sign-in'}`} className="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Get started
                </Link>
               
            </div>
        </div>
    </div>
</section>
  );
};

export default Calltoaction;
