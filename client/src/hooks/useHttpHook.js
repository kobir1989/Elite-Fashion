import React, { useState, useCallback } from 'react';
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useHttpHook = () => {
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null)

   const sendRequest = useCallback(async (reqConfig, getData) => {
      setIsLoading(true);
      setError(null);
      try {
         const response = await axios({
            method: reqConfig.method ? reqConfig.method : "get",
            url: `${BASE_URL}/${reqConfig.url}`,
            postData: reqConfig.postData ? reqConfig.postData : {},
         });
         if (response.status !== 200) {
            throw new Error("Request failed");
         };
         console.log(response.data)
         getData(response.data);

      } catch (err) {
         setError(err.message);
      }
      setIsLoading(false);
   }, []);

   return {
      isLoading,
      error,
      sendRequest
   }

}

