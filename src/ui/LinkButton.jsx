import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        &larr; {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      &larr; {children}
    </Link>
  );
}

LinkButton.propTypes = {
  children: PropTypes.any,
  to: PropTypes.any,
};
