import { useState, useEffect } from "react";
import { localesApi } from "../services/supabase";
import {Locale} from "../types"; // similar to storiesApi

export const useLocales = () => {
    const [locales, setLocales] = useState<Locale[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocales = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await localesApi.getAll();
                setLocales(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch locales");
                console.error("Error fetching locales:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLocales();
    }, []);

    return { locales, loading, error };
};