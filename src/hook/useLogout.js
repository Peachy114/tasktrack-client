import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); 
    } catch (err) {
      console.error(err.message); 
    }
  };

  return logout;
};