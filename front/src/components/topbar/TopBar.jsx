import "./topbar.css";
import { Avatar } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export default function TopBar({ user }) {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            {user ? (
              <Avatar alt="User" src={user.username || "U"} />
            ) : (
              <AccountCircle fontSize="large" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
