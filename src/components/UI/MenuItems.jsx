import PropTypes from "prop-types";
import "./menuItem.css";

const MenuItems = ({ children }) => {
  return <div className="menu-items">{children}</div>;
};

MenuItems.propTypes = {
  children: PropTypes.node,
};

export default MenuItems;
