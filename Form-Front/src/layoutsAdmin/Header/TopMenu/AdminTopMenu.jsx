import {
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const AdminTopMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="wrapper flex justify-between">
        <nav>
          <input type="checkbox" id="show-menu" />
          <label htmlFor="show-menu" className="menu-icon">
            <MenuFoldOutlined className="text-subtitle1" />
          </label>

          <div className="nav-content">
            <ul className="links">
              <li>
                <Link to="/dashboard" className={`${currentPath === `/dashboard` ? "activeMenu" : ""}`}>Dashboard</Link>
              </li>
              <li>
                <Link to="/applyonline" className={`${currentPath === `/applyonline` ? "activeMenu" : ""}`}>Apply online</Link>
              </li>
              <li>
                <Link to="/">My Application</Link>
              </li>
              <li>
                <Link to="/">Report</Link>
              </li>
              <li>
                <Link to="/">Profile</Link>
              </li>
              <li>
                <Link to="/">Create ticket</Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* <div className="flex items-center lg:hidden">
          <AccountDetail />
        </div> */}
      </div>
    </>
  );
};

export default AdminTopMenu;
