-- phpMyAdmin SQL Dump
-- version 4.4.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 12, 2015 at 03:10 
-- Server version: 5.6.24
-- PHP Version: 5.5.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `uwatchDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `officers`
--

CREATE TABLE IF NOT EXISTS `officers` (
  `_id` int(11) NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `officers`
--

INSERT INTO `officers` (`_id`, `fullname`, `username`, `password`, `role`) VALUES
(2, 'James Shope', 'james@judge.com', 'James1', 'Judge'),
(3, 'Mark Zil', 'mark@magistrate.com', 'Mark1', 'Magistrate'),
(4, 'Rajesh Naidoo', 'raj@chief.com', 'Raj1', 'Chief-judge'),
(5, 'Steve Molaka', 'steve@police.com', 'Steve1', 'Police'),
(6, 'Bob Smith', 'admin@uwatch.com', 'Nimda1', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `officers`
--
ALTER TABLE `officers`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `officers`
--
ALTER TABLE `officers`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
