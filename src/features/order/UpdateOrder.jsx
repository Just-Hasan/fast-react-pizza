import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
export default function UpdateOrder({ order, children }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type={"primary"}>{children}</Button>;
    </fetcher.Form>
  );
}

UpdateOrder.propTypes = {
  order: PropTypes.any,
  children: PropTypes.any,
};

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  console.log("UPDATE");
  return null;
}
