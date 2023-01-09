import React, { useState, useCallback } from 'react';
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useHttpHook = () => {
   const [errorFromServer, setErrorFromServer] = useState(null)
   const [isLoading, setIsLoading] = useState(null)

   const sendRequest = useCallback(async (reqConfig, getResponseData) => {
      setIsLoading(true);
      setErrorFromServer(null);
      try {
         const response = await axios({
            method: reqConfig.method ? reqConfig.method : "get",
            url: `${BASE_URL}/${reqConfig.url}`,
            data: reqConfig.postData ? reqConfig.postData : {},
         });
         console.log(response.data, "FROM USEHTTP HOOK")
         getResponseData(response.data);

      } catch (err) {
         setErrorFromServer(err.response.data);
         console.log(err, "ERROR FROM USEHTTP HOOK")
      }
      setIsLoading(false);
   }, []);

   return {
      isLoading,
      errorFromServer,
      sendRequest,
   }

}

