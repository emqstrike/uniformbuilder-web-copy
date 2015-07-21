-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2015 at 07:39 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `web_builder`
--

-- --------------------------------------------------------

--
-- Table structure for table `design_settings`
--

CREATE TABLE IF NOT EXISTS `design_settings` (
`ds_code` int(11) NOT NULL,
  `design_code` varchar(50) NOT NULL,
  `design_part` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `design_style`
--

CREATE TABLE IF NOT EXISTS `design_style` (
  `design_code` varchar(50) NOT NULL,
  `design_name` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_information`
--

CREATE TABLE IF NOT EXISTS `order_information` (
`order_code` int(11) NOT NULL,
  `client` varchar(50) NOT NULL,
  `jersey_style` varchar(50) NOT NULL,
  `gender` varchar(7) NOT NULL,
  `sport` varchar(30) NOT NULL,
  `base_color` varchar(60) NOT NULL,
  `base_material` varchar(50) NOT NULL,
  `lining` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `design_settings`
--
ALTER TABLE `design_settings`
 ADD PRIMARY KEY (`ds_code`);

--
-- Indexes for table `design_style`
--
ALTER TABLE `design_style`
 ADD PRIMARY KEY (`design_code`);

--
-- Indexes for table `order_information`
--
ALTER TABLE `order_information`
 ADD PRIMARY KEY (`order_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `design_settings`
--
ALTER TABLE `design_settings`
MODIFY `ds_code` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_information`
--
ALTER TABLE `order_information`
MODIFY `order_code` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
