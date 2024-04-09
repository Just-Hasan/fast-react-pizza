import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Button({ children, type, disabled, to, onClick }) {
  const base =
    "text-sm inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-all duration-300 ease-in-out hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 md:py-4 md:px-6",
    small: base + " px-4  py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5  py-1 md:px-3.5 md:py-2 text-sm",
    secondary:
      "text-sm inline-block rounded-full border-2 border-stone-300 bg-transparent px-4 py-2.5 font-semibold uppercase tracking-wide text-stone-800 transition-all duration-300 ease-in-out hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-3.5",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button disabled={disabled} onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  to: PropTypes.any,
  type: PropTypes.any,
  onClick: PropTypes.func,
};
