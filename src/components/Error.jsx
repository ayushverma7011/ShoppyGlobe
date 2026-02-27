import React from "react";
import { useRouteError, Link } from "react-router-dom";

/* =========================
   Reusable ErrorMessage
========================= */
const ErrorMessage = ({ error }) => {
  const getMessage = (err) => {
    if (!err) return "Unknown error occurred";

    if (typeof err === "string") return err;

    if (err instanceof Error) return err.message;

    if (err?.statusText) return err.statusText;

    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  };

  return (
    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-sm font-mono break-all">
      {getMessage(error)}
    </div>
  );
};

/* =========================
   Error Page
========================= */
const Error = () => {
  const err = useRouteError();
  const is404 = err?.status === 404;

  if (import.meta.env.DEV) {
    console.error("Route Error:", err);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-950 p-6 text-center">
      <div className="max-w-md">
        <h1 className="text-9xl font-black text-indigo-600">
          {is404 ? "404" : "!"}
        </h1>

        <h2 className="text-2xl font-bold mt-4 dark:text-white">
          {is404 ? "Page Not Found" : "Something Went Wrong"}
        </h2>

        <ErrorMessage error={err} />

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Invalid route:{" "}
          <span className="font-mono">{window.location.pathname}</span>
        </p>

        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;