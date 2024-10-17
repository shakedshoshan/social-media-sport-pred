import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='scale-110 bg-red-500 flex items-center'>
			{!loading ? (
				<>
					<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
					<span className='ml-2 text-white cursor-pointer' onClick={logout}>Logout</span>
				</>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;