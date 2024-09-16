import React, { CSSProperties } from "react";
import { GridLoader } from "react-spinners";

const override: CSSProperties = {
  margin: "0 auto",
};

const Spinner = () => {
  return (
    <div className="sweet-loading bg-bgMain bg-cover relative bg-center items-center flex min-h-screen justify-center w-full">
      <GridLoader
        loading={true}
        color="white"
        size={33}
        speedMultiplier={1}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
