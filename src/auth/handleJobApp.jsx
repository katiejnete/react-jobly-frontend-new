import JoblyApi from "../api";

const handleJobApp = async ({ username, jobId, token, setAppliedJobs }) => {
  try {
    await JoblyApi.applyJob(username, jobId, token);
    setAppliedJobs((prevApplied) => [...prevApplied, jobId]);
  } catch (error) {
    console.error(`Failed to process job application`, error);
  }
};

export default handleJobApp;
