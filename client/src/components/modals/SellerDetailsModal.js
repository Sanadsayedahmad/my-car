import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getUserData } from "../../helpers/FetchHelper";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

function SellerDetailsModal(props) {
  const [sellerDetails, setSellerDetails] = useState({});

  useEffect(() => {
    getUserData(props.card.user_id, (data) => {
      console.log(data);
      setSellerDetails(data);
    });
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Seller contact information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={"display-6"}>
          <BiUser></BiUser>: {sellerDetails.name}
        </p>
        <p className={"display-6"}>
          <HiOutlineMail></HiOutlineMail>: {sellerDetails.email}
        </p>
        <p className={"display-6"}>
          <AiOutlinePhone></AiOutlinePhone>: {props.card.bizPhone}
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default SellerDetailsModal;
