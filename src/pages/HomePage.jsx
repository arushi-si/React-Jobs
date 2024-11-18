import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobListings from "../components/JobListings";
import ViewMoreJobs from "../components/ViewAllJobs";

function HomePage() {
  return (
    <>
      <Hero
        title="Become a React Dev"
        subtitle="Find the React job that fits your skills and needs"
      />
      <HomeCards />
      <JobListings callFrom='homePage' />
      <ViewMoreJobs />
    </>
  );
}

export default HomePage;
