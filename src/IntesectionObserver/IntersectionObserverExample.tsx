import  { useCallback, useEffect, useRef, useState } from "react";
import { fakePromise, User, UserResponse } from "../PaginatedScroll/fakeApi";
import { useQuery } from "../PaginatedScroll/useQuery";
import "./infiniteScroll.css";
import { useIntersect } from "./useIntersect";

const LIST_SIZE = 20;
const PREFETCH_WINDOW_SIZE = 10;

export function InfiniteScroll() {
  let endRef = useRef<HTMLDivElement>(null);
  let startRef = useRef<HTMLDivElement>(null);

  const [pageToFetch, setPageToFetch] = useState(1);
  const [users, setUsers] = useState<Array<User>>([]);
  const fetchUsers = useCallback(() => fakePromise(pageToFetch, LIST_SIZE), [pageToFetch]);

  const { loading, response } = useQuery<UserResponse>(fetchUsers); // Whenever page changes, fetch is executed 

  const { currentWindow, getElementProps } = useIntersect({
    startRef,
    endRef,
    listSize: LIST_SIZE,
    endIndex: users.length,
    prefetchWindowSize: PREFETCH_WINDOW_SIZE,
  });

  useEffect(() => {
    const nextPage = Math.floor(currentWindow.end / LIST_SIZE) + 1;

    if (nextPage > pageToFetch) {
      setPageToFetch(nextPage);
    }
  }, [currentWindow.end, pageToFetch]);

  useEffect(() => {
    setUsers((users) => [...users, ...(response?.users || [])]);
  }, [response?.users]);

  let updatedArray =
    users.slice(
      currentWindow.start,
      currentWindow.end > (response?.totalCount || 0) ? response?.totalCount : currentWindow.end
    ) || [];

  return (
    <div className="table">
      {updatedArray.map((ele, index) => (
        <div key={ele.id} {...getElementProps(index)} className="table-data">
          Element {ele.id}
        </div>
      ))}
      {loading && <div className="table-data">Loading...</div>}
    </div>
  );
}
