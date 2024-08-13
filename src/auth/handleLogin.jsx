import JoblyApi from "../api";

const handleLogin = async ({
  formData,
  setLoggedInUser,
  setToken,
  setError,
  setUserData,
  setAppliedJobs,
}) => {
  try {
    const token = await JoblyApi.loginUser(formData);
    if (token) {
      setLoggedInUser(formData.username);
      setToken(token);

      const userData = await JoblyApi.getUser(formData.username);
      setUserData(userData);
      setAppliedJobs(userData.applications);
    } else {
      throw new Error("Login failed: No token received.");
    }
  } catch (error) {
    setError(error);
    console.error(`Failed to login ${formData.username}`, error);
  }
};

export default handleLogin;
