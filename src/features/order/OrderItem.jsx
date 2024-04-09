import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
export default function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const pizzaIngredients = ingredients();
  const pizzaIngredientsText = pizzaIngredients?.join(", ");
  const loading = isLoadingIngredients === "loading";
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{item?.quantity}&times;</span>{" "}
          {item?.name}
          <span className="block pt-2 text-xs capitalize italic">
            {loading ? "Loading..." : pizzaIngredientsText}
          </span>
        </p>
        <p className="font-bold">{formatCurrency(item?.totalPrice)}</p>
      </div>
    </li>
  );
}

OrderItem.propTypes = {
  item: PropTypes.any,
  isLoadingIngredients: PropTypes.any,
  ingredients: PropTypes.any,
};
