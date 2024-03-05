import Avatar from "react-avatar";
import "./avatar.css";

import PropTypes from "prop-types";

const UserAvatar = ({ name, size = 40, round = true, active = false }) => {
  return (
    <div className="user-avatar">
      <Avatar name={name} size={size} round={round} className="font-12" />
      {active && (
        <div id={`user-status`} className={`${active ? "active" : ""}`} />
      )}
    </div>
  );
};

UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  round: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  active: PropTypes.bool,
};

export default UserAvatar;
