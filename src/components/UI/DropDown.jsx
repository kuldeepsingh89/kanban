import PropTypes from "prop-types";
import "./dropdown.css";
export const DrowDown = ({ items, handleChange, value }) => {
  return (
    <div className="dropdown">
      <select
        name="dropdown-list"
        className="dropdown-list"
        onChange={handleChange}
        value={value}
      >
        {items?.map((item) => (
          <option key={item?.value}>{item?.label}</option>
        ))}
      </select>
    </div>
  );
};

DrowDown.propTypes = {
  items: PropTypes.array,
  handleChange: PropTypes.func,
  value: PropTypes.string,
};
