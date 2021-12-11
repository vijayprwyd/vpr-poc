import { useCallback, useState } from "react";
import { fakePromise, UserResponse } from "./fakeApi";
import { useQuery } from "./useQuery";

export default function InfiniteScrollTablePagination() {
  const [page, setCurrentPage] = useState(0);
  const fetchUsers = useCallback(() => fakePromise(page, 10), [page]);

  const { loading, response } = useQuery<UserResponse>(fetchUsers);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={2}>Loading ... </td>
            </tr>
          ) : (
            <>
              {response?.users.map((user) => (
                <tr key={user.firstName}>
                  <td> {user.firstName} </td>
                  <td> {user.lastName} </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div>
        <button disabled={page === 0} onClick={() => setCurrentPage(page - 1)}>
          Previous
        </button>

        <button onClick={() => setCurrentPage(page + 1)}>Next</button>
      </div>
    </>
  );
}
