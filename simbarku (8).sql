-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 08, 2025 at 12:20 AM
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
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail` int NOT NULL,
  `id_transaksi` int NOT NULL,
  `id_product` int NOT NULL,
  `qty` int NOT NULL,
  `harga_satuan` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id_detail`, `id_transaksi`, `id_product`, `qty`, `harga_satuan`) VALUES
(1, 33, 3, 2, '180000.00'),
(2, 34, 4, 1, '170000.00'),
(3, 34, 5, 1, '160000.00'),
(4, 34, 6, 2, '140000.00'),
(5, 35, 2, 2, '130000.00');

-- --------------------------------------------------------

--
-- Table structure for table `forum_reply`
--

CREATE TABLE `forum_reply` (
  `id_reply` int NOT NULL,
  `id_thread` int NOT NULL,
  `id_user` int DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `forum_reply`
--

INSERT INTO `forum_reply` (`id_reply`, `id_thread`, `id_user`, `content`, `created_at`) VALUES
(1, 1, 2, 'Pilih media yang porous dan mudah menyerap air.', '2025-07-05 15:56:23'),
(2, 6, NULL, 'gatau bang', '2025-07-05 17:05:41');

-- --------------------------------------------------------

--
-- Table structure for table `forum_thread`
--

CREATE TABLE `forum_thread` (
  `id_thread` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `id_user` int DEFAULT NULL,
  `content` text NOT NULL,
  `gambar_simbar_user` blob,
  `category` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `forum_thread`
--

INSERT INTO `forum_thread` (`id_thread`, `title`, `id_user`, `content`, `gambar_simbar_user`, `category`, `tags`, `created_at`) VALUES
(1, 'Cara memilih media tanam terbaik?', 1, 'Apa saja tips memilih media tanam yang cocok untuk simbar?', NULL, 'Simbar Media and Plants', 'media', '2025-07-05 13:56:02'),
(2, 'Rekomendasi pupuk untuk simbar?', 2, 'Ada rekomendasi pupuk yang bagus untuk simbar?', NULL, 'Simbar Supplies', 'supplies', '2025-07-05 12:56:02'),
(3, 'Aksesoris gantungan simbar yang kuat?', 3, 'Mau tanya gantungan simbar yang kuat dan awet apa ya?', NULL, 'Simbar Accessories', 'accessories', '2025-07-05 11:56:02'),
(6, 'simhar', NULL, 'gimana caranya bang', NULL, 'Simbar Media and Plants', 'media', '2025-07-05 17:04:44');

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
(2, '/images/product/platycerium-bifurcatum.jpg', 'Platycerium Bifurcatum', 'mediaTanaman', 'active', '130000.00', 6, '2025-07-07 16:17:12'),
(3, '/images/product/platycerium-veitchii.jpg', 'Platycerium Veitchii', 'mediaTanaman', 'active', '180000.00', 3, '2025-07-07 16:16:57'),
(4, '/images/product/platycerium-hillii.jpg', 'Platycerium Hillii', 'mediaTanaman', 'active', '170000.00', 6, '2025-07-07 16:16:41'),
(5, '/images/product/platycerium-elephantotis.jpg', 'Platycerium Elephantotis', 'mediaTanaman', 'active', '160000.00', 5, '2025-07-07 16:13:04'),
(6, '/images/product/platycerium-coronarium.jpg', 'Platycerium Coronarium', 'mediaTanaman', 'active', '140000.00', 7, '2025-07-07 16:12:48'),
(7, '/images/product/pupuk-cair-organik.jpg', 'Pupuk Cair Organik Simbar', 'obatPupuk', 'active', '45000.00', 15, '2025-07-07 16:12:34'),
(8, '/images/product/pupuk-slow-release.jpg', 'Pupuk Slow Release Simbar', 'obatPupuk', 'active', '50000.00', 20, '2025-07-07 16:12:06'),
(9, '/images/product/vitamin-daun.jpg', 'Vitamin Daun untuk Simbar', 'obatPupuk', 'active', '40000.00', 12, '2025-07-07 16:11:53'),
(10, '/images/product/papan-kayu.jpg', 'Papan Kayu Mounting Simbar', 'aksesorisDisplay', 'active', '35000.00', 10, '2025-07-07 16:12:18'),
(11, '/images/product/kawat-gantung.jpg', 'Kawat Gantung Simbar', 'aksesorisDisplay', 'active', '15000.00', 20, '2025-07-07 16:11:42'),
(12, '/images/product/pot-gantung.jpg', 'Pot Gantung Simbar', 'aksesorisDisplay', 'active', '25000.00', 15, '2025-07-07 16:23:04');

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
(1, 'I Wayan Sudira', 'Tanaman simbar menjangnya tumbuh dengan baik dan cepat. Sangat puas dengan pembelian ini!', 4),
(2, 'Ni Luh Putu Sari', 'Pengiriman cepat dan pengemasan sangat baik. Simbar datang dalam kondisi prima.', 4),
(3, 'I Ketut Adi Wijaya', 'Platycerium yang saya beli tumbuh subur. Pelayanan toko juga ramah dan informatif.', 5),
(4, 'Ni Made Yuliani', 'Kualitas tanaman luar biasa! Sudah 3 bulan dan simbar saya tetap sehat dan mulai membentuk antler baru.', 5),
(5, 'I Nyoman Dana', 'Sangat senang dengan Platycerium Superbum yang saya beli. Ukurannya sesuai deskripsi dan kondisinya prima.', 5),
(6, 'Ni Ketut Ria Dewi', 'Simbar datang dengan beberapa daun kering. Tapi masih hidup dan mulai beradaptasi sekarang.', 3),
(7, 'I Made Suardika', 'Media tanam yang digunakan sangat cocok untuk simbar. Akarnya berkembang baik setelah 1 bulan.', 4),
(8, 'Ni Luh Ayu Widiastuti', 'Harga sebanding dengan kualitas. Simbar jauh lebih besar dari yang saya bayangkan!', 4),
(9, 'I Gede Arya', 'Platycerium Bifurcatum yang saya beli sangat sehat. Sudah menghasilkan 2 anakan dalam 6 bulan.', 5),
(10, 'Ni Komang Indrayani', 'Daun-daun simbar hijau cerah dan tidak ada hama. Terima kasih untuk layanannya yang profesional.', 4),
(11, 'I Gusti Ngurah Alit', 'Panduan perawatan yang diberikan sangat membantu untuk pemula seperti saya. Tanaman tumbuh dengan baik.', 4),
(12, 'Ni Nyoman Sukerni', 'Koleksi Platycerium saya bertambah dengan spesies langka ini. Kondisinya istimewa!', 5),
(13, 'I Dewa Putra Yoga', 'Pengiriman agak lama dan ada sedikit kerusakan, tapi tanaman masih bisa diselamatkan.', 3),
(14, 'Ni Made Ningsih', 'Simbar Grande yang saya beli tumbuh sangat cepat. Dalam 4 bulan ukurannya sudah dua kali lipat!', 5),
(15, 'I Wayan Prabawa', 'Pelayanan luar biasa. Ada tanaman yang kurang sehat dan langsung diganti dengan yang baru.', 5),
(16, 'Ni Ketut Ariani', 'Tanaman ini menjadi pusat perhatian di ruang tamu saya. Simbar menjadi favorit tamu-tamu yang berkunjung!', 5),
(17, 'I Made Surya Putra', 'Variegata pada Platycerium saya sangat jelas dan indah. Sangat puas dengan pembelian ini.', 5),
(18, 'Ni Luh Eka Cahyani', 'Ukuran lebih kecil dari yang saya harapkan, tapi setidaknya tanaman sehat.', 3),
(19, 'I Ketut Wirawan', 'Warna dan bentuk simbar sangat bagus. Sudah berhasil bertahan dan beradaptasi di rumah saya.', 4),
(20, 'Ni Komang Dwi Jayanti', 'Platycerium Andinum yang langka ini kondisinya luar biasa saat tiba. Worth every penny!', 5),
(21, 'I Nyoman Arimbawa', 'Mounting kit yang disertakan sangat berguna. Sekarang simbar menempel sempurna di papan kayu.', 5),
(22, 'Ni Luh Ayuni', 'Simbar induk dengan 3 anakan. Benar-benar bonus yang menyenangkan! Sangat merekomendasikan toko ini.', 5),
(23, 'I Gusti Made Santika', 'Customer service sangat membantu dalam memilih jenis simbar yang cocok untuk kondisi rumah saya.', 5),
(24, 'Ni Ketut Murniati', 'Struktur daun sangat eksotis dan sehat. Sudah 6 bulan dan tetap tumbuh dengan baik.', 5),
(25, 'I Wayan Putra', 'Pengiriman cepat dan simbar masih segar saat tiba. Beberapa minggu dan sudah mulai beradaptasi.', 4),
(26, 'Ni Made Astuti', 'Beberapa daun steril rusak saat pengiriman, tapi secara keseluruhan tanaman masih hidup.', 3),
(27, 'I Komang Bagus Pramana', 'Agak kesulitan merawat di awal, butuh beberapa penyesuaian. Mungkin perlu panduan lebih detail.', 3),
(28, 'Ni Nyoman Wati', 'Kualitas simbar sangat bagus untuk harga segini. Sudah mulai menumbuhkan daun baru!', 4),
(29, 'I Made Aditya', 'Tanaman datang dengan pot yang cantik. Kombinasi yang sempurna untuk display indoor.', 4),
(30, 'Ni Luh Desi', 'Simbar hidup tapi pertumbuhan lambat. Mungkin butuh waktu beradaptasi lebih lama.', 3);

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
(30, 4, 148240, '2024-09-05', 'canceled'),
(31, 6, 160000, '2025-07-01', 'pending'),
(32, 6, 160000, '2025-07-01', 'pending'),
(33, 6, 360000, '2025-07-01', 'pending'),
(34, 7, 610000, '2025-07-01', 'canceled'),
(35, 8, 260000, '2025-07-05', 'pending');

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
(5, 'I Made Agus Wirawan', '89282409007', 'Jl. Bypass Ngurah Rai No. 123, Jimbaran, Badung, Bali', 'agus.wirawan@gmail.com'),
(6, 'Ariep Made', '081913465120', 'Lemukih', 'ariepmade@gmail.com'),
(7, 'mahesa', '081913465120', 'Lemukih', 'mahesaan123@gmail.com'),
(8, 'wir', '098765432', 'Lemukih', 'wirda27@example.org');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `fk_detail_transaksi` (`id_transaksi`),
  ADD KEY `fk_detail_product` (`id_product`);

--
-- Indexes for table `forum_reply`
--
ALTER TABLE `forum_reply`
  ADD PRIMARY KEY (`id_reply`),
  ADD KEY `fk_reply_thread` (`id_thread`),
  ADD KEY `fk_reply_user` (`id_user`);

--
-- Indexes for table `forum_thread`
--
ALTER TABLE `forum_thread`
  ADD PRIMARY KEY (`id_thread`);

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
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `forum_reply`
--
ALTER TABLE `forum_reply`
  MODIFY `id_reply` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `forum_thread`
--
ALTER TABLE `forum_thread`
  MODIFY `id_thread` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `testimoni`
--
ALTER TABLE `testimoni`
  MODIFY `id_testimoni` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `fk_detail_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_detail_transaksi` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`) ON DELETE CASCADE;

--
-- Constraints for table `forum_reply`
--
ALTER TABLE `forum_reply`
  ADD CONSTRAINT `fk_reply_thread` FOREIGN KEY (`id_thread`) REFERENCES `forum_thread` (`id_thread`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reply_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk_transaksi_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
