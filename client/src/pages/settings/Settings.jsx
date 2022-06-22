import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [marital_status, setmarital_status] = useState("");
  const [birthday, setbirthday] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Username: </label>
          <label
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          >{user.username}</label>
          <label>Email: </label>
          <label
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          >{user.email}</label>
          <label>first_name: </label>
          <label
            type="first_name"
            placeholder={user.first_name}
            onChange={(e) => setfirst_name(e.target.value)}
          >{user.first_name}</label>
          <label>last_name: </label>
          <label
            type="last_name"
            placeholder={user.last_name}
            onChange={(e) => setlast_name(e.target.value)}
          >{user.last_name}</label>
          <label>marital_status: </label>
          <label
            type="marital_status"
            placeholder={user.marital_status}
            onChange={(e) => setmarital_status(e.target.value)}
          >{user.marital_status}</label>
          <label>birthday: </label>
          <label
            type="date"
            placeholder={user.birthday}
            onChange={(e) => setbirthday(e.target.value)}
          >{user.birthday}</label>
        </form>
      </div>

    </div>
  );
}