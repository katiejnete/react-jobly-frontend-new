import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ItemList from "./ItemList";
import LocalStorageContext from "../context/LocalStorageContext";
import ItemTypeContext from "../context/ItemTypeContext";
import useFetchCompanyJobs from "../hooks/useFetchCompanyJobs";

const Company = ({companyHandle, company}) => {
  const {companyJobs, isLoading} = useFetchCompanyJobs(companyHandle);
  const {token} = useContext(LocalStorageContext);
  const {setError} = useContext(ItemTypeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Unauthorized access. Please login or signup to view page.");
      navigate("/");
    }
  }, [token, setError, navigate]);

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <>
    <h1>{company.name}</h1>
    <p>{company.description}</p>
    <ItemList items={companyJobs} isLoading={isLoading} />
    </>
  );
};

export default Company;
