import { useState, useEffect, useRef } from "react";
import JoblyApi from "../api";

const useFilteredItems = (itemType, search, items) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredItems = async () => {
      setIsLoading(true);
      try {
        let filtered = [];
        if (itemType === "companies" && search) {
          filtered = await JoblyApi.getItems(itemType, { name: search });
        } else if (itemType === "jobs" && search) {
          filtered = await JoblyApi.getItems(itemType, { title: search });
        } else {
          filtered = items;
        }

        setFilteredItems(filtered);
      } catch (error) {
        console.error(
          `Failed to fetch ${itemType} with search ${search}`,
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredItems();
  }, [search, itemType]);

  return [filteredItems, isLoading];
};

export default useFilteredItems;
