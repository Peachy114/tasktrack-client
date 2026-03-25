import { useState, useCallback } from "react";
import { getToken } from "../utils/getToken";

export function useFetch(serviceFn) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetch = useCallback(async (...args) => {
        try {
            setLoading(true);
            const token = await getToken();
            const result = await serviceFn(token, ...args);
            setData(Array.isArray(result) ? result : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [serviceFn]);

    return { data, loading, error, fetch }
}