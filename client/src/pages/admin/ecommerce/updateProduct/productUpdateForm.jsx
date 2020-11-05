import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import UpdateProduct from "./updateProduct";

const PaymentCard = () => (
  <Col md={12} lg={12}>
    <Card>
      <CardBody>
        <div
          className="card__title"
          style={{
            maxWidth: "150px",
            height: "100%",
          }}
        >
          <h5
            style={{
              fontSize: "18px",
              marginTop: "-3px",
              color: "rgb(11 105 78)",
            }}
          >
            Edytuj produkt
          </h5>
        </div>
        <UpdateProduct />
      </CardBody>
    </Card>
  </Col>
);

export default PaymentCard;
