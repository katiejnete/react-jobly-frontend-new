import React, { useContext, useState, useEffect } from "react";
import ItemTypeContext from "../context/ItemTypeContext";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import handleJobApp from "../auth/handleJobApp";
import LocalStorageContext from "../context/LocalStorageContext";
import "./ItemCard.css";

const ItemCard = ({ item, heading, details }) => {
  const { user, token, appliedJobs, setAppliedJobs } =
    useContext(LocalStorageContext);
  const { itemType } = useContext(ItemTypeContext);

  const [applied, setApplied] = useState(appliedJobs.includes(item.id));

  useEffect(() => {
    setApplied(appliedJobs.includes(item.id));
  }, appliedJobs);

  if (itemType === "companies") {
    return (
      <Link className="item-card-link" to={`/${itemType}/${item.handle}`}>
        <Card className="item-card">
          <CardBody>
            <CardTitle className="font-weight-bold text-center">
              {heading}
            </CardTitle>
            <CardText className="font-italic">
              {Array.isArray(details)
                ? details.map((detail, idx) => {
                    return <span key={idx}>{detail}</span>;
                  })
                : details}
            </CardText>
          </CardBody>
        </Card>
      </Link>
    );
  } else {
    return (
      <Card className="item-card" key={item.key}>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {heading}
          </CardTitle>
          <CardText className="font-italic">
            {Array.isArray(details)
              ? details.map((detail, idx) => {
                  if (typeof detail === "object") {
                    for (const [key, value] of Object.entries(detail)) {
                      return (
                        <span key={idx}>{`${
                          key[0].toUpperCase() + key.slice(1)
                        }: ${value || "No information available"}`}</span>
                      );
                    }
                  } else {
                    return <span key={idx}>{detail}</span>;
                  }
                })
              : details}
            <button
              disabled={applied}
              onClick={() =>
                handleJobApp({
                  username: user,
                  jobId: item.id,
                  token,
                  setAppliedJobs,
                })
              }
            >
              {applied ? "APPLIED" : "APPLY"}
            </button>
          </CardText>
        </CardBody>
      </Card>
    );
  }
};

export default ItemCard;
