-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: mysql.stud.ntnu.no
-- Generation Time: 17. Sep, 2021 18:36 PM
-- Tjener-versjon: 5.7.33-0ubuntu0.16.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bjorafla_hey_db`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `booked`
--

CREATE TABLE `booked` (
  `userId` int(11) NOT NULL,
  `experienceId` int(11) NOT NULL,
  `date` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `experiences`
--

CREATE TABLE `experiences` (
  `experienceId` int(11) NOT NULL,
  `providerId` int(11) NOT NULL,
  `address` varchar(256) NOT NULL,
  `description` varchar(2048) NOT NULL,
  `detailedDescription` text NOT NULL,
  `featuredPicture` varchar(256) NOT NULL,
  `latitude` varchar(64) NOT NULL,
  `longitude` varchar(64) NOT NULL,
  `maxGroupSize` int(11) NOT NULL,
  `minAge` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `website` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `experiences`
--

INSERT INTO `experiences` (`experienceId`, `providerId`, `address`, `description`, `detailedDescription`, `featuredPicture`, `latitude`, `longitude`, `maxGroupSize`, `minAge`, `name`, `website`) VALUES
(1, 1, 'Gamle bybro, 7013 Trondheim', 'Amazing old bridge in a lovely part of Trondheim', 'Locals say that a kiss under the arches will mean good luck for the relationship.', 'https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,f_jpg,h_400,q_65,w_587/http://zpoton.com/publicdata/productdb/products/1052/images/5914_n.jpg', '63.42821619525277', '10.401597114315813', 0, 0, 'Old Town Bridge', ''),
(2, 1, 'Brattoerkaia 14, Trondheim 7010 Norway', 'Rockheim is the national museum of popular music.', 'Rockheim is the national museum of popular music. Since the museum\'s opening in 2010 there has been a steady stream of visitors eager to learn about norwegian music and its history. Music is a source of enjoyment. It creates a sense of belonging and offers new experiences. But it is also a vital source of knowledge of ourselves and our cultural history. Behind the scenes, Rockheim\'s staff is engaged in managing and researching Norway\'s pop and rock music, and in making it accessible to the public. The visit to Rockheim begins in the spectacular \"Top Box\". From the main exhibit on the 6th floor you proceed down floor by floor. The music and stories are communicated by means of interactive exhibit technology and objects from the museum\'s collections. You are welcomed by Rockheim\'s guides, who will be your hosts and will answer your questions about the exhibits.', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/0f/0b/a0/rockheim.jpg?w=1000&h=-1&s=1', '63.43874897841191', '10.401652396558564', 0, 3, 'Rockheim', 'https://rockheim.no/'),
(3, 1, 'Otto Nielsens veg 4, 7010 Trondheim', 'At the top of the fantastic Tyholt Tower you will find the EGON restaurant with the most spectacular views in the city. Come to us for a great meal in beautiful surroundings. Welcome!', 'A beautiful dinner experience for the whole family.', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/bf/1a/94/signal-2018-12-16-185842.jpg?w=1200&h=-1&s=1', '63.42241160875186', '10.431963366127249', 0, 0, 'Egon Tower', 'https://www.egon.no/restauranter/trc3b8ndelag/tarnet.html'),
(4, 1, 'Nedre Ila 68, 7018 Trondheim', 'A guided fishing experience on the piers of Trondheim. Fun for the whole family. Equipment is provided.', '', 'https://www.adressa.no/nyheter/trondheim/article11497768.ece/82877p/BINARY/w980/G559O0J4.1', '63.43249169236253', '10.356408734714865', 0, 0, 'Fishing at Ila', ''),
(5, 1, 'Havnegata 12, 7010 Trondheim', 'Pirbadet - located in the transition between sea and land - is Norway\'s largest indoor bathing facility located at Brattøra in Trondheim. In Pirbadet, most of the offers are gathered in one large room, which means that children, young people, adults and the elderly can be together. But there are also secluded zones for bathers who want peace and quiet, and places where you can play loudly without disturbing others.', '', 'https://images.squarespace-cdn.com/content/v1/5db9695f4ce708012a38f636/1590144770380-UXRZ9JYSRJBPIMHC8QYS/pirbaded+child.jpg?format=2500w', '63.44078391670324', '10.401164584107955', 0, 0, 'Pirbadet', 'pirbadet.no');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `experience_has_tag`
--

CREATE TABLE `experience_has_tag` (
  `experienceId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `experience_has_tag`
--

INSERT INTO `experience_has_tag` (`experienceId`, `tagId`) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 4),
(5, 4);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `providers`
--

CREATE TABLE `providers` (
  `providerId` int(11) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `providers`
--

INSERT INTO `providers` (`providerId`, `phone`, `userId`) VALUES
(1, '4798765432', 1);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `tags`
--

CREATE TABLE `tags` (
  `tagId` int(11) NOT NULL,
  `description` varchar(256) NOT NULL,
  `isMarker` tinyint(1) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `tags`
--

INSERT INTO `tags` (`tagId`, `description`, `isMarker`, `name`) VALUES
(1, 'An experience with this tag is worth seeing!', 0, 'worth seeing'),
(2, 'An experience with this tag is a museum-experience.', 1, 'museum'),
(3, 'An experience with this tag is music-related.', 1, 'music'),
(4, 'It is possible to buy food and something to drink at the experience.', 1, 'serves food');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `users`
--

INSERT INTO `users` (`userId`, `email`, `password`) VALUES
(1, 'user@heyloft.no', 'ingenhash');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `views`
--

CREATE TABLE `views` (
  `userId` int(11) NOT NULL,
  `experienceId` int(11) NOT NULL,
  `viewType` enum('favorite','saved','seen','ignored') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `views`
--

INSERT INTO `views` (`userId`, `experienceId`, `viewType`) VALUES
(1, 1, 'saved'),
(1, 2, 'saved'),
(1, 3, 'favorite'),
(1, 4, 'saved'),
(1, 5, 'saved');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booked`
--
ALTER TABLE `booked`
  ADD PRIMARY KEY (`userId`,`experienceId`),
  ADD KEY `experienceID` (`experienceId`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`experienceId`),
  ADD KEY `providerID` (`providerId`);

--
-- Indexes for table `experience_has_tag`
--
ALTER TABLE `experience_has_tag`
  ADD PRIMARY KEY (`experienceId`,`tagId`),
  ADD KEY `experienceID` (`experienceId`),
  ADD KEY `tagID` (`tagId`);

--
-- Indexes for table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`providerId`),
  ADD KEY `userID` (`userId`) USING BTREE;

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tagId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`userId`,`experienceId`),
  ADD KEY `experienceId` (`experienceId`) USING BTREE,
  ADD KEY `userId` (`userId`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `experienceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `providers`
--
ALTER TABLE `providers`
  MODIFY `providerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tagId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `booked`
--
ALTER TABLE `booked`
  ADD CONSTRAINT `booked_ibfk_1` FOREIGN KEY (`experienceId`) REFERENCES `experiences` (`experienceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `booked_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Begrensninger for tabell `experience_has_tag`
--
ALTER TABLE `experience_has_tag`
  ADD CONSTRAINT `experience_has_tag_ibfk_1` FOREIGN KEY (`experienceId`) REFERENCES `experiences` (`experienceId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `experience_has_tag_ibfk_2` FOREIGN KEY (`tagId`) REFERENCES `tags` (`tagId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Begrensninger for tabell `providers`
--
ALTER TABLE `providers`
  ADD CONSTRAINT `providers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Begrensninger for tabell `views`
--
ALTER TABLE `views`
  ADD CONSTRAINT `views_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `views_ibfk_2` FOREIGN KEY (`experienceId`) REFERENCES `experiences` (`experienceId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
