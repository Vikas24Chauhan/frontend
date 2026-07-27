import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      console.log("Login Response:", res);

      // Store JWT token
      localStorage.setItem("token", res.token);

      // Optional: Store user information
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success(res.message);

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || error.message || "Login failed",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <br />
      <br />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
