import "./App.css";
import { useUserfront } from "@userfront/react";
import Login from "./_components/Login";

function App() {
  const { isAuthenticated, isLoading, user } = useUserfront();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>Welcome, {user.email}!</>;
}

export default App;
