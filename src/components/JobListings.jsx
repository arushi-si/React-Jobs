import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

function JobListings({ callFrom }) {
  const [allJobs, setAllJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          callFrom == "homePage"
            ? "http://localhost:8000/jobs?_limit=3"
            : "http://localhost:8000/jobs";
        const res = await fetch(apiUrl);
        const jobs = await res.json();
        setAllJobs(jobs);
        setIsLoading(false);
      } catch (err) {
        const error = new Error(err);
        console.log(error);
      }
    };
    fetchData();
  }, [callFrom]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {callFrom == "homePage" ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {isLoading ? (
          <Spinner loading={isLoading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default JobListings;
