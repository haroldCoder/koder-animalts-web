export const userExistLocalData = (): boolean => {
    const user = localStorage.getItem('user');
    return user ? true : false;
}