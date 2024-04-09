import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  deleteItem,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "./cartSlice";
import PropTypes from "prop-types";
export default function UpdateItemQuantity({ pizzaId: id }) {
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const dispatch = useDispatch();
  return (
    <div className="space-x-1 md:space-x-3">
      <Button
        type={"round"}
        onClick={() => {
          dispatch(increaseItemQuantity(id));
        }}
      >
        +
      </Button>
      <span>{currentQuantity}</span>
      <Button
        type={"round"}
        onClick={() => {
          if (currentQuantity > 1) {
            dispatch(decreaseItemQuantity(id));
          } else {
            dispatch(deleteItem(id));
          }
        }}
      >
        -
      </Button>
    </div>
  );
}
UpdateItemQuantity.propTypes = {
  pizzaId: PropTypes.any,
};
