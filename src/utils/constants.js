export const statusOrder = [
  "Backlog",
  "Todo",
  "In progress",
  "Done",
  "Canceled",
];

export const priorityOrder = ["No Priority", "Low", "Medium", "High", "Urgent"];

export const priorityOrderMap = {
  0: "No Priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

export const grouping = [
  { label: "Status", value: 1, isSelected: true },
  { label: "User", value: 2 },
  { label: "Priority", value: 3 },
];

export const ordering = [
  { label: "Priority", value: 1, isSelected: true },
  { label: "Title", value: 2 },
];

/**
 * GroupByStatus + OrderByPriority
 * 	-> ["Backlog", "Todo", "In-Progress", "Done", "Canceled"]
 * 	->
 */

export const groupOrder = {
  status: statusOrder,
  priority: priorityOrder,
};

const getReferedUser = (users, userId) => {
  return users.filter((user) => user.id === userId)[0];
};

const groupBy = (lists, groupType) =>
  lists?.tickets?.reduce(function (acc, record) {
    const key =
      groupType === "priority"
        ? priorityOrderMap[record?.priority]
        : record[groupType];

    if (acc[key]) {
      acc[key] = acc[key].concat(record);
    } else {
      acc[key] = [record];
    }

    if (record.userId) {
      acc[record.userId] = getReferedUser(lists?.users, record.userId);
    }
    return acc;
  }, {});

const filterUsersTicket = (tickets, user) => {
  const data = tickets?.filter((ticket) => {
    if (ticket.userId === user.id) {
      ticket["name"] = user.name;
      ticket["available"] = user.available;

      return ticket;
    }
  });
  return data;
};

const groupByUser = (lists) => {
  if (!groupOrder["user"]) {
    groupOrder["user"] = lists?.users?.map((user) => user.name);
  }
  return lists?.users?.reduce(function (acc, record) {
    acc[record.name] = [...filterUsersTicket(lists?.tickets, record)];
    return acc;
  }, {});
};

const sortByTitle = (lists, orders) => {
  let data = {};
  orders.map((order) => {
    if (lists[order]) {
      data[order] = lists[order]?.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }
  });

  return { ...lists, ...data };
};

const sortByPriority = (lists, orders) => {
  let data = {};
  orders.map((order) => {
    if (lists[order]) {
      data[order] = lists[order]?.sort((a, b) => {
        return b.priority - a.priority;
      });
    }
  });

  return { ...lists, ...data };
};

const orderBy = (lists, orders) => (cb) => {
  return cb(lists, orders);
};

export const getKanbanList = (type, lists, types) => {
  let data;

  switch (type) {
    case "status":
    case "priority":
      data = groupBy(lists, type);
      break;
    case "user":
      data = groupByUser(lists);
      break;
    default:
      break;
  }
  if (types.groupBy) {
    data = orderBy(
      data ?? lists,
      groupOrder[types.groupBy]
    )(types.orderBy === "priority" ? sortByPriority : sortByTitle);
  }

  return data;
};

export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let clone = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
};

export const addQueryParam = (key, value) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(key, value);
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
};

export const getQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};
