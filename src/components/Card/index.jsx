import PropTypes from "prop-types";
import "./card.css";

const Card = ({ children }) => {
  return (
    <div className="card bs-common">
      <div className="card-body">{children}</div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
