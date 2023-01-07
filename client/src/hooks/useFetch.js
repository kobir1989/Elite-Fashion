// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const useFetch = (url) => {
//    const [data, setData] = useState([])
//    const [error, setError] = useState(null)
//    const [loading, setLoading] = useState(false)
//    useEffect(() => {
//       (async () => {
//          try {
//             setLoading(true)
//             const response = await axios.get(`${BASE_URL}/${url}`)
//             setData(response.data)
//          } catch (err) {
//             setError(err)
//          } finally {
//             setLoading(false)
//          }
//       }
//       )()

//    }, [url])
//    return { data, error, loading };
// }

