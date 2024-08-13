import { useState, useEffect } from "react";
import JoblyApi from "../api";

const useFetchCompanyJobs = (handle) => {
  const [companyJobs, setCompanyJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      try {
        const jobs = await JoblyApi.getCompanyJobs(handle);
        setCompanyJobs(jobs);
      } catch (error) {
        console.error(`Failed to fetch company ${handle} jobs`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyJobs();
  }, [handle]);

  return { companyJobs, isLoading };
};

export default useFetchCompanyJobs;
