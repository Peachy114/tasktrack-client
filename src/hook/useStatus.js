import { useState } from "react";

export function useStatus() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const reset = () => {
        setError("");
        setSuccess(false);
    };

    const start = () => {
        setLoading(true);
        reset();
    };

    const done = () => setLoading(false);
    const fail = (message) => setError(message);
    const succeed = () => setSuccess(true);

    return { loading, error, success, start, done, fail, succeed };
}