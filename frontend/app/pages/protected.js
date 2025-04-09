// components/ProtectedPage.js
"use client"
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import ImageUpload from './imageupload';

const ProtectedPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push('/login'); // Redirect to login page if not authenticated
    return null;
  }

  return ( 
      <ImageUpload/>
);
};

export default ProtectedPage;
