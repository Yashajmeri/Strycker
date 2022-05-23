import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorOccur, setErrorOccur] = useState(false);
  const activeHttpRequest = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortctrl = new AbortController();
      activeHttpRequest.current.push(httpAbortctrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortctrl.signal,
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setErrorOccur(true);
        setIsLoading(false);
      }
   
      
    },
    []
  );
  const errorHandler = () => {
    setErrorOccur(false);
    
  };

  useEffect(() => {

    return () => {
      // eslint-disable-next-line
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort);
    };
  }, []);
  return { error, isLoading, sendRequest, errorOccur, errorHandler };
};
