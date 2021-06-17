import React from "react";

export const LoginHeader = () => (
  <div>
    <img className="mx-auto h-12 w-auto" src="/d-edge.png" alt="D-EDGE" />
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Sign in
    </h2>
    <p className="mt-2 text-center text-sm text-gray-600">
      Or{" "}
      <span className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
        create your account
      </span>
    </p>
  </div>
);
