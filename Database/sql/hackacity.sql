-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2023 at 02:18 PM
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
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Admin_id` int(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Admin_id`, `name`, `surname`, `email`, `password`) VALUES
(1, 'Sibusiso', 'Radebe', 'radebe@gmail.com', '123'),
(7, 'sibusiso', 'radebe', 'rradebe@gmail.com', '$2b$08$Sk93HorYDm9gs5DISwKbIOn8wesHsPVOEHJ3cHrPGOIDP40fWFXj.'),
(8, 'Dipono', 'mathenjwa', 'dipono@tut4life.ac.za', '$2b$08$iwMDT9Quj3Jm5/vbAFWOgubjV0UGfxP7jFLd2vtrqwtv/R/gis4jm');

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `file_id` int(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `size` int(45) NOT NULL,
  `format` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `group_id` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hacker`
--

CREATE TABLE `hacker` (
  `group_id` int(45) NOT NULL,
  `stu_name` varchar(255) NOT NULL,
  `stu_no` int(45) NOT NULL,
  `stu_surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Admin_id` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hacker`
--

INSERT INTO `hacker` (`group_id`, `stu_name`, `stu_no`, `stu_surname`, `email`, `group_name`, `password`, `Admin_id`) VALUES
(1, 'Karabo', 218665730, 'Motloi', 'motloi@tut.ac.za', 'TECHS', '123', 1),
(2, 'Michelle', 123456, 'Thobela', 'thobela@tut.ac.za', 'TVH', '123', 1),
(3, 'Mugile', 2468, 'Msimanga', 'msimanga@tut.ac.za', 'HEILBRON', '123', 1),
(4, 'Sibusiso', 216840046, 'Gumede', '216840046@tut.ac.za', 'thobela', '$2b$08$hdVOs1eV2IGelGbS2Bk9xe46kqt6TcHWX7NzysW6YVPMctAdit3J6', 1),
(5, 'rosemery', 216840046, 'shabangu', '216810045@tut.ac.za', 'pirites', '$2b$08$OPvdN8J2Pnp1NcjxSpm6QemVrn6iQMRk1nx90FGBFjL9HwKlkUCq6', 1),
(6, 'dansile ', 5587557, 'shabangu', '2852455@gmail.com', 'kaizer chiefs', '$2b$08$QE8.F4jdZpcqpGtNTiCOEeGLQvc09THfL6J8pthgeW2dtJMf/QPJy', 1),
(7, 'thabo', 21584, 'ndlovu', '2854747@gmail;', 'kaizer', '$2b$08$8HcZxUv3vUF3/LPCMwQcZ.q188JWxl1tEauuuXGQKew5xwds1tbTW', 7);

-- --------------------------------------------------------

--
-- Table structure for table `hackerslot`
--

CREATE TABLE `hackerslot` (
  `slot_id` int(45) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `length` varchar(255) NOT NULL,
  `end_time` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `Admin_id` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hackerslot`
--

INSERT INTO `hackerslot` (`slot_id`, `group_name`, `start_time`, `length`, `end_time`, `date`,`link`, `Admin_id`) VALUES
(2, 'TECHS', '09h00', '1hour', '10h00', '03/06/2023','https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzY3Yjg1YWEtYTM1Zi00NGQ1LWE1ODMtMzAzMGRlMmIwMzUy%40thread.v2/0?context=%7b%22Tid%22%3a%223df74539-9453-4d03-bb9d-b9102cb9ce9c%22%2c%22Oid%22%3a%2252953c19-e9e1-46ae-b282-61d269b5b8e8%22%7d', 1),
(3, 'TECHS', '23:02', '1', '00:00', '2023-07-21','https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzY3Yjg1YWEtYTM1Zi00NGQ1LWE1ODMtMzAzMGRlMmIwMzUy%40thread.v2/0?context=%7b%22Tid%22%3a%223df74539-9453-4d03-bb9d-b9102cb9ce9c%22%2c%22Oid%22%3a%2252953c19-e9e1-46ae-b282-61d269b5b8e8%22%7d', 1),
(4, 'TECHS', '12:11', '1', '12:15', '2023-07-02','https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzY3Yjg1YWEtYTM1Zi00NGQ1LWE1ODMtMzAzMGRlMmIwMzUy%40thread.v2/0?context=%7b%22Tid%22%3a%223df74539-9453-4d03-bb9d-b9102cb9ce9c%22%2c%22Oid%22%3a%2252953c19-e9e1-46ae-b282-61d269b5b8e8%22%7d', 1);

-- --------------------------------------------------------

--
-- Table structure for table `judge`
--

CREATE TABLE `judge` (
  `judge_id` int(45) NOT NULL,
  `judge_name` varchar(255) NOT NULL,
  `judge_surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Admin_id` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `judge`
--

INSERT INTO `judge` (`judge_id`, `judge_name`, `judge_surname`, `email`, `company_name`, `password`, `Admin_id`) VALUES
(8, 'Odirile', 'Morolo', 'morolo@gmail.com', 'ICEP', '123', 1),
(9, 'Andries', 'Matenjwa', 'matenjwa@tut.ac.za', 'MTN', '123', 1),
(10, 'Fihli', 'Mthimkhulu', 'fihli@gmail.com', 'SARS', '$2b$08$3DSOnnQH60DKXBaKfrrCfOwOdruoiKwXMdQoxw4kX954bvEwcM9fS', 1),
(13, 'Andries', 'Mathenjwa', 'andriesmathenjwa52@gmail.com', 'icep', '$2b$08$J4cN4VIVxYCTYbYNUq5Wf.to3t01Z/GKrZTLn5R2UyewM9//Tb8ZW', 0),
(14, 'sibusiso', 'radebe', 'sbu@gmail.com', 'icep', '$2b$08$NZ6.Ddec4h./uJBPTe49EeAFXNLi.aVpZ9Y6zMSq35zY0QtVnZAZ.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `judgeslot`
--

CREATE TABLE `judgeslot` (
  `slot_id` int(45) NOT NULL,
  `judge_name` varchar(255) NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `length` varchar(255) NOT NULL,
  `end_time` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `Admin_id` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `judgeslot`
--

INSERT INTO `judgeslot` (`slot_id`, `judge_name`, `start_time`, `length`, `end_time`, `date`,`link`, `Admin_id`) VALUES
(2, 'Odirile Morolo', '10h00', '3 hours', '13h00', '03/06/2023','https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzY3Yjg1YWEtYTM1Zi00NGQ1LWE1ODMtMzAzMGRlMmIwMzUy%40thread.v2/0?context=%7b%22Tid%22%3a%223df74539-9453-4d03-bb9d-b9102cb9ce9c%22%2c%22Oid%22%3a%2252953c19-e9e1-46ae-b282-61d269b5b8e8%22%7d', 1),
(3, 'Andries Matenjwa', '23:59', '1', '23:00', '2023-07-12','https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzY3Yjg1YWEtYTM1Zi00NGQ1LWE1ODMtMzAzMGRlMmIwMzUy%40thread.v2/0?context=%7b%22Tid%22%3a%223df74539-9453-4d03-bb9d-b9102cb9ce9c%22%2c%22Oid%22%3a%2252953c19-e9e1-46ae-b282-61d269b5b8e8%22%7d', 1),
(4, 'sibusiso radebe', '12:12', '1', '12:15', '2023-07-02','https://teams.microsoft.com/l/meetup-join/19%3ameeting_YzY3Yjg1YWEtYTM1Zi00NGQ1LWE1ODMtMzAzMGRlMmIwMzUy%40thread.v2/0?context=%7b%22Tid%22%3a%223df74539-9453-4d03-bb9d-b9102cb9ce9c%22%2c%22Oid%22%3a%2252953c19-e9e1-46ae-b282-61d269b5b8e8%22%7d', 1);

-- --------------------------------------------------------

--
-- Table structure for table `presentation`
--

CREATE TABLE `presentation` (
  `presentation_id` int(45) NOT NULL,
  `group_id` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `points_id` int(45) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `judge_id` int(45) NOT NULL,
  `points` int(45) NOT NULL,
  `isPublished` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`points_id`, `group_name`, `judge_id`, `points`, `isPublished`) VALUES
(1, 'TECHS', 8, 55, 0),
(2, 'TVH', 9, 100, 0),
(3, 'Techs', 9, 100, 0),
(4, 'TVH', 8, 55, 0),
(5, 'HEILBRON', 9, 100, 0),
(6, 'HEILBRON', 8, 100, 0),
(7, 'thobela', 10, 64, 0),
(8, 'thobela', 9, 64, 0),
(11, 'TECHS', 0, 63, 0),
(12, 'TECHS', 0, 58, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Admin_id`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `hacker`
--
ALTER TABLE `hacker`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `Admin_id` (`Admin_id`);

--
-- Indexes for table `hackerslot`
--
ALTER TABLE `hackerslot`
  ADD PRIMARY KEY (`slot_id`),
  ADD KEY `Admin_id` (`Admin_id`);

--
-- Indexes for table `judge`
--
ALTER TABLE `judge`
  ADD PRIMARY KEY (`judge_id`),
  ADD KEY `Admin_id` (`Admin_id`);

--
-- Indexes for table `judgeslot`
--
ALTER TABLE `judgeslot`
  ADD PRIMARY KEY (`slot_id`),
  ADD KEY `Admin_id` (`Admin_id`);

--
-- Indexes for table `presentation`
--
ALTER TABLE `presentation`
  ADD PRIMARY KEY (`presentation_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`points_id`),
  ADD KEY `judge_id` (`judge_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `Admin_id` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `file_id` int(45) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hacker`
--
ALTER TABLE `hacker`
  MODIFY `group_id` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hackerslot`
--
ALTER TABLE `hackerslot`
  MODIFY `slot_id` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `judge`
--
ALTER TABLE `judge`
  MODIFY `judge_id` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `judgeslot`
--
ALTER TABLE `judgeslot`
  MODIFY `slot_id` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `presentation`
--
ALTER TABLE `presentation`
  MODIFY `presentation_id` int(45) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `points_id` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
