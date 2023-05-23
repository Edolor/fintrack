import { Link } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // "<p>
  // {/* <i>{error.statusText || error.message}</i> */}
  // </p>
  // "
  document.title = "Page not found(404)";
  return (
    <>
      <section className="w-full min-h-[80vh] flex items-center bg-zinc-200 dark:bg-zinc-700">
        <div className="container mx-auto grid place-items-center h-full px-4 sm:px-0">
          <h2 className="font-serif text-6xl text-center sm:text-7xl dark:text-zinc-100">Page not found</h2>
          <p className="text-lg sm:text-xl text-center dark:text-zinc-100 mt-4">
            Unfortunately, the page you are looking for does not exist.
          </p>
          <p className="text-lg sm:text-xl text-center dark:text-zinc-100 mt-1">
            Start tracking your finances today.
          </p>

          <div className="flex space-x-8 mt-8 gap-y-3 flex-wrap justify-center">
            <Link to="/" className="uppercase text-xl font-bold underline hover:no-underline dark:text-zinc-100">Home Page</Link>
            <Link to="/login" className="uppercase text-xl font-bold underline hover:no-underline dark:text-zinc-100">Login</Link>
            <Link to="/signup" className="uppercase text-xl font-bold underline hover:no-underline dark:text-zinc-100">Sign up</Link>
          </div>
        </div>
      </section>
    </>
  );
}