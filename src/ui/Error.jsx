import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message || error.data}</p>
      <LinkButton to={"-1"}>Go Back</LinkButton>
    </div>
  );
}
