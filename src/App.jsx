import StudentDashboard from './pages/StudentDashboard';
import { useAuth } from './utils/hooks/useAuth';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      {user && user.role === 'student' ? <StudentDashboard /> : <p>teacher</p>}
    </>
  );
};

export default App;
