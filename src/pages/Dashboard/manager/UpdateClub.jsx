import React from 'react';

import { useParams } from "react-router";
import UpdateClubForm from '../../../components/form/UpdateClubForm';

const UpdateClub = () => {
  const { id } = useParams();

  if (!id) {
    return <Error/>
  }

  return <UpdateClubForm id={id} />;
};

export default UpdateClub;