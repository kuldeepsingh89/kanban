import { create } from "zustand";
import { deepClone, getKanbanList } from "../utils/constants";

const useKanbanStore = create((set) => ({
  initialData: {},
  kanbanLists: {},
  groupBy: "Status",
  orderBy: "Priority",
  setKanban: (lists) => {
    return set({ kanbanLists: lists });
  },
  setGroupBy: (type) => {
    const groupType = type.toLowerCase();
    return set((state) => ({
      groupBy: type,
      kanbanLists: getKanbanList(groupType, deepClone(state.initialData), {
        groupBy: groupType,
        orderBy: state.orderBy.toLowerCase(),
      }),
    }));
  },
  setOrderBy: (type) => {
    const orderType = type.toLowerCase();

    return set((state) => ({
      orderBy: type,
      kanbanLists: getKanbanList(orderType, state.kanbanLists, {
        groupBy: state.groupBy.toLowerCase(),
        orderBy: orderType,
      }),
    }));
  },
  setInitialData: (data) => {
    return set({ initialData: deepClone(data) });
  },
}));

export default useKanbanStore;
