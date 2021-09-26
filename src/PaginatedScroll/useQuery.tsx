import { useState, useEffect } from "react";

export function useQuery<TData>(
  promiseFn: () => Promise<TData | null>
): {
  loading: boolean;
  response: TData | null;
  error: any;
} {
  const [apiState, setApiState] = useState<{
    response: TData | null;
    loading: boolean;
    error: any;
  }>({
    response: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setApiState((apiState) =>({
          ...apiState,
          loading: true,
        }));

        const response = await promiseFn();
        setApiState( () => ({
          response,
          loading: false,
          error: null,
        }));
      } catch (error: any) {
        setApiState(() => ({
          loading: false,
          response: null,
          error,
        }));
      }
    }
    fetchData();
  }, [promiseFn]);

  return apiState;
}
