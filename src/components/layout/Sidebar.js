import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div>
        <p className="sidebar__title">CRM Client</p>
      </div>
      <nav className="sidebar__nav">
        <li className="sidebar__list">
          <Link to="/clients" className="sidebar__link">
            Client
          </Link>
        </li>
        <li className="sidebar__list">
          <Link to="/orders" className="sidebar__link">
            Orders
          </Link>
        </li>
        <li className="sidebar__list">
          <Link to="/products" className="sidebar__link">
            Products
          </Link>
        </li>
        <li className="sidebar__list sidebar__list--special">
          <Link to="/topclients" className="sidebar__link">
            Top Client
          </Link>
        </li>
        <li className="sidebar__list sidebar__list--special">
          <Link to="/topsellers" className="sidebar__link">
            Top Sellers
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
