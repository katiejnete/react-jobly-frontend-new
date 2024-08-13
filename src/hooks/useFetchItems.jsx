import { useState, useEffect } from "react";
import JoblyApi from "../api";

const useFetchItems = (itemType) => {
  const [items, setItems] = useState([]);
  const [itemSearch, setItemSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemList = await JoblyApi.getItems(itemType);
        setItems(itemList);
      } catch (error) {
        console.error(`Failed to fetch ${itemType}`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [itemType]);

  return [items, itemSearch, setItemSearch, isLoading];
};

export default useFetchItems;
