
import { useParams } from "react-router";
import AddEventForm from "../../../components/form/AddEventForm";
import UpdateEventForm from "../../../components/form/UpdateEventForm";

const UpdateEvent = () => {
  const { id } = useParams();

  if (!id) {
    return <Error/>
  }

  return <UpdateEventForm id={id} />;
};

export default UpdateEvent;