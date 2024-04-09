import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
export default function CreateUser() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username === "") return;
    dispatch(updateName({ username }));
    navigate("/menu");
    setUsername("");
  }

  const globalUsername = user?.username;

  return (
    <form onSubmit={handleSubmit}>
      <p
        className={`mb-4 text-sm text-stone-600 md:text-base ${globalUsername && "hidden"}`}
      >
        👋 Welcome! Please start by telling us your name:
      </p>

      {globalUsername === "" && (
        <input
          type="text"
          placeholder="Your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`input mb-8 w-72 `}
        />
      )}

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}

      {globalUsername !== "" && (
        <Button type={"primary"} to="/menu">
          Continue ordering, {globalUsername}
        </Button>
      )}
    </form>
  );
}
