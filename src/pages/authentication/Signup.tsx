import { FunctionComponent, ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthService from "@/services/AuthService";
import "@/pages/authentication/Auth.css";
import axios from "axios";

const Signup: FunctionComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    role_id: 2,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [showActivationPopup, setShowActivationPopup] = useState(false);
  const [activationCode, setActivationCode] = useState("");
  const [activationError, setActivationError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%&*+<=>?@^_-]).{8,128}$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (formData.username.length < 3 || formData.username.length > 32) {
      newErrors.username = "Username must be between 3 and 32 characters long";
    }
    if (!usernameRegex.test(formData.username)) {
      newErrors.username =
        "Username must be alphanumeric with underscores allowed";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email should be valid";
    }
    if (formData.password.length < 8 || formData.password.length > 128) {
      newErrors.password = "Password must be between 8 and 128 characters long";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (! # $ % & * + - < = > ? @ ^ _)";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (new Date(formData.birthday) >= new Date()) {
      newErrors.birthday = "Birthday cannot be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalError(null);
    if (!validateForm()) return;

    try {
      await AuthService.signup(formData);
      setShowActivationPopup(true);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      )
        setGlobalError(error.response.data.message);
      else setGlobalError("Signup failed, please try again later");
    }
  };

  const handleActivate = async () => {
    try {
      await AuthService.activate(formData.email, activationCode);
      setShowActivationPopup(false);
      navigate("/authentication/login");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      )
        setActivationError(error.response.data.message);
      else setActivationError("Activation failed, please try again later");
    }
  };

  const handleResendActivationCode = async () => {
    try {
      await AuthService.resendActivationCode(formData.email);
      setActivationError("Activation code resent successfully");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      )
        setActivationError(error.response.data.message);
      else
        setActivationError(
          "Failed to resend activation code, please try again later"
        );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Signup</h2>
        {globalError && <div className="error global-error">{globalError}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Birthday:
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              required
            />
            {errors.birthday && (
              <span className="error">{errors.birthday}</span>
            )}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </label>
          <button type="submit">Signup</button>
        </form>
        <div className="auth-links">
          <p>
            Already have an account?{" "}
            <Link to="/authentication/login">Login here</Link>
          </p>
          <p>
            <Link to="/authentication/password/reset">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
      {showActivationPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Activate Account</h3>
            {activationError && (
              <div className="error global-error">{activationError}</div>
            )}
            <label>
              Activation Code:
              <input
                type="text"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                required
              />
            </label>
            <div className="popup-buttons">
              <button className="submit-button" onClick={handleActivate}>
                Activate
              </button>
              <button
                className="submit-button"
                onClick={handleResendActivationCode}
              >
                Resend Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
