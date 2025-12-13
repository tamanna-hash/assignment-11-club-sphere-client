
import { useParams } from "react-router";
import AddEventForm from "../../../components/form/AddEventForm";

const AddEvent = () => {
  const { id } = useParams();

  if (!id) {
    return <Error/>
  }

  return <AddEventForm id={id} />;
};

export default AddEvent;