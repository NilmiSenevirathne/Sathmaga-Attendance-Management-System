import React, { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaChartLine, FaCog, FaShoppingCart, FaBox, FaUsers, FaMoneyBill, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = ({ accountType = 'admin', setAccountType }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const accountTypes = {
    admin: 'Administrator',
    manager: 'Manager',
    employee: 'Employee',
    customer: 'Customer'
  };

  const menuItems = {
    admin: [
      { name: 'Dashboard', icon: <FaChartLine />, path: '/dashboard' },
      { name: 'Users', icon: <FaUsers />, path: '/users' },
      { name: 'Products', icon: <FaBox />, path: '/products' },
      { name: 'Reports', icon: <FaFileAlt />, path: '/reports' },
      { name: 'Settings', icon: <FaCog />, path: '/settings' }
    ],
    manager: [
      { name: 'Dashboard', icon: <FaChartLine />, path: '/dashboard' },
      { name: 'Inventory', icon: <FaBox />, path: '/inventory' },
      { name: 'Sales', icon: <FaMoneyBill />, path: '/sales' },
      { name: 'Reports', icon: <FaFileAlt />, path: '/reports' }
    ],
    employee: [
      { name: 'Dashboard', icon: <FaChartLine />, path: '/dashboard' },
      { name: 'Orders', icon: <FaShoppingCart />, path: '/orders' },
      { name: 'Products', icon: <FaBox />, path: '/products' }
    ],
    customer: [
      { name: 'Dashboard', icon: <FaChartLine />, path: '/dashboard' },
      { name: 'My Orders', icon: <FaShoppingCart />, path: '/orders' },
      { name: 'Profile', icon: <FaUser />, path: '/profile' }
    ]
  };

  // Ensure accountType has a valid default and exists in menuItems
  const currentAccountType = Object.keys(menuItems).includes(accountType) 
    ? accountType 
    : 'admin';
  const currentMenuItems = menuItems[currentAccountType] || [];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleAccountChange = (newAccountType) => {
    if (Object.keys(menuItems).includes(newAccountType)) {
      setAccountType(newAccountType);
    } else {
      setAccountType('admin');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          {!isCollapsed && <h2>{accountTypes[currentAccountType]} Panel</h2>}
          <button className="collapse-btn" onClick={toggleSidebar}>
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        <div className="account-switcher">
          {!isCollapsed && <h4>Switch Account:</h4>}
          <div className="account-buttons">
            {Object.keys(accountTypes).map((type) => (
              <button
                key={type}
                className={`account-btn ${currentAccountType === type ? 'active' : ''}`}
                onClick={() => handleAccountChange(type)}
                title={accountTypes[type]}
              >
                {isCollapsed ? <FaUser /> : accountTypes[type].charAt(0)}
              </button>
            ))}
          </div>
        </div>

        <nav className="sidebar-menu">
          <ul>
            {currentMenuItems.map((item, index) => (
              <li key={index}>
                <a href={item.path} className="menu-item">
                  <span className="menu-icon">{item.icon}</span>
                  {!isCollapsed && <span className="menu-text">{item.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <a href="/logout" className="menu-item">
            <span className="menu-icon"><FaSignOutAlt /></span>
            {!isCollapsed && <span className="menu-text">Logout</span>}
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;