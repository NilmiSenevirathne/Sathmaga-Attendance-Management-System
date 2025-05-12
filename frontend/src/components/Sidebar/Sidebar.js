import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaChartLine, FaCog, FaShoppingCart, FaBox, FaUsers, FaMoneyBill, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import './sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // Default role

  // Map role keys to readable names
  const accountTypes = {
    admin: 'Administrator',
    attendancemarker: 'Attendance Marker',
    teacher: 'Teacher',
  };

  // Define sidebar menu for each role
  const menuItems = {
    admin: [
      { name: 'Dashboard', icon: <FaChartLine />, path: '/dashboard' },
      { name: 'Users', icon: <FaUsers />, path: '/users' },
      { name: 'Products', icon: <FaBox />, path: '/products' },
      { name: 'Reports', icon: <FaFileAlt />, path: '/reports' },
      { name: 'Settings', icon: <FaCog />, path: '/settings' }
    ],
    attendancemarker: [
      { name: 'Dashboard', icon: <FaChartLine />, path: '/dashboard' },
      { name: 'Inventory', icon: <FaBox />, path: '/inventory' },
      { name: 'Sales', icon: <FaMoneyBill />, path: '/sales' },
      { name: 'Reports', icon: <FaFileAlt />, path: '/reports' }
    ],
    teacher: [
      { name: 'Dashboard', icon: <FaChartLine />, path: '/dashboard' },
      { name: 'Orders', icon: <FaShoppingCart />, path: '/orders' },
      { name: 'Products', icon: <FaBox />, path: '/products' }
    ]
  };

  // Load user role from local storage (or you can use Context/Redux instead)
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser?.role && menuItems[loggedInUser.role.toLowerCase()]) {
      setUserRole(loggedInUser.role.toLowerCase());
    } else {
      setUserRole('admin');
    }
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const currentMenuItems = menuItems[userRole] || [];

  return (
    <>
      {/* Mobile menu button */}
      <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          {!isCollapsed && (
            <>
              <h2>Sathmaga Institute</h2>
              <h4>{accountTypes[userRole]} Panel</h4>
            </>
          )}
          <button className="collapse-btn" onClick={toggleSidebar}>
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        {/* Sidebar menu */}
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

        {/* Logout button */}
        <div className="sidebar-footer">
          <a href="/login" className="menu-item">
            <span className="menu-icon"><FaSignOutAlt /></span>
            {!isCollapsed && <span className="menu-text">Logout</span>}
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
