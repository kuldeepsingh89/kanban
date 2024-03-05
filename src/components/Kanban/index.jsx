import PropTypes from "prop-types";
import "./kanban.css";
import Card from "../Card";
import UserAvatar from "../UI/Avatar";
import { MdSignalCellularAlt } from "react-icons/md";

import {
  FaBoxesStacked,
  FaCircleHalfStroke,
  FaEllipsis,
  FaPlus,
  FaRegCircleCheck,
  FaRegCircleDot,
  FaRegCircleXmark,
} from "react-icons/fa6";
import useKanbanStore from "../../store/kanban.store";

const icons = (key) =>
  ({
    backlog: <FaBoxesStacked color="orange" />,
    todo: <FaRegCircleDot color="grey" />,
    "in progress": <FaCircleHalfStroke color="yellow" />,
    done: <FaRegCircleCheck color="purple" />,
    canceled: <FaRegCircleXmark color="grey" />,
    plus: <FaPlus color="grey" />,
    ellipse: <FaEllipsis color="grey" />,
    "priority-h": <MdSignalCellularAlt color="grey" />,
  }[key]);

const Kanban = ({ groups, data }) => {
  const groupType = useKanbanStore((state) => state.groupBy);
  return (
    <div className="card-bucket">
      {groups.map((group) => {
        return (
          <div className="card-bucket__list" key={group}>
            <div className="single-card--bucket">
              <div className="card-bucket--header__group">
                <div className="card-bucket--header__group--left">
                  {/* icon */}
                  {icons(group?.toLowerCase())}

                  <h2>{group}</h2>
                  <span className="card-items--count clr-grey-5">
                    {data[group]?.length ?? 0}
                  </span>
                </div>
                {data[group]?.length && (
                  <div className="card-bucket--header__group--right">
                    {/* icon */}
                    {icons("plus")}
                    {/* icon */}
                    {icons("ellipse")}
                  </div>
                )}
              </div>
              {data[group]?.map((item) => {
                return (
                  <Card key={item.id}>
                    <div className="ticket-card--body">
                      <div>
                        <h3 className="ticket-id clr-grey-5">{item.id}</h3>

                        <div className="ticket-title">
                          {groupType.toLowerCase() === "priority" && (
                            <div className="ticket-icon">
                              {icons(item.status.toLowerCase())}
                            </div>
                          )}
                          <p className="truncate">{item.title}</p>
                        </div>
                        <div className="ticket-tag">
                          {/* icon */}
                          <span className="br-common-2 tag-priority">
                            {icons("priority-h")}
                          </span>

                          {item.tag.length ? (
                            <span className="tag clr-grey-5 br-common-2">
                              {item.tag[0]}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <UserAvatar
                          name={data[item.userId]?.name ?? item.name}
                          active={
                            data[item.userId]?.available ?? item.available
                          }
                          round={true}
                          size={18}
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Kanban.propTypes = {
  groups: PropTypes.array,
  data: PropTypes.object,
};

export default Kanban;
