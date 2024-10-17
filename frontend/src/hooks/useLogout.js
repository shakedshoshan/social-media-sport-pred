import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../zustand/useAuth";
import axios from "axios";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuth();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await axios.post("http://localhost:5000/api/auth/logout", {
				headers: { "Content-Type": "application/json" },
			});
			const data = res.data;
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
			// setAuthUser(null);	
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;