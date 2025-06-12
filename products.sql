-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 12, 2025 at 04:36 AM
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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `image_url` text NOT NULL,
  `name` text NOT NULL,
  `status` enum('active','inactive','archived') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `available_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `image_url`, `name`, `status`, `price`, `stock`, `available_at`) VALUES
(1, '/products/platycerium-andinum.jpg', 'Platycerium Andinum', 'active', '139763.00', 16, '2025-04-02 09:51:23'),
(2, '/products/platycerium-bifurcatum.jpg', 'Platycerium Bifurcatum', 'active', '93168.00', 8, '2024-12-07 18:25:02'),
(3, '/products/platycerium-veitchii.jpg', 'Platycerium Veitchii', 'archived', '275679.00', 17, '2024-08-28 04:58:12'),
(4, '/products/platycerium-hillii.jpg', 'Platycerium Hillii', 'active', '234105.00', 16, '2025-03-28 20:00:14'),
(5, '/products/platycerium-elephantotis.jpg', 'Platycerium Elephantotis', 'inactive', '143985.00', 7, '2025-05-09 05:11:22'),
(6, '/products/platycerium-coronarium.jpg', 'Platycerium Coronarium', 'active', '96003.00', 5, '2024-06-21 09:10:31'),
(7, '/products/platycerium-ridleyi.jpg', 'Platycerium Ridleyi', 'inactive', '245677.00', 20, '2024-09-24 08:19:33'),
(8, '/products/platycerium-superbum.jpg', 'Platycerium Superbum', 'inactive', '79018.00', 17, '2024-10-01 07:27:56'),
(9, '/products/platycerium-grande.jpg', 'Platycerium Grande', 'archived', '226726.00', 1, '2024-11-15 23:59:29'),
(10, '/products/platycerium-stemaria.jpg', 'Platycerium Stemaria', 'inactive', '140211.00', 13, '2025-02-12 09:48:38'),
(11, '/products/platycerium-vassei.jpg', 'Platycerium Vassei', 'archived', '214472.00', 1, '2025-02-07 06:22:05'),
(12, '/products/platycerium-madagascariensis.jpg', 'Platycerium Madagascariensis', 'inactive', '88628.00', 3, '2024-06-12 21:40:38'),
(13, '/products/platycerium-alcicorne.jpg', 'Platycerium Alcicorne', 'archived', '234722.00', 15, '2024-12-09 03:03:38'),
(14, '/products/platycerium-wallichii.jpg', 'Platycerium Wallichii', 'archived', '208217.00', 4, '2024-12-17 17:59:25'),
(15, '/products/platycerium-holttumii.jpg', 'Platycerium Holttumii', 'archived', '168660.00', 17, '2024-12-22 16:45:06'),
(16, '/products/platycerium-quadridichotomum.jpg', 'Platycerium Quadridichotomum', 'archived', '141936.00', 6, '2024-07-25 01:56:48'),
(17, '/products/platycerium-mayii.jpg', 'Platycerium Mayii', 'inactive', '208085.00', 16, '2024-12-21 00:15:31'),
(18, '/products/platycerium-mountlewis.jpg', 'Platycerium MountLewis', 'archived', '114982.00', 11, '2025-05-07 10:49:59'),
(19, '/products/platycerium-wandae.jpg', 'Platycerium Wandae', 'active', '131581.00', 2, '2024-10-27 23:52:53'),
(20, '/products/platycerium-elephantotis-variegata.jpg', 'Platycerium Elephantotis Variegata', 'inactive', '97063.00', 1, '2025-04-25 18:37:15'),
(21, '/products/platycerium-andinum.jpg', 'Platycerium Andinum', 'active', '139763.00', 16, '2025-04-02 09:51:23'),
(22, '/products/platycerium-bifurcatum.jpg', 'Platycerium Bifurcatum', 'active', '93168.00', 8, '2024-12-07 18:25:02'),
(23, '/products/platycerium-veitchii.jpg', 'Platycerium Veitchii', 'archived', '275679.00', 17, '2024-08-28 04:58:12'),
(24, '/products/platycerium-hillii.jpg', 'Platycerium Hillii', 'active', '234105.00', 16, '2025-03-28 20:00:14'),
(25, '/products/platycerium-elephantotis.jpg', 'Platycerium Elephantotis', 'inactive', '143985.00', 7, '2025-05-09 05:11:22'),
(26, '/products/platycerium-coronarium.jpg', 'Platycerium Coronarium', 'active', '96003.00', 5, '2024-06-21 09:10:31'),
(27, '/products/platycerium-ridleyi.jpg', 'Platycerium Ridleyi', 'inactive', '245677.00', 20, '2024-09-24 08:19:33'),
(28, '/products/platycerium-superbum.jpg', 'Platycerium Superbum', 'inactive', '79018.00', 17, '2024-10-01 07:27:56'),
(29, '/products/platycerium-grande.jpg', 'Platycerium Grande', 'archived', '226726.00', 1, '2024-11-15 23:59:29'),
(30, '/products/platycerium-stemaria.jpg', 'Platycerium Stemaria', 'inactive', '140211.00', 13, '2025-02-12 09:48:38'),
(31, '/products/platycerium-vassei.jpg', 'Platycerium Vassei', 'archived', '214472.00', 1, '2025-02-07 06:22:05'),
(32, '/products/platycerium-madagascariensis.jpg', 'Platycerium Madagascariensis', 'inactive', '88628.00', 3, '2024-06-12 21:40:38'),
(33, '/products/platycerium-alcicorne.jpg', 'Platycerium Alcicorne', 'archived', '234722.00', 15, '2024-12-09 03:03:38'),
(34, '/products/platycerium-wallichii.jpg', 'Platycerium Wallichii', 'archived', '208217.00', 4, '2024-12-17 17:59:25'),
(35, '/products/platycerium-holttumii.jpg', 'Platycerium Holttumii', 'archived', '168660.00', 17, '2024-12-22 16:45:06'),
(36, '/products/platycerium-quadridichotomum.jpg', 'Platycerium Quadridichotomum', 'archived', '141936.00', 6, '2024-07-25 01:56:48'),
(37, '/products/platycerium-mayii.jpg', 'Platycerium Mayii', 'inactive', '208085.00', 16, '2024-12-21 00:15:31'),
(38, '/products/platycerium-mountlewis.jpg', 'Platycerium MountLewis', 'archived', '114982.00', 11, '2025-05-07 10:49:59'),
(39, '/products/platycerium-wandae.jpg', 'Platycerium Wandae', 'active', '131581.00', 2, '2024-10-27 23:52:53'),
(40, '/products/platycerium-elephantotis-variegata.jpg', 'Platycerium Elephantotis Variegata', 'inactive', '97063.00', 1, '2025-04-25 18:37:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
