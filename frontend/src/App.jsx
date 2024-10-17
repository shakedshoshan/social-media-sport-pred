import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup"; // Updated casing to match the file name
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
// import { useAuthContext } from "./context/AuthContext";
import useAuth from "./zustand/useAuth";


function App() {
	const { authUser } = useAuth();
	// const authUser = getAuthUser();
  	
	return (
		<div className=' flex flex-col'>
			{authUser && <Header userName={authUser.username} userImage={authUser.profilePic} />}
			<div className='flex-grow p-4 flex items-center justify-center'>
				<Routes>
					<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
					<Route path='/profile' element={authUser ? <Profile /> : <Navigate to={"/login"} />} />
					<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
					<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;