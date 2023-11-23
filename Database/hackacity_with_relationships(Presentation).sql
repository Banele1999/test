-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2023 at 03:17 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackacity`
--

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `score_id` int(11) NOT NULL,
  `novality` int(11) DEFAULT NULL,
  `usefulness` int(11) DEFAULT NULL,
  `feasibility` int(11) DEFAULT NULL,
  `technical_proficiency` int(11) DEFAULT NULL,
  `impact` int(11) DEFAULT NULL,
  `safety` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `judge_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`score_id`, `novality`, `usefulness`, `feasibility`, `technical_proficiency`, `impact`, `safety`, `total`, `comment`, `team_id`, `judge_id`) VALUES
(12, 8, 10, 8, 8, 12, 4, 50, 'Fair', 1, 10),
(13, 9, 12, 9, 9, 15, 6, 60, 'good', 2, 10),
(14, 8, 11, 8, 8, 12, 4, 53, 'not bad', 1, 14),
(15, 9, 13, 8, 10, 15, 6, 60, 'innovative', 2, 14);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`score_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `judge_id` (`judge_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `score_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  ADD CONSTRAINT `score_ibfk_2` FOREIGN KEY (`judge_id`) REFERENCES `judge` (`judge_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
