import PropTypes from "prop-types";
import "./dropdown.css";
import { HiChevronDown } from "react-icons/hi2";
export const DrowDown = ({ items, handleChange, value }) => {
  return (
    <div className="dropdown relative">
      <select
        name="dropdown-list"
        className="dropdown-list br-common-1 font-12"
        onChange={handleChange}
        value={value}
      >
        {items?.map((item) => (
          <option key={item?.value}>{item?.label}</option>
        ))}
      </select>
      <HiChevronDown className="dropdown-arrow" size={12} color="grey" />
    </div>
  );
};

DrowDown.propTypes = {
  items: PropTypes.array,
  handleChange: PropTypes.func,
  value: PropTypes.string,
};
