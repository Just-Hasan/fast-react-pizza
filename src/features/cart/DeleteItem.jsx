import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      DELETE
    </Button>
  );
}

DeleteItem.propTypes = {
  pizzaId: PropTypes.any,
};
