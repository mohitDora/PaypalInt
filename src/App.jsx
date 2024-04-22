import { Routes,Route } from 'react-router-dom'
import './App.css'
import { LoginForm } from './Login'
import { Signup } from './Signup'
import CardLayout from './Cardlayout'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import app from './firebase'
import ProtectedRoute from './ProtectedRoute'

function App() {
  const [user, setUser] = useState(null);
  const [fetching,setfetching]=useState(false)
  useEffect(() => {
    setfetching(true)
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
        setfetching(false)
        return
      }
      setUser(null)
      setfetching(false)
    });
    
    // Clean up subscription
    return () => unsubscribe();
  }, []);

if(fetching){
  return <h2>validating</h2>
}
  return (
    <>
      <Routes>
        
        <Route path="/" element={<ProtectedRoute user={user}>
          <CardLayout></CardLayout>
        </ProtectedRoute>}/>
        <Route path="/signin" element={<LoginForm user={user}></LoginForm>}/>
        <Route path="/signup" element={<Signup user={user}></Signup>}/>
      </Routes>
    </>
  )
}

export default App
