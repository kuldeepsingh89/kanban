import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { Menu } from "../UI/Menu";
import "./header.css";
import MenuItems from "../UI/MenuItems";
import { DrowDown } from "../UI/DropDown";
import { addQueryParam, grouping, ordering } from "../../utils/constants";
import useKanbanStore from "../../store/kanban.store";

export const Header = () => {
  const setGroupBy = useKanbanStore((state) => state.setGroupBy);
  const setOrderBy = useKanbanStore((state) => state.setOrderBy);
  const groupByValue = useKanbanStore((state) => state.groupBy);
  const orderByValue = useKanbanStore((state) => state.orderBy);

  const handleGroup = (e) => {
    const value = e.target.value;
    addQueryParam("groupBy", value);
    setGroupBy(value);
  };

  const handleOrder = (e) => {
    const value = e.target.value;
    addQueryParam("orderBy", value);
    setOrderBy(value);
  };

  return (
    <header className="header">
      <div className="container">
        <Menu icon={<HiAdjustmentsHorizontal size={16} />}>
          <MenuItems>
            <div className="menu-items--space">
              <div className="menu-items--group">
                <span className="clr-grey-5 font-12">Grouping</span>
                <DrowDown
                  items={grouping}
                  handleChange={handleGroup}
                  value={groupByValue}
                />
              </div>
              <div className="menu-items--group">
                <span className="clr-grey-5 font-12">Ordering</span>
                <DrowDown
                  items={ordering}
                  handleChange={handleOrder}
                  value={orderByValue}
                />
              </div>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};
