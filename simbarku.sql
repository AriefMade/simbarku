-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 21, 2025 at 09:12 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simbarku`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_user` int NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_user`, `username`, `password`) VALUES
(1, 'arief', 'arief123'),
(2, 'I Gusti Ngurah Artha', 'bali123'),
(3, 'I Wayan Adiwiyata', 'bali123'),
(4, 'I Ketut Sudarsana', 'bali123'),
(5, 'I Nyoman Wijaya', 'bali123'),
(6, 'I Made Sukadana', 'bali123');

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `id_pesan` int NOT NULL,
  `isi_pesan` text NOT NULL,
  `gambar_simbar_user` blob,
  `kategori` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `forum`
--

INSERT INTO `forum` (`id_pesan`, `isi_pesan`, `gambar_simbar_user`, `kategori`) VALUES
(1, 'Ini adalah isi pesan forum ke-1', NULL, 'Identifikasi'),
(2, 'Ini adalah isi pesan forum ke-2', NULL, 'Harga'),
(3, 'Ini adalah isi pesan forum ke-3', NULL, 'Media Tanam'),
(4, 'Ini adalah isi pesan forum ke-4', NULL, 'Penyakit'),
(5, 'Ini adalah isi pesan forum ke-5', NULL, 'Perawatan');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `image_url` text NOT NULL,
  `name` text NOT NULL,
  `kategori` varchar(100) NOT NULL,
  `status` enum('active','inactive','archived') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `available_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `image_url`, `name`, `kategori`, `status`, `price`, `stock`, `available_at`) VALUES
(1, '/products/platycerium-andinum.jpg', 'Platycerium Andinum', '', 'active', '139763.00', 16, '2025-04-02 09:51:23'),
(2, '/products/platycerium-bifurcatum.jpg', 'Platycerium Bifurcatum', '', 'active', '93168.00', 8, '2024-12-07 18:25:02'),
(3, '/products/platycerium-veitchii.jpg', 'Platycerium Veitchii', '', 'archived', '275679.00', 17, '2024-08-28 04:58:12'),
(4, '/products/platycerium-hillii.jpg', 'Platycerium Hillii', '', 'active', '234105.00', 16, '2025-03-28 20:00:14'),
(5, '/products/platycerium-elephantotis.jpg', 'Platycerium Elephantotis', '', 'inactive', '143985.00', 7, '2025-05-09 05:11:22'),
(6, '/products/platycerium-coronarium.jpg', 'Platycerium Coronarium', '', 'active', '96003.00', 5, '2024-06-21 09:10:31'),
(7, '/products/platycerium-ridleyi.jpg', 'Platycerium Ridleyi', '', 'inactive', '245677.00', 20, '2024-09-24 08:19:33'),
(8, '/products/platycerium-superbum.jpg', 'Platycerium Superbum', '', 'inactive', '79018.00', 17, '2024-10-01 07:27:56'),
(9, '/products/platycerium-grande.jpg', 'Platycerium Grande', '', 'archived', '226726.00', 1, '2024-11-15 23:59:29'),
(10, '/products/platycerium-stemaria.jpg', 'Platycerium Stemaria', '', 'inactive', '140211.00', 13, '2025-02-12 09:48:38'),
(11, '/products/platycerium-vassei.jpg', 'Platycerium Vassei', '', 'archived', '214472.00', 1, '2025-02-07 06:22:05'),
(12, '/products/platycerium-madagascariensis.jpg', 'Platycerium Madagascariensis', '', 'inactive', '88628.00', 3, '2024-06-12 21:40:38'),
(13, '/products/platycerium-alcicorne.jpg', 'Platycerium Alcicorne', '', 'archived', '234722.00', 15, '2024-12-09 03:03:38'),
(14, '/products/platycerium-wallichii.jpg', 'Platycerium Wallichii', '', 'archived', '208217.00', 4, '2024-12-17 17:59:25'),
(15, '/products/platycerium-holttumii.jpg', 'Platycerium Holttumii', '', 'archived', '168660.00', 17, '2024-12-22 16:45:06'),
(16, '/products/platycerium-quadridichotomum.jpg', 'Platycerium Quadridichotomum', '', 'archived', '141936.00', 6, '2024-07-25 01:56:48'),
(17, '/products/platycerium-mayii.jpg', 'Platycerium Mayii', '', 'inactive', '208085.00', 16, '2024-12-21 00:15:31'),
(18, '/products/platycerium-mountlewis.jpg', 'Platycerium MountLewis', '', 'archived', '114982.00', 11, '2025-05-07 10:49:59'),
(19, '/products/platycerium-wandae.jpg', 'Platycerium Wandae', '', 'active', '131581.00', 2, '2024-10-27 23:52:53'),
(20, '/products/platycerium-elephantotis-variegata.jpg', 'Platycerium Elephantotis Variegata', '', 'inactive', '97063.00', 1, '2025-04-25 18:37:15'),
(21, '/products/platycerium-andinum.jpg', 'Platycerium Andinum', '', 'active', '139763.00', 16, '2025-04-02 09:51:23'),
(22, '/products/platycerium-bifurcatum.jpg', 'Platycerium Bifurcatum', '', 'active', '93168.00', 8, '2024-12-07 18:25:02'),
(23, '/products/platycerium-veitchii.jpg', 'Platycerium Veitchii', '', 'archived', '275679.00', 17, '2024-08-28 04:58:12'),
(24, '/products/platycerium-hillii.jpg', 'Platycerium Hillii', '', 'active', '234105.00', 16, '2025-03-28 20:00:14'),
(25, '/products/platycerium-elephantotis.jpg', 'Platycerium Elephantotis', '', 'inactive', '143985.00', 7, '2025-05-09 05:11:22'),
(26, '/products/platycerium-coronarium.jpg', 'Platycerium Coronarium', '', 'active', '96003.00', 5, '2024-06-21 09:10:31'),
(27, '/products/platycerium-ridleyi.jpg', 'Platycerium Ridleyi', '', 'inactive', '245677.00', 20, '2024-09-24 08:19:33'),
(28, '/products/platycerium-superbum.jpg', 'Platycerium Superbum', '', 'inactive', '79018.00', 17, '2024-10-01 07:27:56'),
(29, '/products/platycerium-grande.jpg', 'Platycerium Grande', '', 'archived', '226726.00', 1, '2024-11-15 23:59:29'),
(30, '/products/platycerium-stemaria.jpg', 'Platycerium Stemaria', '', 'inactive', '140211.00', 13, '2025-02-12 09:48:38'),
(31, '/products/platycerium-vassei.jpg', 'Platycerium Vassei', '', 'archived', '214472.00', 1, '2025-02-07 06:22:05'),
(32, '/products/platycerium-madagascariensis.jpg', 'Platycerium Madagascariensis', '', 'inactive', '88628.00', 3, '2024-06-12 21:40:38'),
(33, '/products/platycerium-alcicorne.jpg', 'Platycerium Alcicorne', '', 'archived', '234722.00', 15, '2024-12-09 03:03:38'),
(34, '/products/platycerium-wallichii.jpg', 'Platycerium Wallichii', '', 'archived', '208217.00', 4, '2024-12-17 17:59:25'),
(35, '/products/platycerium-holttumii.jpg', 'Platycerium Holttumii', '', 'archived', '168660.00', 17, '2024-12-22 16:45:06'),
(36, '/products/platycerium-quadridichotomum.jpg', 'Platycerium Quadridichotomum', '', 'archived', '141936.00', 6, '2024-07-25 01:56:48'),
(37, '/products/platycerium-mayii.jpg', 'Platycerium Mayii', '', 'inactive', '208085.00', 16, '2024-12-21 00:15:31'),
(38, '/products/platycerium-mountlewis.jpg', 'Platycerium MountLewis', '', 'archived', '114982.00', 11, '2025-05-07 10:49:59'),
(39, '/products/platycerium-wandae.jpg', 'Platycerium Wandae', '', 'active', '131581.00', 2, '2024-10-27 23:52:53'),
(40, '/products/platycerium-elephantotis-variegata.jpg', 'Platycerium Elephantotis Variegata', '', 'inactive', '97063.00', 1, '2025-04-25 18:37:15');

-- --------------------------------------------------------

--
-- Table structure for table `testimoni`
--

CREATE TABLE `testimoni` (
  `id_testimoni` int NOT NULL,
  `nama` text NOT NULL,
  `deskripsi` text NOT NULL,
  `rating` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `testimoni`
--

INSERT INTO `testimoni` (`id_testimoni`, `nama`, `deskripsi`, `rating`) VALUES
(1, 'User1', 'Tanaman simbar menjangnya tumbuh dengan baik dan cepat. Sangat puas dengan pembelian ini!', 4),
(2, 'User2', 'Pengiriman cepat dan pengemasan sangat baik. Simbar datang dalam kondisi prima.', 4),
(3, 'User3', 'Platycerium yang saya beli tumbuh subur. Pelayanan toko juga ramah dan informatif.', 5),
(4, 'User4', 'Kualitas tanaman luar biasa! Sudah 3 bulan dan simbar saya tetap sehat dan mulai membentuk antler baru.', 5),
(5, 'User5', 'Sangat senang dengan Platycerium Superbum yang saya beli. Ukurannya sesuai deskripsi dan kondisinya prima.', 5),
(6, 'User6', 'Simbar datang dengan beberapa daun kering. Tapi masih hidup dan mulai beradaptasi sekarang.', 3),
(7, 'User7', 'Media tanam yang digunakan sangat cocok untuk simbar. Akarnya berkembang baik setelah 1 bulan.', 4),
(8, 'User8', 'Harga sebanding dengan kualitas. Simbar jauh lebih besar dari yang saya bayangkan!', 4),
(9, 'User9', 'Platycerium Bifurcatum yang saya beli sangat sehat. Sudah menghasilkan 2 anakan dalam 6 bulan.', 5),
(10, 'User10', 'Daun-daun simbar hijau cerah dan tidak ada hama. Terima kasih untuk layanannya yang profesional.', 4),
(11, 'User11', 'Panduan perawatan yang diberikan sangat membantu untuk pemula seperti saya. Tanaman tumbuh dengan baik.', 4),
(12, 'User12', 'Koleksi Platycerium saya bertambah dengan spesies langka ini. Kondisinya istimewa!', 5),
(13, 'User13', 'Pengiriman agak lama dan ada sedikit kerusakan, tapi tanaman masih bisa diselamatkan.', 3),
(14, 'User14', 'Simbar Grande yang saya beli tumbuh sangat cepat. Dalam 4 bulan ukurannya sudah dua kali lipat!', 5),
(15, 'User15', 'Pelayanan luar biasa. Ada tanaman yang kurang sehat dan langsung diganti dengan yang baru.', 5),
(16, 'User16', 'Tanaman ini menjadi pusat perhatian di ruang tamu saya. Simbar menjadi favorit tamu-tamu yang berkunjung!', 5),
(17, 'User17', 'Variegata pada Platycerium saya sangat jelas dan indah. Sangat puas dengan pembelian ini.', 5),
(18, 'User18', 'Ukuran lebih kecil dari yang saya harapkan, tapi setidaknya tanaman sehat.', 3),
(19, 'User19', 'Warna dan bentuk simbar sangat bagus. Sudah berhasil bertahan dan beradaptasi di rumah saya.', 4),
(20, 'User20', 'Platycerium Andinum yang langka ini kondisinya luar biasa saat tiba. Worth every penny!', 5),
(21, 'User21', 'Mounting kit yang disertakan sangat berguna. Sekarang simbar menempel sempurna di papan kayu.', 5),
(22, 'User22', 'Simbar induk dengan 3 anakan. Benar-benar bonus yang menyenangkan! Sangat merekomendasikan toko ini.', 5),
(23, 'User23', 'Customer service sangat membantu dalam memilih jenis simbar yang cocok untuk kondisi rumah saya.', 5),
(24, 'User24', 'Struktur daun sangat eksotis dan sehat. Sudah 6 bulan dan tetap tumbuh dengan baik.', 5),
(25, 'User25', 'Pengiriman cepat dan simbar masih segar saat tiba. Beberapa minggu dan sudah mulai beradaptasi.', 4),
(26, 'User26', 'Beberapa daun steril rusak saat pengiriman, tapi secara keseluruhan tanaman masih hidup.', 3),
(27, 'User27', 'Agak kesulitan merawat di awal, butuh beberapa penyesuaian. Mungkin perlu panduan lebih detail.', 3),
(28, 'User28', 'Kualitas simbar sangat bagus untuk harga segini. Sudah mulai menumbuhkan daun baru!', 4),
(29, 'User29', 'Tanaman datang dengan pot yang cantik. Kombinasi yang sempurna untuk display indoor.', 4),
(30, 'User30', 'Simbar hidup tapi pertumbuhan lambat. Mungkin butuh waktu beradaptasi lebih lama.', 3);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int NOT NULL,
  `id_user` int NOT NULL,
  `harga` int NOT NULL,
  `tanggal` date NOT NULL,
  `status` enum('completed','pending','canceled') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_user`, `harga`, `tanggal`, `status`) VALUES
(1, 3, 135660, '2024-09-05', 'completed'),
(2, 5, 202022, '2024-09-10', 'completed'),
(3, 2, 228317, '2025-03-01', 'completed'),
(4, 5, 111909, '2024-10-17', 'completed'),
(5, 3, 214816, '2025-01-29', 'completed'),
(6, 2, 201222, '2024-08-08', 'completed'),
(7, 3, 173600, '2025-05-08', 'completed'),
(8, 3, 281953, '2024-09-22', 'completed'),
(9, 5, 245735, '2024-10-29', 'completed'),
(10, 4, 289055, '2024-09-12', 'completed'),
(11, 3, 160610, '2025-03-15', 'completed'),
(12, 1, 205303, '2025-02-16', 'completed'),
(13, 1, 108886, '2025-03-21', 'completed'),
(14, 3, 186165, '2024-07-03', 'completed'),
(15, 1, 294324, '2024-12-19', 'completed'),
(16, 3, 144429, '2024-11-26', 'pending'),
(17, 1, 107420, '2025-01-17', 'pending'),
(18, 1, 116374, '2024-06-01', 'pending'),
(19, 4, 127729, '2025-04-26', 'pending'),
(20, 4, 268426, '2024-10-18', 'pending'),
(21, 4, 175952, '2024-10-09', 'pending'),
(22, 3, 166390, '2024-11-25', 'pending'),
(23, 1, 260834, '2024-06-18', 'pending'),
(24, 2, 101356, '2024-06-13', 'pending'),
(25, 2, 213823, '2024-08-12', 'pending'),
(26, 1, 272973, '2024-11-21', 'canceled'),
(27, 3, 274323, '2024-07-04', 'canceled'),
(28, 1, 237692, '2025-05-21', 'canceled'),
(29, 5, 140419, '2024-11-27', 'canceled'),
(30, 4, 148240, '2024-09-05', 'canceled');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `nama` varchar(30) NOT NULL,
  `no_telp` varchar(32) NOT NULL,
  `alamat` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `no_telp`, `alamat`, `email`) VALUES
(1, 'I Wayan Suteja', '85076053442', 'Jl. Raya Kuta No. 88, Kuta, Badung, Bali', 'wayansuteja@gmail.com'),
(2, 'Ni Made Suartini', '85129892663', 'Jl. Danau Tamblingan No. 45, Sanur, Denpasar, Bali', 'madesuartini@gmail.com'),
(3, 'I Nyoman Darma', '86924500585', 'Jl. Monkey Forest No. 27, Ubud, Gianyar, Bali', 'nyomandarma@gmail.com'),
(4, 'Ni Ketut Sukawati', '85473185162', 'Jl. Batu Bolong No. 64, Canggu, Badung, Bali', 'ketutsukawati@gmail.com'),
(5, 'I Made Agus Wirawan', '89282409007', 'Jl. Bypass Ngurah Rai No. 123, Jimbaran, Badung, Bali', 'agus.wirawan@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id_pesan`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimoni`
--
ALTER TABLE `testimoni`
  ADD PRIMARY KEY (`id_testimoni`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `fk_transaksi_user` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `id_pesan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `testimoni`
--
ALTER TABLE `testimoni`
  MODIFY `id_testimoni` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk_transaksi_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
