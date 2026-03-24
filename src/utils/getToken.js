import { auth } from "../firebase";

export const getToken = async () => {
    if(!auth.currentUser) throw new Error('No user logged in.');
    return await auth.currentUser.getIdToken();
}