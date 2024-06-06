import {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from "react";
import "@/pages/profile/Profile.css";
import UserService from "@/services/UserService";
import Loader from "@/components/loader/Loader";
import axios from "axios";
import Picture from "@/assets/user.png";

interface ProfileProps {
  email: string;
  password: string;
  username: string;
  birthday: string;
  picture: string;
  role: Role;
  amount: number;
  active_subscription: Subscription | null;
}

interface Role {
  id: number | null;
  label: string;
}

interface Subscription {
  id: number;
  plan: {
    id: number;
    name: string;
    price: number;
    duration: string;
    description: string;
  };
  status: {
    id: number;
    label: string;
  };
  subscribed_at: string;
  renewed_at: string;
  started_at: string;
  ended_at: string;
}

const initialProfile: ProfileProps = {
  email: "",
  password: "",
  username: "",
  birthday: "",
  picture: "",
  role: { id: null, label: "" },
  amount: 0,
  active_subscription: null,
};

const Profile: FunctionComponent = () => {
  const [profile, setProfile] = useState<ProfileProps>(initialProfile);
  const [editableProfile, setEditableProfile] =
    useState<ProfileProps>(initialProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<{
    [key: string]: string;
  }>({});
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(
    null
  );
  const [creditAmount, setCreditAmount] = useState<number | null>(null);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [creditError, setCreditError] = useState<string | null>(null);
  const currentUserRole = useRef<string | null>(null);
  const currentUserId = useRef<string | null>(null);
  const flag = useRef(false);

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        currentUserId.current = payload.id;
        currentUserRole.current = payload.role;
      }

      try {
        setIsLoading(true);
        const profileData = await UserService.getProfile(currentUserId.current);
        setProfile(profileData);
        setEditableProfile(profileData);
        setIsLoading(false);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status !== 500
        )
          setGlobalError(error.response.data.message);
        else setGlobalError("Failed to fetch profile, please try again later");

        setIsLoading(false);
      }
    };

    if (flag.current === false) initializeUser();

    return () => {
      flag.current = true;
    };
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handleCreditAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d+(\.\d{0,2})?$/;
    if (regex.test(value)) {
      setCreditAmount(Number(value));
    }
  };

  const validateProfile = () => {
    const newErrors: { [key: string]: string } = {};
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!editableProfile.username) {
      newErrors.username = "Username is required";
    } else if (
      !usernameRegex.test(editableProfile.username) ||
      editableProfile.username.length < 3 ||
      editableProfile.username.length > 32
    ) {
      newErrors.username =
        "Username must be alphanumeric and between 3 and 32 characters long";
    }

    if (!editableProfile.birthday) {
      newErrors.birthday = "Birthday is required";
    } else if (new Date(editableProfile.birthday) >= new Date()) {
      newErrors.birthday = "Birthday cannot be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setGlobalError(null);
    if (!validateProfile()) return;

    try {
      const updatedProfile = await UserService.updateProfile(
        currentUserId.current,
        editableProfile
      );
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      )
        setGlobalError(error.response.data.message);
      else setGlobalError("Failed to update profile, please try again later");
    }
  };

  const handlePasswordPopupClick = () => {
    setShowPasswordPopup(true);
  };

  const closePasswordPopup = () => {
    setPasswordError(null);
    setPasswordErrors({});
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordPopup(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const validatePasswordChange = () => {
    const newErrors: { [key: string]: string } = {};
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%&*+<=>?@^_-]).{8,128}$/;

    if (!passwordRegex.test(passwords.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (! # $ % & * + - < = > ? @ ^ _)";
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async () => {
    setPasswordError(null);
    if (!validatePasswordChange()) return;

    try {
      await UserService.changePassword(currentUserId.current, {
        old_password: passwords.oldPassword,
        new_password: passwords.newPassword,
      });
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      closePasswordPopup();
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      )
        setPasswordError(error.response.data.message);
      else
        setPasswordError("Failed to change password, please try again later");
    }
  };

  const handleSubscriptionPopupClick = () => {
    setShowSubscriptionPopup(true);
  };

  const closeSubscriptionPopup = () => {
    setSubscriptionError(null);
    setShowSubscriptionPopup(false);
  };

  const handleCreditPopupClick = () => {
    setShowCreditPopup(true);
  };

  const closeCreditPopup = () => {
    setCreditError(null);
    setCreditAmount(null);
    setShowCreditPopup(false);
  };

  const handleSubscriptionSubmit = async () => {
    try {
      await UserService.subscribeUser(currentUserId.current);
      const profileData = await UserService.getProfile(currentUserId.current);
      setProfile(profileData);
      closeSubscriptionPopup();
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      )
        setSubscriptionError(error.response.data.message);
      else setSubscriptionError("Failed to subscribe, please try again later");
    }
  };

  const handleCreditSubmit = async () => {
    if (creditAmount === null || creditAmount <= 0) {
      setCreditError("Amount must be greater than zero and not empty.");
      return;
    }

    try {
      await UserService.creditUser(currentUserId.current, {
        amount: creditAmount,
      });
      const profileData = await UserService.getProfile(currentUserId.current);
      setProfile(profileData);
      closeCreditPopup();
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status !== 500
      )
        setCreditError(error.response.data.message);
      else setCreditError("Failed to credit account, please try again later");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (globalError === "User not found") {
    return <p>User not found</p>;
  }

  return (
    <div className="profile-page auth-page">
      <div className="profile-container">
        <div className="auth-container profile-left">
          <div className="profile-picture">
            <img src={Picture} alt="Profile" />
          </div>
          <div className="profile-name">
            <div className="username-container">
              <h2 className="username">{profile.username}</h2>
            </div>
            <span className="role">{profile.role.label}</span>
          </div>
          <p>{profile.email}</p>
          <p>Amount: ${profile.amount.toFixed(2)}</p>
          {profile.active_subscription ? (
            <p>
              Subscribed until:{" "}
              {new Date(
                profile.active_subscription.ended_at
              ).toLocaleDateString()}
            </p>
          ) : (
            <p>Not subscribed</p>
          )}
        </div>
        <div className="auth-container profile-right">
          {globalError && (
            <div className="error global-error">{globalError}</div>
          )}
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={editableProfile.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </label>
          <label>
            Birthday:
            <input
              type="date"
              name="birthday"
              value={editableProfile.birthday}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
            {errors.birthday && (
              <span className="error">{errors.birthday}</span>
            )}
          </label>
          {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
          <button
            className="change-password-button"
            onClick={handlePasswordPopupClick}
          >
            Change Password
          </button>
          <button
            className="subscribe-button"
            onClick={handleSubscriptionPopupClick}
          >
            Subscribe
          </button>
          <button className="credit-button" onClick={handleCreditPopupClick}>
            Credit Account
          </button>
        </div>
      </div>
      {showPasswordPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Change Password</h3>
            {passwordError && (
              <div className="error password-error">{passwordError}</div>
            )}
            <label>
              Old Password:
              <input
                type="password"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Old Password"
                required
              />
              {passwordErrors.oldPassword && (
                <span className="error">{passwordErrors.oldPassword}</span>
              )}
            </label>
            <label>
              New Password:
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
                required
              />
              {passwordErrors.newPassword && (
                <span className="error">{passwordErrors.newPassword}</span>
              )}
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
                required
              />
              {passwordErrors.confirmPassword && (
                <span className="error">{passwordErrors.confirmPassword}</span>
              )}
            </label>
            <div className="popup-buttons">
              <button className="close-button" onClick={closePasswordPopup}>
                Close
              </button>
              <button className="submit-button" onClick={handlePasswordSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {showSubscriptionPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Subscribe</h3>
            {subscriptionError && (
              <div className="error subscription-error">
                {subscriptionError}
              </div>
            )}
            <div className="popup-buttons">
              <button className="close-button" onClick={closeSubscriptionPopup}>
                Close
              </button>
              <button
                className="submit-button"
                onClick={handleSubscriptionSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {showCreditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Credit Account</h3>
            {creditError && (
              <div className="error credit-error">{creditError}</div>
            )}
            <label>
              Amount:
              <input
                type="number"
                value={creditAmount ?? ""}
                onChange={handleCreditAmountChange}
                required
              />
            </label>
            <div className="popup-buttons">
              <button className="close-button" onClick={closeCreditPopup}>
                Close
              </button>
              <button className="submit-button" onClick={handleCreditSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
