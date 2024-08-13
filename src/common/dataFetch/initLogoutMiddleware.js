import { useEffect } from "react";
import { fetchServer, HTTPError } from "@common/dataFetch/fetchServer.js";

export default function useLogoutMiddleware(logout) {
  useEffect(() => {
    function middleware({ error }, next) {
      if (error instanceof HTTPError && error.status === 401) {
        logout();
      }
      next();
    }

    fetchServer.use(middleware);
    return () => fetchServer.unuse(middleware);
  }, [logout]);
}
