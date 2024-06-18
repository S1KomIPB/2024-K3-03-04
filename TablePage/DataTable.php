<?php
include '../configuration.php';
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="StyleTable.css">

    <title>DataTable</title>
</head>

<body class="body">
    <nav class="navbar">
        <div class="navbar-container">
            <div class="left-section">
                <span class="logo">WebGIS</span>
            </div>
            <div class="center-section">
                <a href="../index.php" class="nav-link">HomePage</a>
                <a href="../Map/map.html" class="nav-link">Map</a>
                <a href="DataTable.php" class="nav-link">Table</a>
                <a href="#" class="nav-link">About Us</a>
            </div>
            <div class="right-section">
                <div class="welcome-text">Welcome</div>
            </div>
        </div>
    </nav>
    <div class="container">

        <h2 class="Title pt-4">Data Tanaman</h2>

        <div class="container">

            <div class="rowmb-3">
                <div class="col-md-6 d-flex align-items-center">
                    <div class="col-md-9 me-2">
                        <label for="qFilterByName">Filter berdasarkan Nama:</label>
                        <input type="text" class="form-control" id="searchInput" placeholder="Cari Tanaman ...">
                    </div>
                    <div class="col-md-6 me-2">
                        <label for="locationFilter">Lokasi:</label>
                        <select class="form-select styled-select" id="locationFilter">
                            <option value="">All</option>
                            <option value="CCR">CCR</option>
                            <option value="FAPERTA">FAPERTA</option>
                            <option value="FAHUTAN">FAHUTAN</option>
                            <option value="FMIPA">FMIPA</option>
                            <option value="AHN">AHN</option>
                            <option value="BARA">BARA</option>
                            <option value="GYMNAS">GYMNAS</option>
                            <!-- Add more options as needed -->
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="typeFilter">Jenis Tanaman:</label>
                        <select class="form-select styled-select" id="typeFilter">
                            <option value="">All</option>
                            <option value="Hias">Hias</option>
                            <option value="Pangan">Pangan</option>
                            <option value="Industri">Industri</option>
                            <option value="Buah">Buah</option>
                            <option value="Sayur">Sayur</option>
                            <!-- Add more options as needed -->
                        </select>
                    </div>

                    <div style="
    display: flex;
    flex-direction: row-reverse;
" class="col-md-10" display:="">
                        <div id="pageInfo" style="
    border-radius: 24px;
    border: 1px solid var(--Gray-20, #F3F4F6);
    background: var(--color3);
    padding: 6px;
    margin-top: 24px;
    display: inline-block;
    /* transform: translateX(100px); */
    font-size: 14px;
">1-10 of 31 pages</div>
                        <div class="col-md-4 me-2">
                            <div class="item-per-page-wrapper">
                                <label for="item-per-page-wrapper">Item per page:</label>
                                <select class="form-select styled-select" id="item-per-page-wrapper">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>



                    </div>
                </div>



                <div class="ver"></div>
                <div class="prev">
                    <span class="arrow">&lt;</span> <!-- Panah previous "<" -->
                </div>
                <div class="next">
                    <span class="arrow">&gt;</span> <!-- Panah next ">" -->
                </div>
            </div>



            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">GID</th>
                        <th scope="col">ID</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Nama Latin</th>
                        <th scope="col">Jenis Tanaman</th>
                        <th scope="col">Lokasi</th>
                        <th scope="col">Foto URL</th>
                    </tr>
                </thead>

                <tbody id="dataTableBody">
                    <?php
                    $queryTable = pg_query($dbconn, "SELECT * FROM ipb_biodiversity"); // change based on your table
                    while ($listPlantData = pg_fetch_array($queryTable)) {
                        echo "<tr>";
                        echo "<td>" . $listPlantData["id"] . "</td>";
                        echo "<td>" . $listPlantData["Nama"] . "</td>";
                        echo "<td>" . $listPlantData["Nama_Latin"] . "</td>";
                        echo "<td>" . $listPlantData["Kategori"] . "</td>";
                        echo "<td>" . $listPlantData["Lokasi"] . "</td>";
                        echo "<td>";
                        echo "<img src = " . $listPlantData["Foto_URL"] . " width= 145px height= 145px style= 'border-radius: 10px; object-fit: cover;'  />";
                        echo "</td>";
                        echo "</tr>";
                    }
                    ?>


                </tbody>
            </table>
        </div>

        <script src="DataTable.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
            integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
            integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
            crossorigin="anonymous"></script>
</body>

</html>