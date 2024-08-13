import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ItemList from "./components/ItemList";
import Company from "./components/Company";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import EditProfileForm from "./components/EditProfileForm";
import NavBar from "./components/NavBar";
import useFetchItems from "./hooks/useFetchItems";
import ItemTypeContext from "./context/ItemTypeContext";
import useLocalStorage from "./hooks/useLocalStorage";
import LocalStorageContext from "./context/LocalStorageContext";
import NotFound from "./components/NotFound";

const AppRoutes = () => {
  const [token, setToken] = useLocalStorage("token");
  const [loggedInUser, setLoggedInUser] = useLocalStorage("user");
  const [companies, companySearch, setCompanySearch, isCompaniesLoading] =
    useFetchItems("companies");
  const [jobs, jobSearch, setJobSearch, isJobsLoading] = useFetchItems("jobs");
  const [error, setError] = useState(null);
  const [userData, setUserData] = useLocalStorage("userData");
  const [appliedJobs, setAppliedJobs] = useLocalStorage("applied");

  if (isCompaniesLoading || isJobsLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <LocalStorageContext.Provider
        value={{
          token,
          user: loggedInUser,
          setLoggedInUser,
          setToken,
          userData,
          setUserData,
          appliedJobs,
          setAppliedJobs,
        }}
      >
        <NavBar />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Home error={error} setError={setError} />}
            />
            <Route
              path="/companies"
              element={
                <ItemTypeContext.Provider
                  value={{ itemType: "companies", error, setError }}
                >
                  <ItemList
                    items={companies}
                    search={companySearch}
                    setSearch={setCompanySearch}
                    isLoading={isCompaniesLoading}
                  />
                </ItemTypeContext.Provider>
              }
            />
            {companies.map((company) => (
              <Route
                key={company.handle}
                path={`/companies/${company.handle}`}
                element={
                  <ItemTypeContext.Provider
                    value={{ itemType: "companyJobs", error, setError }}
                  >
                    <Company company={company} companyHandle={company.handle} />
                  </ItemTypeContext.Provider>
                }
              />
            ))}
            <Route
              path="/jobs"
              element={
                <ItemTypeContext.Provider
                  value={{ itemType: "jobs", error, setError }}
                >
                  <ItemList
                    items={jobs}
                    search={jobSearch}
                    setSearch={setJobSearch}
                    isLoading={isJobsLoading}
                  />
                </ItemTypeContext.Provider>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/profile" element={<EditProfileForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </LocalStorageContext.Provider>
    </>
  );
};

export default AppRoutes;
