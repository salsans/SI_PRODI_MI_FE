import { useNavigate } from "react-router-dom";

export default function BerandaIndex() {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleNavigateToMasterKategori = () => {
    navigate("/master-kategori"); // Navigasi ke halaman Master Kategori
  };

  const handleNavigateToMasterAbsen = () => {
    navigate("/master-absen"); // Navigasi ke halaman Master Absen
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white p-4">
        <span className="lead fw-medium">Welcome to Tefa Service</span>
      </div>
      <div className="card-body lead p-4">
        We are delighted to welcome you to Tefa Service. Trust us to fulfill all your care needs.
        <br />
        <button 
          className="btn btn-primary mt-3" 
          onClick={handleNavigateToMasterKategori} // Navigasi ke Master Kategori
        >
          Go to Master Kategori
        </button>
        <button 
          className="btn btn-secondary mt-3" 
          onClick={handleNavigateToMasterAbsen} // Navigasi ke Master Absen
        >
          Go to Master Absen
        </button>
      </div>
    </div>
  );
}
