import PropTypes from "prop-types";

import "./menu.css";
import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

export const Menu = ({ children, icon }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    /**
     * Handles outside click event to close the menu if clicked outside.
     *
     * @param {Object} event - The event object
     * @return {void}
     */
    function callOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event?.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", callOutsideClick);

    return () => {
      document.removeEventListener("click", callOutsideClick);
    };
  }, []);

  return (
    <div onClick={() => setIsMenuOpen(true)} className="menu">
      <div className="menu-header menu-border" ref={menuRef}>
        {/* icon */}
        {icon}
        <span>Display</span>

        {/* icon */}
        <HiChevronDown width={14} height={14} />
        {isMenuOpen && <div className="menu-list br-common">{children}</div>}
      </div>
    </div>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
};
