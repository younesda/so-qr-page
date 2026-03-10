import { useCallback, useEffect, useState } from "react";
import { businessApi } from "@/services/businessApi";

interface Business {
  id: string;
  name: string;
  slug: string;
  email?: string;
  phone?: string;
  accentColor: string;
  isPublished: boolean;
  scansCount: number;
  visitsCount: number;
  [key: string]: unknown;
}

export const useBusinesses = () => {
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await businessApi.getAll();
      setItems(Array.isArray(data) ? data : data.businesses || []);
    } catch {
      setError("Impossible de charger les entreprises.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, loading, error, refresh };
};
