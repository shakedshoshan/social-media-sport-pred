import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import useAuth from "./zustand/useAuth";
import MyTables from "./pages/MyTables";
import Group from "./pages/Group";
function App() {
	const { authUser } = useAuth();
	
	return (
		<div className='flex flex-col w-full'>
			{authUser && <Header userName={authUser.username} userImage={authUser.profilePic} />}
			<div className='flex-grow w-full mt-20 bg-gray-100'>
				<Routes>
					<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
					<Route path='/profile' element={authUser ? <Profile /> : <Navigate to={"/login"} />} />
					<Route path='/mytables' element={authUser ? <MyTables /> : <Navigate to={"/login"} />} />
					<Route path='/group/:id' element={authUser ? <Group /> : <Navigate to={"/login"} />} />
					<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
					<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;