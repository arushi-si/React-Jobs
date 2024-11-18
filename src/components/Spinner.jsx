import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

function Spinner({ loading }) {
  return (
    <MoonLoader
      color="#4338ca"
      loading={loading}
      cssOverride={override}
      aria-label="Loading Spinner"
      size={40}
    />
  );
}

export default Spinner;
