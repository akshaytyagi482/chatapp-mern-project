import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthcontext } from "./comtext/useAuth";


function App() {
  const {authuser} = useAuthcontext()
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authuser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authuser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authuser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;