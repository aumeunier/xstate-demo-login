import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h3>Step 1</h3>
      <div>
        <Link to="/step1/standard">Standard</Link>
      </div>
      <div>
        <Link to="/step1/xstate">XState</Link>
      </div>
    </div>
  );
}

export default HomePage;
