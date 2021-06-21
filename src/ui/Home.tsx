import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="w-full h-full text-center p-40 text-xl">
      <div>
        <h3 className="bg-indigo-600 text-white">Step 1</h3>
        <div>
          <Link to="/step1/standard">Standard</Link>
        </div>
        <div>
          <Link to="/step1/xstate">XState</Link>
        </div>
      </div>
      <div>
        <h3 className="bg-indigo-600 text-white">Step 2</h3>
        <div>
          <Link to="/step2/standard">Standard</Link>
        </div>
        <div>
          <Link to="/step2/xstate">XState</Link>
        </div>
      </div>
      <div>
        <h3 className="bg-indigo-600 text-white">Step 3</h3>
        <div>
          <Link to="/step3/xstate">XState</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
