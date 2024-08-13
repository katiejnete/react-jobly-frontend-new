import JoblyApi from "../api";

const handleEditProfile = async (
  formData,
  token,
  setLoggedInUser,
  setError,
  setUserData
) => {
  try {
    const { username, ...restFormData } = formData;
    const userData = await JoblyApi.patchUser(username, restFormData, token);
    
    setLoggedInUser(formData.username);
    setUserData(userData);
  } catch (error) {
    setError(error);
    console.error(`Failed to update user`, error);
  }
};

export default handleEditProfile;
