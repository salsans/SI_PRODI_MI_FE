import React from 'react';

const HeaderComponent = () => {
  return (
    <header>
        <meta charSet="UTF-8" />
        
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="keywords" />    
        
        {/* Favicons */}
        <link href="public/assets/img/AstraTech.png" rel="icon"></link>
        <title>Tefa || User side</title>

        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Barlow" rel="stylesheet" />
  
        {/* Vendor CSS Files */}
        <link href="public/Content/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
        <link href="public/Content/vendor/animate.css/animate.min.css" rel="stylesheet" />
        <link href="public/Content/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="public/Content/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="public/Content/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
        <link href="public/Content/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
        <link href="public/Content/vendor/remixicon/remixicon.css" rel="stylesheet" />
        <link href="public/Content/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
    
        {/* Template Main CSS File */}
        <link href="public/Content/css/style.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.dataTables.min.css" />
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    
        {/* Bootstrap JS */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      
    </header>
  );
};

export default HeaderComponent;