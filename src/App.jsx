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
import supabase from "./config/supabaseClient";

function App() {
  const addJob = async (job) => {
    // await fetch("http://localhost:8000/jobs", {
    //   method: "POST",
    //   body: JSON.stringify(job),
    // });

    const { data, error } = await supabase
      .from("company")
      .insert(job.company)
      .select();
    await supabase.from("jobs").insert({ ...job, company: data[0].id });
    return;
  };

  const deleteJob = async (id) => {
    // await fetch(`http://localhost:8000/jobs/${id}`, {
    //   method: "DELETE",
    // });
    await supabase.from("jobs").delete().eq("id", id);
  };

  const updateJob = async (job) => {
    // await fetch(`http://localhost:8000/jobs/${job.id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(job),
    // });

    const { data, error } = await supabase
      .from("company")
      .update(job.company)
      .eq("id", job.company.id)
      .select();

    await supabase
      .from("jobs")
      .update({ ...job, company: data[0].id })
      .eq("id", job.id);
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
