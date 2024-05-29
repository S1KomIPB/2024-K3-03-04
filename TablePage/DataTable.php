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
    <div class="container pt-5">
        <h2>Data Tanaman</h2>
        <div class="container">

            <div class="searchBar">
                <input type="text" id="searchInput" class="form-control" placeholder="Cari Tanaman ...">
            </div>


            <table class="table">
                <thead>
                    <tr>
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