-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Jun 14, 2026 at 05:26 PM
-- Server version: 8.0.46
-- PHP Version: 8.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dev_meetings_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `dev_groups`
--

CREATE TABLE `dev_groups` (
  `group_id` int NOT NULL,
  `group_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dev_groups`
--

INSERT INTO `dev_groups` (`group_id`, `group_name`) VALUES
(4, 'Team Backend'),
(2, 'Team Mobile'),
(3, 'Team React'),
(1, 'Team UI');

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meeting_id` int NOT NULL,
  `group_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `description` text NOT NULL,
  `room_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meeting_id`, `group_id`, `start_time`, `end_time`, `description`, `room_name`) VALUES
(1, 1, '2026-06-15 10:00:00', '2026-06-15 11:00:00', 'UI Design Review for new dashboard', 'Blue Room'),
(2, 3, '2026-06-15 12:30:00', '2026-06-15 13:30:00', 'React Architecture & State Management sync', 'New York Room'),
(3, 2, '2026-06-16 09:00:00', '2026-06-16 10:30:00', 'Mobile App Daily Standup & Sprint Planning', 'Large Board Room'),
(4, 1, '2026-06-15 14:00:00', '2026-06-15 15:00:00', 'Sprint Review', 'Blue Room'),
(5, 2, '2026-06-14 19:48:00', '2026-06-14 22:48:00', 'Try', 'Red Room'),
(6, 4, '2026-06-14 19:52:00', '2026-06-14 20:52:00', 'Try2', 'Blue Room'),
(7, 4, '2026-06-14 19:21:00', '2026-06-14 21:19:00', 'Try3', 'Yellow Room');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dev_groups`
--
ALTER TABLE `dev_groups`
  ADD PRIMARY KEY (`group_id`),
  ADD UNIQUE KEY `group_name` (`group_name`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meeting_id`),
  ADD KEY `group_id` (`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dev_groups`
--
ALTER TABLE `dev_groups`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meeting_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `dev_groups` (`group_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
