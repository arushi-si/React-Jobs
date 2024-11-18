import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import AddJobsPage from "./pages/AddJobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditJobPage from "./pages/EditJobPage";

function App() {
  const addJob = async (job) => {
    const res = await fetch("http://localhost:8000/jobs", {
      method: "POST",
      body: JSON.stringify(job),
    });
    return;
  };

  const deleteJob = async (id) => {
    await fetch(`http://localhost:8000/jobs/${id}`, {
      method: "DELETE",
    });
  };

  const updateJob = async (job) => {
    await fetch(`http://localhost:8000/jobs/${job.id}`, {
      method: "PUT",
      body: JSON.stringify(job),
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="/add-job" element={<AddJobsPage addJob={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJob={updateJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
