export type User = {
    firstName: string;
    lastName: string;
    id: number;
}

export type UserResponse = {
    totalCount: number;
    currentPage: number;
    users: Array<User>;
}

export function fakePromise(page: number, pageSize: number): Promise<UserResponse> {
    console.log('Invoked API')
    const users: Array<User> = Array.from({length: pageSize}).map((_, index) => ({
        firstName: `FN_${pageSize*(page-1)+index}`,
        lastName: `LN_${pageSize*(page-1)+index}`,
        id: pageSize*(page-1)+index,
    }));

    return new Promise((resolve) => setTimeout(() => resolve({
        totalCount: 105,
        currentPage: page,
        users,
    }), 2000));
}