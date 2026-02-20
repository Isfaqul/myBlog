import Heading from "../components/Heading";
import Main from "../components/Main";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function Error() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Main>
        <Heading level={1} size="text-3xl" desktopSize="sm:text-4xl" className="mb-6 heading-b-border">
          {error.status} {error.statusText}
        </Heading>
        <p className="font-body text-tGray-100 text-xl">{error.data}</p>
        <Link to="/" className="font-body text-lg text-blue-400 underline underline-offset-2 mt-3 block">
          Go Home
        </Link>
      </Main>
    );
  } else {
    return (
      <Main>
        <Heading level={1} size="text-3xl" desktopSize="sm:text-4xl" className="mb-6 heading-b-border">
          Oops!
        </Heading>
        <p className="font-body text-tGray-100 text-xl">An unknown error occured.</p>
        <Link to="/" className="font-body text-lg text-blue-400 underline underline-offset-2 mt-3 block">
          Go Home
        </Link>
      </Main>
    );
  }
}
