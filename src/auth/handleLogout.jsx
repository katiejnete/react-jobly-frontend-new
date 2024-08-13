const handleLogout = (setIsLoggedIn, setToken, setUserData, setAppliedJobs) => {
  setIsLoggedIn(null);
  setToken(null);
  setUserData(null);
  setAppliedJobs(null);
};

export default handleLogout;
