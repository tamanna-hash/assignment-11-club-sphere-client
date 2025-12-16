import React, { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { BsPersonFillCheck } from "react-icons/bs";
import { MdDeleteForever, MdPersonRemoveAlt1 } from "react-icons/md";

const PaymentTable = ({ payment, index }) => {
  const {
    clubId,
    transactionId,
    userEmail,
    manager,
    amount,
    category,
    name,
    createdAt,
    status,
  } = payment || {};
  return (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{name}</td>
      <td>{category}</td>
     
      <td>{userEmail}</td>
      
      <td>$ {amount}</td>
      <td>{status}</td>
      <td>{transactionId}</td>
      <td>{new Date(createdAt).toLocaleString()}</td>
    </tr>
  );
};

export default PaymentTable;
