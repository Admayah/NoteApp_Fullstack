import { GrDocumentText } from "react-icons/gr";

import "./style.css";

const Sidebar = () => {
  return (
    <div className="sidebar__container">
      <h2 className="logo">Notes App</h2>
      <div className="menu__item__wrapper">
        <div className="menu__item">
          <GrDocumentText color="#fff" size="32px" />
          <span>Notes</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
