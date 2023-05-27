import { ArrowLongLeftIcon, HomeIcon } from "@heroicons/react/20/solid";
import { Link, useMatches } from "@remix-run/react";

const breadcrumbs = [{ name: "Admin", href: "#", current: true }];

export default function Breadcrumb() {
  const matches = useMatches();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="border-t border-gray-200 py-3">
        <nav className="flex" aria-label="Breadcrumb">
          <div className="flex sm:hidden">
            <a
              href="#dummy"
              className="group inline-flex space-x-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <ArrowLongLeftIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600"
                aria-hidden="true"
              />
              <span>Back to previous page</span>
            </a>
          </div>
          <div className="hidden sm:block">
            <ol className="flex items-center space-x-4">
              <li>
                <div>
                  <Link to="/" className="text-gray-400 hover:text-gray-500">
                    <HomeIcon
                      className="h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Home</span>
                  </Link>
                </div>
              </li>

              {matches
                // skip routes that don't have a breadcrumb
                .filter((match) => match.handle && match.handle.breadcrumb)
                // render breadcrumbs!
                .map((match: any, index) => (
                  <li key={index}>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                      {match.handle.breadcrumb(match)}
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </nav>
      </div>
    </div>
  );
}
