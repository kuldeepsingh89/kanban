import useKanbanStore from "../store/kanban.store";
import { addQueryParam, getQueryParams, groupOrder } from "../utils/constants";
import Kanban from "../components/Kanban";
import { useEffect } from "react";
import { getKanbanDetails } from "../utils/api";
import { END_POINTS } from "../config";
import Loader from "../components/UI/Loader";

const Dashboard = () => {
  const kanbanDetails = useKanbanStore((state) => ({
    data: state.kanbanLists,
    groupBy: state.groupBy,
    orderBy: state.orderBy,
  }));

  const setKanban = useKanbanStore((state) => state.setKanban);
  const setGroupBy = useKanbanStore((state) => state.setGroupBy);
  const setOrderBy = useKanbanStore((state) => state.setOrderBy);
  const setInitialState = useKanbanStore((state) => state.setInitialData);
  const groups = groupOrder[kanbanDetails.groupBy.toLowerCase()];
  const queryParams = getQueryParams();

  useEffect(() => {
    async function fetchKanbanDetails() {
      const response = await getKanbanDetails(END_POINTS.GET_KANBAN_DETAILS);

      if (!Object.keys(queryParams).length) {
        addQueryParam("groupBy", kanbanDetails.groupBy);
        addQueryParam("orderBy", kanbanDetails.orderBy);
      }

      setInitialState(response);
      setKanban(response);

      setGroupBy(queryParams?.groupBy ?? kanbanDetails?.groupBy);
      setOrderBy(queryParams?.orderBy ?? kanbanDetails?.orderBy);
    }

    fetchKanbanDetails();
  }, []);

  if (!Object.keys(kanbanDetails.data).length) {
    return <Loader />;
  }

  return <Kanban groups={groups} data={kanbanDetails.data} />;
};

export default Dashboard;
