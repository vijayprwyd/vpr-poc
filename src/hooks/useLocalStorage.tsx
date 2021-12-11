import React from "react";

export function useLocalStorageState<TValue>(
  key: string,
  defaultValue: TValue,
  castFromStorage = <TValue extends unknown>(val: TValue) => val,
): [TValue, React.Dispatch<React.SetStateAction<TValue>>] {
  const [state, setState] = React.useState<TValue>(() => {
    const storageValue = window.localStorage.getItem(key) || defaultValue;
    if (!storageValue) return defaultValue;
    return castFromStorage(storageValue as TValue);
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
