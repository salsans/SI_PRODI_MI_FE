import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarComponent = ({ children }) => {
  const navigate = useNavigate();

  const handleRoleClick = () => {
    navigate('/hakAksess');
  }

  const handleUserClick =() => {
    navigate('/users');
  }

  const handleStatusClick = () => {
    navigate('/statuses');
  }

  const handleKendaraanClick = () => {
    navigate('/kendaraans');
  }

  function addNewLayanan() {
    navigate('/add-layanan');
  }

  const handleLayananClick = () => {
    navigate('/layanans');
  }

  return (
    <>
      <header id="header" className="fixed-top" style={{ padding: '0', paddingBottom: '-150px' }}>
        {/* Your logo or additional elements go here */}
        <div className="additional-header-content">
          <div style={{ marginLeft: '20px' }}>
            <h1 style={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', fontSize: '30px', color: '#000000', marginTop: '30px', marginBottom: '25px' }}>TEFA</h1>
          </div>
        </div>

        <div className="navbar shadow-sm navbar-expand-xl navbar-dark p-0" style={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid #ccc' }}>
          <div className="container d-flex align-items-center">
            <div className="collapse navbar-collapse">
              <nav id="navbar" className="navbar" style={{ right: '-470px', fontFamily: 'Barlow', fontSize: '36px' }}>
                <ul className="d-flex justify-content-center align-items-center" style={{ gap: '20px', margin: '0', padding: '0' }}>
                  <li><a className="nav-link scrollto" href="#" style={{ fontSize: '21px', color: '#ff0000' }}>Dashboard</a></li>
                  <li><a className="nav-link scrollto" onClick={addNewLayanan} style={{ fontSize: '20px', color: '#ff0000' }}>Service</a></li>
                  {/* <li className="dropdown">
                    <a className="nav-link scrollto" href="#" style={{ fontSize: '21px', color: '#ff0000' }}>Service<i className="bi bi-chevron-down"></i></a>
                      <ul>
                        <li><a href="#" style={{ fontSize: '20px', color: '#ff0000' }}>Perbaikan</a></li>
                        <li><a href="#" style={{ fontSize: '20px', color: '#ff0000' }}>Perawatan Rutin</a></li>
                      </ul>
                  </li> */}
                  <li><a className="nav-link scrollto" href="#" onClick={handleKendaraanClick} style={{ fontSize: '20px', color: '#ff0000' }}>Profile</a></li>
                </ul>
                <i className="bi bi-list mobile-nav-toggle"></i>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <img src="public/Content/img/tefa.jpg" alt="Description of your image" style={{ width: '100%', height: '100', marginTop: '80px' }} />
      <div style={{ marginTop: '30px' }}>
        {children}
      </div>
    </>
  );
};

export default SidebarComponent;
