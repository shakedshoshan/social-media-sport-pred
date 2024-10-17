import { useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import useAuth from "../zustand/useAuth";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuth();  

	const signup = async ({ username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await axios.post("http://localhost:5000/api/auth/signup",  {username, password, confirmPassword, gender},
				{headers: { "Content-Type": "application/json" }},
			);

			const data = res.data;
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ username, password, confirmPassword, gender }) {
	if (!username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}