import React, { useState, useContext, useEffect } from "react";
import ItemTypeContext from "../context/ItemTypeContext";
import ItemCard from "./ItemCard";
import SearchForm from "./SearchForm";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LocalStorageContext from "../context/LocalStorageContext";
import useFilteredItems from "../hooks/useFilteredItems";

const ItemList = ({ items, search, setSearch, isLoading }) => {
  const INITIAL_STATE = "";
  const { token } = useContext(LocalStorageContext);
  const { itemType, setError } = useContext(ItemTypeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [filteredItems, isFilteredItemsLoading] = useFilteredItems(itemType, search, items);

  useEffect(() => {
    if (!token) {
      setError("Unauthorized access. Please login or signup to view page.");
      navigate("/");
    }
  }, [token, setError, navigate]);

  useEffect(() => {
    if (itemType !== "companyJobs") {
      setSearch(INITIAL_STATE);
    }
  }, [location.pathname, itemType]);

  if (isLoading || isFilteredItemsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="col-md-4">
      {itemType !== "companyJobs" && <SearchForm setSearch={setSearch} />}
      {filteredItems.length > 0 &&
        filteredItems.map((item) => {
          if (itemType === "companies") {
            return (
              <ItemCard
                key={uuid()}
                item={item}
                heading={item.name}
                details={item.description}
              />
            );
          } else if (itemType === "jobs") {
            return (
              <ItemCard
                key={uuid()}
                item={item}
                heading={item.title}
                details={[
                  item.companyName,
                  { salary: item.salary },
                  { equity: item.equity },
                ]}
              />
            );
          } else {
            return (
              <ItemCard
                key={uuid()}
                item={item}
                heading={item.title}
                details={[{ salary: item.salary }, { equity: item.equity }]}
              />
            );
          }
        })}
      {!filteredItems.length && <p>No results found.</p>}
    </section>
  );
};

export default ItemList;
