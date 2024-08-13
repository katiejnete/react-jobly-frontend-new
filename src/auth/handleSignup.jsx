import JoblyApi from "../api";

const handleSignup = async ({
  formData,
  setLoggedInUser,
  setToken,
  setError,
  setUserData,
  setAppliedJobs,
}) => {
  try {
    const token = await JoblyApi.registerUser(formData);
    if (token) {
      setLoggedInUser(formData.username);
      setToken(token);

      const userData = await JoblyApi.getUser(formData.username);
      setUserData(userData);
      setAppliedJobs(userData.applications);
    } else {
      throw new Error("Signup failed: No token receieved.");
    }
  } catch (error) {
    setError(error);
    console.error(`Failed to register user`, error);
  }
};

export default handleSignup;
