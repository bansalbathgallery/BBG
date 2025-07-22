-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 15, 2020 at 03:11 PM
-- Server version: 5.7.30-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `secretmenu`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `addressName` varchar(500) DEFAULT '',
  `addressType` varchar(60) DEFAULT '',
  `houseNo` varchar(60) DEFAULT '',
  `latitude` varchar(60) DEFAULT '',
  `longitude` varchar(60) DEFAULT '',
  `town` varchar(100) DEFAULT '',
  `landmark` varchar(100) DEFAULT '',
  `city` varchar(100) DEFAULT '',
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `default` int(10) DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` int(11) NOT NULL DEFAULT '1585547444',
  `updatedAt` int(11) NOT NULL DEFAULT '1585547444'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `addressName`, `addressType`, `houseNo`, `latitude`, `longitude`, `town`, `landmark`, `city`, `companyId`, `userId`, `default`, `status`, `createdAt`, `updatedAt`) VALUES
('063686e6-c12a-4465-b5c6-e01f385a45c4', '41 Sankt-Josefs-Straße, Tratten, Kärnten, 9551, Austria', 'Other', 'qweqwe', '46.68856655168713', '13.963795378804207', '', '', 'qwqwe', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '076d7903-148c-470b-a201-a9127a91998a', 0, 1, 1589976268, 1589976268),
('0e89c3c8-4f54-42dc-a045-28df947f2f42', '1981,sec 65', 'Home', '423', '51.178905593695305', '-1.8263985961675642', '', '', 'Hoshiarpur', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'ceaf98ae-2ad0-4ce4-af37-1e168ff7cced', 0, 1, 1585726498, 1585726498),
('12028015-b9ff-4632-a666-8c09769103d3', 'Sahibzada Ajit Singh Nagar, Sohana, Punjab, 140308, India', 'Home', '776/78', '30.684978251510213', '76.70273657888174', '', '', 'mohali', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1, 1, 1589519276, 1589519276),
('29d5573e-c279-4ac1-b9fe-c5284972d968', '1773, Sector 80, Sahibzada Ajit Singh Nagar, Punjab 140308, India', 'Home', 'vdbbd', '30.67113786169701', '76.71156272292137', '', '', 'bdbdbd', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'd85d4a1f-20d1-47fa-b0a0-525cb3444ae5', 0, 1, 1593580266, 1593580266),
('2a5bb77f-eaf2-41f0-9def-5bad85f7a89c', 'NH754, Jalalabad, Punjab 152023, India', 'Work', 'wjej', '30.60470305906687', '74.2505045235157', '', '', 'jalalabd', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '0243ed39-8e8b-460a-833c-2e619146f94a', 0, 1, 1589976268, 1589976268),
('499026e6-50c4-496a-9034-cef68dc9b283', 'NH754, Jalalabad, Punjab 152023, India', 'Work', 'hshsh', '30.604281742676015', '74.25066813826562', '', '', 'hshse', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87af7745-6514-41f5-b849-7255e06170fb', 0, 1, 1589519975, 1589519975),
('5282c2cf-0c8f-4878-a97d-ea04bfcad421', 'Mohali,India', 'home', '123', '26.99', '56.99', '', '', 'chandigarh', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '90a0946d-61f7-42a8-9d50-4abf55f494ac', 0, 1, 1585817223, 1585817223),
('5c4c6979-4697-4305-8e71-addad8045cf3', 'Fazilka - Ferozpur Rd, Jalalabad, Punjab 152023, India', 'Home', 'cvg', '30.604728453420915', '74.25029531121254', '', '', 'fhb', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87af7745-6514-41f5-b849-7255e06170fb', 0, 1, 1587460838, 1587460838),
('60fe4907-82b6-4d42-b7ff-ad1e9f2542a5', 'Sahibzada Ajit Singh Nagar, Punjab, 160062, India', 'Work', '776', '30.693721547969275', '76.70239359140396', '', '', 'chandigarh', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '86091af5-38b8-4355-9257-17774e2a98f1', 0, 1, 1593429099, 1593429099),
('61e54886-89ee-4ec4-898d-f589ddb6d7e6', 'Unnamed Road, Dinkelsbühl, Bayern, 91550, Germany', 'Other', '334', '49.09498849383544', '10.346448607742786', '', '', 'NewYork', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '86091af5-38b8-4355-9257-17774e2a98f1', 0, 1, 1593429099, 1593429099),
('750fafbc-a075-49d6-a999-79fd040c09a5', 'Himachal Pradesh 175134, India', 'Work', '20220', '32.07138391844948', '77.69671630114317', '', '', 'mohali', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '90a0946d-61f7-42a8-9d50-4abf55f494ac', 0, 1, 1585726498, 1585726498),
('88c9645f-0b92-4c39-98e4-6645390e51cf', 'Mehatpur Road, Bassi Qazian, Punjab 146102, India', 'Work', '2020', '31.476305789548828', '75.97000870853662', '', '', 'Ludhiana', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '90a0946d-61f7-42a8-9d50-4abf55f494ac', 0, 1, 1585726498, 1585726498),
('973f6e3c-ece9-43a4-b6c1-15766b405459', 'Unnamed Road, Punjab 146104, India', 'Work', '2010', '31.413844029869647', '75.92502605170012', '', '', 'chd', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '90a0946d-61f7-42a8-9d50-4abf55f494ac', 0, 1, 1585726498, 1585726498),
('c2328b16-d4de-43e3-926f-af08d6cee842', 'Unnamed Road, Atal Mazara, Punjab 144525, India', 'Work', '2020', '31.15769464699903', '76.28730330616236', '', '', 'ldh', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '90a0946d-61f7-42a8-9d50-4abf55f494ac', 0, 1, 1585817223, 1585817223),
('c5059029-2451-4695-8076-fd19dd3eef2b', '9 Alliway Way, Lone Hill, Sandton, 2062, South Africa', 'Home', '11', '-26.000518485559798', '28.02884079515934', '', '', 'Sandton', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '94f6c7a9-eb5d-46bf-8e76-4878347b7f8d', 0, 1, 1590309569, 1590309569),
('c5d6153e-30ec-41a4-a2d8-f7f2dbdc7070', 'Mohali phase 5 sec 58', 'Work', '1918', '51.178905593695305', '-1.8263985961675642', '', '', 'Mohali', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'e7f68216-fcc4-46fa-b5d9-ff7a68c31eee', 0, 1, 1586769160, 1586769160),
('d7a7d541-bd9f-44b0-a61a-d7104ddceda6', 'Mohali Phase 7,India', '', '', '46.7118', '76.718', '', '', 'chandigarh', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 0, 1, 1586774272, 1586774272),
('e0f875a0-9f9b-40fb-86a7-b0e7b386c295', 'Sahibzada Ajit Singh Nagar, Sector 78, Punjab, 140308, India', 'Home', '776', '30.68191437849088', '76.70185513794424', '', '', 'mohali', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '113ec97e-e5cc-4f14-a42c-8dbff291cf19', 0, 1, 1589884629, 1589884629);

-- --------------------------------------------------------

--
-- Table structure for table `assignedEmployees`
--

CREATE TABLE `assignedEmployees` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rating` varchar(15) DEFAULT '0',
  `review` text,
  `empId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `jobStatus` int(5) NOT NULL DEFAULT '1',
  `cancellationReason` varchar(100) DEFAULT NULL,
  `otherReason` text NOT NULL,
  `ratingOn` datetime NOT NULL DEFAULT '2020-05-04 09:52:47',
  `createdAt` datetime NOT NULL DEFAULT '2020-05-04 09:52:47'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignedEmployees`
--

INSERT INTO `assignedEmployees` (`id`, `rating`, `review`, `empId`, `orderId`, `jobStatus`, `cancellationReason`, `otherReason`, `ratingOn`, `createdAt`) VALUES
('1aa8496d-b795-47f3-a448-90acd761f59d', '0', '', 'ffd17aa2-194b-454a-86ee-2e7a6c59a256', '4d7fc723-5a2e-4b40-bdc9-2abe184afd18', 1, NULL, '', '2020-06-29 12:13:30', '2020-06-29 12:13:30'),
('4b7929d1-9b06-4474-ac6d-c6be8a69c558', '0', '', 'ffd17aa2-194b-454a-86ee-2e7a6c59a256', '4d7fc723-5a2e-4b40-bdc9-2abe184afd18', 2, '0357f416-d96b-471e-a012-8160aa5158c8', '', '2020-06-29 12:13:30', '2020-06-29 12:13:30'),
('66e05c11-fd26-4232-923c-97dcadc11d15', '0', '', 'ffd17aa2-194b-454a-86ee-2e7a6c59a256', 'b438760a-8b01-4920-9cc8-a57f6ced0fbd', 1, NULL, '', '2020-06-29 12:13:30', '2020-06-29 12:13:30'),
('7ce91128-eb19-4151-8cb9-60932815f2fa', '0', '', 'ffd17aa2-194b-454a-86ee-2e7a6c59a256', 'd9b4014e-56d3-41ab-9b05-adf842172c7e', 1, NULL, '', '2020-06-29 11:11:39', '2020-06-29 11:11:39'),
('9d6ea27a-6b1a-40e1-982b-7edf18e32da9', '0', '', 'c0a0318b-7b9d-4d87-babc-e1817703983f', 'b438760a-8b01-4920-9cc8-a57f6ced0fbd', 1, NULL, '', '2020-06-29 12:13:30', '2020-06-29 12:13:30'),
('f40004f7-56a5-49ff-a0a8-e58bfa403ff8', '0', '', 'ffd17aa2-194b-454a-86ee-2e7a6c59a256', 'ca01395f-9513-4902-a5d3-b7442d32b334', 1, NULL, '', '2020-06-22 05:45:55', '2020-06-22 05:45:55');

-- --------------------------------------------------------

--
-- Table structure for table `assignRole`
--

CREATE TABLE `assignRole` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `employeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `roleTypeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` int(11) NOT NULL DEFAULT '1585550179',
  `updatedAt` int(11) NOT NULL DEFAULT '1585550179'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(60) DEFAULT '',
  `url` varchar(60) DEFAULT '',
  `status` int(11) DEFAULT '1',
  `orderby` int(30) NOT NULL,
  `companyId` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `name`, `url`, `status`, `orderby`, `companyId`, `createdAt`) VALUES
('1efaeaad-43f2-4a19-8881-dfe694f8a401', 'Banner1', '1593428778844_26.jpg', 1, 6, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-12 00:00:00'),
('25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'Banner3', '1593428846884_39.jpg', 1, 2, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-10 00:00:00'),
('25cbf58b-46ba-4ba2-b25d-8f8f653e9f12', 'Banner2', '1593428803643_30.jpg', 1, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-03 00:00:00'),
('25cbf58b-46ba-4ba2-b25d-8f8f653e9f22', 'Banner3', '1587544799328_upload.gif', 1, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f21', '2020-05-04 00:00:00'),
('321f5fd1-d294-4330-a994-2e77afd9df50', 'Donuts New', '1590147610012_26.jpg', 1, 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28'),
('3a91ccf7-9c1c-4d82-8563-1ac91b158c00', 'Food', '1590140219418_ban2.jpg', 1, 2, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '2020-05-20 12:04:28'),
('3aac7b53-22a0-411b-9a76-f5a6f5beeb1d', 'Chicken', '1590140199672_ban1.jpg', 1, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '2020-05-20 12:04:28'),
('4a45667a-5d47-4b79-8857-a9fa5ef93a8f', 'we', '1590145505602_delhi.jpg', 1, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('53c41918-3388-4b60-a0d6-2143fae739da', 'Donuts', '1590147415738_25.jpg', 1, 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28'),
('5c98addf-6040-4698-920a-622c28cabefc', 'Fast Foods', '1590152063296_38.jpg', 1, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('600d08a1-9aac-4dd4-9479-0559ea62731c', 'hngnh', '1590147451265_main_thali.jpg', 1, 1, '1ea67eec-a3ba-433e-b67b-e1aa7f2c85f4', '2020-05-20 12:04:28'),
('72736323-233d-46a4-aeed-06805aed2019', 'gf', '1590147472258_dal.jpg', 1, 1, '1ea67eec-a3ba-433e-b67b-e1aa7f2c85f4', '2020-05-20 12:04:28'),
('adf56526-52a9-40ad-956f-e01067ad3914', 'efe', '1590145531918_chicken.jpg', 1, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('b8a05c4d-3f46-4aec-bc63-5584d01aec61', 'Fast Food spl', '1590152219923_39.jpg', 1, 2, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('d25b3453-6f87-4771-a200-b84a4d7a599c', 'Fast Food', '1590151958135_37.jpg', 1, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('fe88e406-92e5-42a0-9ae4-4986264b4039', 'Donuts 3', '1590147630916_27.jpg', 1, 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28');

-- --------------------------------------------------------

--
-- Table structure for table `businessType`
--

CREATE TABLE `businessType` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `businessName` varchar(200) NOT NULL DEFAULT '',
  `type` int(5) NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` date NOT NULL DEFAULT '2020-05-20',
  `updatedAt` date NOT NULL DEFAULT '2020-05-20'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `businessType`
--

INSERT INTO `businessType` (`id`, `businessName`, `type`, `companyId`, `createdAt`, `updatedAt`) VALUES
('25cbf58b-46ba-4ba2-b25d-8f8f653e9f14', 'Services', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '2020-05-20', '2020-05-20');

-- --------------------------------------------------------

--
-- Table structure for table `cancelReasons`
--

CREATE TABLE `cancelReasons` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `reason` text,
  `status` int(11) DEFAULT '1',
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2020-05-04 08:34:37'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cancelReasons`
--

INSERT INTO `cancelReasons` (`id`, `reason`, `status`, `companyId`, `createdAt`) VALUES
('0357f416-d96b-471e-a012-8160aa5158c6', 'Out of Station', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '2020-05-04 08:34:37'),
('0357f416-d96b-471e-a012-8160aa5158c7', 'Not Avaialble', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '2020-05-04 08:34:37'),
('0357f416-d96b-471e-a012-8160aa5158c8', 'On Emergency Leave', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '2020-05-04 08:34:37');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `serviceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `orderPrice` varchar(15) NOT NULL,
  `quantity` varchar(15) NOT NULL,
  `orderTotalPrice` varchar(15) NOT NULL,
  `promoCode` varchar(60) DEFAULT '',
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` int(11) NOT NULL DEFAULT '1586499367',
  `updatedAt` int(11) NOT NULL DEFAULT '1586499367'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `serviceId`, `orderPrice`, `quantity`, `orderTotalPrice`, `promoCode`, `companyId`, `userId`, `createdAt`, `updatedAt`) VALUES
('04949735-8642-4ea2-92da-40116612be8b', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f16', '600', '3', '1800', '', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '90a0946d-61f7-42a8-9d50-4abf55f494ac', 1586846116, 1586846116),
('25c29015-5999-42d4-badc-d1cba22d37f7', '8015163e-f39d-4566-936a-256623edc39e', '500', '1', '500', '', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1593580266, 1593580266),
('7f2d0608-a83a-406a-94cb-afdc2cf0972c', '5069e8f6-0032-46d4-96d4-f3ab356eb348', '260', '1', '260', 'NewOne', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'd85d4a1f-20d1-47fa-b0a0-525cb3444ae5', 1593580266, 1593580266),
('a57c3570-fdb9-4ad7-90fd-5131818e38b7', '2464e00b-ba4a-41ec-a0b8-f2f99fc4b99f', '200', '1', '200', 'NewOne', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'd85d4a1f-20d1-47fa-b0a0-525cb3444ae5', 1588943779, 1588943779),
('a9366448-b6d2-4722-9892-0c7ac2c2cdb8', '58fb067d-fa4c-4ce4-b9fb-a4b70e15bb17', '400', '1', '400', '', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '90a0946d-61f7-42a8-9d50-4abf55f494ac', 1586846116, 1586846116),
('c59f65d6-3984-4f95-a2cc-8cb64481d1b0', '56ea804e-1510-4458-914a-aad42c05c789', '200', '1', '200', '', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 1589275889, 1589275889),
('f9d8d6f6-2cfb-44b9-a8b2-71bd04d4b1bf', '7284b29c-73c1-496b-91df-b624037a52dc', '1499', '3', '4497', 'New10', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'e7f68216-fcc4-46fa-b5d9-ff7a68c31eee', 1586868320, 1586868320),
('fbbcf7cc-9be2-42f6-8def-40b160b0e8c4', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f15', '600', '2', '1200', '', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '90a0946d-61f7-42a8-9d50-4abf55f494ac', 1586846116, 1586846116);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `parentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT '',
  `description` text NOT NULL,
  `icon` text NOT NULL,
  `thumbnail` text NOT NULL,
  `orderby` int(20) DEFAULT NULL,
  `level` int(20) NOT NULL,
  `connectedCat` text NOT NULL,
  `colorCode` varchar(30) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `parentId`, `name`, `description`, `icon`, `thumbnail`, `orderby`, `level`, `connectedCat`, `colorCode`, `status`, `companyId`, `createdAt`) VALUES
('00b1e5be-a5fc-43cd-884f-8f4c9f9b7093', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Traditional Pasta', 'Traditional PastaTraditional PastaTraditional Pasta', '1593430778357_5656.jpeg', '1593430778357_5656.jpeg', NULL, 1, 'b21a7c8f-078f-4323-b914-8f59054c4467', 'ABA25B', 1, '15fc76eb-b483-436a-8f73-b1d7d5c0c47d', '2020-06-29 11:11:39'),
('011b4cb4-7130-4557-ada7-7ff7c20ad23a', '81f7f4dd-8707-4ccf-a0d5-d820e39de638', 'Paccheri Pasta', 'Recently, Rob and I attended a family “1st Birthday” celebration, which was held for the first born son of an Italian family, so naturally, they went ALL OUT– especially on the food. One of the stations included pasta imported from Italy and when the food far outnumbered the guests (as usual), we were left to take home leftover bags of uncooked artisanal pastas. For a couple of months, the pasta sat untouched on the shelf of our pantry, haunting me as I tried to determine the type of sauce that would compliment the uniquely shaped noodles. Lo and behold, Paccheri Alla Bolognese was born. ', '1590149876655_BOLOGNESE1.jpg', '1590149876656_BOLOGNESE1.jpg', NULL, 2, '[\"36e216e2-2d9c-4b40-8875-841294489511\",\"81f7f4dd-8707-4ccf-a0d5-d820e39de638\"]', '', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('04b2fd25-3e85-4485-b7c7-8748db4cdd83', '92f457c0-7d9f-46da-acc1-598fd44b2b9d', 'Kitchen Appliances', '', '1589355025541_14.jpg', '1589355025542_14.jpg', NULL, 2, '[\"92f457c0-7d9f-46da-acc1-598fd44b2b9d\",\"30a42e47-63e0-49d4-b77d-6496ec53b87d]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-13 06:42:11'),
('0536d27b-3082-4660-b667-ca662f075565', '36e216e2-2d9c-4b40-8875-841294489511', 'Sandwich', 'A sandwich is a food typically consisting of vegetables, sliced cheese or meat, placed on or between slices of bread, or more generally any dish wherein bread serves as a container or wrapper for another food type. The sandwich began as a portable finger food in the Western world, though over time it has become prevalent worldwide. The 3rd of November marks the National Sandwich Day.', '1590148257248_23.jpg', '1590148257248_23.jpg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('056a1d17-4d53-47eb-a5b7-35f224de764a', 'f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'Bestsellers', '', '1587542022564_best-seller.png', '1587542022564_best-seller.png', NULL, 2, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\",\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-12 00:00:00'),
('075129a3-a928-4379-95a8-c759b0f87804', 'f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'Main Course', '', '1587542410579_china-main-course-chopsuey-chinese-chopsuey.jpg', '1587542410579_china-main-course-chopsuey-chinese-chopsuey.jpg', NULL, 2, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\",\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-10 00:00:00'),
('0e64d202-1dd9-40d9-b891-29391f29d8b2', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Crispy', 'CrispyCrispyCrispy', '1593426436582_18.jpg', '1593426436582_19.jpeg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"f3b07174-10dc-44b0-9291-b187bf3703fd\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('1071d0ac-0558-4664-967c-c91eac4a17e9', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Tortilla', 'TortillaTortillaTortilla', '1593426372950_16.jpg', '1593426372950_16.jpg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"f3b07174-10dc-44b0-9291-b187bf3703fd\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('13267548-798e-4c70-b9ab-8554c14803c5', '92f457c0-7d9f-46da-acc1-598fd44b2b9d', 'Microwave Repair', 'The technical team at unistar electronics are capable in repairing of all types of domestic and commercial microwave ovens in zirakpur. No matter in which condition your microwave oven is, no matter where you purchased it, which brand is that and year of purchase, bring your not working microwave to the microwave oven repair center in zirakpur. We are expert in repairing any microwave oven. We will fix it right in working position just call and we will come at your home, office or restaurants to repair and servive microwave at your place. We provide better customer service, suitable time duration, fair and reasonable prices, trustworthy repair solution, and also the warranty on all services. These days three type of microwave ovens availabe in the market. Standered, microwave with grill, microwave oven with grill and convection.', '1589354841318_13.jpg', '1589354841318_13.jpg', NULL, 2, '[\"92f457c0-7d9f-46da-acc1-598fd44b2b9d\",\"30a42e47-63e0-49d4-b77d-6496ec53b87d\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-13 06:42:11'),
('17d766ba-8281-4664-97fc-f7102104b257', 'f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'Fried Rice and Noodles', '', '1587542653597_2273955494_8a255942f0.jpg', '1587542653598_2273955494_8a255942f0.jpg', NULL, 1, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-06 00:00:00'),
('1ce5aae2-686c-4440-b035-8e4c8d5e0a2d', '36e216e2-2d9c-4b40-8875-841294489511', 'Pizza', 'In restaurants, pizza can be baked in an oven with stone bricks above the heat source, an electric deck oven, a conveyor belt oven, or, in the case of more expensive restaurants, a wood or coal-fired brick oven. On deck ovens, pizza can be slid into the oven on a long paddle, called a peel, and baked directly on the hot bricks or baked on a screen (a round metal grate, typically aluminum). Prior to use, a peel may be sprinkled with cornmeal to allow pizza to easily slide onto and off of it. When made at home, it can be baked on a pizza stone in a regular oven to reproduce the effect of a brick oven.', '1590144657790_2.jpg', '1590144657790_2.jpg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('1d763183-3fd0-4feb-a9dd-444440f86b8c', 'dfe17f72-998e-4e1e-93ec-cda000d0bc6a', 'Traditional', 'Traditional Indian Food', '1593424952133_18.jpg', '1593424952133_18.jpg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"dfe17f72-998e-4e1e-93ec-cda000d0bc6a\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('2872ce5f-8e3a-4a17-901e-4bfe27751466', 'e3d08bdf-b73e-45eb-845a-b8f2b9507088', 'Fade and Taper.', '', '1588138046279_threading-1024x682.jpg', '1588138046279_threading-1024x682.jpg', NULL, 2, '[\"e3d08bdf-b73e-45eb-845a-b8f2b9507088\",\n\"b21a7c8f-078f-4323-b914-8f59054c4468\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-29 05:23:27'),
('2a91b028-b897-4cd6-ae76-ebb990c37d62', 'e3d08bdf-b73e-45eb-845a-b8f2b9507088', 'Comb over', '', '1588138129183_images.jpg', '1588138129183_images.jpg', NULL, 2, '[\"e3d08bdf-b73e-45eb-845a-b8f2b9507088\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-29 05:23:27'),
('30e26001-db2e-4980-ab7e-fdf1b4dadab8', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Burgers', 'BurgersBurgersBurgersBurgers', '1593430119289_45.jpg', '1593430119291_45.jpg', NULL, 1, 'b21a7c8f-078f-4323-b914-8f59054c4467', 'AB7F5E', 1, '0eb6310c-0f6a-49d3-b986-da75cabb85e6', '2020-06-29 11:11:39'),
('3f1d0f53-83b2-4bec-ae61-a4fd22b00dd6', '040a9572-e12c-4153-b160-7460ded088b1', 'Bread', '', '1590147021995_roti.jpg', '1590147021995_roti.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('429b374f-f0ca-4dcd-ab69-2f94030fa25e', '36e216e2-2d9c-4b40-8875-841294489511', 'Burgers', 'A Burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The patty may be pan fried, grilled, smoked or flame broiled. Hamburgers are often served with cheese, lettuce, tomato, onion, pickles, bacon, or chiles; condiments such as ketchup, mustard, mayonnaise, relish, or \"special sauce\"; and are frequently placed on sesame seed buns. A hamburger topped with cheese is called a cheeseburger.', '1590144851533_1.jpg', '1590144851534_1.jpg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('431ba68e-247d-4be3-a1dd-1aa69fb08f9f', '064443ed-8de9-4ce1-a09f-942df2e2faf0', 'Sweet Rolls', 'Sweet Rolls', '1590141181294_13.jpeg', '1590141181295_13.jpeg', NULL, 1, '064443ed-8de9-4ce1-a09f-942df2e2faf0', '27AB82', 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28'),
('46d6d47a-888f-4dec-b288-421f5fa3dd22', 'f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'Deserts and beverages', '', '1587542837627_main-qimg-d18f379b7256946143c582d89492cb5d-c.jpg', '1587542837627_main-qimg-d18f379b7256946143c582d89492cb5d-c.jpg', NULL, 2, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\",\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-03 00:00:00'),
('4d28de94-9d5d-4386-a1e7-ed0521d3e477', 'dfe17f72-998e-4e1e-93ec-cda000d0bc6a', 'Samosa', 'SamosaSamosaSamosa', '1593425406455_5.jpeg', '1593425406455_5.jpeg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"dfe17f72-998e-4e1e-93ec-cda000d0bc6a\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('4d5f3ac9-f7ee-497e-81f9-9a39690ace1c', '040a9572-e12c-4153-b160-7460ded088b1', 'Pure Veg', '', '1590145685146_main.jpg', '1590145685147_main.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('537fe88c-dae3-4832-b3c7-d5bdfcd5f7c9', '064443ed-8de9-4ce1-a09f-942df2e2faf0', 'Brownies', 'Brownies Fresh', '1590141591115_14.jpg', '1590141591115_14.jpg', NULL, 1, '064443ed-8de9-4ce1-a09f-942df2e2faf0', 'AB2567', 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28'),
('53d5ef71-935a-43dc-93ca-0d072f60d4f1', '1d763183-3fd0-4feb-a9dd-444440f86b8c', 'Biryani', 'Biryani,Biryani', '1593425057938_19.jpeg', '1593425057939_19.jpeg', NULL, 3, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"dfe17f72-998e-4e1e-93ec-cda000d0bc6a\",\"1d763183-3fd0-4feb-a9dd-444440f86b8c\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('60d95fa1-5a09-4e16-97c0-4fb5ca79c898', '1ce5aae2-686c-4440-b035-8e4c8d5e0a2d', 'Indi Tandoori Paneer', 'It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum I red paprika I mint mayo.\r\nMAKING PIZZA SAUCE:\r\n1. Take 1 cup tomato sauce in a bowl. Add 2 tbsp hot & sweet sauce, 1 heaped tsp full of oregano herbs, 1/2 tsp chili flakes to it. And mix them well. If you want spiciness add a little bit of extra hot & sweet sauce and red chili flakes.', '1590146134713_Tandoori_Paneer_Pizza_from_India.jpg', '1590146134713_Tandoori_Paneer_Pizza_from_India.jpg', NULL, 2, '[\"36e216e2-2d9c-4b40-8875-841294489511\",\"1ce5aae2-686c-4440-b035-8e4c8d5e0a2d\"]', '', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('60fce689-9a3f-45b8-827c-dfc5cb20d492', 'f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'Starters', '', '1587542264643_starter.jpg', '1587542264643_starter.jpg', NULL, 2, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\",\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-05 00:00:00'),
('65d7af95-12d1-4761-8510-d9436078c9fe', '45dd49e2-a473-43b5-a0c3-a03b14a1e83f', 'Switch&Socket', 'Testing Purpose', '1589352623188_entice-ddd-0.jpg', '1589352623190_entice-ddd-0.jpg', NULL, 2, '[\"45dd49e2-a473-43b5-a0c3-a03b14a1e83f\",\"30a42e47-63e0-49d4-b77d-6496ec53b87d\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-13 06:42:11'),
('665c035e-1dd1-41fa-bda1-a27d5afb4e0a', '2a91b028-b897-4cd6-ae76-ebb990c37d62', 'Men ', '', '1588138154734_images.jpg', '1588138154734_images.jpg', NULL, 3, '[\"e3d08bdf-b73e-45eb-845a-b8f2b9507088\",\"2a91b028-b897-4cd6-ae76-ebb990c37d62\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-29 05:23:27'),
('677b37ac-7729-468c-b8e5-1a859211a094', '53c371fd-1cc6-4b6e-859d-9bd97c242a09', 'Without Roof Painting', '', '1589631171377_Tracking screen.jpg', '1589631171378_Settings.png', NULL, 3, '[\"2f4e23ca-fd8d-41ff-a2e7-0ff432ea476a\",\"2b5bc06e-0a11-40b4-853f-36417a820429\",\"53c371fd-1cc6-4b6e-859d-9bd97c242a09\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-16 12:02:16'),
('69c3bf97-2eb6-4165-a708-d28d928f1713', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Fast Food', '', '1587541138145_fast-food.png', '1587541138145_fast-food.png', NULL, 1, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', 'AB2567', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-03 00:00:00'),
('75155758-94e8-497f-b780-047e9e8e100f', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Soft', 'SoftSoftSoftSoftSoft', '1593426463949_5.jpeg', '1593426463949_5.jpeg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"f3b07174-10dc-44b0-9291-b187bf3703fd\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('81f7f4dd-8707-4ccf-a0d5-d820e39de638', '36e216e2-2d9c-4b40-8875-841294489511', 'Pasta', 'It’s hearty, it’s rustic and there is no twirling required. It hold it’s own against some pretty delicious sauces, like this creamy garlic sauce, and it’s amazing in this Tomato Basil Pasta recipe. It’s also easy to pick up out of the pot with your fingers if that’s how you like to do things. No judgement here.', '1590149536096_Tomato-Basil-Penne-Pasta-2-of-6.jpg', '1590149536096_Tomato-Basil-Penne-Pasta-2-of-6.jpg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('83d29148-cfab-4cac-8259-e0403f2291fe', 'aa7b0190-97b1-4519-bf66-df04f5f33b85', 'non-veg', '', '1587534585128_nonveg.jpg', '1587534585129_nonveg.jpg', NULL, 3, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\",\"aa7b0190-97b1-4519-bf66-df04f5f33b85\",\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-03 00:00:00'),
('86229ced-462f-4e5b-8d62-7097e13ca153', '040a9572-e12c-4153-b160-7460ded088b1', 'Pav Bhaji', '', '1590147049418_pav.jpg', '1590147049418_pav.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('86787b23-cf09-44e4-81f1-895f6ab5edd2', 'f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'Combos', '', '1587542161546_ChickenKebabCombo_F2.jpg', '1587542161546_ChickenKebabCombo_F2.jpg', NULL, 2, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\",\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '0000-00-00 00:00:00'),
('8688b3ac-54c4-4040-ace0-415fc27399d6', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Dinner', 'SoftSoftSoftSoftSoftSoftSoft', '1593426496523_18.jpg', '1593426496523_18.jpg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"f3b07174-10dc-44b0-9291-b187bf3703fd\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('86e9254b-75ab-41f2-a62f-108dc387c4e4', 'c5e94eff-700e-468a-a328-93f8f4186d46', 'Grilled Cheese Sandwich', 'Ah, the grilled cheese. It’s the quintessential comfort food that not only pairs easily with a cup of soup, but it’s easy to whip together with just a few ingredients. There are many reasons to celebrate the gooey cheesiness of this toasted sandwich, but at nearly 700 calories, it’s definitely an occasional treat.', '1590147083223_GrilledCheese.jpg', '1590147083223_GrilledCheese.jpg', NULL, 2, '[\"36e216e2-2d9c-4b40-8875-841294489511\",\"c5e94eff-700e-468a-a328-93f8f4186d46\"]', '', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('8cce3955-3a0a-486c-8d75-ca384dbc702a', 'd40e3570-c12c-4284-b3ea-71140cd157b3', 'Non-Veg', '', '1589966870795_chinese-food-icon-300x300.png', '1589966870795_chinese-food-icon-300x300.png', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"d40e3570-c12c-4284-b3ea-71140cd157b3\"]', '', 1, 'ed33cbfe-d28e-4816-9962-57825ca36e24', '2020-05-20 09:23:02'),
('93b1021c-0c74-42c9-bd8f-b9877f432569', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Thai', '', '1587541352640_thailand.png', '1587541352640_thailand.png', NULL, 1, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', 'AB2567', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-03 00:00:00'),
('95fc35f7-7d59-4ddf-9942-11c46a293dc5', 'add3f1b8-0e44-4bc0-8bb4-2236dad67537', 'Veg  Hakka Noodles', 'Noodles tossed in garlic, shredded vegetables with salt and pepper.Hakka noodles is a Chinese preparation where boiled noodles are stir fried with sauces and vegetables or meats. A hakka noodle is made from unleavened dough( rice or wheat flour) that is cooked in a boiling liquid. Depending upon the type, noodles may be dried or refrigerated before cooking.', '1590151338084_vegetables-hakka-noodles.jpg', '1590151338084_vegetables-hakka-noodles.jpg', NULL, 2, '[\"36e216e2-2d9c-4b40-8875-841294489511\",\"add3f1b8-0e44-4bc0-8bb4-2236dad67537\"]', '', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('96c7b7a2-721b-4428-83cf-4bbea80c4278', '36e216e2-2d9c-4b40-8875-841294489511', 'Muffin', 'A muffin is an individual-sized, baked product. It can refer to two distinct items, a part-raised flatbread that is baked and then cooked on a griddle (typically unsweetened) and a cupcake-like quickbread (often sweetened) that is chemically leavened and then baked in a mold. While quickbread muffins are often sweetened, there are savory varieties made with ingredients such as corn and cheese. The flatbread is of British or European derivation, and dates from at least the early 18th century, while the quickbread originated in North America during the 19th century. Both are common worldwide today.', '1590152574400_40.jpg', '1590152574401_40.jpg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('9729ea82-139d-4b46-93b9-a542ff600ec8', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Veggie Burgers', 'Ah, veggie burgers—some really slay while others are just cray. \"Traditional veggie burgers are typically satisfying and a great way to slash artery-clogging saturated fat when used to replace hamburgers,\" the Nutrition Twins advise. Plus, using veggie burgers reduces exposure to heterocyclic amines, the carcinogens created when meat is heated on the grill at high temperatures.\r\n\r\nVeggie burgers aren\'t the leading ladies on our list, though, because some of them are just as high in calories as traditional burgers. Also, some of the pre-made ones are rather large and contain a lot of oil, too. On top of all that, some store-bought veggie burgers are packed with sodium, the Nutrition Twins explain.', '1590146182489_12.jpg', '1590146182489_12.jpg', NULL, 2, '[\"36e216e2-2d9c-4b40-8875-841294489511\",\"429b374f-f0ca-4dcd-ab69-2f94030fa25e\"]', '', 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('9fa4bf12-3fbd-4182-aac4-f995efc2716a', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Black Bean Burgers', 'From a healthy eating standpoint, they\'ve got everything you\'d want in a burger: Black beans pack 8 grams of protein and 7.5 grams of fiber in a 1/2-cup serving, but they\'re low in calories and free of saturated fat.\r\n\r\nAnd don\'t let their all-black exterior fool you, either. Even though they\'re not as colorful as traditionally antioxidant-rich fruits, they\'re still full of them. Black beans are a great source of anthocyanins, which are antioxidant compounds that can boost your brain power.', '1590146343055_15.jpg', '1590146343055_15.jpg', NULL, 2, '[\"36e216e2-2d9c-4b40-8875-841294489511\",\"429b374f-f0ca-4dcd-ab69-2f94030fa25e\"]', '', 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('a0eab67d-b3e4-4a18-98c5-3c170493d583', '36e216e2-2d9c-4b40-8875-841294489511', 'Burger', 'We want to showcase traditional food with a twist; therefore the finalists of this year have a fantastic surprise awaiting them.\r\n‘Adding a few curve balls and twists to heat up things in the kitchen, chefs will be presented with mystery food baskets and a few surprise detours.\r\n‘This year our host is 1KZN TV presenter, Dumi of the reality show, Siyapheka which features home made meals, from traditional to modern dishes and she will be interacting with the finalists throughout the contest.', '1590148934083_Junk-food.jpg', '1590148934083_Junk-food.jpg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('a2b80589-5249-4603-b9af-f8b98b673ad9', '040a9572-e12c-4153-b160-7460ded088b1', 'Rice', '', '1590147102100_rice.jpg', '1590147102100_rice.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('a895445e-869b-40f1-8a26-d7fa133d257c', '040a9572-e12c-4153-b160-7460ded088b1', 'Chaat', '', '1590146995003_chaat.jpg', '1590146995003_chaat.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('a8ed80b6-d584-4f92-9755-aaa5ef9f061a', 'd40e3570-c12c-4284-b3ea-71140cd157b3', 'Vegetarian', '', '1589966844038_images (1).jpg', '1589966844038_images (1).jpg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"d40e3570-c12c-4284-b3ea-71140cd157b3\"]', '', 1, 'ed33cbfe-d28e-4816-9962-57825ca36e24', '2020-05-20 09:23:02'),
('a92eb2f5-609a-4bd8-ab8b-92935923235b', 'f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'Rice', '', '1587542546221_OIPJM65VEKX.jpg', '1587542546221_OIPJM65VEKX.jpg', NULL, 2, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\",\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-03 00:00:00'),
('aa7b0190-97b1-4519-bf66-df04f5f33b85', 'f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'Soups', '', '1587534347950_soup.jpg', '1587534347951_soup.jpg', NULL, 2, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\",\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-03 00:00:00'),
('add3f1b8-0e44-4bc0-8bb4-2236dad67537', '36e216e2-2d9c-4b40-8875-841294489511', 'Noodles', 'Crispy noodle salad with prawns and zuchini cold udon (thick Japanese wheat flour noodle) salad.\r\nThe first one should definitely come with a spice warning because it literally reduced me to tears. The spice level was so overwhelming it dominated all other flavours of the dish. The prawns were chewy – this dish was quite deceptive because it looked so innocent but exploded like a nuclear bomb.', '1590150480705_noodles.jpg', '1590150480705_noodles.jpg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('aed1062c-2a45-45ba-90f5-92c2e8b71147', '040a9572-e12c-4153-b160-7460ded088b1', 'Biryani', '', '1590144355681_ban1.jpg', '1590144355681_ban1.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('b21a7c8f-078f-4323-b914-8f59054c4467', '0', 'Food & Delivery', '', '1587542653597_2273955494_8a255942f0.jpg', '1587542653597_2273955494_8a255942f0.jpg', NULL, 0, '', '85248E', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '2020-03-02 00:00:00'),
('b366fd40-34f3-4abc-8d78-4c19d3660760', '9b153a2d-44cb-491e-846f-7cbde95c626f', 'OilPaint11', '', '1589617601242_How To Ride.png', '1589617601242_How To Ride.png', NULL, 2, '[\"2f4e23ca-fd8d-41ff-a2e7-0ff432ea476a\",\"9b153a2d-44cb-491e-846f-7cbde95c626f\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-16 08:25:00'),
('b3dd5de8-3e9a-4762-a5a6-5dce585ac277', '040a9572-e12c-4153-b160-7460ded088b1', 'Non-Vegetarian', '', '1590142958818_mutton-curry_620x350_61489741190.jpg', '1590142958818_mutton-curry_620x350_61489741190.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('b6079ca8-37e8-4716-a75f-1fd6b3d64f14', '040a9572-e12c-4153-b160-7460ded088b1', 'Biryani', '', '1590147655710_kolkatta.jpg', '1590147655710_kolkatta.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '1ea67eec-a3ba-433e-b67b-e1aa7f2c85f4', '2020-05-20 12:04:28'),
('bee2bb26-c80c-4edb-bcf6-aec4347292ee', '040a9572-e12c-4153-b160-7460ded088b1', 'Non-Veg', '', '1590147566080_roast.jpg', '1590147566080_roast.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '1ea67eec-a3ba-433e-b67b-e1aa7f2c85f4', '2020-05-20 12:04:28'),
('c094b373-687e-43a2-9659-f8134333af79', '040a9572-e12c-4153-b160-7460ded088b1', 'Chaat', '', '1590147527811_chaat.jpg', '1590147527811_chaat.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '1ea67eec-a3ba-433e-b67b-e1aa7f2c85f4', '2020-05-20 12:04:28'),
('c2723787-83e9-49f6-be4a-cda22fd515dc', '064443ed-8de9-4ce1-a09f-942df2e2faf0', 'Donuts', 'Donuts Fresh', '1590141461780_13.jpg', '1590141461781_13.jpg', NULL, 1, '064443ed-8de9-4ce1-a09f-942df2e2faf0', 'AB2567', 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28'),
('c35ca933-878b-4674-b5ec-e8150afd5436', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Beef Burgers', 'A traditional ground beef burger can be a good, high-protein meal—especially if it\'s grass-finished beef, which we\'ll tell you more about in a second. Beef is one of the best sources of B12, a vitamin essential to the production of red blood cells and energy. And even though it\'s ranked the worst, that\'s largely because of how often beef burgers get totally ruined—it\'s hard to find burgers that don\'t have descriptors like \"double patty,\" \"onion shoestrings,\" and \"crispy bacon.\"', '1590146081158_11.jpg', '1590146081158_11.jpg', NULL, 2, '[\"36e216e2-2d9c-4b40-8875-841294489511\",\"429b374f-f0ca-4dcd-ab69-2f94030fa25e\"]', '', 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('c5e94eff-700e-468a-a328-93f8f4186d46', '36e216e2-2d9c-4b40-8875-841294489511', 'Sandwiches', 'Veg toast sandwich is very popular street food in Mumbai, India.  It is different from the regular Vegetable sandwich that we prepare with mayonnaise sauce at our home.Since we prepare it with vegetables and Indian spices. Thus, this sandwich is very nutritious as well as spicy and tangy.', '1590146815001_Veg-Toast-Sandwich.jpg', '1590146815001_Veg-Toast-Sandwich.jpg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('ce64573d-84c5-4703-9198-f2f3c93748a5', '040a9572-e12c-4153-b160-7460ded088b1', 'Bread', '', '1590147505476_roti.jpg', '1590147505476_roti.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '1ea67eec-a3ba-433e-b67b-e1aa7f2c85f4', '2020-05-20 12:04:28'),
('cfebb7ad-2160-4d8b-a693-a4f847222629', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Italian', '', '1587541242083_pizza.png', '1587541242083_pizza.png', NULL, 1, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', 'AB2567', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-27 00:00:00'),
('d397c778-6f88-4cf9-9e54-a4549e7521c2', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Fresh Donuts', 'DonutsDonutsDonutsDonuts', '1593430372565_56.jpeg', '1593430372565_56.jpeg', NULL, 1, 'b21a7c8f-078f-4323-b914-8f59054c4467', '6F82AB', 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-06-29 11:11:39'),
('d40e3570-c12c-4284-b3ea-71140cd157b3', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Indian Foods', '', '1589966813233_images (1).jpg', '1589966813234_images (1).jpg', NULL, 1, 'b21a7c8f-078f-4323-b914-8f59054c4467', 'AB2B19', 1, 'ed33cbfe-d28e-4816-9962-57825ca36e24', '2020-05-20 09:23:02'),
('d5940182-b226-4f14-b6a4-02232c790a0d', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Bison Burgers', 'Flavor-wise, bison is just about as close as you can get to beef. It\'s tender and even a bit sweet. But its nutritional profile makes it a much healthier option than a par-for-the-course ground beef burger. A 90% lean hamburger has about 10 grams of fat, according to the USDA. But a bison burger (AKA buffalo burger), by comparison, has 2 grams of fat and 24 grams of protein—making it a lean, mean protein! Even though it\'s not plant-based, bison earned its rank higher up on the list because you can truly satisfy your burger craving with a healthy doppelgänger…and your chances of sabotaging with unhealthy condiments to try to make it taste great are lower.', '1590146254782_13.jpg', '1590146254782_13.jpg', NULL, 2, '[\"36e216e2-2d9c-4b40-8875-841294489511\",\"429b374f-f0ca-4dcd-ab69-2f94030fa25e\"]', '', 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('dbce1dbd-97eb-4e44-9b9a-10a1b3e1f757', '45dd49e2-a473-43b5-a0c3-a03b14a1e83f', 'Appliances', 'testing purpodse', '1589353159435_download.jpg', '1589353159435_download.jpg', NULL, 2, '[\"30a42e47-63e0-49d4-b77d-6496ec53b87d\",\"45dd49e2-a473-43b5-a0c3-a03b14a1e83f\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-13 06:42:11'),
('df8b9469-320e-4f2d-9469-f0abc6645da8', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Pizzas', 'PizzasPizzasPizzasPizzas', '1593430222945_39.jpg', '1593430222946_39.jpg', NULL, 1, 'b21a7c8f-078f-4323-b914-8f59054c4467', '57A1AB', 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-06-29 11:11:39'),
('dfe17f72-998e-4e1e-93ec-cda000d0bc6a', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Indian', '', '1587541467624_samosa.png', '1587541467624_samosa.png', NULL, 1, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', 'AB2567', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-04 00:00:00'),
('e081cb3f-87f3-47dd-a63e-1c62d405e43e', '1ce5aae2-686c-4440-b035-8e4c8d5e0a2d', 'Mexican Green Wave', 'A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs.Try this yummy cheesy \"Domino\'s\" style pizza called Mexican Green Wave Pizza topped with double cheese, fresh vegetable slices, and spicy red chili flakes. This easy to make homemade pizza is really extra tasty than \"Domino\'s\" Mexican Pizza. Let\'s try this.', '1590145676563_new_mexican_green_wave.jpg', '1590145676564_new_mexican_green_wave.jpg', NULL, 2, '[\"36e216e2-2d9c-4b40-8875-841294489511\",\"1ce5aae2-686c-4440-b035-8e4c8d5e0a2d\"]', '', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28'),
('e5a5c2f3-76f0-4dee-a3f6-75cc8ef92196', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'American', '', '1587541012461_hot-dog.png', '1587541012461_hot-dog.png', NULL, 1, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', 'AB2567', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-04 00:00:00'),
('e61cfec3-bc66-4830-81e8-08247895fd23', 'dfe17f72-998e-4e1e-93ec-cda000d0bc6a', 'Famous', 'FamousFamousFamous', '1593425356608_16.jpg', '1593425356608_16.jpg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"dfe17f72-998e-4e1e-93ec-cda000d0bc6a\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('e70158bb-c576-4135-89f2-f007a943a58f', 'aa7b0190-97b1-4519-bf66-df04f5f33b85', 'veg', '', '1587534680790_veg.png', '1587534680790_veg.png', NULL, 3, '[\"f4481e19-c5c6-4b95-85f7-748b4f7fc8f4\",\"aa7b0190-97b1-4519-bf66-df04f5f33b85\",\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-04 00:00:00'),
('ead63562-17f2-4ad2-a15d-957a5e468b56', '2872ce5f-8e3a-4a17-901e-4bfe27751466', 'Women', '', '1588138169781_0230b435a376a5dc3b8a96d68e38921a.jpg', '1588138169781_0230b435a376a5dc3b8a96d68e38921a.jpg', NULL, 3, '[\"e3d08bdf-b73e-45eb-845a-b8f2b9507088\",\"2872ce5f-8e3a-4a17-901e-4bfe27751466\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-29 05:23:27'),
('f19ffc21-9271-407f-a973-b0f56e72384f', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Street', 'StreetStreetStreet', '1593426407590_19.jpeg', '1593426407590_20.jpg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"f3b07174-10dc-44b0-9291-b187bf3703fd\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('f397c1e2-dde6-4282-b1f3-c58118176c99', '36e216e2-2d9c-4b40-8875-841294489511', 'Burrito', 'A burrito is a dish in Mexican and Tex-Mex cuisine consisting of a flour tortilla wrapped into a sealed cylindrical shape around various ingredients.The tortilla is sometimes lightly grilled or steamed to soften it, make it more pliable, and allow it to adhere to itself when wrapped. Burritos are often eaten by hand, as their tight wrapping keeps the ingredients together. Burritos can also be served \"wet\", that is to say covered in a savory and spicy sauce, where they would be eaten with a fork and knife.', '1590150273181_29.jpeg', '1590150273181_29.jpeg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '2020-05-20 12:04:28'),
('f3b07174-10dc-44b0-9291-b187bf3703fd', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Mexican', '', '1587541575157_quesadilla.png', '1587541575158_quesadilla.png', NULL, 1, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', 'AB2567', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-04 00:00:00'),
('f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Chinese', '', '1587533830274_chinese.png', '1587533830275_chinese_food.png', NULL, 1, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\"]', 'AB2567', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-04 00:00:00'),
('f76323fa-c0a0-4047-8c41-5bdfdbeb7a31', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'French', 'French Food', '1593424572620_16.jpg', '1593424572620_16.jpg', NULL, 1, 'b21a7c8f-078f-4323-b914-8f59054c4467', '43AB56', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('f851d996-604f-4028-be00-26602fa5b7a5', '040a9572-e12c-4153-b160-7460ded088b1', 'Thali', '', '1590141037136_main_thali.jpg', '1590141037136_main_thali.jpg', NULL, 1, '040a9572-e12c-4153-b160-7460ded088b1', 'AB2567', 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28'),
('fabfa63b-991c-4f9b-b981-8ac5385dbea4', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Taco', 'TacoTacoTaco', '1593426321952_222.jpg', '1593426321953_222.jpg', NULL, 2, '[\"b21a7c8f-078f-4323-b914-8f59054c4467\",\"f3b07174-10dc-44b0-9291-b187bf3703fd\"]', '', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55'),
('fb0c6018-6296-470c-a72f-0600e84f1b2a', '36e216e2-2d9c-4b40-8875-841294489511', 'Wraps & Rolls', 'When hunger strikes, you need something quick and delicious to satiate it and there\'s nothing like a loaded wrap or roll that you can make your way. Wraps and rolls make for the easiest on-the go grub. These quick meals are so versatile that different cultures have enthusiastically experimented with them and created their very own versions. The history of wraps and rolls is rather obscure but it was probably the need of something quick and easy that  gave rise to these portable meals.', '1590146480921_4.jpg', '1590146480921_4.jpg', NULL, 1, '36e216e2-2d9c-4b40-8875-841294489511', 'AB2567', 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', '2020-05-20 12:04:28');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `parentId` varchar(200) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `countryCode` varchar(20) NOT NULL,
  `companyName` varchar(256) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '2',
  `address1` text NOT NULL,
  `address1LatLong` text NOT NULL,
  `address2` text NOT NULL,
  `address2LatLong` text NOT NULL,
  `logo1` text NOT NULL,
  `logo2` text NOT NULL,
  `logo3` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `websiteLink` varchar(200) NOT NULL,
  `createdAt` int(11) NOT NULL DEFAULT '1585547242',
  `updatedAt` int(11) NOT NULL DEFAULT '1585547242'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `parentId`, `email`, `password`, `phoneNumber`, `countryCode`, `companyName`, `role`, `address1`, `address1LatLong`, `address2`, `address2LatLong`, `logo1`, `logo2`, `logo3`, `status`, `websiteLink`, `createdAt`, `updatedAt`) VALUES
('0eb6310c-0f6a-49d3-b986-da75cabb85e6', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'mohit@yopmail.com', '$2b$10$SdpUjrfoOZul8Ge5xMdImuwDJ1XoV7VZKM5lVT/AhHO2plSPE7cya', '9992364445', '91', 'Delicious Dreamers', 2, 'Sahibzada Ajit Singh Nagar, Punjab, India', '{\"lat\":\"30.7046486\",\"long\":\"76.71787259999999\"}', '40 West St, Paddington NSW 2021, Australia', '{\"lat\":\"-33.880843202921156\",\"long\":\"151.22035830688478\"}', '1593429384668_4.jpg', '1593429384669_4.jpg', '1593429384669_4.jpg', 1, '', 1593429099, 1593429099),
('15fc76eb-b483-436a-8f73-b1d7d5c0c47d', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'pasta@yopmail.com', '$2b$10$ma2T5Nm1x2j4jhkAQSodd.JyBPfQX2SeZS31R4RY3VnXcyEk.0c3O', '9992364445', '91', 'Pasta Boys', 2, 'Sahibzada Ajit Singh Nagar, Punjab, India', '{\"lat\":\"30.7046486\",\"long\":\"76.71787259999999\"}', '2 Prince Albert Rd, Sydney NSW 2000, Australia', '{\"lat\":\"-33.86901379948267\",\"long\":\"151.21538012695314\"}', '1593430698274_55.jpg', '1593430698274_55.jpg', '1593430698274_55.jpg', 1, '', 1593429099, 1593429099),
('1a41762d-ca81-4900-986a-d52482e97cf2', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'chinense12@yopmail.com', '$2b$10$DTlsZ6gwTsk39wxV5guZ3etUctHaYAoeEAjLmPtvR7ASqycJMpAG6', '9898778890', '91', 'Chinese Shop', 2, '32 Tranmere St, Drummoyne NSW 2047, Australia', '{\"lat\":\"-33.85447421495133\",\"long\":\"151.15411444973947\"}', '32 Tranmere St, Drummoyne NSW 2047, Australia', '{\"lat\":\"-33.85447421495133\",\"long\":\"151.15411444973947\"}', '1590139221438_chinese.jpg', '1590139221439_chinese.jpg', '', 1, '', 1589976268, 1589976268),
('1c5622ef-637b-4ce3-97ef-f89567bd7193', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'des2@yopmail.com', '$2b$10$qAh.4lnA.5lrp5jHmxNzD.aNEkreLphphkikD/XQOHjgpvfODI7jC', '98393484444', '91', 'Sharma Des Shop', 2, 'Suite 90, Jones Bay Wharf/26-32 Pirrama Rd, Pyrmont NSW 2009, Australia', '{\"lat\":\"-33.86309848293984\",\"long\":\"151.19531318020822\"}', 'Suite 90, Jones Bay Wharf/26-32 Pirrama Rd, Pyrmont NSW 2009, Australia', '{\"lat\":\"-33.86309848293984\",\"long\":\"151.19531318020822\"}', '1590139493498_des2.jpg', '1590139493498_des2.jpg', '', 1, '', 1589976268, 1589976268),
('1ea67eec-a3ba-433e-b67b-e1aa7f2c85f4', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'indian@yopmail.com', '$2b$10$oWwECcODSsT.qrQkNTiCCuGTKZiOqo8YDO7.G6o0JPqfafEsaz6nu', '9888478884', '91', 'Food Master99', 2, '70A Louisa Rd, Birchgrove NSW 2041, Australia', '{\"lat\":\"-33.84589679025758\",\"long\":\"151.18013218045235\"}', '542, Mohali Stadium Rd, Sector 61, Sahibzada Ajit Singh Nagar, Punjab 160062, India', '{\"lat\":\"30.70344805318538\",\"long\":\"76.726943290687\"}', '1590139993456_indian1.jpg', '1590139993456_indian1.jpg', '', 1, '', 1589976268, 1589976268),
('25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'company@yopmail.com', '$2b$10$72NQr1Jd9yWveIhUVHJUyOVl/sRgf9ps3jrVoHwyL15dD/Y6XNhxa', '1234567890', '91', 'Food Point 7', 2, 'Mohali 7 Phase, सेक्टर 61, साहिबजादा अजीत सिंह नगर, 160062, India', '{\"lat\":\"30.7017355\",\"long\":\"76.7247759\"}', '117 Foveaux St, Surry Hills NSW 2010, Australia', '', '1593428616879_111.jpg', '1593428616879_111.jpg', '1593428616879_111.jpg', 1, '', 1585547242, 1585547242),
('25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '', 'admin1@gmail.com', '$2b$10$mFOo0OvN6CjP0GePtrMFDuWgECdORFuQhDRWupmS9ujM73GykX2Ym', '1111111111111', '91', 'company3', 1, '27 Derbyshire Rd, Leichhardt NSW 2040, Australia', '{\"lat\":\"-33.876542157176964\",\"long\":\"151.1583311855793\"}', '', '', '1589632514893_Splash.png', '1587359515381_themify_e651(0)_128.png', '1587359557483_et-line_e020(0)_64.png', 1, '', 1585547242, 1585547242),
('2b70da61-99e8-4187-b350-1b2177e496de', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'chinese@yopmail.com', '$2b$10$fBofmHpToDC4BIpGwfZ2MuDuQ9AoyW4Lvgps1vc5D3ukBGRC.lkom', '9876547852', '91', 'Chinese Company', 2, '24, Phase 3 A, Sector 53, Sahibzada Ajit Singh Nagar, Chandigarh 160059, India', '{\"lat\":\"30.717264360470526\",\"long\":\"76.7288249073279\"}', '24, Phase 3 A, Sector 53, Sahibzada Ajit Singh Nagar, Chandigarh 160059, India', '{\"lat\":\"30.717264360470526\",\"long\":\"76.7288249073279\"}', '1590139119384_chines_1.jpg', '1590139119384_chines_1.jpg', '', 1, '', 1589976268, 1589976268),
('3e9bd3e5-52df-4ad3-972e-17971a2da7e7', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'companynew@yopmail.com', '$2b$10$M8mxSvu8tZiT8IB5kbr3G.HAhn547tqHTPnZdg/a6RHY67c6r6oMG', '1234567890', '91', 'CompanyNew', 2, 'Sahibzada Ajit Singh Nagar, Punjab, India', '{\"lat\":\"30.7046486\",\"long\":\"76.71787259999999\"}', '2041 James Craig Road, Rozelle NSW 2039, Australia', '{\"lat\":\"-33.86058038204193\",\"long\":\"151.18852615356445\"}', '1593435128638_0230b435a376a5dc3b8a96d68e38921a.jpg', '', '', 1, '', 1593432810, 1593432810),
('6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'north@yopmail.com', '$2b$10$h7KQ2IDYwvb74ztNI6wqlup4fzVVRP0bySMvzQeTnLazDYKgU8YDa', '98765498742', '91', 'North Food Junction', 2, 'Western Distributor, Pyrmont NSW 2009, Australia', '{\"lat\":\"-33.87393103979161\",\"long\":\"151.20029136013986\"}', '14 Darling Dr, Sydney NSW 2000, Australia', '{\"lat\":\"-33.875071228968785\",\"long\":\"151.19893550348283\"}', '1590139886358_north_india.jpg', '1590139886359_north_india.jpg', '', 1, '', 1589976268, 1589976268),
('8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'fast12@yopmail.com', '$2b$10$WsObNCR2GDh56qkWZTGWEuBNhvsJVpEAmpdzKYoOuiE82I8GH6.ve', '98765498756', '91', 'Food Court 47', 2, '1095, Lakhnaur Pind Rd, Phase 5, Sector 59, Sahibzada Ajit Singh Nagar, Punjab 160059, India', '{\"lat\":\"30.71347464942695\",\"long\":\"76.71714971244775\"}', '1095, Lakhnaur Pind Rd, Phase 5, Sector 59, Sahibzada Ajit Singh Nagar, Punjab 160059, India', '{\"lat\":\"30.71347464942695\",\"long\":\"76.71714971244775\"}', '1590139035643_fast_food2.jpg', '1590139035643_fast_food2.jpg', '1590139035643_fast_food2.jpg', 1, '', 1589976268, 1589976268),
('d8af6241-b9a4-4b73-a714-113e38b9cdeb', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'des1@yopmail.com', '$2b$10$pz3Kb4MsKDe8UZe.9bFNlOXL7y2cHxN/StDoiTx6KuzFwyRSUHSFC', '99889999889', '91', 'Granny Sweets', 2, '22 Margaret St, Sydney NSW 2000, Australia', '{\"lat\":\"-33.86523659645761\",\"long\":\"151.20458289456369\"}', '22 Margaret St, Sydney NSW 2000, Australia', '{\"lat\":\"-33.86523659645761\",\"long\":\"151.20458289456369\"}', '1590157415417_13.jpg', '1590157415418_13.jpg', '', 1, '', 1589976268, 1589976268),
('ed33cbfe-d28e-4816-9962-57825ca36e24', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'company3@gmail.com', '$2b$10$wliNdFx75T.5iwTJHKrz0u3cmXLZojZo0E5kuOaO/RFXadZaHuMay', '1111111111111', '91', 'IndianRestraunt', 2, '217 Concord Rd, North Strathfield NSW 2137, Australia', '{\"lat\":\"-33.8565709\",\"long\":\"151.0919575\"}', '', '', '1589634113225_How To Ride.png', '', '', 0, '', 1589634077, 1589634077);

-- --------------------------------------------------------

--
-- Table structure for table `companyRatings`
--

CREATE TABLE `companyRatings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rating` varchar(15) DEFAULT '0',
  `review` text,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2020-05-05 08:32:19'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `companyRatings`
--

INSERT INTO `companyRatings` (`id`, `rating`, `review`, `userId`, `companyId`, `createdAt`) VALUES
('53063f2d-2659-4729-a3a5-fb7702dfd051', '4.5', 'Verty Good', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-05 08:39:13');

-- --------------------------------------------------------

--
-- Table structure for table `coupan`
--

CREATE TABLE `coupan` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(60) DEFAULT '',
  `code` varchar(60) DEFAULT '',
  `discount` varchar(60) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `type` text,
  `categoryId` varchar(50) NOT NULL,
  `usageLimit` int(3) NOT NULL DEFAULT '1',
  `minimumAmount` varchar(11) NOT NULL,
  `icon` text,
  `thumbnail` text,
  `validupto` date NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` int(10) NOT NULL DEFAULT '1',
  `createdAt` int(11) NOT NULL DEFAULT '1586254416'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coupan`
--

INSERT INTO `coupan` (`id`, `name`, `code`, `discount`, `description`, `type`, `categoryId`, `usageLimit`, `minimumAmount`, `icon`, `thumbnail`, `validupto`, `companyId`, `userId`, `status`, `createdAt`) VALUES
('53124ee4-f1d7-4614-be8a-831073719790', 'NEW20', 'PROMO20', '20', 'This Coupon valid for first 100 users and they will get 20 % discount on total order.', '0', '', 2, '3000', '1586782517440_coupon20.png', '1586782531635_coupon20.png', '2020-06-12', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', NULL, 1, 1586413963),
('5757f0d5-be30-40b8-ba9d-047e348fb278', 'Coupan3', 'PROMO567', '10', '', '0', '', 2, '1000', '1586930165296_1586949829559_Entypo_2712(0)_64.png', '', '2020-04-30', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', NULL, 1, 1586930009),
('611cae5d-d5fe-4455-acd3-16868529d400', 'FIRST50', 'FIRST50', '20', 'ghjg gfhj gfj  ', '0', '', 1, '500', '1590147752449_sindhi.jpg', '1590147752449_sindhi.jpg', '2020-05-31', '1ea67eec-a3ba-433e-b67b-e1aa7f2c85f4', NULL, 1, 1589976268),
('9966598a-84d2-4a8d-9abc-dfe16b12987a', 'New User', 'NewOne', '30', 'For new orders', '0', '', 10, '100', '1593427589185_3.JPG', '1593427589185_3.JPG', '2020-07-31', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', NULL, 1, 1592804755),
('9b5bfc32-4d94-4a6e-bf12-864935a5d14b', 'FIRST 100', 'FIRST100', '20', 'This coupon is valid for first 100 users and they will get 20% discount on their order.', '0', '', 1, '500', '1590145361877_veg.jpg', '', '2020-05-31', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', NULL, 1, 1589976268),
('9d0c2599-3c6e-4469-871b-ddab0e2f854a', 'New user', 'New10', '10', 'This coupon is for new user and he/she will get 10% discount on first order.', '0', '45dd49e2-a473-43b5-a0c3-a03b14a1e83f', 2, '100', '1586782656507_coupon10.jpg', '1586782656508_coupon10.jpg', '2020-04-30', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', NULL, 1, 1586609463),
('9e1a6e32-c2e4-4d9c-872e-e2de5e8074d3', 'Meal', 'HappyMeal', '30', 'Happy Meal', '0', '', 10, '100', '1590147859239_13.jpeg', '1590147859239_11.jpg', '2020-05-31', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', NULL, 1, 1589976268),
('a4af6a90-87af-4fe5-abc9-7502c4edfcf7', 'New User', 'NUser1', '20', 'For New Users', '0', '', 5, '100', '1590147782761_27.jpg', '1590147782761_27.jpg', '2020-05-29', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', NULL, 1, 1589976268),
('b8f2af82-ced1-427a-9cb5-faf803a7f575', 'Domino\'s', 'CHEESELOVE', '30', '1) Coupon will not be applied at all if EDV or Combo offer is added in cart.\r\n2) Use the coupon code to avail the offer.', '0', 'f397c1e2-dde6-4282-b1f3-c58118176c99', 3, '250', '1590151712509_36.jpg', '1590151712509_36.jpg', '2020-05-28', '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', NULL, 1, 1589976268),
('cb51409e-f264-4cb1-aec4-5c4a6f3d841c', 'Buy Online', 'OrderOnline', '20', 'Buy Online', '0', '', 10, '100', '1593427677956_16.jpg', '1593427677956_16.jpg', '2020-07-31', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', NULL, 1, 1592804755),
('e269aa49-d742-4565-9c9a-fd3d42fe398b', 'New User', 'New30', '30', 'This coupon is valid for New user and they will get 30% discount on their order.', '0', '', 1, '500', '1590145467275_sindhi.jpg', '', '2020-05-31', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', NULL, 1, 1589976268),
('e2e6dd01-3f8c-4532-9817-2c7016417234', 'McDonald\'s', 'CD350', '20', '1) Get a burger of your choice free on orders of Rs. 350 & above.\r\n2) Offer applicable on regular and advance orders.\r\n3) Premium Burgers excluded from this offer.\r\n4) Offer Valid on App, Web & Msite.\r\n5) Offer can be redeemed by a user once per day.', '0', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 2, '350', '1590151571140_35.jpg', '1590151571141_35.jpg', '2020-05-31', '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', NULL, 1, 1589976268),
('f35aa378-c90f-4d6b-b4be-ecaa8ef26aa8', 'Testing', 'CODE1234', '10', '', '1', '1bc200aa-40f0-46e7-99eb-1d752fcda96d', 1, '1500', '1589865052987_Scooter Location.png', '1589865052987_Ride Detail.png', '2020-05-19', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', NULL, 1, 1589864212);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `aboutus` text,
  `aboutusLink` text NOT NULL,
  `privacyContent` text,
  `privacyLink` text,
  `termsContent` text,
  `termsLink` text,
  `websiteLink` text,
  `facebookLink` text,
  `gmailLink` text,
  `linkedinLink` text,
  `twitterLink` text,
  `instaLink` text,
  `currency` varchar(100) NOT NULL,
  `language` varchar(100) NOT NULL,
  `autoAssign` varchar(20) NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` int(11) NOT NULL DEFAULT '1587373184',
  `updatedAt` int(11) NOT NULL DEFAULT '1587373184'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `aboutus`, `aboutusLink`, `privacyContent`, `privacyLink`, `termsContent`, `termsLink`, `websiteLink`, `facebookLink`, `gmailLink`, `linkedinLink`, `twitterLink`, `instaLink`, `currency`, `language`, `autoAssign`, `companyId`, `createdAt`, `updatedAt`) VALUES
('22cee031-6f25-4125-8d15-9c31ba97c37e', '<h2 style=\"margin: 0px 0px 10px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; background-color: #ffffff;\">What is Lorem Ipsum?</h2>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\"><strong style=\"margin: 0px; padding: 0px;\">Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">&nbsp;</p>\r\n<h2 style=\"margin: 0px 0px 10px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px; background-color: #ffffff;\">Where can I get some?</h2>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>', 'http://newLink/23', '<div style=\"margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; float: left; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">\r\n<h2 style=\"margin: 0px 0px 10px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px;\">Where does it come from?</h2>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify;\">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.</p>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify;\">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>\r\n</div>\r\n<div style=\"margin: 0px 28.7969px 0px 14.3906px; padding: 0px; width: 436.797px; float: right; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">\r\n<h2 style=\"margin: 0px 0px 10px; padding: 0px; font-weight: 400; font-family: DauphinPlain; font-size: 24px; line-height: 24px;\">Where can I get some?</h2>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify;\">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>\r\n<form style=\"margin: 0px 0px 10px; padding: 0px;\" action=\"https://www.lipsum.com/feed/html\" method=\"post\">\r\n<table style=\"margin: 0px; padding: 0px; border-spacing: 0px; border: 0px; width: 436px;\">\r\n<tbody style=\"margin: 0px; padding: 0px;\">\r\n<tr style=\"margin: 0px; padding: 0px;\">\r\n<td style=\"margin: 0px; padding: 0px; vertical-align: middle; text-align: center; border: 0px initial initial;\" rowspan=\"2\">&nbsp;</td>\r\n<td style=\"margin: 0px; padding: 0px; vertical-align: middle; text-align: center; border: 0px initial initial;\" rowspan=\"2\">&nbsp;</td>\r\n<td style=\"margin: 0px; padding: 0px; vertical-align: middle; text-align: center; width: 20px; border: 0px initial initial;\">&nbsp;</td>\r\n<td style=\"margin: 0px; padding: 0px; vertical-align: middle; border: 0px initial initial;\">&nbsp;</td>\r\n</tr>\r\n<tr style=\"margin: 0px; padding: 0px;\">\r\n<td style=\"margin: 0px; padding: 0px; vertical-align: middle; text-align: center; border: 0px initial initial;\">&nbsp;</td>\r\n<td style=\"margin: 0px; padding: 0px; vertical-align: middle; border: 0px initial initial;\">&nbsp;</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n</form></div>', 'PRIVACY lINK', '<h3 style=\"margin: 15px 0px; padding: 0px; font-size: 14px; font-family: \'Open Sans\', Arial, sans-serif; background-color: #ffffff;\">The standard Lorem Ipsum passage, used since the 1500s</h3>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p>\r\n<h3 style=\"margin: 15px 0px; padding: 0px; font-size: 14px; font-family: \'Open Sans\', Arial, sans-serif; background-color: #ffffff;\">Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC</h3>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p>\r\n<h3 style=\"margin: 15px 0px; padding: 0px; font-size: 14px; font-family: \'Open Sans\', Arial, sans-serif; background-color: #ffffff;\">1914 translation by H. Rackham</h3>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>\r\n<h3 style=\"margin: 15px 0px; padding: 0px; font-size: 14px; font-family: \'Open Sans\', Arial, sans-serif; background-color: #ffffff;\">Section 1.10.33 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC</h3>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">\"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"</p>\r\n<h3 style=\"margin: 15px 0px; padding: 0px; font-size: 14px; font-family: \'Open Sans\', Arial, sans-serif; background-color: #ffffff;\">1914 translation by H. Rackham</h3>\r\n<p style=\"margin: 0px 0px 15px; padding: 0px; text-align: justify; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; background-color: #ffffff;\">\"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</p>', 'newLink232', 'http:localhost/company', 'facebook.com', 'gmail.com', 'linkedin.com', 'teitter.com', 'insdat.com', '$', 'EN', 'yes', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1587385839, 1587385839),
('485c4c5b-8758-40ca-97e1-d1f4365c9863', '<h2 style=\"font-family: DauphinPlain; font-size: 24px; font-variant-numeric: normal; font-variant-east-asian: normal; font-weight: 400; line-height: 24px; margin: 0px 0px 10px; padding: 0px;\">Where does it come from?</h2>\r\n<p style=\"font-size: 14px; font-variant-numeric: normal; font-variant-east-asian: normal; margin: 0px 0px 15px; padding: 0px; text-align: justify;\">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.</p>\r\n<p><span style=\"font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; font-variant-numeric: normal; font-variant-east-asian: normal;\"> </span></p>\r\n<p style=\"font-size: 14px; font-variant-numeric: normal; font-variant-east-asian: normal; margin: 0px 0px 15px; padding: 0px; text-align: justify;\">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>', 'http://localhost:9062/api/admin/document/', '', 'http://localhost:9062/api/admin/document/', '', 'http://localhost:9062/api/admin/document/', '', '', '', '', '', '', '₹', 'EN', 'yes', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1589435922, 1589435922),
('c911cc36-be95-4736-9e06-9c6dcea3a1eb', '', '', '', '', '', '', '', '', '', '', '', '', '$', 'EN', 'yes', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1589435922, 1589435922);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role` int(5) NOT NULL DEFAULT '0',
  `firstName` varchar(60) DEFAULT '',
  `lastName` varchar(60) DEFAULT '',
  `email` varchar(60) DEFAULT '',
  `phoneNumber` varchar(30) NOT NULL,
  `countryCode` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL DEFAULT '',
  `dob` date NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `image` text,
  `idProof` text,
  `coverImage` text NOT NULL,
  `idProofName` varchar(255) NOT NULL,
  `deviceToken` varchar(255) NOT NULL DEFAULT '',
  `sessionToken` varchar(500) NOT NULL DEFAULT '',
  `platform` varchar(255) NOT NULL DEFAULT '',
  `assignedServices` text NOT NULL,
  `currentLat` varchar(20) NOT NULL,
  `currentLong` varchar(20) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` int(11) NOT NULL DEFAULT '1586590244',
  `updatedAt` int(11) NOT NULL DEFAULT '1586590244'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `companyId`, `role`, `firstName`, `lastName`, `email`, `phoneNumber`, `countryCode`, `password`, `dob`, `address`, `image`, `idProof`, `coverImage`, `idProofName`, `deviceToken`, `sessionToken`, `platform`, `assignedServices`, `currentLat`, `currentLong`, `status`, `createdAt`, `updatedAt`) VALUES
('1482c3df-a8cd-43c1-bd03-6be1a9927086', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 0, 'Navdeep', 'Singh', 'sharmaMohit@gmail.com', '9992364445', '91', '', '0000-00-00', 'Sector, 59 Chd', '1589897376273_cropped6031351954239565049.jpg', '1589884090273_cropped6127925259197741339.jpg', '1589897376273_cropped3895055332631315750.jpg', 'voter id', 'dFCgr4CUQ4yceVl_5Yd2H7:APA91bEmS-tGSrXV8GM3qM29AfiOX4Dlc7RRxmqP_Ts4OAvNOS3ppW5fwPfdP2edDfL5ndrb7n8Ws3udZHzOse-nNymwjuygfcTNoC1a51W7dL2S6W-Y7vMGh9DURcJsDK7xXBSkqc8W', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5OTIzNjQ0NDUiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiOTEiLCJ1c2VyVHlwZSI6MywicGFyZW50Q29tcGFueSI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsImlkIjoiMTQ4MmMzZGYtYThjZC00M2MxLWJkMDMtNmJlMWE5OTI3MDg2IiwiaWF0IjoxNTkwNDg1NjQ5LCJleHAiOjE1OTA2NTg0NDl9.bEY1WtGj6q_eWd2yuRq8tcK4d08iMeCEzMkKnhjWQf4', 'android', '7284b29c-73c1-496b-91df-b624037a52dc,8f9556e5-bb18-43af-9e38-dad7e76595d6,58fb067d-fa4c-4ce4-b9fb-a4b70e15bb17', '30.681590898210974', '76.70195358460839', 1, 1586769160, 1586769160),
('2547f78e-fcc6-4c5b-9488-a48c0cd50323', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 0, 'Mohit', '', 'mohit@yopmail.com', '9992364445', '91', '', '2018-11-05', '', '', '', '', '', '', '', 'web', '', '', '', 1, 1589976268, 1589976268),
('49568e54-f094-4553-90a8-c45a2e24446b', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 0, 'Mohit', '', 'mohit@yopmail.com', '9992364445', '91', '', '2020-01-05', '', '', '', '', '', '', '', 'web', '', '', '', 1, 1589976268, 1589976268),
('4a9d144b-2a7f-4225-95fb-35f77a45a134', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 0, 'Staff1', '', 'staff@yopmail.com', '1231231231', '91', '', '2020-04-06', 'Chandigarh\r\nChandigarh', '1592820437944_images.jpg', '', '1589274880111_SampleScooterUnlockResponse.png', '', '', '', 'web', '', '', '', 1, 1589274778, 1589274778),
('635d4ca9-e5ca-4fdd-9544-59227d2ec398', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 2, 'New Staff', '', 'staaf@company.yopmail.com', '1324234234', '91', '', '2020-03-09', '', '', '', '', '', '', '', 'web', '', '', '', 1, 1589638866, 1589638866),
('7aa108e1-8d7a-4873-b345-96c1cb751759', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 0, 'ABC2', '', 'abc2@gmail.com', '9915555868', '91', '', '2020-04-13', 'Chandigarh\r\nChandigarh', '1592820473024_64a704038ddde05a027917d988efb67b.jpg', '', '1589274793423_1512_15-Minute-Fried-Noodles_003-1.jpg', 'License', 'haiascfsfisdf', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5MTU1NTU4NjgiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiOTEiLCJ0eXBlIjozLCJpZCI6IjdhYTEwOGUxLThkN2EtNDg3My1iMzQ1LTk2YzFjYjc1MTc1OSIsImlhdCI6MTU4OTI3NTExOSwiZXhwIjoxNTg5NDQ3OTE5fQ.uEoudGv1fnrzqhOXb3nxejDQU1eArWQB4bsejfFm0Lg', 'android', '', '', '', 1, 1588597191, 1588597191),
('80323427-f53f-4dbc-8a42-e14461d45bf8', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 0, 'Saira', 'Ansari', 'sairaansari.12j@gmail.com', '9876547896', '91', '', '2020-02-18', 'Chandigarh', '1592820400791_fashion-icon-vector-233172.jpg', '', '', 'License', 'haiascfsfisdf', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk4NzY1NDc4OTYiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiOTEiLCJ0eXBlIjozLCJpZCI6IjgwMzIzNDI3LWY1M2YtNGRiYy04YTQyLWUxNDQ2MWQ0NWJmOCIsImlhdCI6MTU4ODMyNDI3NSwiZXhwIjoxNTg4NDk3MDc1fQ.4wcBvxyhuG2pq3n1H-Qj9M5-fw_vXczDbgCU47H6iWs', 'android', '', '30.7046', '76.7179', 1, 1586594134, 1586594134),
('c0a0318b-7b9d-4d87-babc-e1817703983f', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 0, 'Akash Gharu', '', 'gharu86103@gmail.com', '950306006', '91', '', '0000-00-00', 'Sector 53, Chandigarh', '1586770378034_hair_profile.jpg', '', '', 'License', '', '', 'web', 'a65c94ea-4fc8-4cde-8366-fca6f6818e76,ab1ef8db-c237-4bbe-bc4b-4429e6b224d9,e8b47857-8383-4f46-afcb-910426e38036,f0db7b08-2785-4a83-9068-671831cbb929,f41a6177-c34e-4ffa-82f5-2dc154cbcd5c,56ea804e-1510-4458-914a-aad42c05c789', '', '', 1, 1586769160, 1586769160),
('d9c82c09-3a4b-45f6-ba58-2ee194af74a2', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 0, 'Samayra', '', 'Samayra@gmail.com', '987569852', '91', '', '2020-04-13', 'Phase 5, Mohali', '1586773303618_useeerrr.jpg', '', '', 'License', '', '', 'web', '13e44f51-04db-4e10-8f4b-474ddaaaa58b,2256e2c1-cc57-473c-bf4a-d9f3b4de2242,25b7fc93-9eb6-4807-a7a8-f3034b0e74d6,539115d7-fbe5-431c-80f7-a7de8bc96f32,25cbf58b-46ba-4ba2-b25d-8f8f653e9f18', '', '', 1, 1586769160, 1586769160),
('f5db043c-53f4-4673-b38a-a84465772f43', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 0, 'Manager', '', 'manager@company.com', '1234567890', '91', '', '2020-04-12', '', '', '', '', '', '', '', 'web', '', '', '', 1, 1589636354, 1589636354),
('ffd17aa2-194b-454a-86ee-2e7a6c59a255', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 0, 'Ritvik ', '', 'Ritvik@yomail.com', '9865987450', '91', '', '2020-04-13', 'Sector 17, Chandigarh', '1586773248014_profile_user.jpg', '', '', 'License', '', '', 'web', '7284b29c-73c1-496b-91df-b624037a52dc,8f9556e5-bb18-43af-9e38-dad7e76595d6,58fb067d-fa4c-4ce4-b9fb-a4b70e15bb17', '', '', 1, 1586769160, 1586769160),
('ffd17aa2-194b-454a-86ee-2e7a6c59a256', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 0, 'Naval', 'Uppal', 'abc@yomail.com', '7973015382 ', '91', '', '2020-04-13', 'Mohali ', '1589878999850_', '1588915686361_TapScanner_20190829_201959_071_107.jpg', '1593427561971_', 'voter id', '123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijc5NzMwMTUzODIiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiOTEiLCJ1c2VyVHlwZSI6MywicGFyZW50Q29tcGFueSI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsImlkIjoiZmZkMTdhYTItMTk0Yi00NTRhLTg2ZWUtMmU3YTZjNTlhMjU2IiwiaWF0IjoxNTk0MTg4NDMxLCJleHAiOjE1OTQzNjEyMzF9.uQiQRICJwx8Y8lSNUsFNKmCttLMrPRMqxDRVW5FJTXk', 'ios', '7284b29c-73c1-496b-91df-b624037a52dc,8f9556e5-bb18-43af-9e38-dad7e76595d6,58fb067d-fa4c-4ce4-b9fb-a4b70e15bb17', '31.49310891053778', '75.7585323695799', 1, 1586769160, 1586769160);

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `question` text,
  `answer` text,
  `language` text,
  `status` int(5) NOT NULL DEFAULT '1',
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2020-04-21 12:49:59',
  `updatedAt` datetime NOT NULL DEFAULT '2020-04-21 12:49:59'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`, `language`, `status`, `companyId`, `createdAt`, `updatedAt`) VALUES
('00020606-2945-42ec-819c-a4195b7b2ba1', 'What is dashboard?', ' wdknwacasbc ascbas cambscv ksdbvd svbhdfvb ndsvjkbvdf vbkfdv dfjv kjld ', 'FR', 0, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '2020-04-21 12:58:42', '2020-04-21 12:58:42'),
('4d96e9ab-18c0-4403-8434-5ddb1c948874', 'What is Lorem Ipsum?\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unk', 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC.', 'EN', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '2020-04-22 04:35:25', '2020-04-22 04:35:25');

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `serviceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` int(11) NOT NULL DEFAULT '1585718505',
  `updatedAt` int(11) NOT NULL DEFAULT '1585718505'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`id`, `serviceId`, `companyId`, `userId`, `createdAt`, `updatedAt`) VALUES
('101fd41e-b670-4d55-a66c-5ec2ade2a2a9', 'a4f8656f-d60e-4d25-b4b9-77dfc3001490', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('144c0cfc-d77b-40d5-81ae-9eeeebeb6564', '42bdf460-2a83-4d84-926c-535dd544ff0e', 'ed33cbfe-d28e-4816-9962-57825ca36e24', '86091af5-38b8-4355-9257-17774e2a98f1', 1589959439, 1589959439),
('1a473bd0-1fa9-43fc-997a-f04f3ffe83eb', 'c9ad225b-c2c4-4b3e-ad3b-8425101d0c27', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1588943779, 1588943779),
('1da4ba39-98ca-4c0e-a567-8a13df166743', '42bdf460-2a83-4d84-926c-535dd544ff0e', 'ed33cbfe-d28e-4816-9962-57825ca36e24', '87af7745-6514-41f5-b849-7255e06170fb', 1589976268, 1589976268),
('23b29ce7-a550-4a77-87f9-c45a3ef9d551', '1a7e980e-75b0-478d-aafc-69c21574cba1', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('35a0ca1f-1743-41e4-a104-f985c9b0d730', '8015163e-f39d-4566-936a-256623edc39e', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1592804755, 1592804755),
('3a42f1ff-56de-4bff-866a-a0c2cea456d7', '5069e8f6-0032-46d4-96d4-f3ab356eb348', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'b5e5f5de-fb2c-47a2-9fcc-a8c8aad33447', 1593580266, 1593580266),
('3b37f7ee-203b-4ccb-b8a6-0ced6fe27c7b', '2a45ec5d-a4c0-4d4c-a7e5-cca6a59ad739', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87af7745-6514-41f5-b849-7255e06170fb', 1589959439, 1589959439),
('41fbe897-7a0a-4156-a3a8-bebb2235670a', '2464e00b-ba4a-41ec-a0b8-f2f99fc4b99f', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87af7745-6514-41f5-b849-7255e06170fb', 1589956361, 1589956361),
('4726970e-dd7b-4aa8-85ea-b6b5b427b2a1', 'a85a8aad-adf9-4d6b-8d74-e79a219b9e43', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('47f7b988-b74c-4d42-b9cc-156fb5d191c5', 'b6ac6030-d00c-43d6-97b4-ffab71080129', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1589352131, 1589352131),
('4e7e016e-e27c-4b0a-850b-51b9301adfe7', '56ea804e-1510-4458-914a-aad42c05c789', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87af7745-6514-41f5-b849-7255e06170fb', 1589959439, 1589959439),
('516c5ee1-cc8a-4a00-b693-270ea6dfd241', '82816e20-aedc-4297-a353-734ad7122d22', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('539c73b3-bb1a-4277-9e40-a4ec125a803b', '9fae121b-5da9-4329-8a18-1a3858774953', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1592804755, 1592804755),
('5443cdf5-48b3-4037-aec8-65c8c5477935', '9b607faf-b099-48b7-8f39-2f8bfb5583a4', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1592804755, 1592804755),
('58093bd7-49bf-49c2-a2f4-f3eb67b80c23', 'a176664c-34ff-4ac5-bc21-b8ae267e3fc2', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '0243ed39-8e8b-460a-833c-2e619146f94a', 1589976268, 1589976268),
('6f2b79e4-1eae-4870-b80e-8ef5129155f6', '56ea804e-1510-4458-914a-aad42c05c789', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 1589262025, 1589262025),
('76fdc928-3bd8-4c5f-9f42-dba0551799a2', '6b3becb5-8e21-4306-9c9d-ac96133e8511', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('7c2117df-8a31-4c04-b31f-6dce9f0ff503', '56367b57-2760-4fa2-8590-815c9be20b78', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1588943779, 1588943779),
('9906b481-2256-4cb2-81e4-b926d070659d', '9879f591-f887-40c6-8533-02da86d034da', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('990ce63a-d8e4-43d8-9239-b5a4d2a744ba', '52e6c1b4-6da6-480a-a72a-9b7ca139da8d', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1588943779, 1588943779),
('b2200037-c601-4f15-b769-74dc2bfaae20', '48d4bffa-e7b4-44bc-8869-55b66976b186', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 1589260349, 1589260349),
('b9b2e5f6-2649-49d4-a65a-13761d4c26e5', 'c3aa1fa8-7329-4d88-9bb4-75c0f66ff469', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '87af7745-6514-41f5-b849-7255e06170fb', 1589959439, 1589959439),
('bdf0cb45-f7fa-4626-af41-ad06f2f001f3', 'c3aa1fa8-7329-4d88-9bb4-75c0f66ff469', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1589352131, 1589352131),
('c6e2ba80-5bc1-467f-aa2d-f2411bf8b538', 'b4294197-59ca-4a1d-a7ad-cd2bb78daf19', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('cdeef6c3-9b0a-485d-a078-73861b2ecf7c', '0d64779c-ab51-4a06-a413-58547fc0b314', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '0243ed39-8e8b-460a-833c-2e619146f94a', 1589976268, 1589976268),
('de88af6b-3e8d-4e10-8514-25109c43ed1d', '6e446f55-7428-4376-a9cd-a7b4b84e4620', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('e80f3d13-1a89-4b4b-938a-749169c9af59', '7a76b9d7-bf9e-4a8d-98de-aedcd3d36774', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('f7b7d245-6e6b-4175-83ed-7514c8a675f0', '44fbb660-850c-4499-a683-f6ff1147f937', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '86091af5-38b8-4355-9257-17774e2a98f1', 1589976268, 1589976268),
('f96c0776-9224-4648-8306-3bc5651bff89', '2a45ec5d-a4c0-4d4c-a7e5-cca6a59ad739', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1589352131, 1589352131);

-- --------------------------------------------------------

--
-- Table structure for table `groupMembers`
--

CREATE TABLE `groupMembers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `groupId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` int(11) NOT NULL DEFAULT '1585550179',
  `updatedAt` int(11) NOT NULL DEFAULT '1585550179'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(80) NOT NULL,
  `createdBy` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `groupName` varchar(255) DEFAULT '',
  `groupIcon` varchar(255) DEFAULT '',
  `createdAt` int(11) NOT NULL DEFAULT '1585550141',
  `updatedAt` int(11) NOT NULL DEFAULT '1585550141'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `notificationTitle` varchar(200) NOT NULL,
  `notificationDescription` varchar(200) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role` int(11) NOT NULL DEFAULT '3',
  `readStatus` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2020-04-30 12:14:48',
  `updatedAt` datetime NOT NULL DEFAULT '2020-04-30 12:14:48'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `orderNo` int(20) NOT NULL,
  `serviceDateTime` datetime NOT NULL,
  `orderPrice` varchar(15) NOT NULL,
  `promoCode` varchar(50) DEFAULT NULL,
  `offerPrice` varchar(50) DEFAULT NULL,
  `serviceCharges` varchar(15) NOT NULL,
  `totalOrderPrice` varchar(15) NOT NULL,
  `addressId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `progressStatus` int(11) NOT NULL DEFAULT '0',
  `trackStatus` int(11) NOT NULL DEFAULT '0',
  `trackingLatitude` text,
  `trackingLongitude` text,
  `cancellationReason` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderNo`, `serviceDateTime`, `orderPrice`, `promoCode`, `offerPrice`, `serviceCharges`, `totalOrderPrice`, `addressId`, `companyId`, `userId`, `progressStatus`, `trackStatus`, `trackingLatitude`, `trackingLongitude`, `cancellationReason`, `createdAt`, `updatedAt`) VALUES
('4d7fc723-5a2e-4b40-bdc9-2abe184afd18', 128, '2020-06-29 12:30:00', '600', '', '0', '0', '600', '12028015-b9ff-4632-a666-8c09769103d3', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 5, 4, NULL, NULL, 'Other', '2020-06-29 12:11:14', '2020-06-29 13:06:19'),
('b0deaa97-f116-48e2-96cf-e0cea60ef294', 132, '2020-07-09 04:30:00', '460', 'NewOne', '138', '0', '322', '29d5573e-c279-4ac1-b9fe-c5284972d968', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'd85d4a1f-20d1-47fa-b0a0-525cb3444ae5', 0, 0, NULL, NULL, '', '2020-07-01 05:11:06', '2020-07-01 05:11:06'),
('b438760a-8b01-4920-9cc8-a57f6ced0fbd', 129, '2020-06-30 03:30:00', '600', 'OrderOnline', '120', '0', '480', '12028015-b9ff-4632-a666-8c09769103d3', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1, 0, NULL, NULL, '', '2020-06-29 12:13:30', '2020-07-08 06:07:31'),
('ca01395f-9513-4902-a5d3-b7442d32b334', 126, '2020-06-29 09:30:00', '1000', '', '0', '0', '1000', '12028015-b9ff-4632-a666-8c09769103d3', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 5, 4, NULL, NULL, '', '2020-06-22 05:45:55', '2020-06-29 10:03:23'),
('d9b4014e-56d3-41ab-9b05-adf842172c7e', 127, '2020-06-29 10:30:00', '520', '', '0', '0', '520', '12028015-b9ff-4632-a666-8c09769103d3', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 5, 4, NULL, NULL, '', '2020-06-22 05:45:55', '2020-06-29 12:10:26'),
('f5c036de-1d45-4630-99b2-3b78be732f01', 131, '2020-07-08 06:30:00', '2390', 'OrderOnline', '478', '0', '1912', '12028015-b9ff-4632-a666-8c09769103d3', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '86091af5-38b8-4355-9257-17774e2a98f1', 1, 0, NULL, NULL, '', '2020-07-01 05:11:06', '2020-07-08 06:10:55');

-- --------------------------------------------------------

--
-- Table structure for table `parentCategories`
--

CREATE TABLE `parentCategories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `parentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT '',
  `description` text NOT NULL,
  `icon` text NOT NULL,
  `thumbnail` text NOT NULL,
  `orderby` int(20) DEFAULT NULL,
  `level` int(20) NOT NULL,
  `connectedCat` text NOT NULL,
  `colorCode` varchar(30) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parentCategories`
--

INSERT INTO `parentCategories` (`id`, `parentId`, `name`, `description`, `icon`, `thumbnail`, `orderby`, `level`, `connectedCat`, `colorCode`, `status`, `companyId`, `createdAt`) VALUES
('1bc200aa-40f0-46e7-99eb-1d752fcda96d', '0', 'Dog Walking', '', '1587017727352_style_hair.jpg', '1587017727352_style_hair.jpg', NULL, 0, '', '1B97C5', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-12 00:00:00'),
('2f4e23ca-fd8d-41ff-a2e7-0ff432ea476a', '0', 'Home painting', '', '1587017747112_newskin.jpg', '1587017747112_newskin.jpg', NULL, 0, '', 'EE8623', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-12 00:00:00'),
('30a42e47-63e0-49d4-b77d-6496ec53b87d', '0', 'Installation & Repair', '', '1587017792520_spa.jpg', '1587017792520_spa.jpg', NULL, 0, '', '1AA7ED', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-05 00:00:00'),
('5a33f057-661b-4fc2-98cc-2205c91fc210', '0', 'Physiotherapy', '', '1587017767236_skin.jpg', '1587017767236_skin.jpg', NULL, 0, '', '31B547', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-19 00:00:00'),
('9adb51d2-fdfb-42f6-b591-6b5a997fe5b7', '0', 'Maids', '', '1587017685944_menicure.jpg', '1587017685944_menicure.jpg', NULL, 0, '', 'B5313F', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-06 00:00:00'),
('a7e03e23-5b1c-4894-808f-ceacaf60db6a', '0', 'Pest Control', '', '1587017635127_color_hair.jpg', '1587017635127_color_hair.jpg', NULL, 0, '', 'F5596A', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-01 00:00:00'),
('b21a7c8f-078f-4323-b914-8f59054c4467', '0', 'Beauty/Salon Services at home', '', '1587017525215_party.jpg', '1587017525215_party.jpg', NULL, 0, '', '85248E', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-03-02 00:00:00'),
('ea5afce1-b064-4905-854e-6809b16643b1', '0', 'Fitness Coach', '', '1587017651436_makeup.jpg', '1587017651436_makeup.jpg', NULL, 0, '', '248B8E', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-05 00:00:00'),
('fdaa6276-3091-4855-9280-d2f4836adcfc', '0', 'Car wash', '', '1587017607160_MensGrooming.jpg', '1587017607161_MensGrooming.jpg', NULL, 0, '', 'D28B5E', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-04-13 00:00:00'),
('fe6e48a1-3798-4d92-b9e3-48516c682baf', '0', 'Electrician, Plumber, Carpenter', '', '1587017706386_useeerrr.jpg', '1587017706386_useeerrr.jpg', NULL, 0, '', '5D6D7E ', 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-02-17 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `transactionId` text,
  `paymentMode` text,
  `paymentState` int(10) NOT NULL DEFAULT '0',
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `transactionStatus` int(5) NOT NULL DEFAULT '2',
  `amount` varchar(10) NOT NULL DEFAULT '0',
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2020-04-23 09:35:16',
  `updatedAt` datetime NOT NULL DEFAULT '2020-04-23 09:35:16'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `transactionId`, `paymentMode`, `paymentState`, `orderId`, `userId`, `transactionStatus`, `amount`, `companyId`, `createdAt`, `updatedAt`) VALUES
('007eb3f8-f3d3-48f9-8445-dd1dbb4bb86a', '', '', 1, '5ae74a1a-6fc5-4433-8294-397e83f9d8ba', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '600', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28', '2020-05-22 14:47:53'),
('09bb71a2-91f6-4ba9-8c34-dd11cd2d5cba', NULL, NULL, 0, 'a1014f30-2b79-4c70-8fcb-ebd3d0b8d29c', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 1, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-07 10:04:39', '2020-05-07 10:04:39'),
('0eb07a32-9b23-4b46-87c0-31db9a0a0cb3', '250281043', 'Net Banking', 1, '5bee2324-c2f3-474c-a363-017aa9315ca6', '87af7745-6514-41f5-b849-7255e06170fb', 1, '557.6', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28', '2020-05-22 13:17:30'),
('14cc0ca9-3493-4e1b-8277-2f66c777d7b3', '', '', 1, '42c2b1b1-7bdb-4a74-a141-28044457ecc5', '113ec97e-e5cc-4f14-a42c-8dbff291cf19', 1, '100', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-19 10:37:09', '2020-05-19 11:25:39'),
('17d1973e-f8ab-4c89-9f65-86312e33d88c', '250350094', 'CC', 1, 'ca01395f-9513-4902-a5d3-b7442d32b334', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '1000', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55', '2020-06-29 08:53:45'),
('18e282d0-2eca-4d0c-8474-367e531fde2c', '', '', 1, '25c8cdd8-7edc-4d11-bdaf-40257b06e93a', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '1396', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28', '2020-05-22 14:18:07'),
('229b37ae-cf14-4e2e-93c2-c4368a555d9e', NULL, NULL, 0, '62db4089-1b6f-485a-967a-84179ec5f841', '87af7745-6514-41f5-b849-7255e06170fb', 2, '400', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('382236e1-d981-471b-aa90-4cedc62fcc75', '', '', 1, '455284e5-a811-41eb-a65a-96c1d57341c2', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '399', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-24 08:39:29', '2020-05-25 05:21:57'),
('3f573c8a-fd77-421e-8e8a-4d501e37eb92', '250285175', 'Net Banking', 1, '377635f5-f113-4e5e-b6ca-b67707b2d246', '94f6c7a9-eb5d-46bf-8e76-4878347b7f8d', 1, '50', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-24 08:39:29', '2020-05-25 10:51:04'),
('469c77a1-8f7c-4042-ada2-dc5b60b80d66', '250281110', 'Net Banking', 1, 'b403c9b5-6610-4058-9b3e-cc9c1001a720', '0243ed39-8e8b-460a-833c-2e619146f94a', 1, '594.3', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28', '2020-05-22 13:50:47'),
('541fa409-951d-4b91-8348-d4dc24ab08d7', '', '', 1, 'eac384f4-e2e3-4a78-ac86-d6f818b57425', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '100', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-20 13:49:40'),
('57e929fe-840e-436e-b461-d0d09c5137e3', '', '', 1, '55cfd245-f86a-4a08-8009-40dd1f7a5b05', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '240', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-19 10:37:09', '2020-05-19 10:42:15'),
('60382f43-a7f9-4033-84cc-fe001af5c555', NULL, NULL, 0, 'fd1458c2-b17e-46d6-aea3-0aec1919d42d', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 2, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-12 09:42:20', '2020-05-12 09:42:20'),
('6256dda7-0a36-42bd-951a-8e30836a516c', '', '', 1, 'dd14bbc6-690d-489e-b830-0995d6d6e24e', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '400', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-19 12:13:33', '2020-05-19 14:06:42'),
('6363f631-4d0a-48a5-ba5b-60c1801d0393', '', '', 1, 'a1ee15e1-ad75-46d9-a3bc-b5bf176d12bb', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-22 05:28:43'),
('681acacc-55b5-4740-b99f-c06714892d1a', NULL, NULL, 0, 'af4f5215-b8cb-4781-ae47-70face639c8b', '87af7745-6514-41f5-b849-7255e06170fb', 2, '400', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('6a37c5fb-ca72-43c6-a4d4-632dabec2a1a', NULL, NULL, 0, '9a7896a4-9dfe-4a04-948e-0ef681969277', '87af7745-6514-41f5-b849-7255e06170fb', 2, '400', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('79e30d66-b125-4014-9a6e-7250e243ba9a', '', '', 1, 'a374130b-44fb-46df-b532-8fa4d0ab4855', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 07:23:59', '2020-05-20 09:16:22'),
('7ccd374b-9cfa-4d6d-aa91-cf224ab31106', '', '', 1, '65402c08-e02f-4b7a-a769-64c9f8bb9fbd', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '40', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-19 10:37:09', '2020-05-19 11:31:23'),
('8489be4c-4ef2-4f25-80af-da39c12a887c', '250367658', 'CC', 1, 'f5c036de-1d45-4630-99b2-3b78be732f01', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '1912', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-07-01 05:11:06', '2020-07-08 06:10:27'),
('851fe328-64a1-420f-8210-2a20e3112b48', '', '', 1, '92b2bd22-4c39-4031-9564-2c6ac0024b53', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '120', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-22 05:29:13'),
('8575717c-84fc-4189-afac-e8a23526eb37', '', '', 1, '076f6b8a-8723-430d-9b4f-210a6409cb2e', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '598', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-21 07:28:39'),
('86728bd0-6a97-44f6-8623-6ccc7200733c', NULL, NULL, 0, '44fc732b-632c-496f-a27d-cd741b69afe4', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 2, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-01 11:40:38', '2020-05-01 11:40:38'),
('8e876487-73e3-4f3b-8d5a-9bf384830499', '250264263', 'Net Banking', 0, 'da0fb6a8-4edb-4875-9d1a-a36caa916231', '87af7745-6514-41f5-b849-7255e06170fb', 2, '600', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-08 13:16:19', '2020-05-12 09:23:22'),
('906a3043-5c0e-429e-9070-085dd34dc844', NULL, NULL, 0, '83863a5f-80f8-466f-a4d4-1e3882d1089d', '87af7745-6514-41f5-b849-7255e06170fb', 2, '1000', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('96a8f0a6-5b67-4980-913a-c966b592e002', NULL, NULL, 0, '8a354e13-c712-494d-8ab7-1e025e3830a3', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 2, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-07 10:15:25', '2020-05-07 10:15:25'),
('97e2dbe3-a453-4a91-a982-1324140c8640', '250350639', 'CC', 1, '4d7fc723-5a2e-4b40-bdc9-2abe184afd18', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '600', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-29 12:11:14', '2020-06-29 12:12:22'),
('9808562e-2b35-430a-8acd-cfe093aaee49', '', '', 1, '34e4e73b-0b1c-4aba-ad86-7b7cf2f769a5', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '260', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-18 05:41:03', '2020-05-18 06:02:04'),
('9bf35940-a6a9-4440-adf2-04532f4d3efb', '', '', 1, 'a78c8b32-edec-4545-8a9e-19ced6019f7f', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '200', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28', '2020-05-22 14:47:26'),
('9f4aac89-6ce3-4a16-8741-a609dd0f2121', NULL, NULL, 0, '61215455-434a-40e2-8efd-04762be8e889', '87af7745-6514-41f5-b849-7255e06170fb', 2, '400', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('9faa91b5-cfbd-4314-a51c-795eff2c5f38', '', '', 1, '74f12833-b114-470a-ae2c-fa2f94a932ef', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-22 05:02:45'),
('a60f8c77-df22-4b7f-a448-58e1befb4ad3', '', '', 1, 'bab4dd19-a80e-4d78-bb80-653c65231eae', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '230', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-19 12:13:33', '2020-05-20 05:26:29'),
('a882993e-45b0-4212-ac3c-033cb6b59344', NULL, NULL, 0, '53d4148f-700c-4f75-87f4-0a2d9ca96d7c', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 2, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-08 08:43:19', '2020-05-08 08:43:19'),
('a886f151-fc6f-4f3a-aeed-700f728435de', '250275298', 'Net Banking', 1, '51f24130-f139-4708-9228-830705d422d1', '87af7745-6514-41f5-b849-7255e06170fb', 1, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-19 08:43:07', '2020-05-19 09:47:23'),
('a8e7a2cc-119b-433d-a797-cea8ff8d218f', '', '', 1, '3fa6c1d4-d6fe-47e7-ab32-6ad25a7a546b', '076d7903-148c-470b-a201-a9127a91998a', 1, '500', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-21 13:59:29'),
('b738fe4d-4d8f-4f7c-9a04-c0c320beb203', '', '', 1, '450cfb60-1426-4fa4-874a-4a91897f4180', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '100', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-18 05:41:03', '2020-05-18 14:17:01'),
('b7726cac-cb76-449d-bb37-0c79b498ece9', NULL, NULL, 0, '0c7bea8e-c637-4229-9ca1-70f149df3f90', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 2, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-07 10:02:10', '2020-05-07 10:02:10'),
('b7b99c13-e6de-4b2b-88a0-c6794b05813b', '', '', 1, '97a52f0f-da28-4c12-9ba3-3dc231616b12', '076d7903-148c-470b-a201-a9127a91998a', 1, '260', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-21 14:00:43'),
('b80248f6-4bd1-4486-a51a-2bb1d91cf5cd', '', '', 1, 'd49e72c6-93a8-4a30-9f03-0b129bcccbf2', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '100', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-24 08:39:29', '2020-05-25 05:21:11'),
('bd1853c4-254c-445e-8431-6fea8b89599e', '', '', 1, 'dc1ca4e9-10d3-439f-be88-3fc7f1d9346d', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '220', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-19 08:43:07', '2020-05-19 08:53:47'),
('bd323dbb-278c-4c82-93d0-089ba8758450', '', '', 1, '7b4bf96a-08f2-4c61-ac0e-ff9459507854', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '230', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-18 05:41:03', '2020-05-18 14:11:11'),
('c11d045d-db7a-4ea0-b864-8bc382d79534', NULL, NULL, 0, 'b0deaa97-f116-48e2-96cf-e0cea60ef294', 'd85d4a1f-20d1-47fa-b0a0-525cb3444ae5', 2, '322', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-07-01 05:11:06', '2020-07-01 05:11:06'),
('c1b09577-c436-4db2-bb49-327c7f4f2015', '', '', 1, '85a53487-c6ff-43b5-927e-7ae8f293a745', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '800', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-22 05:05:47'),
('c1f9ae25-e6b6-4fc7-91f5-be27217ecf2b', '250350783', 'CC', 1, 'b438760a-8b01-4920-9cc8-a57f6ced0fbd', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '480', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-29 12:13:30', '2020-06-29 13:03:00'),
('c4b5197e-2175-46f6-ab53-25f4ddb16d39', NULL, NULL, 0, 'c1c7812d-4483-4460-a30d-248028d270ff', '87af7745-6514-41f5-b849-7255e06170fb', 2, '400', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('c57e4b6b-a9b8-4e6d-8181-9570dd9ca58a', '', '', 1, '2a84a99e-9cf7-49de-8a86-21985288c9d1', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '796', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28', '2020-05-22 14:17:25'),
('cd8694bb-77b5-4d59-9fdf-38db10984803', '', '', 1, '32ad43c1-f0b9-45dd-8c53-7c341a0dbdbf', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-21 07:29:14'),
('cec767fd-0bf3-4e41-b0d0-559909f4e49a', '', '', 1, '32f293a9-d28b-483c-b537-1a40c628293d', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '400', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 07:23:59', '2020-05-20 09:20:09'),
('dca53d5c-7d51-4436-8e6b-a3e0d0040ab4', NULL, NULL, 0, 'fe46b68e-600b-4ff5-8493-b4392a42437d', '87c6c12e-fc25-42c1-9e55-fde92b7410dd', 2, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-07 10:04:39', '2020-05-07 10:04:39'),
('de91556a-962d-407a-bdac-c9c4033d2bda', '', '', 1, 'b6ed17e6-e3db-4fb8-9cb3-23d0aa49206b', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '200', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-20 12:04:28', '2020-05-22 05:02:04'),
('e032159a-75a9-4c9a-a3ba-df336f0e8d7c', '250281184', 'CC', 1, '982265bb-8652-41f7-ad02-1b0d09336d48', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '1197', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28', '2020-05-22 14:43:53'),
('e350aeff-0a9d-44f9-8b3d-088d43292054', NULL, NULL, 0, '8ac0519b-4c11-4ad1-b41b-4a4d6b3b4347', '87af7745-6514-41f5-b849-7255e06170fb', 2, '600', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('e504abb6-76e9-48e8-a815-db2b1dc661b9', '', '', 1, 'ac70786c-3a5e-42c3-8234-fe755f8b9cfe', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '600', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28', '2020-05-22 14:48:20'),
('ee8b03ec-6cfe-4da2-b44c-3e68ff871188', '', '', 1, '4cce26ed-35d1-415c-b43b-22eefecfec8c', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '319.2', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', '2020-05-20 12:04:28', '2020-05-22 14:15:18'),
('f0fa5864-12e9-4cd1-a5f9-bdc4e5d05560', '250281197', 'Net Banking', 1, '60c48db1-b937-4fe1-99f6-118b11dc960a', '0243ed39-8e8b-460a-833c-2e619146f94a', 1, '400', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', '2020-05-20 12:04:28', '2020-05-22 14:54:17'),
('f4f86dfb-6f76-4489-bf11-6472349e466f', '250350251', 'CC', 1, 'd9b4014e-56d3-41ab-9b05-adf842172c7e', '86091af5-38b8-4355-9257-17774e2a98f1', 1, '520', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '2020-06-22 05:45:55', '2020-06-29 09:59:59');

-- --------------------------------------------------------

--
-- Table structure for table `roleTypes`
--

CREATE TABLE `roleTypes` (
  `id` int(10) NOT NULL,
  `userType` varchar(256) NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT '2020-05-16 14:11:30',
  `updatedAt` datetime NOT NULL DEFAULT '2020-05-16 14:11:30'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roleTypes`
--

INSERT INTO `roleTypes` (`id`, `userType`, `companyId`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Manager', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, '2020-05-16 14:11:30', '2020-05-16 14:11:30'),
(2, 'Developer', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, '2020-05-16 14:11:30', '2020-05-16 14:11:30');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `slots` text NOT NULL,
  `dayParts` text NOT NULL,
  `permanentSlots` text NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `startTime` varchar(100) NOT NULL,
  `endTime` varchar(100) NOT NULL,
  `turnaround` text NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` int(11) NOT NULL DEFAULT '1586840797'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `slots`, `dayParts`, `permanentSlots`, `fromDate`, `toDate`, `startTime`, `endTime`, `turnaround`, `companyId`, `status`, `createdAt`) VALUES
('184c801e-2baa-4c60-9354-ff12855f76f0', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', 'thu', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1, 1589976268),
('1a6c3c9f-9252-4c87-8761-7818d28a4812', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', 'sat', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1, 1589976268),
('1aefd48f-3df8-4b55-b064-5834f76ec66d', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"50\"},{\"slot\":\"04:00 PM\",\"bookings\":\"50\"},{\"slot\":\"05:00 PM\",\"bookings\":\"50\"},{\"slot\":\"06:00 PM\",\"bookings\":\"50\"},{\"slot\":\"07:00 PM\",\"bookings\":\"50\"}]', 'sun', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"50\"},{\"slot\":\"04:00 PM\",\"bookings\":\"50\"},{\"slot\":\"05:00 PM\",\"bookings\":\"50\"},{\"slot\":\"06:00 PM\",\"bookings\":\"50\"},{\"slot\":\"07:00 PM\",\"bookings\":\"50\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1, 1589976268),
('1bdc15ab-e9e1-4753-8086-3206082ef4f2', '[{\"slot\":\"09:00 AM\",\"bookings\":\"15\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', 'tue', '[{\"slot\":\"09:00 AM\",\"bookings\":\"15\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', '2020-05-05', '2020-07-16', '09:00 AM', '07:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1, 1588052562),
('29724e11-8648-4303-aa1b-7108813c8b4e', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', 'fri', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1, 1589976268),
('3a733a49-e112-490b-852b-89d91d27b535', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', 'mon', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1, 1589976268),
('3cb6b6d7-07ee-44bc-971e-7d484b39f11a', '[{\"slot\":\"09:00 AM\",\"bookings\":\"15\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', 'thu', '[{\"slot\":\"09:00 AM\",\"bookings\":\"15\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', '2020-05-05', '2020-07-16', '09:00 AM', '07:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1, 1588052562),
('428a12e8-4537-4625-a4dd-ce297bbf21a9', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', 'thu', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', '0000-00-00', '0000-00-00', '01:00 PM', '04:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, 1589874212),
('47c426bd-f178-48ee-b10e-7a4d3d29fa06', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"50\"},{\"slot\":\"04:00 PM\",\"bookings\":\"50\"},{\"slot\":\"05:00 PM\",\"bookings\":\"50\"},{\"slot\":\"06:00 PM\",\"bookings\":\"50\"},{\"slot\":\"07:00 PM\",\"bookings\":\"50\"}]', 'mon', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"50\"},{\"slot\":\"04:00 PM\",\"bookings\":\"50\"},{\"slot\":\"05:00 PM\",\"bookings\":\"50\"},{\"slot\":\"06:00 PM\",\"bookings\":\"50\"},{\"slot\":\"07:00 PM\",\"bookings\":\"50\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1, 1589976268),
('49fd74da-7531-4c1d-a149-93e3d50e3c57', '[{\"slot\":\"09:00 AM\",\"bookings\":\"10\"},{\"slot\":\"10:00 AM\",\"bookings\":\"10\"},{\"slot\":\"11:00 AM\",\"bookings\":\"10\"},{\"slot\":\"12:00 PM\",\"bookings\":\"10\"},{\"slot\":\"01:00 PM\",\"bookings\":\"10\"},{\"slot\":\"02:00 PM\",\"bookings\":\"10\"},{\"slot\":\"03:00 PM\",\"bookings\":\"10\"},{\"slot\":\"04:00 PM\",\"bookings\":\"10\"},{\"slot\":\"05:00 PM\",\"bookings\":\"10\"},{\"slot\":\"06:00 PM\",\"bookings\":\"10\"},{\"slot\":\"07:00 PM\",\"bookings\":\"10\"}]', 'tue', '[{\"slot\":\"09:00 AM\",\"bookings\":\"10\"},{\"slot\":\"10:00 AM\",\"bookings\":\"10\"},{\"slot\":\"11:00 AM\",\"bookings\":\"10\"},{\"slot\":\"12:00 PM\",\"bookings\":\"10\"},{\"slot\":\"01:00 PM\",\"bookings\":\"10\"},{\"slot\":\"02:00 PM\",\"bookings\":\"10\"},{\"slot\":\"03:00 PM\",\"bookings\":\"10\"},{\"slot\":\"04:00 PM\",\"bookings\":\"10\"},{\"slot\":\"05:00 PM\",\"bookings\":\"10\"},{\"slot\":\"06:00 PM\",\"bookings\":\"10\"},{\"slot\":\"07:00 PM\",\"bookings\":\"10\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1, 1589976268),
('56141ee0-31d5-4be9-8c98-65e053ea6402', '[{\"slot\":\"09:00 AM\",\"bookings\":\"15\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', 'fri', '[{\"slot\":\"09:00 AM\",\"bookings\":\"15\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', '2020-05-05', '2020-07-16', '09:00 AM', '07:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1, 1588052562),
('59f2b9a3-0a8f-4e7d-b915-afb37b9cd324', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"50\"},{\"slot\":\"04:00 PM\",\"bookings\":\"50\"},{\"slot\":\"05:00 PM\",\"bookings\":\"50\"},{\"slot\":\"06:00 PM\",\"bookings\":\"50\"},{\"slot\":\"07:00 PM\",\"bookings\":\"50\"}]', 'wed', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"50\"},{\"slot\":\"04:00 PM\",\"bookings\":\"50\"},{\"slot\":\"05:00 PM\",\"bookings\":\"50\"},{\"slot\":\"06:00 PM\",\"bookings\":\"50\"},{\"slot\":\"07:00 PM\",\"bookings\":\"50\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1, 1589976268),
('6635c679-601f-4c86-b66e-2d2cc5b098e0', '[{\"slot\":\"09:00 AM\",\"bookings\":\"20\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', 'wed', '[{\"slot\":\"09:00 AM\",\"bookings\":\"20\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', '2020-05-05', '2020-07-16', '09:00 AM', '07:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1, 1588052562),
('6932da14-ca8e-46f4-8630-cf6f313b505d', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', 'wed', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1, 1589976268),
('8ce90d63-d05d-463e-b91b-a5d8c0dae3a4', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', 'mon', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', '0000-00-00', '0000-00-00', '01:00 PM', '04:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, 1589874212),
('8d0e915c-155c-4235-90b7-4f54044822d2', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"50\"},{\"slot\":\"04:00 PM\",\"bookings\":\"50\"},{\"slot\":\"05:00 PM\",\"bookings\":\"50\"},{\"slot\":\"06:00 PM\",\"bookings\":\"50\"},{\"slot\":\"07:00 PM\",\"bookings\":\"50\"}]', 'sat', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"50\"},{\"slot\":\"04:00 PM\",\"bookings\":\"50\"},{\"slot\":\"05:00 PM\",\"bookings\":\"50\"},{\"slot\":\"06:00 PM\",\"bookings\":\"50\"},{\"slot\":\"07:00 PM\",\"bookings\":\"50\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1, 1589976268),
('a3fcc684-c32a-48d1-b948-ec61a7fced7f', '[{\"slot\":\"04:00 PM\",\"bookings\":\"5\"},{\"slot\":\"05:00 PM\",\"bookings\":\"4\"},{\"slot\":\"06:00 PM\",\"bookings\":\"5\"}]', 'sat', '[{\"slot\":\"04:00 PM\",\"bookings\":\"5\"},{\"slot\":\"05:00 PM\",\"bookings\":\"4\"},{\"slot\":\"06:00 PM\",\"bookings\":\"5\"}]', '2020-05-05', '2020-07-16', '04:00 PM', '07:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1, 1588053856),
('a4780a44-0ea8-4ef2-b791-51e2ba30d8c2', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', 'tue', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1, 1589976268),
('a64df05f-de00-4962-b50b-2111f483e38f', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"10\"},{\"slot\":\"04:00 PM\",\"bookings\":\"10\"},{\"slot\":\"05:00 PM\",\"bookings\":\"10\"},{\"slot\":\"06:00 PM\",\"bookings\":\"10\"},{\"slot\":\"07:00 PM\",\"bookings\":\"10\"}]', 'thu', '[{\"slot\":\"09:00 AM\",\"bookings\":\"50\"},{\"slot\":\"10:00 AM\",\"bookings\":\"50\"},{\"slot\":\"11:00 AM\",\"bookings\":\"50\"},{\"slot\":\"12:00 PM\",\"bookings\":\"50\"},{\"slot\":\"01:00 PM\",\"bookings\":\"50\"},{\"slot\":\"02:00 PM\",\"bookings\":\"50\"},{\"slot\":\"03:00 PM\",\"bookings\":\"10\"},{\"slot\":\"04:00 PM\",\"bookings\":\"10\"},{\"slot\":\"05:00 PM\",\"bookings\":\"10\"},{\"slot\":\"06:00 PM\",\"bookings\":\"10\"},{\"slot\":\"07:00 PM\",\"bookings\":\"10\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1, 1589976268),
('a8e06f12-e523-4c67-a218-ae819cf047e7', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', 'tue', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', '0000-00-00', '0000-00-00', '01:00 PM', '04:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, 1589874212),
('c7797f26-cab0-402b-b5da-3a95a9252143', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', 'fri', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', '0000-00-00', '0000-00-00', '01:00 PM', '04:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, 1589874212),
('d404d156-61a2-4ab1-8b97-1f2c77fc884b', '[{\"slot\":\"09:00 AM\",\"bookings\":\"10\"},{\"slot\":\"10:00 AM\",\"bookings\":\"10\"},{\"slot\":\"11:00 AM\",\"bookings\":\"10\"},{\"slot\":\"12:00 PM\",\"bookings\":\"10\"},{\"slot\":\"01:00 PM\",\"bookings\":\"10\"},{\"slot\":\"02:00 PM\",\"bookings\":\"10\"},{\"slot\":\"03:00 PM\",\"bookings\":\"10\"},{\"slot\":\"04:00 PM\",\"bookings\":\"10\"},{\"slot\":\"05:00 PM\",\"bookings\":\"10\"},{\"slot\":\"06:00 PM\",\"bookings\":\"10\"},{\"slot\":\"07:00 PM\",\"bookings\":\"10\"}]', 'fri', '[{\"slot\":\"09:00 AM\",\"bookings\":\"10\"},{\"slot\":\"10:00 AM\",\"bookings\":\"10\"},{\"slot\":\"11:00 AM\",\"bookings\":\"10\"},{\"slot\":\"12:00 PM\",\"bookings\":\"10\"},{\"slot\":\"01:00 PM\",\"bookings\":\"10\"},{\"slot\":\"02:00 PM\",\"bookings\":\"10\"},{\"slot\":\"03:00 PM\",\"bookings\":\"10\"},{\"slot\":\"04:00 PM\",\"bookings\":\"10\"},{\"slot\":\"05:00 PM\",\"bookings\":\"10\"},{\"slot\":\"06:00 PM\",\"bookings\":\"10\"},{\"slot\":\"07:00 PM\",\"bookings\":\"10\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1, 1589976268),
('db6314f8-7ffa-4aa0-ba62-63839409a235', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', 'sun', '[{\"slot\":\"09:00 AM\",\"bookings\":\"100\"},{\"slot\":\"10:00 AM\",\"bookings\":\"100\"},{\"slot\":\"11:00 AM\",\"bookings\":\"100\"},{\"slot\":\"12:00 PM\",\"bookings\":\"100\"},{\"slot\":\"01:00 PM\",\"bookings\":\"100\"},{\"slot\":\"02:00 PM\",\"bookings\":\"100\"},{\"slot\":\"03:00 PM\",\"bookings\":\"100\"},{\"slot\":\"04:00 PM\",\"bookings\":\"100\"},{\"slot\":\"05:00 PM\",\"bookings\":\"100\"},{\"slot\":\"06:00 PM\",\"bookings\":\"100\"},{\"slot\":\"07:00 PM\",\"bookings\":\"100\"}]', '2020-05-01', '2020-07-31', '09:00 AM', '08:00 PM', '60', 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1, 1589976268),
('db9055de-8c6e-452f-a066-22d040aad2fa', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', 'wed', '[{\"slot\":\"01:00 PM\",\"bookings\":\"20\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"}]', '0000-00-00', '0000-00-00', '01:00 PM', '04:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, 1589874212),
('f716e751-eebc-46b4-9380-41928bdc3d80', '[{\"slot\":\"09:00 AM\",\"bookings\":\"15\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', 'mon', '[{\"slot\":\"09:00 AM\",\"bookings\":\"15\"},{\"slot\":\"10:00 AM\",\"bookings\":\"20\"},{\"slot\":\"11:00 AM\",\"bookings\":\"20\"},{\"slot\":\"12:00 PM\",\"bookings\":\"20\"},{\"slot\":\"01:00 PM\",\"bookings\":\"0\"},{\"slot\":\"02:00 PM\",\"bookings\":\"20\"},{\"slot\":\"03:00 PM\",\"bookings\":\"20\"},{\"slot\":\"04:00 PM\",\"bookings\":\"20\"},{\"slot\":\"05:00 PM\",\"bookings\":\"20\"},{\"slot\":\"06:00 PM\",\"bookings\":\"20\"}]', '2020-06-20', '2020-10-14', '09:00 AM', '07:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1, 1588052562),
('ff4e428f-d816-47e3-a57d-69c1bea9662a', '[{\"slot\":\"05:00 PM\",\"bookings\":\"2\"},{\"slot\":\"06:00 PM\",\"bookings\":\"2\"}]', 'sun', '[{\"slot\":\"05:00 PM\",\"bookings\":\"2\"},{\"slot\":\"06:00 PM\",\"bookings\":\"2\"}]', '2020-05-05', '2020-07-16', '05:00 PM', '07:00 PM', '60', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1, 1588053856);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `categoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT '',
  `description` text NOT NULL,
  `icon` text NOT NULL,
  `thumbnail` text NOT NULL,
  `type` varchar(30) NOT NULL DEFAULT '',
  `duration` varchar(50) DEFAULT '',
  `turnaroundTime` varchar(30) DEFAULT '',
  `price` varchar(10) NOT NULL DEFAULT '1',
  `includedServices` varchar(255) DEFAULT '',
  `excludedServices` varchar(255) DEFAULT '',
  `child_service` int(20) DEFAULT NULL,
  `connected_service` int(20) DEFAULT NULL,
  `orderby` int(20) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` int(11) NOT NULL DEFAULT '1586948069'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `categoryId`, `name`, `description`, `icon`, `thumbnail`, `type`, `duration`, `turnaroundTime`, `price`, `includedServices`, `excludedServices`, `child_service`, `connected_service`, `orderby`, `status`, `companyId`, `createdAt`) VALUES
('0346ad7a-58ab-481b-ba6a-c48ddefd0dea', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Zucchini-Chickpea Burger', 'Savory chickpea and zucchini patties are topped with a creamy, herb-flecked tahini ranch sauce, juicy tomato slices and peppery arugula for a satisfying and healthy homemade veggie burger. Serve them on buns or stuff them in pitas. We recommend making extra sauce--it\'s a great dip for veggie sticks and, thinned with a little water, it makes a wonderful salad dressing.', '1590146824049_17.jpg', '1590146824049_17.jpg', 'Fixed', '30', '', '40', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('04d71e2d-c2dd-47b5-a7a5-7e665fbb73f0', '1ce5aae2-686c-4440-b035-8e4c8d5e0a2d', 'Spicy Chicken Pizza', 'Press pizza dough into the pan so that it covers the whole surface evenly.\r\nSpread spicy pizza sauce on the dough. Top with mozzarella, chicken, and bacon. Scatter spinach, cherry tomatoes, and red onion on top.\r\nBake pizza for 14–16 minutes until edges are browned and crisp.\r\nRemove from oven and let cool for 5 minutes, then drizzle with Frank’s Red Hot Original and ranch dressing. Slice and serve.', '1590152536550_chicken.jpg', '1590152536550_chicken.jpg', 'Fixed', '1 hr', '', '250', 'Olive oil,Cornmeal, Red Hot Original', 'Onion', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('0d64779c-ab51-4a06-a413-58547fc0b314', 'b3dd5de8-3e9a-4762-a5a6-5dce585ac277', 'Chicken Tikka', 'Chicken tikka is a chicken dish originating in the Indian subcontinent; the dish is popular in India, Bangladesh and Pakistan.[1] It is traditionally small pieces of boneless chicken baked using skewers on a brazier called angeethi after marinating in Indian spices and dahi —essentially a boneless version of tandoori chicken', '1590143650295_chicken tikka.jpg', '1590143650295_chicken tikka.jpg', 'Fixed', '1 Hour', '', '299', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('1196d9b5-e561-41b0-a303-207cc8a7a845', 'f397c1e2-dde6-4282-b1f3-c58118176c99', 'Guacamole Beef Burrito Recipe', 'Minced beef, garlic powder, onion powder, sweet paprika powder, chili powder, salt, cayenne pepper, sugar, flour, water. This is all that it needs to have freaking delicious Mexican beef for our burritos.\r\nCook for about 15 minutes in total, and you are up and ready to roll your burritos', '1590150936908_34.jpg', '1590150936908_34.jpg', 'Fixed', '30', '', '40', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('124aa20b-c96d-4b9e-b5ab-af35a05a67d0', 'aed1062c-2a45-45ba-90f5-92c2e8b71147', 'Kolkata Biryani', 'Calcutta or Kolkata biryani evolved from the Lucknow style, when Awadh\'s last Nawab Wajid Ali Shah was exiled in 1856 to the Kolkata suburb of Metiabruz. Shah brought his personal chef with him. The poorer households of Kolkata, which could not afford meat, used potatoes instead, which went on to become a specialty of the Calcutta biryani', '1590144685102_kolkatta.jpg', '1590144685102_kolkatta.jpg', 'Fixed', '30 Mins', '', '450', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('16ba274b-9198-42c3-bf53-3e5b94b6c41c', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Mediterranean beef burger', 'Everyone loves a burger, but our Mediterranean ones come with a hairy twist… you can eat them whilst sticking to the diet at just 413 calories per portion.', '1590147482184_20.jpg', '1590147482184_20.jpg', 'Fixed', '40', '', '70', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('17fd43ab-2baf-47c3-82ab-31a9d4b6b75c', '4d5f3ac9-f7ee-497e-81f9-9a39690ace1c', 'Dal Makhni', 'Dal Makhani or Dal Makhni (pronounced daal makh-nee, \"buttery lentils\") is a dish originating from the Punjab region of the Indian subcontinent. The primary ingredients are whole black lentil (urad), red kidney beans (rajma), butter and cream. The dish gets its richness from the use of cream or butter, but it can also be prepared with yogurt, milk or no dairy.', '1590146135046_dal.jpg', '1590146135046_dal.jpg', 'Fixed', '20 Mins', '', '199', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('1a7e980e-75b0-478d-aafc-69c21574cba1', 'f851d996-604f-4028-be00-26602fa5b7a5', 'Paneer Thali', 'Indian paneer platter / Thali having paneer butter masala, dal makhani, flat bread or naan and rice served in a white plate', '1590141604749_paneer.jpg', '1590141604750_paneer.jpg', 'Fixed', '20 Mins', '', '149', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('1a888989-003b-4607-ac6d-8437307ed193', 'fb0c6018-6296-470c-a72f-0600e84f1b2a', 'Egg Rolls', 'Egg rolls are a widely enjoyed take out appetizer that can be easily executed in your own kitchen. This vegetarian version requires only a few basic ingredie.', '1590160371264_maxresdefault.jpg', '1590160371264_maxresdefault.jpg', 'Hourly', '30 min', '', '120', 'Egg,onion', 'Cream', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('1b1ff4f6-7b9e-420d-ac18-e880df01d510', '96c7b7a2-721b-4428-83cf-4bbea80c4278', 'Moist Chocolate Chip Muffin', 'Moist and fluffy bakery-style chocolate chip muffins can be made in a flash and enjoyed all week. They bake up big, tall and fluffy and stay so moist for days. You can store them in an airtight container to enjoy all week. They get even better after the second day! ', '1590153131199_41.jpg', '1590153131199_41.jpg', 'Fixed', '35', '', '45', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('1c345a5d-b25c-4e13-a480-37a9f186b72f', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Baked black bean & Sweet Potato', 'Baked Black Bean & Sweet Potato Veggie Burgers are vegan, gluten-free and freezer-friendly! The perfect make-ahead meatless main dish!', '1590154040660_44.jpg', '1590154040660_44.jpg', 'Fixed', '25', '', '55', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('1f47b4d3-536d-4d6c-b5ee-6f8925ba1aef', '4d5f3ac9-f7ee-497e-81f9-9a39690ace1c', 'Paneer Butter Masala', 'Paneer Butter Masala, also often called Shahi Paneer or Paneer Makhani, is simply the vegetarian version of India\'s cult classic Butter Chicken. Most Indian restaurants even use the same rich, creamy tomato-y sauce for both dishes', '1590146052354_paneer.png', '1590146052354_paneer.png', 'Fixed', '30 Mins', '', '299', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('1fdb0992-aa2c-41c1-9c8d-9fa8e3dd7a99', '53d5ef71-935a-43dc-93ca-0d072f60d4f1', 'Traditional Thali', 'A traditional Assamese meal starts with a unique dish called khar (a curry of raw papaya, lentil and powdered dried banana skins). It is followed by pura ( smoked meat or fish), poitabhat (cooked rice that is soaked overnight  and garnished with mustard oil, onion and chillies), pitika( a kind of mash), shaak bhaji (green leafy vegetable), bor (fritters) and pickle. The meal ends with a signature Assamese preparation, tenga, a lightly spiced sweet and sour fish curry that will have you licking your fingers.', '1593425850464_23.jpg', '1593425850464_23.jpg', 'Fixed', '2 hours', '', '200', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('23633894-6733-478e-bf08-f5a9083e0e16', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', ' Peas and Crayons Quinoa Black Bean Burger', 'Black Bean Burgers a bit of a facelift and created what just may be my “meatiest” veggie burgers yet! These uber flavorful Quinoa Black Bean Veggie Burgers are spiked with garlic and onion and topped with yellow mustard and Sriracha mayo for the ultimate veggie burger experience. I’m really digging the texture from the fresh veggies, fluffy quinoa, and oats. Pile on your favorite toppings and get ready to swoon!', '1590153755475_43.jpg', '1590153755475_43.jpg', 'Fixed', '25', '', '69', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('2464e00b-ba4a-41ec-a0b8-f2f99fc4b99f', 'b21a7c8f-078f-4323-b914-8f59054c4467', 'Monchow Soup', 'Soup is a primarily liquid food, generally served warm or hot, that is made by combining ingredients of meat or vegetables with stock, or water. Hot soups are additionally characterized by boiling solid ingredients in liquids in a pot until the flavors are extracted, forming a broth', '1587540852228_IMG_0772.JPG', '1587540852228_IMG_0772.JPG', 'Hourly', '15 min', '', '200', 'ketchup pouch', 'cutlery', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1587537754),
('291d2210-272c-41b1-a5d2-6f3d457061f2', '1ce5aae2-686c-4440-b035-8e4c8d5e0a2d', 'Tandoori Paneer', 'Place one circle on a floured pizza peel (or on top of a baking sheet), and spread 1/2 cup of tomato sauce. Top the pizza with the roasted red pepper, tandoori chicken, red onion, and feta cheese and slide it into the oven; bake the pizza either on top of the pizza stone or on the baking sheet', '1590151800685_Tandoori_Paneer_Pizza_from_India.jpg', '1590151800685_Tandoori_Paneer_Pizza_from_India.jpg', 'Fixed', '30 min', '', '150', 'Onion , Tomatoes', 'Capscium', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('2e3d2c38-98de-4f02-9a0e-18e88c703169', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Taco Bell', 'At Taco Bell, we’ve had innovation on our mind since Glen Bell started serving tacos at the first location in 1962 in Downey, California. Since then, we’ve grown to be a culture-centric, lifestyle brand that provides craveable, affordable Mexican-inspired food with bold flavors. Not only do we provide breakthrough value, we offer quality ingredients and are the first QSR restaurant to offer American Vegetarian Association (AVA)-certified menu items.\r\n\r\nTaco Bell and our more than 350 franchise organizations operate over 7,000 restaurants that serve more than 40 million customers each week in the U.S. Internationally, the brand is growing with nearly 500 restaurants across almost 30 countries across the globe.', '1593427019301_34.png', '1593427019302_34.png', 'Fixed', '30 Minuts', '', '100', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('31cae88a-c719-45cf-a5df-93135011a6c8', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Salads', 'This dish is half salad, half nachos - just add black beans cooked with sauteed onion and garlic for a bit more bulk. Add a generous pinch of sugar to the tomato salsa if your tomatoes aren’t ripe or have been in a fridge.', '1593427275736_36.jpg', '1593427275736_36.jpg', 'Fixed', '30 Minuts', '', '50', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('323f524f-6811-4cc4-85a7-d7b5d80c8f1d', 'f397c1e2-dde6-4282-b1f3-c58118176c99', 'Vegan Burrito', 'A vegan burrito that is filling, hearty, flavorful and every kind of delicious! Stuffed with black beans and corn, rice, vegan sour cream & guacamole.', '1590150418664_30.jpg', '1590150418664_30.jpg', 'Fixed', '20', '', '40', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('340ca15b-446e-4d16-b6b2-d6846739f231', '81f7f4dd-8707-4ccf-a0d5-d820e39de638', 'Paccheri Pasta', 'Recently, Rob and I attended a family “1st Birthday” celebration, which was held for the first born son of an Italian family, so naturally, they went ALL OUT– especially on the food. One of the stations included pasta imported from Italy and when the food far outnumbered the guests (as usual), we were left to take home leftover bags of uncooked artisanal pastas. For a couple of months, the pasta sat untouched on the shelf of our pantry, haunting me as I tried to determine the type of sauce that would compliment the uniquely shaped noodles. Lo and behold, Paccheri Alla Bolognese was born. ', '1590150034399_BOLOGNESE1.jpg', '1590150034399_BOLOGNESE1.jpg', 'Hourly', '1:30 hr', '', '180', ' Plum Tomatoes,Dry Red Wine', 'Cream', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('348e70ac-6167-4710-a8e5-5e980def5838', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Mexican beef and black bean burgers', 'These hearty Mexican beef burgers are perfect for eating with your hands. Black beans and chilli sauce give the right amount of spice and you can follow it down with some hot chips!', '1590147684385_22.jpeg', '1590147684385_22.jpeg', 'Fixed', '35', '', '70', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('356c6da3-ed09-4d20-bfbe-d13a350aa2fd', '53d5ef71-935a-43dc-93ca-0d072f60d4f1', 'Brown Rice', 'A huge part of what makes South India such a great destination to travel is its rich and varied cuisine. While South Indians are not afraid to experiment with their food, it is their old traditions and recipes that make South Indian cuisine such a unique experience. From the vegetarian varieties of Udipi and the festive fare of Tamil Nadu to the beef and seafood delicacies of Kerala and Konkan Karnataka, there’s something for every kind of food addict in South India! If you’re heading down south, here are some of the best and most popular traditional dishes that you cannot miss.', '1593425607489_21.jpg', '1593425607489_21.jpg', 'Fixed', '30 Minuts', '', '100', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('3e48d919-a8ea-4381-896c-a77607e419e6', 'b3dd5de8-3e9a-4762-a5a6-5dce585ac277', 'Kadahi Chicken', 'kadai chicken, is a dish from the Indian subcontinent noted for its spicy taste; it is notable in Pakistani cuisine. The dish is prepared in a kadahi. It can take between 30 and 50 minutes to prepare and cook the dish and can be stored for later consumption.', '1590143852191_kadahi.jpg', '1590143852191_kadahi.jpg', 'Fixed', '45 Mins', '', '399', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('40770779-f410-498a-ae5b-9d988881600c', '0536d27b-3082-4660-b667-ca662f075565', 'Veg Sanwich', 'Sandwiches are a popular type of lunch food, taken to work, school, or picnics to be eaten as part of a packed lunch. The bread may be plain or be coated with condiments, such as mayonnaise or mustard, to enhance its flavour and texture. As well as being homemade, sandwiches are also widely sold in restaurants and can be served hot or cold', '1590148446649_24.jpg', '1590148446649_24.jpg', 'Fixed', '15', '', '20', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('42bdf460-2a83-4d84-926c-535dd544ff0e', 'd40e3570-c12c-4284-b3ea-71140cd157b3', 'Pasta', 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used before final copy is available, but it may also be used to temporarily replace copy in a process called greeking, which allows designers to consider form without the meaning of the text influencing the design.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used before final copy is available, but it may also be used to temporarily replace copy in a process called greeking, which allows designers to consider form without the meaning of the text influencing the design.', '1589966930949_images (1).jpg', '1589966930949_images (1).jpg', 'Fixed', '30 Min', '', '150', '', '', NULL, NULL, NULL, 1, 'ed33cbfe-d28e-4816-9962-57825ca36e24', 1589966582),
('441aa467-5092-4043-b5a7-9a4833cf4c45', 'aed1062c-2a45-45ba-90f5-92c2e8b71147', 'Sindhi Biryani', 'The exotic and aromatic Sindhi biryani is known in Pakistan for its spicy taste, fragrant rice and delicate meat. Sindhi biryani is a beloved staple in food menus of Pakistani and Sindhi cuisine. Sindhi biryani is prepared with meat and a mixture of basmati rice, vegetables and various spices. Sindhi Biryani is often served by Pakistan International Airlines (PIA) on most of their international flights. ', '1590145043974_sindhi.jpg', '1590145043975_sindhi.jpg', 'Fixed', '30 Mins', '', '300', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('44fbb660-850c-4499-a683-f6ff1147f937', '4d5f3ac9-f7ee-497e-81f9-9a39690ace1c', 'Channa Masala', 'Chana masala also known as channay, chole masala, chole or chholay (plural), is a dish originating from the Indian subcontinent.[1] The main ingredient is a variety of chickpea called chana (चना) or kala chana (\'black chana\'). They are twice the diameter of typical chickpeas with a stronger flavour and firmer texture even after being cooked.', '1590146220314_chana.jpg', '1590146220314_chana.jpg', 'Fixed', '30 Mins', '', '249', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('48d4bffa-e7b4-44bc-8869-55b66976b186', '83d29148-cfab-4cac-8259-e0403f2291fe', 'Chicken Sweet Corn Soup', 'Soup is a primarily liquid food, generally served warm or hot, that is made by combining ingredients of meat or vegetables with stock, or water. Hot soups are additionally characterized by boiling solid ingredients in liquids in a pot until the flavors are extracted, forming a broth', '1587540231927_Amish-Chicken-Corn-Soup_EXPS_CWFM18_31049_B10_13_5b-2.jpg', '1587540231927_Amish-Chicken-Corn-Soup_EXPS_CWFM18_31049_B10_13_5b-2.jpg', 'fixed', '15 min', '', '250', 'ketchup pouch', 'cutlery', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1587537754),
('49084092-fb82-4a31-a160-f92236cda9b5', '81f7f4dd-8707-4ccf-a0d5-d820e39de638', 'Red Sauce veg/non veg', 'When eaten in moderation, pasta can be part of a healthy diet. Whole-grain pasta may be a better choice for many, as it is lower in calories and carbs but higher in fiber and nutrients. ... Calories can stack up fast when adding high-fat, high-calorie toppings like cream-based sauces and cheeses', '1590153988567_chili-sauce-arrabiata.jpg', '1590153988567_chili-sauce-arrabiata.jpg', 'Hourly', '1 hr', '', '135', 'Red Sauce , Cream', 'Olive oil', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('4a94181d-1801-4626-8230-a8300c143f60', 'fb0c6018-6296-470c-a72f-0600e84f1b2a', 'Panner Rolls', 'Popular Indian street-food, Paneer Kathi rolls are warm, layered parathas filled with spicy paneer, mixed peppers and sweet caramelized onions. Whether you make it for a quick weeknight meal or a leisurely gathering, these kathi rolls are sure to be a hit.', '1590160632793_paneer-kathi-rolls-1-850x1275.jpg', '1590160632793_paneer-kathi-rolls-1-850x1275.jpg', 'Hourly', '30 min', '', '80', 'Panner,Butter', 'Cream', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('5069e8f6-0032-46d4-96d4-f3ab356eb348', 'aa7b0190-97b1-4519-bf66-df04f5f33b85', 'chicken Hot and Sour', 'Soup is a primarily liquid food, generally served warm or hot, that is made by combining ingredients of meat or vegetables with stock, or water. Hot soups are additionally characterized by boiling solid ingredients in liquids in a pot until the flavors are extracted, forming a broth', '1587540495306_Hot & Sour Soup.jpg', '1587540495307_Hot & Sour Soup.jpg', 'Fixed', '20 min', '', '260', 'ketchup pouch', 'cutlery', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1587537754),
('52e6c1b4-6da6-480a-a72a-9b7ca139da8d', 'e70158bb-c576-4135-89f2-f007a943a58f', 'veg clear soup', 'Soup is a primarily liquid food, generally served warm or hot, that is made by combining ingredients of meat or vegetables with stock, or water. Hot soups are additionally characterized by boiling solid ingredients in liquids in a pot until the flavors are extracted, forming a broth', '1587540629573_Veg_Clear_Soup_Recipe.jpg', '1587540629574_Veg_Clear_Soup_Recipe.jpg', 'fixed', '15 min', '', '160', 'ketchup pouch', 'cutlery', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1587537754),
('56367b57-2760-4fa2-8590-815c9be20b78', '83d29148-cfab-4cac-8259-e0403f2291fe', 'Chicken Monchow Soup', 'Soup is a primarily liquid food, generally served warm or hot, that is made by combining ingredients of meat or vegetables with stock, or water. Hot soups are additionally characterized by boiling solid ingredients in liquids in a pot until the flavors are extracted, forming a broth', '1587540359522_maxresdefault.jpg', '1587540359522_maxresdefault.jpg', 'fixed', '16 min', '', '280', 'ketchup pouch', 'cutlery', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1587537754),
('68c44bbd-0805-4257-a7bf-6c94d7eb810c', '0536d27b-3082-4660-b667-ca662f075565', 'Spinach Corn Sandwich', 'This Spinach Corn Sandwich is good way to make your kids eat their share of greens. The cheesy sauce is delicious enough to tempt them. You can add other cooked vegetables like carrot,peas,beans. Boiled chicken chunks can also be added to the stuffing.\r\n\r\nWant to make it healthy?? No issues.  Substitute flour with whole wheat flour , use a mix of oil and butter and reduce the amount of cheese to half. Yet, I can bet you the stuffing will be equally yum.', '1590149242664_28.jpg', '1590149242664_28.jpg', 'Fixed', '25', '', '45', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('6b3becb5-8e21-4306-9c9d-ac96133e8511', '431ba68e-247d-4be3-a1dd-1aa69fb08f9f', 'Ice-Cream Roll', 'Stir-fried ice cream, also known as rolled ice cream, is a sweetened frozen dessert. It is made using milk, cream, and sugars as well as other added ingredients to increase the flavour. The liquid mixture is stirred to incorporate air spaces on an ice pan and simultaneously cooled to -20°C. Once the rolling process is complete, the result is rolls of smooth, semi-solid ice cream or gelato. The rolls are placed in a vertical position in an ice cream cup, topped off with various toppings and decorations, and eaten with a spoon.', '1590145777076_20.jpg', '1590145777076_20.jpg', 'Fixed', '30 Minuts', '', '100', 'Ice-Cream, Orio', 'Choclates', NULL, NULL, NULL, 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1589976268),
('6e446f55-7428-4376-a9cd-a7b4b84e4620', '431ba68e-247d-4be3-a1dd-1aa69fb08f9f', 'Fruit Milk Roll', '1.Heat oven to 400°F. Spray cookie sheet with cooking spray. Separate dough into 8 rolls; set icing aside. Place rolls 2 inches apart on cookie sheet, cinnamon topping up.\r\n2\r\nBake 8 to 10 minutes or until golden brown. Cool 2 minutes.\r\n3\r\nIn separate small bowls, place melted butter and sugar. Dip baked rolls in butter, coating all sides. Coat with sugar. Place on serving plate.\r\n4\r\nRemove lid from icing; microwave on Medium (50%) 5 to 10 seconds or until thin enough to drizzle. Drizzle over warm rolls. Serve warm.', '1590142490460_15.jpg', '1590142490460_15.jpg', 'Fixed', '30 Minuts', '', '50', 'Fruites', 'Milk Cream', NULL, NULL, NULL, 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1589976268),
('731b938f-c733-486d-9146-13dc59e5df13', '1ce5aae2-686c-4440-b035-8e4c8d5e0a2d', 'Mexican Green Wave', ' A pizza loaded with crunchy onions, crisp capsicum, juicy tomatoes and jalapeno with a liberal sprinkling of exotic Mexican herbs. It’s the quintessential comfort food that not only pairs easily with a cup of soup, but it’s easy to whip together with just a few ingredients. There are many reasons to celebrate the gooey cheesiness of this toasted sandwich, but at nearly 700 calories, it’s definitely an occasional treat.', '1590147824666_new_mexican_green_wave.jpg', '1590147824667_new_mexican_green_wave.jpg', 'Fixed', '1 hr', '', '200', 'crunchy onions, crisp capsicum, juicy tomatoes ', '', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('7a76b9d7-bf9e-4a8d-98de-aedcd3d36774', 'c2723787-83e9-49f6-be4a-cda22fd515dc', 'Sweet Donut', 'The very first step in creating donuts is blooming your yeast: dissolve sugar into lukewarm water, then stir in the yeast. In about 5 minutes, it’ll have turned into a foamy, bubbling layer on top of the water. This is how you know your yeast is alive and that your dough will rise! Stir in with your other ingredients, mix, and then knead until dough feels smooth and elastic. To test if your dough is ready, lightly press your thumb into the dough. In about 5 seconds or so, the dough should bounce almost completely back.', '1590145951986_20.jpeg', '1590145951987_20.jpeg', 'Fixed', '30 Minuts', '', '100', 'Base and sweet', '', NULL, NULL, NULL, 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1589976268),
('7a79581b-2d40-4586-b6bb-f4024028973c', '53d5ef71-935a-43dc-93ca-0d072f60d4f1', 'Hot Gulab Jamun', 'Gulab Jamun is one of India’s most popular sweet. These deep-fried dumplings/donuts made of dried milk [khoya] are dipped in a rose-cardamom flavored sugar syrup and make quite a treat.\r\nIn India, you would find gulab jamun at every wedding, party, birthday and festivals. In short if you arrange any Indian party and plan to keep only one dessert, chances are it will be gulab jamun!', '1593426088865_26.jpg', '1593426088865_26.jpg', 'Fixed', '2 hours', '', '200', 'Flavours', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('8015163e-f39d-4566-936a-256623edc39e', 'f4481e19-c5c6-4b95-85f7-748b4f7fc8f4', 'Fried Rice', 'This is for testing purpose...This is for testing purpose...This is for testing purpose...This is for testing purpose...', '1592808392989_1512_15-Minute-Fried-Noodles_003-1.jpg', '1592808392990_1512_15-Minute-Fried-Noodles_003-1.jpg', 'Fixed', '20 Mins.', '', '500', '', '', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('82816e20-aedc-4297-a353-734ad7122d22', 'c2723787-83e9-49f6-be4a-cda22fd515dc', 'Vegan Donut', 'All you need is a donut pan and a bowl to whisk everything up in!\r\n\r\nNo mixers required, just a few friends to share these with or you may be sorry as they have a tendency to disappear pretty quickly!\r\n\r\nI have always loved cake style donuts more than a fried yeast donut.\r\n\r\nBut if you prefer the fried donuts variety I have recipes for Boston Creme and Cookies & Cream stuffed!', '1590146040656_21.jpg', '1590146040656_21.jpg', 'Fixed', '2 hours', '', '200', 'Gems,Cream', 'Choclates', NULL, NULL, NULL, 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1589976268),
('83130f90-39be-49c5-a4e7-9d06379acad8', 'fb0c6018-6296-470c-a72f-0600e84f1b2a', 'Grilled Cheese Sandwich', 'Ah, the grilled cheese. It’s the quintessential comfort food that not only pairs easily with a cup of soup, but it’s easy to whip together with just a few ingredients. There are many reasons to celebrate the gooey cheesiness of this toasted sandwich, but at nearly 700 calories, it’s definitely an occasional treat.', '1590148054440_GrilledCheese.jpg', '1590148054441_GrilledCheese.jpg', 'Hourly', '30 min', '', '50', 'Cheese', 'Tomatoes', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('845ad450-eed8-4d16-9b24-f3c3ab240f5e', '0536d27b-3082-4660-b667-ca662f075565', 'Grilled Sanwich', 'A toasted sandwich, grilled cheese sandwich, cheese toastie, or grilled cheese is a hot sandwich made with one or more varieties of cheese (a cheese sandwich) on bread. It is typically prepared by heating cheese between slices of bread, with a cooking fat such as butter, on a frying pan, griddle, or sandwich toaster, until the bread browns and the cheese melts. Adding additional ingredients, such as pepperoni, tuna salad, or ham, creates a variation known as a melt sandwich.', '1590148967931_27.jpg', '1590148967931_27.jpg', 'Fixed', '15', '', '30', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('85adda05-0f16-4ab6-af76-fd8faf8ce05f', 'f397c1e2-dde6-4282-b1f3-c58118176c99', 'Bean and Rice Burrroto', 'Healthy make ahead bean and rice burritos are perfect for easy packed lunches. Find out how meal prep and freeze burritos. These burritos are vegetarian, vegan, and easy to make gluten-free. They have a hearty plant-based complete protein base to which you can add any veggies you like. Just don’t forget to pack the guacamole! ', '1590150809509_33.jpg', '1590150809509_33.jpg', 'Fixed', '40', '', '40', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('85ed1f53-4e56-4c88-b0a9-b44b02e95722', '83d29148-cfab-4cac-8259-e0403f2291fe', 'clear soup', 'Soup is a primarily liquid food, generally served warm or hot, that is made by combining ingredients of meat or vegetables with stock, or water. Hot soups are additionally characterized by boiling solid ingredients in liquids in a pot until the flavors are extracted, forming a broth', '1587535014445_clearsoup.jpg', '1587535014445_clearsoup.jpg', 'fixed', '15 min', '', '230', 'ketchup pouch', '', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1587533919),
('8a92ee3d-72c6-44cf-b981-803d7945a381', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Pan-Roasted Fish', 'A blast of heat in a cast-iron pan and a basting of golden butter does wonders for plain fish fillets. This life-changing method is adopted from a former chef and current fishmonger, Mark Usewicz of Mermaid’s Garden in Brooklyn, who also teaches cooking classes in topics like “How to Cook Fish in a New York City Apartment.” The cooking time is so short that the smell — which, if your fish is fresh and not funky, should not be overpowering — will dissipate quickly. And in the meantime, you have an easy dinner of tender fish with a toothsome crust, anointed with nutty, lemony brown butter and perfumed with herbs.', '1593427112281_34.jpg', '1593427112281_34.jpg', 'Fixed', '2 hours', '', '200', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('8c3aaf49-faf2-4a6d-b0fa-30d339fab031', '53d5ef71-935a-43dc-93ca-0d072f60d4f1', 'Pakodas', 'Pakora, also called pikora, pakoda, pakodi, fakkura, bhajiya, bhajji, bhaji or ponako, is a fried snack, originating from the Indian subcontinent. It is a popular snack across the Indian subcontinent, where it is served in restaurants and sold by street vendors', '1593425696652_22.jpg', '1593425696652_22.jpg', 'Fixed', '30 Minuts', '', '100', '', '', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('8d8315e5-dc43-4f1d-a179-172e5193d207', '011b4cb4-7130-4557-ada7-7ff7c20ad23a', 'White sauce veg/non veg', 'A good supper is enough to turn a bad day into a good day, and this authentic Italian pasta has everything to revive your spirit. Loaded with the goodness of creamy cheese and aromatic herbs, this white sauce pasta can make for a soul-satiating delight. What makes this dish even more interesting is the amalgamation of cheese, veggies, exotic spices and herbs; which makes it a heavenly treat for the taste buds! So, delve in the goodness of true Italian flavours with this easy pasta recipe that you can quickly prepare without putting in many efforts. This easy-to-make pasta recipe can be prepared at home with some simple ingredients like boiled penne pasta, grated cheese cubes, thyme, frozen sweet corns, broccoli, milk, garlic cloves, butter, extra virgin oil so that it tastes truly Italian, some paprika, parsley for garnish.', '1590153507738_whitesouce.jpg', '1590153507738_whitesouce.jpg', 'Fixed', '30 min', '', '80', ' large capsicum ( green pepper) chopped ,corn flour powdered,cheese cubes grated', 'Red bell pepper ', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('9146066f-2930-487d-8ac1-aeeca3ebbbae', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Pesto White Bean Veggie Burger', 'Creamy white beans combine with pesto for these veggie burgers! They make a satisfying meal for vegetarians and meat-eaters alike. Top each patty with more pesto and dig in.', '1590147007450_18.jpg', '1590147007450_18.jpg', 'Fixed', '35', '', '45', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('94a91876-62f7-4dc9-9783-c610512ae691', 'f397c1e2-dde6-4282-b1f3-c58118176c99', 'Chicken Burrito', 'Biggest gripes about Burritos (other than how ridiculously gigantic they can be, far wider than any normal human mouth) is that by the time you get halfway through, you’ve got burrito explosion on your hands.\r\n\r\nRolling technique comes into play – the firmer it’s rolled, the better it holds together. The filling you choose also has an effect – Shredded Beef and Shredded Chicken holds together pretty well.', '1590150602222_31.jpg', '1590150602222_31.jpg', 'Fixed', '35', '', '50', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('9879f591-f887-40c6-8533-02da86d034da', 'c2723787-83e9-49f6-be4a-cda22fd515dc', 'Yeast Donut', 'Especially if it is a freshly homemade, fluffy yeast doughnut filled with raspberry jam and fresh cream? Not me! And I honestly have no desire for a store-bought, packaged, baked or donut shop doughnuts. They’re not nearly as enticing. This recipe is simply the best for sugared, cream or jam filled or glazed doughnuts.', '1590146123917_22.jpg', '1590146123917_22.jpg', 'Fixed', '2 hours', '', '200', 'Bread', 'Honey', NULL, NULL, NULL, 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1589976268),
('990936fb-d900-42c5-8204-1fb0badad0e4', 'fb0c6018-6296-470c-a72f-0600e84f1b2a', 'Veg Rolls', 'Heat a table spoon of vegetable oil in a frying pan. Fry the slices over a moderate heat for 14-16 mins, turning frequently. Ensure the slices are cooked thoroughly. All cooking appliances vary.', '1590158708495_4.jpg', '1590158708495_4.jpg', 'Fixed', '20 min', '', '85', 'Cornmeal', 'Onion', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('9b607faf-b099-48b7-8f39-2f8bfb5583a4', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Bean Soup', 'Meanwhile, in a bowl crumble the feta and mix with the garlic. Divide between the tortillas, spreading over one half of each, then sprinkle over a little pepper. Fold the uncovered side over and press down. Heat a dry frying pan and cook the tortillas on both sides for a couple of mins until the feta has melted and the tortillas are crisp.', '1593426903970_33.jpg', '1593426903971_33.jpg', 'Fixed', '30 Minuts', '', '100', '', '', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('9fae121b-5da9-4329-8a18-1a3858774953', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Chicken Tostada', 'Stock Photo - Crunchy chicken tostada stack. Tostadas are a type mexican food, made with crispy fried corn tortillas covered with layers of various ingredients such as chicken, guacamole, cheese, sour cream & salsa', '1593426610074_30.jpg', '1593426610074_30.jpg', 'Fixed', '30 Minuts', '', '50', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('a1425c85-6a38-45ba-a020-f803b06af595', 'add3f1b8-0e44-4bc0-8bb4-2236dad67537', 'Noodles', 'Crispy noodle salad with prawns and zuchini cold udon (thick Japanese wheat flour noodle) salad.\r\nThe first one should definitely come with a spice warning because it literally reduced me to tears. The spice level was so overwhelming it dominated all other flavours of the dish. The prawns were chewy – this dish was quite deceptive because it looked so innocent but exploded like a nuclear bomb.', '1590150610626_noodles.jpg', '1590150610626_noodles.jpg', 'Fixed', '30 min', '', '160', 'Tomato Paste', 'Butter', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('a176664c-34ff-4ac5-bc21-b8ae267e3fc2', 'b3dd5de8-3e9a-4762-a5a6-5dce585ac277', 'Tandoori Chicken', 'Tandoori chicken can be eaten as a starter or appetizer, or as a main course, often served with naan flatbread. It is also used as the base of numerous cream-based curries, such as butter chicken. Local varieties of tandoori chicken prepared from the rooyi posto in Bengal have appeared in local eateries, particularly those between Kolaghat and Kolkata.', '1590144190869_tandoori.jpg', '1590144190870_tandoori.jpg', 'Fixed', '1 Hour', '', '399', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('a3881bca-ba8d-4f1c-b8d8-260878f95bf3', 'b3dd5de8-3e9a-4762-a5a6-5dce585ac277', 'Butter Chicken', 'Butter Chicken is one of the most popular curries at any Indian restaurant around the world. Aromatic golden chicken pieces in an incredible creamy curry sauce, this Butter Chicken recipe is one of the best you will try! You will love how easy it is to make in the comfort of your own home.', '1590143382713_butter.jpg', '1590143382713_butter.jpg', 'Fixed', '45 Mins', '', '399', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('a4433204-ffca-47e1-a4ef-c9efe40f2b5d', 'a84333dd-3f40-46b7-a2f4-6ec19847b125', 'fg', 'wdwwaefdwadf sdmv,msdvjksdbnvjd vbjkvbd,mbvgjdebgvjkfjkdgbvkedbfjgbvdjkgdjkgbjkdfgm,d jkhgenm,gndogdfsdgvdfg', '1589527139788_Scooter Location.png', '1589527139788_Scooter Location.png', 'Hourly', '123', '', '12', '', '', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1589524462),
('a4f8656f-d60e-4d25-b4b9-77dfc3001490', 'f851d996-604f-4028-be00-26602fa5b7a5', 'Simple Thali', 'Indian simple platter / Thali having vegebles, dal makhani, flat bread or naan and rice served in a white plate\r\n', '1590142179906_simple.jpg', '1590142179906_simple.jpg', 'Fixed', '30', '', '49', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('a7832669-07a9-45d4-b166-b837f63d66f9', 'fb0c6018-6296-470c-a72f-0600e84f1b2a', 'Mutton Kathi Roll', 'Chicken Seekh Kabab is the special delight of minced chicken, poppy seeds and spices. The nice mixture of minced chicken is simply molded onto the skewers and cooked in the hot oil. Learn the easiest way to make tastiest chicken seekh kabab in your own kitchen. ', '1590148743366_5.jpg', '1590148743366_5.jpg', 'Fixed', '1 hr', '', '120', 'Chicken', 'Cream', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('a85a8aad-adf9-4d6b-8d74-e79a219b9e43', 'f851d996-604f-4028-be00-26602fa5b7a5', 'Special Thali', 'Indian special platter / Thali having 2 vegatables, dal makhani, flat bread or naan, rice and sweet dish served in a plate', '1590142329811_special.jpg', '1590142329811_special.jpg', 'Fixed', '40', '', '99', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('a9b86d74-ffff-4dcf-9d29-ae9755e0d804', 'aed1062c-2a45-45ba-90f5-92c2e8b71147', 'Delhi Biryani', 'The Delhi version of the biryani developed a unique local flavor as the Mughal kings shifted their political capital to the North Indian city of Delhi. Until the 1950s, most people cooked biryani in their home and rarely ate at eateries outside of their homes. Hence, restaurants primarily catered to travelers and merchants. Any region that saw more of these two classes of people nurtured more restaurants, and thus their own versions of biryani.', '1590144974102_delhi.jpg', '1590144974102_delhi.jpg', 'Fixed', '30 Mins', '', '349', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('ab220a50-4dc3-492d-bf4d-aaf14c10d854', '4d5f3ac9-f7ee-497e-81f9-9a39690ace1c', 'Mashroom', 'Mushroom is a simple, usually red sauce that can be composed from stock (beef is typical, but chicken may be used), roux (a mixture of equal parts butter and flour to thicken), and mushroom base.\r\n\r\nIt can also be enhanced with mace, to add a delicate nutmeg flavor.', '1590146325554_mashroom.JPG', '1590146325555_mashroom.JPG', 'Fixed', '30 Mins', '', '199', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('ab6c2a57-a4f0-4705-ac3f-c0267c41c957', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Fried Taco ', 'Have you ever been to Jack In The Box? They have a cult following for their tacos. Well, my friends. These are a great copycat of Jack In The Box’s crispy, fried tacos. But, these are totally better. Jack In The Box tacos use half meat and half not-meat. The not-meat is some kind of textured vegetable protein and, well, ew. No. Meat for life, my friends. Meat for life. Unless you’re a vegetarian, in which case I would like to say oops, sorry. Enjoy your tofu!', '1593427370453_37.jpg', '1593427370453_37.jpg', 'Fixed', '2 hours', '', '100', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('afd512ec-e4f1-44f2-987e-27e785bc1247', 'a0eab67d-b3e4-4a18-98c5-3c170493d583', 'Bugar', 'We want to showcase traditional food with a twist; therefore the finalists of this year have a fantastic surprise awaiting them.\r\n‘Adding a few curve balls and twists to heat up things in the kitchen, chefs will be presented with mystery food baskets and a few surprise detours.\r\n‘This year our host is 1KZN TV presenter, Dumi of the reality show, Siyapheka which features home made meals, from traditional to modern dishes and she will be interacting with the finalists throughout the contest.', '1590149273603_Junk-food.jpg', '1590149273603_Junk-food.jpg', 'Fixed', '30 min', '', '100', 'Better Bread,Spinach', 'Grainiac', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('b407cbea-41ab-429a-ad66-4aedb494b768', '53d5ef71-935a-43dc-93ca-0d072f60d4f1', 'Paneer Samosa', 'Fried or baked pastry with a savoury filling, such as spiced potatoes, onions, peas, cheese, beef and other meats, or lentils. It may take different forms, including triangular, cone, or half-moon shapes, depending on the region.[2][3][4] The Indian style, often accompanied by a chutney, is probably the most widely known of a broad family of recipes from Africa to China, which have origins in medieval times or earlier.[2] Samosas are a popular entrée, appetizer, or snack in the local cuisines of the Indian subcontinent, Western Asia, Southeast Asia, the Mediterranean, and Africa. Due to emigration and cultural diffusion from these areas, samosas today are often prepared in other regions.', '1593425968400_24.jpg', '1593425968400_24.jpg', 'Fixed', '30 Minuts', '', '50', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('b4294197-59ca-4a1d-a7ad-cd2bb78daf19', '431ba68e-247d-4be3-a1dd-1aa69fb08f9f', 'Choclate Roll', 'Microwave 3 oz. chocolate and butter in medium microwaveable bowl on High 1-1/2 to 2 min. or until butter is melted. Stir until chocolate is completely melted. Add granulated sugar; mix well. Beat eggs in large bowl with mixer on high speed 3 min. or until thickened. Blend in chocolate mixture. Add 1/4 cup flour and baking soda; beat just until blended. Add remaining flour alternately with water, beating well after each addition. Spread evenly into prepared pan.', '1590145594483_19.jpg', '1590145594484_19.jpg', 'Fixed', '30 Minuts', '', '60', 'Choclate', 'Cream', NULL, NULL, NULL, 1, 'd8af6241-b9a4-4b73-a714-113e38b9cdeb', 1589976268),
('bf2bafe1-889b-4b18-b183-8424dda8334b', 'aed1062c-2a45-45ba-90f5-92c2e8b71147', 'Veg Biryani', 'Biryani is a mixed rice dish with its origins among the Muslims of the Indian subcontinent.[1][2][3] It can be compared to mixing a curry, later combining it with semi-cooked rice separately. This dish is especially popular throughout the Indian subcontinent, as well as among its diaspora.', '1590145257204_veg.jpg', '1590145257204_veg.jpg', 'Fixed', '30 Mins', '', '249', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('bfc16a46-76f0-42d5-8f7e-7d0e5fc21ac7', 'f397c1e2-dde6-4282-b1f3-c58118176c99', 'Egg Burrito', 'Filled with spicy sausage, smoky scrambled eggs, cheese, and a bright, fresh avocado-tomato salsa, these breakfast burritos are not only easy to make but also delicious any time of day. We especially love them for “brinner.” Heads up: the avocado-tomato salsa is spicy. If you’re making these for kids, consider omitting or reducing the jalapeño pepper .', '1590150712570_32.jpg', '1590150712570_32.jpg', 'Fixed', '25', '', '60', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('c7d0bd46-680a-4662-8136-9e5dce976371', 'f851d996-604f-4028-be00-26602fa5b7a5', 'Chicken Thali', 'Indian Chicken platter / Thali having Butter chicken butter masala, kadahi chicken, flat bread or naan and gravy served in a white plate', '1590141814904_chicken.jpg', '1590141814905_chicken.jpg', 'Fixed', '45', '', '199', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('c9ad225b-c2c4-4b3e-ad3b-8425101d0c27', 'e70158bb-c576-4135-89f2-f007a943a58f', 'Sweet Corn Soup', 'Soup is a primarily liquid food, generally served warm or hot, that is made by combining ingredients of meat or vegetables with stock, or water. Hot soups are additionally characterized by boiling solid ingredients in liquids in a pot until the flavors are extracted, forming a broth', '1587540744343_corn-soup-recipe-4.jpg', '1587540744344_corn-soup-recipe-4.jpg', 'fixed', '15 min', '', '200', 'ketchup pouch', 'cutlery', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1587537754),
('d6846daa-fe74-4394-80e9-d8d30a67848d', '96c7b7a2-721b-4428-83cf-4bbea80c4278', 'Blueberry Muffins', 'The Best Blueberry Muffins are moist, slightly dense, and LOADED with juicy blueberries! Use fresh or frozen blueberries! These are delicious for breakfast or as an afternoon snack!\r\n\r\nBlueberry muffins are made with plenty of butter, sour cream, and a dash of milk, so they’re super moist & flavorful! A little dash of nutmeg and a glug of vanilla will give them that classic bakery-style taste we all know and love. And 2 cups of blueberries ensure you’ll find juicy blueberries in every bite!', '1590152722406_41.jpg', '1590152722406_41.jpg', 'Fixed', '40', '', '60', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('e18d6a37-0dfe-4637-a3f3-9d134b1a75f7', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Mexican Pizza', 'Okay, fine. We\'re using the term pizza VERY loosely. We say, if Taco Bell does it, we can, too. This easy dinner comes together superfast, and it\'s got all the Tex-Mex flavors we know and love. Just because it\'s not authentic doesn\'t mean it\'s not delicious!\r\n\r\nLooking for an easy version for the kids? These Taco Pizzas come together in no time at all, and kids love personalizing their own!', '1593427483317_39.jpg', '1593427483317_39.jpg', 'Fixed', '2 hours', '', '200', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('e62ec4d0-b6f2-45ad-80df-fcdd1a116679', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', ' Veeg Pumpkin Seed Veggie Burger', 'Pumpkin Seed Veggie Burgers is a delicious, juicy, classic burger recipe that brings a boatload of delicious flavor and nutrients to your plate.  But wait, there’s more! (Wink-wink.)\r\n\r\nAdditionally, it’s a burger, so, in essence, it’s a sandwich, and we all know how fabulously satisfying an excellent tasting sandwich can be!\r\nwe think you will adore the way these plant-based and gluten-free Pumpkin Seed Veggie Burgers taste.', '1590147176239_19.jpg', '1590147176239_19.jpg', 'Fixed', '25', '', '50', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('e93b76be-eb9e-4833-88c5-97840230e44a', '0536d27b-3082-4660-b667-ca662f075565', 'Cream chicken sandwich', 'Chicken Sandwitch is giving you the freshness of bread and meaty flavour of fresh chicken with lots of yummy Cheese.', '1590148637220_25.jpg', '1590148637220_25.jpg', 'Fixed', '25', '', '30', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268),
('e9eb4a3a-0194-49e0-9b3b-3baf0b630794', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Nachos', 'These classic Tex-Mex nachos are loaded to the MAX! Avoid soggy nachos by briefly baking them before topping with cheese, seasoned beef, refried beans, guacamole, and salsa. They\'re a great snack, party appetizer, or even casual weeknight dinner.', '1593426836250_32.jpg', '1593426836250_32.jpg', 'Fixed', '30 Minuts', '', '50', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('efa95f05-7b93-49ff-ad39-dab881d96cce', '429b374f-f0ca-4dcd-ab69-2f94030fa25e', 'Vegan Mushroom Bean Burger', 'Mushrooms are surprisingly similar in taste and texture to meat when cooked, so they are the perfect ingredient for vegetarian veggie burgers.\r\n\r\nThis vegetarian, vegan, and gluten-free mushroom burger recipe may just surprise you with how tasty it is. While mushrooms provide plenty of flavor and texture, the addition of pinto beans makes this veggie burger recipe high in fiber and protein too. There\'s not much to them, other than that! Just mash everything up together, form into patties, heat and serve!', '1590146599106_16.jpeg', '1590146599106_16.jpeg', 'Fixed', '40', '', '69', '', '', NULL, NULL, NULL, 1, '8a1e0b39-3e1e-48ff-8245-5e5ef578c66c', 1589976268);
INSERT INTO `services` (`id`, `categoryId`, `name`, `description`, `icon`, `thumbnail`, `type`, `duration`, `turnaroundTime`, `price`, `includedServices`, `excludedServices`, `child_service`, `connected_service`, `orderby`, `status`, `companyId`, `createdAt`) VALUES
('f9a7c50b-6930-4dfa-a24a-9c7cf138e0b8', 'f3b07174-10dc-44b0-9291-b187bf3703fd', 'Faux-Fried Chicken', 'Preheat the oven to 375 degrees.\r\nCombine the panko, taco seasoning and salt in a shallow dish.\r\n\r\nRemove any fat from the chicken breasts. Pull the tenderloin away from the breast; it is on the under side of the breast. Slice the remaining breast into one inch strips. You should get 4 strips from each breast. Spray each strip with nonstick cooking spray, then dip into the bread crumbs to coat the entire surface. Transfer the chicken to a baking sheet. Bake for 20 minutes or until the meat reaches 165 degrees. Serve with salsa.\r\n\r\nEach serving: 3 ounces chicken and 1/4 cup salsa', '1593426725842_31.jpg', '1593426725842_31.jpg', 'Fixed', '2 hours', '', '200', 'Salads,Chutney,Red-Peppar', 'Packing Wraps', NULL, NULL, NULL, 1, '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 1592804755),
('fa625b1a-3cbb-4adb-b0ef-b98e7860f3a4', 'b3dd5de8-3e9a-4762-a5a6-5dce585ac277', 'Lemon Chicken', 'Blend the lemon juice, garlic, salt, pepper, basil and cayenne pepper to make the marinade.\r\nPut the chicken breasts in a deep pan and pour the marinade over it\r\nCover and sit all night. In the morning, flip the chicken to the other side.\r\nAt noon drain the liquid from the pan and cook in a preheated oven at 375°F (190°C) for 10-15 minutes (not to cook, only to brown)\r\nOnce finished, pour the marinade over the browned chicken, tightly cover the pan with tin foil (don\'t burn your fingers) and put back in the oven. Set the oven to 250°F (120°C).', '1590143989253_lemon.jpg', '1590143989253_lemon.jpg', 'Fixed', '30 Mins', '', '250', '', '', NULL, NULL, NULL, 1, '6b9a100c-f8ca-484a-a29d-ecb4bd5e7b00', 1589976268),
('fecf2c69-78dc-4e79-af8a-62da543a2529', 'add3f1b8-0e44-4bc0-8bb4-2236dad67537', 'Veg Noodles', 'Noodles and pasta differ primarily because of their ingredients and the type of processing involved, Kaminska says. Noodles are usually made with flour milled from common wheat. Pasta is processed from durum semolina, which is coarser than typical flour. However, that difference is not always so cut and dried', '1590160828105_noodles.jpg', '1590160828105_noodles.jpg', 'Fixed', '20 min', '', '120', 'Cream', 'Cornmeal', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268),
('ff9b0eb0-1920-4861-a74e-61b5bb93b71e', '81f7f4dd-8707-4ccf-a0d5-d820e39de638', 'Paccheri', 'When eaten in moderation, pasta can be part of a healthy diet. Whole-grain pasta may be a better choice for many, as it is lower in calories and carbs but higher in fiber and nutrients. ... Calories can stack up fast when adding high-fat, high-calorie toppings like cream-based sauces and cheeses', '1590153013605_pasta.jpg', '1590153013607_pasta.jpg', 'Hourly', '1 hr', '', '160', 'Dough,Cream', 'Spinach', NULL, NULL, NULL, 1, '8a79926a-92fc-4cf7-a349-f6f80e46658d', 1589976268);

-- --------------------------------------------------------

--
-- Table structure for table `serviceType`
--

CREATE TABLE `serviceType` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(100) DEFAULT '',
  `type` varchar(30) NOT NULL DEFAULT '',
  `duration` varchar(100) NOT NULL,
  `turnaroundTime` varchar(100) NOT NULL,
  `includedServices` text NOT NULL,
  `excludedServices` text NOT NULL,
  `price` varchar(10) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` int(11) NOT NULL DEFAULT '1585550141'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `serviceType`
--

INSERT INTO `serviceType` (`id`, `name`, `type`, `duration`, `turnaroundTime`, `includedServices`, `excludedServices`, `price`, `status`, `created_at`) VALUES
('25cbf58b-46ba-4ba2-b25d-8f8f653e9f10', 'Installation', 'Per Piece', '3 hours', '2 hours', 'Repairing of connectors,Cleaning of camera, Cleaning of DVD Units ', 'cost of parts of replaced', '100', 1, 1585139449),
('25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'Repairing', 'Hourly', '3 hours', '2 hours', 'Repairing of connectors,Cleaning of camera, Cleaning of DVD Units ', 'cost of parts of replaced', '150', 1, 1585139449),
('89327acd-0ab8-441e-8af2-b1e8c84ea55c', 'Full Service', 'Fixed', '3 hours', '2 hours', '', '', '600', 1, 1585139449);

-- --------------------------------------------------------

--
-- Table structure for table `suborders`
--

CREATE TABLE `suborders` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `serviceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quantity` varchar(15) NOT NULL,
  `rating` varchar(11) NOT NULL DEFAULT '0',
  `review` text NOT NULL,
  `userId` varchar(50) NOT NULL,
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` int(11) NOT NULL DEFAULT '1586494521'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suborders`
--

INSERT INTO `suborders` (`id`, `serviceId`, `quantity`, `rating`, `review`, `userId`, `orderId`, `createdAt`) VALUES
('465fd744-4b20-47da-a4d4-c35151facaec', '52e6c1b4-6da6-480a-a72a-9b7ca139da8d', '1', '0', '', '86091af5-38b8-4355-9257-17774e2a98f1', 'f5c036de-1d45-4630-99b2-3b78be732f01', 1593580266),
('49b0722b-bb7c-473c-853c-892172da1244', '8015163e-f39d-4566-936a-256623edc39e', '3', '0', '', '86091af5-38b8-4355-9257-17774e2a98f1', 'f5c036de-1d45-4630-99b2-3b78be732f01', 1593580266),
('578d976b-8631-4611-b6b7-380dc7158adb', '48d4bffa-e7b4-44bc-8869-55b66976b186', '2', '0', '', '86091af5-38b8-4355-9257-17774e2a98f1', 'f5c036de-1d45-4630-99b2-3b78be732f01', 1593580266),
('7136e2a1-5205-4d54-a786-037a8d037872', '2464e00b-ba4a-41ec-a0b8-f2f99fc4b99f', '1', '0', '', 'd85d4a1f-20d1-47fa-b0a0-525cb3444ae5', 'b0deaa97-f116-48e2-96cf-e0cea60ef294', 1593580266),
('787c7bdf-f5f8-49f7-80d9-899fb85e0c71', '5069e8f6-0032-46d4-96d4-f3ab356eb348', '1', '0', '', 'd85d4a1f-20d1-47fa-b0a0-525cb3444ae5', 'b0deaa97-f116-48e2-96cf-e0cea60ef294', 1593580266),
('8526db05-2eed-4e22-b285-1d4476ce0723', '8a92ee3d-72c6-44cf-b981-803d7945a381', '3', '0', '', '86091af5-38b8-4355-9257-17774e2a98f1', '4d7fc723-5a2e-4b40-bdc9-2abe184afd18', 1593432674),
('bfbe3513-2770-478c-9fea-e44ac25afd3e', '5069e8f6-0032-46d4-96d4-f3ab356eb348', '2', '0', '', '86091af5-38b8-4355-9257-17774e2a98f1', 'd9b4014e-56d3-41ab-9b05-adf842172c7e', 1592804755),
('c3b2642a-ead4-4b4d-8be5-0602e9f3cdcc', '8015163e-f39d-4566-936a-256623edc39e', '2', '0', '', '86091af5-38b8-4355-9257-17774e2a98f1', 'ca01395f-9513-4902-a5d3-b7442d32b334', 1592804755),
('e8e2dad0-030b-49d2-b382-df2a10af5767', '85ed1f53-4e56-4c88-b0a9-b44b02e95722', '1', '0', '', '86091af5-38b8-4355-9257-17774e2a98f1', 'f5c036de-1d45-4630-99b2-3b78be732f01', 1593580266),
('f2918d85-a652-4f82-b391-47762f50fc46', '8a92ee3d-72c6-44cf-b981-803d7945a381', '3', '0', '', '86091af5-38b8-4355-9257-17774e2a98f1', 'b438760a-8b01-4920-9cc8-a57f6ced0fbd', 1593432810);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstName` varchar(60) DEFAULT '',
  `lastName` varchar(60) DEFAULT '',
  `email` varchar(60) DEFAULT '',
  `phoneNumber` varchar(30) NOT NULL,
  `countryCode` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL DEFAULT '',
  `address` varchar(500) DEFAULT NULL,
  `image` text,
  `deviceToken` varchar(255) NOT NULL DEFAULT '',
  `userType` varchar(255) NOT NULL DEFAULT '1',
  `sessionToken` varchar(500) NOT NULL DEFAULT '',
  `moduleType` varchar(255) NOT NULL DEFAULT '',
  `platform` varchar(255) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `companyId`, `firstName`, `lastName`, `email`, `phoneNumber`, `countryCode`, `password`, `address`, `image`, `deviceToken`, `userType`, `sessionToken`, `moduleType`, `platform`, `status`, `createdAt`, `updatedAt`) VALUES
('0243ed39-8e8b-460a-833c-2e619146f94a', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '', '', '', '9865470898', '+254', '', NULL, '', 'cQ_zkPnVYIM:APA91bEymBW6W9Wyg_yZi51p0baFKMwA070iYhK03erG5T8o0y61VUj5H7KUHVPB0Al6g5BCoVDkklkBGvkuIL-W2kIpb19xjSVEfpuzjor0WmKMbqSoP1_FQZOZUZSRGyzghKzxZhsK', '2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk4NjU0NzA4OTgiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsInBhcmVudENvbXBhbnkiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTMiLCJjb3VudHJ5Q29kZSI6IisyNTQiLCJ1c2VyVHlwZSI6MSwiaWQiOiIwMjQzZWQzOS04ZThiLTQ2MGEtODMzYy0yZTYxOTE0NmY5NGEiLCJpYXQiOjE1OTAxNTQ4ODUsImV4cCI6MTU5MDc1OTY4NX0.Dqw6yOsrzX2nZgmxirmYwL7RySF8aQL6kQsKqZlVVlQ', '', 'ios', 1, '2020-05-20 12:04:28', '2020-05-20 12:04:28'),
('076d7903-148c-470b-a201-a9127a91998a', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '', '', '', '9992364445', '+1', '', NULL, '', '', '2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5OTIzNjQ0NDUiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiKzEiLCJ1c2VyVHlwZSI6MSwicGFyZW50Q29tcGFueSI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImlkIjoiMDc2ZDc5MDMtMTQ4Yy00NzBiLWEyMDEtYTkxMjdhOTE5OThhIiwiaWF0IjoxNTkwMDY5NzE1LCJleHAiOjE1OTAyNDI1MTV9.oOkVwhMO3PnLLOR2FQfuSjKvTymibIB8T-2Eq84THUc', '', 'ios', 1, '2020-05-20 12:04:28', '2020-05-20 12:04:28'),
('07f03017-c77e-4db5-ad1a-b6c9fc06715b', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '', '', '', '9992364446', '+91', '', NULL, '', '', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5OTIzNjQ0NDYiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsImlkIjoiMDdmMDMwMTctYzc3ZS00ZGI1LWFkMWEtYjZjOWZjMDY3MTViIiwiaWF0IjoxNTg4OTQ4MTM5LCJleHAiOjE1ODk1NTI5Mzl9.Vvwc3rBsq_kZybFdAh7SQE_lHBXuMGgKNgRlDxQDr3k', '', '', 1, '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('113ec97e-e5cc-4f14-a42c-8dbff291cf19', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '', '', '', '999236444', '+91', '', NULL, '', '', '2', '', '', 'ios', 1, '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('117b7df6-c28c-42f3-8e01-c2ea61f7a24d', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '', '', '', '953060006', '+91', '', NULL, '', '', '1', '', '', 'android', 1, '2020-05-20 12:04:28', '2020-05-20 12:04:28'),
('33023b2f-2efd-4531-944a-fa1dbc09c906', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '', '', '', '1234567860', '+91', '', NULL, '', '', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjEyMzQ1Njc4NjAiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsImlkIjoiMzMwMjNiMmYtMmVmZC00NTMxLTk0NGEtZmExZGJjMDljOTA2IiwiaWF0IjoxNTg4OTQ4MTUyLCJleHAiOjE1ODk1NTI5NTJ9.Nx4RewT6jwyFEndVRFt5x1G1Zn7Fz8WNokPQjwWrD3k', '', '', 1, '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('382d0734-26a2-4d4c-8352-dc1939a020d8', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '', '', '', '999236445', '+91', '', NULL, '', '', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5OTIzNjQ0NSIsIm15Q29tcGFueUlkIjoiMjVjYmY1OGItNDZiYS00YmEyLWIyNWQtOGY4ZjY1M2U5ZjExIiwicGFyZW50Q29tcGFueSI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsImlkIjoiMzgyZDA3MzQtMjZhMi00ZDRjLTgzNTItZGMxOTM5YTAyMGQ4IiwiaWF0IjoxNTkwMDQ5MTk3LCJleHAiOjE1OTA2NTM5OTd9.0IPZWCacF3CTieTXdXoNHSWxDSwadzCepXfZ8gW5Uqg', '', '', 1, '2020-05-20 12:04:28', '2020-05-20 12:04:28'),
('3a90b50f-6a0c-4154-80bc-42e717bc3b65', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'kamal Thakur', '', 'kamal@yopmail.com', '9876589632', '91', '', 'Sector 19, Chandigarh', '1586772881045_profile_user.jpg', '', '1', '', '', 'web', 1, '2020-04-12 00:00:00', '0000-00-00 00:00:00'),
('43c9d87b-626d-40f9-8b9f-751e196c8921', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '', '', '', '1234567890', '+91', '', NULL, '', 'haiascfsfisdf', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjEyMzQ1Njc4OTAiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsImlkIjoiNDNjOWQ4N2ItNjI2ZC00MGY5LThiOWYtNzUxZTE5NmM4OTIxIiwiaWF0IjoxNTg5MTA5Njc3LCJleHAiOjE1ODk3MTQ0Nzd9.gUQ-IGpITWBLqtDpambTlwvKq06vPXGP6MHVXSlyMYw', '', 'haiascfsfisdf', 1, '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('46a96d58-6d6f-47f0-b461-821f9c5e0344', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'Robert', '', 'Robert@yopmail.com', '9865745236', '91', '', 'Phase 7, mohali', '1586771079340_uuuusserrrr.jpg', '', '1', '', '', 'web', 1, '2020-03-15 00:00:00', '0000-00-00 00:00:00'),
('4acb62d8-1892-488e-a912-873e158ee37b', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '', '', '', '9530606060', '+91', '', NULL, '', 'sd', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk1MzA2MDYwNjAiLCJjb21wYW55SWQiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTEiLCJjb3VudHJ5Q29kZSI6Iis5MSIsInVzZXJUeXBlIjoxLCJpZCI6IjRhY2I2MmQ4LTE4OTItNDg4ZS1hOTEyLTg3M2UxNThlZTM3YiIsImlhdCI6MTU4NzM1OTgzMCwiZXhwIjoxNTg3OTY0NjMwfQ.Fkj9Hv9N5_pYsOZ6m6RgvORNUfT0VOJOEfOEBiJ_EJU', '', 'sd', 1, '2020-04-03 00:00:00', '0000-00-00 00:00:00'),
('59707963-7468-4062-a968-c52cb2be3ca1', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '', '', '', '9215727143', '+91', '', NULL, '', 'cVbXll52ldU:APA91bFD4b0rApa3N1VBrYobOvxiZc13XmPGOdqqAw4kBKSBUOcMSC1GqioV-CO1vL9G75r-54_iDFy6u_6pPPgOcRXzBThuDogPFoliABqBfk7DyXn0tso3XpWIFX8SGLpG8kUjTFCN', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjkyMTU3MjcxNDMiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsInBhcmVudENvbXBhbnkiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTMiLCJjb3VudHJ5Q29kZSI6Iis5MSIsInVzZXJUeXBlIjoxLCJpZCI6IjU5NzA3OTYzLTc0NjgtNDA2Mi1hOTY4LWM1MmNiMmJlM2NhMSIsImlhdCI6MTU5MDQxNjA2NCwiZXhwIjoxNTkxMDIwODY0fQ.tYIoomGqsKlbbqdYnI4hAU51bDa8cEOozP5bCWTagHA', '', 'cVbXll52ldU:APA91bFD4b0rApa3N1VBrYobOvxiZc13XmPGOdqqAw4kBKSBUOcMSC1GqioV-CO1vL9G75r-54_iDFy6u_6pPPgOcRXzBThuDogPFoliABqBfk7DyXn0tso3XpWIFX8SGLpG8kUjTFCN', 1, '2020-05-24 08:39:29', '2020-05-24 08:39:29'),
('805101d1-cf98-4edb-932e-372935cc7cac', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'Saira', '', 'admin@gmail.com', '1234567891', '91', '', 'Sector 15, Chandigarh', '1586611552524_preview.jpg', '', '1', '', '', 'web', 1, '2020-02-04 00:00:00', '0000-00-00 00:00:00'),
('834dd5fa-886c-45e6-9cce-06b5f3723067', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'User2', '', 'new@gmail.com', '8968214346', '91', '', 'Chandigarh', '1586585395845_Untitled.png', '06492c71f13e81fd', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijg5NjgyMTQzNDYiLCJjb21wYW55SWQiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTEiLCJjb3VudHJ5Q29kZSI6IjkxIiwidXNlclR5cGUiOjEsImlkIjoiODM0ZGQ1ZmEtODg2Yy00NWU2LTljY2UtMDZiNWYzNzIzMDY3IiwiaWF0IjoxNTg2MzI1NDUzLCJleHAiOjE1ODY5MzAyNTN9.wRhHKXlW0Z2H6cxyUqi6yf9zv-7PxRUG2SWaU7CWb74', '', '06492c71f13e81fd', 1, '2020-04-12 00:00:00', '0000-00-00 00:00:00'),
('86091af5-38b8-4355-9257-17774e2a98f1', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'Apple ', 'Singh', 'sharmamohit@seasia.in', '9992364445', '+91', '', 'Mohali', '1589807535390_', 'sd', '2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5OTIzNjQ0NDUiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsInBhcmVudENvbXBhbnkiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTMiLCJpZCI6Ijg2MDkxYWY1LTM4YjgtNDM1NS05MjU3LTE3Nzc0ZTJhOThmMSIsImlhdCI6MTU5NDE5MzM4NiwiZXhwIjoxNTk0MzY2MTg2fQ.f-Zsl59zTcMVo0dRk0DOQOY30RQYNerZZkPQjvb_E2M', '', 'android', 1, '2020-02-11 00:00:00', '0000-00-00 00:00:00'),
('87af7745-6514-41f5-b849-7255e06170fb', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'Akash', 'Gharu', 'gharu86103@gmail.com', '9530606006', '+91', '', '', '1587130850776_Screenshot_20200317-184946_Package installer.jpg', 'efJ4Oh0Ob38:APA91bHJw3ZCKz7oV8uSs3QP-atKdTnKiO5CLdhhQDE-nsRHJUB11Iet_1330t7KR3zlnHqmUjUjb1hkpfEhLCaoFa3HFG0l8QEKT5eXHSKUshfJJNtcO9cXJlxiOEHZiKaZcCLihmP6', '3', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk1MzA2MDYwMDYiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsInBhcmVudENvbXBhbnkiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTMiLCJpZCI6Ijg3YWY3NzQ1LTY1MTQtNDFmNS1iODQ5LTcyNTVlMDYxNzBmYiIsImlhdCI6MTU5MDQwNjc3MCwiZXhwIjoxNTkwNTc5NTcwfQ.4wpaXoMbtLGU-b9-QHhg07-KOb8FB5C2kLn-eORrPN4', '', 'android', 1, '2020-04-05 00:00:00', '0000-00-00 00:00:00'),
('87c6c12e-fc25-42c1-9e55-fde92b7410dd', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'Alizba', '', 'alizba@yopmail.com', '1234567890', '91', '', '#House No  45   , United States America', '1586783665951_download.jpg', 'haiascfsfisdf', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjEyMzQ1Njc4OTAiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsImNvdW50cnlDb2RlIjoiOTEiLCJ1c2VyVHlwZSI6MSwicGFyZW50Q29tcGFueSI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsImlkIjoiODdjNmMxMmUtZmMyNS00MmMxLTllNTUtZmRlOTJiNzQxMGRkIiwiaWF0IjoxNTkwMjk3NDg5LCJleHAiOjE1OTA0NzAyODl9.r-vRyP5YntApQ3NOpb7UyvyNekszQvDFCbIcDElZA3E', '', 'android', 1, '2020-04-19 00:00:00', '0000-00-00 00:00:00'),
('90a0946d-61f7-42a8-9d50-4abf55f494ac', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'Navdeep', 'Singh', 'ns@seasia.in', '9465340220', '91', '', 'Chandigarh', '1586780576353_Android_7.png', '06492c71f13e81fd', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk0NjUzNDAyMjAiLCJjb21wYW55SWQiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTEiLCJjb3VudHJ5Q29kZSI6IjkxIiwidHlwZSI6MSwiaWQiOiI5MGEwOTQ2ZC02MWY3LTQyYTgtOWQ1MC00YWJmNTVmNDk0YWMiLCJpYXQiOjE1ODY5MjEyMTMsImV4cCI6MTU4NzA5NDAxM30.Z04KTOgK_KbJ9Yb_CRCpj3wDv2V1AQyP2-gzcPDpI9U', '', 'android', 1, '2020-04-05 00:00:00', '0000-00-00 00:00:00'),
('94f6c7a9-eb5d-46bf-8e76-4878347b7f8d', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '', '', '', '9199923644', '+91', '', NULL, '', 'dUce5VSvarQ:APA91bFlBX2SEEzRfdYz5mj1rIEZqsGOjHO01zSbZX0D0RxcuImBn6Meq2IApKc2Mt27eDmZOFPqqUQ5G1r_TJotG-bksFou6iL_hb8W7s2MOkGlCs3WIj-T3QAwu19lUoy0BXIF0NKA', '2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjkxOTk5MjM2NDQiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsInBhcmVudENvbXBhbnkiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTMiLCJjb3VudHJ5Q29kZSI6Iis5MSIsInVzZXJUeXBlIjoxLCJpZCI6Ijk0ZjZjN2E5LWViNWQtNDZiZi04ZTc2LTQ4NzgzNDdiN2Y4ZCIsImlhdCI6MTU5MDM5ODk5NiwiZXhwIjoxNTkxMDAzNzk2fQ.wRJno5Msgo8itaEugmC3t9yNmlEB-F_pLhVBp6g7kF4', '', 'dUce5VSvarQ:APA91bFlBX2SEEzRfdYz5mj1rIEZqsGOjHO01zSbZX0D0RxcuImBn6Meq2IApKc2Mt27eDmZOFPqqUQ5G1r_TJotG-bksFou6iL_hb8W7s2MOkGlCs3WIj-T3QAwu19lUoy0BXIF0NKA', 1, '2020-05-24 08:39:29', '2020-05-24 08:39:29'),
('b5e5f5de-fb2c-47a2-9fcc-a8c8aad33447', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '', '', '', '9888212537', '+91', '', NULL, '', 'sd', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk4ODgyMTI1MzciLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsInBhcmVudENvbXBhbnkiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTMiLCJpZCI6ImI1ZTVmNWRlLWZiMmMtNDdhMi05ZmNjLWE4YzhhYWQzMzQ0NyIsImlhdCI6MTU5NDE5NDI2OSwiZXhwIjoxNTk0MzY3MDY5fQ.uRhx-kOQN17nxElT3QF5-yWCozdAgFyf18laJZxTmCw', '', 'android', 1, '2020-05-24 08:39:29', '2020-05-24 08:39:29'),
('bf4a262b-22b2-4363-95d8-5d1fc7c3748a', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'Newuser', '', 'newuser@gmail.com', '99141993345', '+1', '', '', '', '', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5MTQxOTkzMzQ1IiwiY29tcGFueUlkIjoiMjVjYmY1OGItNDZiYS00YmEyLWIyNWQtOGY4ZjY1M2U5ZjExIiwiY291bnRyeUNvZGUiOiIrMSIsInR5cGUiOjEsImlkIjoiYmY0YTI2MmItMjJiMi00MzYzLTk1ZDgtNWQxZmM3YzM3NDhhIiwiaWF0IjoxNTg3NjM2MzExLCJleHAiOjE1ODc4MDkxMTF9.Av7cdUMV4q3TGBuI8-v4x6onlVwQhWc8K9sTnqscJaw', '', 'ios', 1, '2020-04-20 00:00:00', '0000-00-00 00:00:00'),
('c73a968b-783b-4360-a523-7c7f4138ddc9', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '', '', '', '9465340220', '+91', '', NULL, '', '', '1', '', '', 'android', 1, '2020-05-24 08:39:29', '2020-05-24 08:39:29'),
('ceaf98ae-2ad0-4ce4-af37-1e168ff7cced', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'Naval', 'Kaye', 'n@gmail.com', '99141993345', '91', '', '13,ModelTown Jal', '1586773663185_userrrr.jpg', '', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5MTQxOTkzMzQ1IiwiY29tcGFueUlkIjoiMjVjYmY1OGItNDZiYS00YmEyLWIyNWQtOGY4ZjY1M2U5ZjExIiwiY291bnRyeUNvZGUiOiIrOTEiLCJ0eXBlIjoxLCJpZCI6ImNlYWY5OGFlLTJhZDAtNGNlNC1hZjM3LTFlMTY4ZmY3Y2NlZCIsImlhdCI6MTU4NjE0NDA5NCwiZXhwIjoxNTg2MzE2ODk0fQ.PNxCc4VafZvm7GVM5U6KZDhzE1eUUjg67mF9ysOhJGc', '', 'ios', 1, '2020-04-13 00:00:00', '0000-00-00 00:00:00'),
('d85d4a1f-20d1-47fa-b0a0-525cb3444ae5', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', '', '', '', '8699204304', '+91', '', NULL, '', 'sd', '2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijg2OTkyMDQzMDQiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsInBhcmVudENvbXBhbnkiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTEiLCJpZCI6ImQ4NWQ0YTFmLTIwZDEtNDdmYS1iMGEwLTUyNWNiMzQ0NGFlNSIsImlhdCI6MTU5NDE5MzA2MywiZXhwIjoxNTk0MzY1ODYzfQ.PDERlxgaF9AXG9EDJ7s5t2ixc9sBGTkI2ScGd36X09M', '', 'android', 1, '2020-05-08 13:16:19', '2020-05-08 13:16:19'),
('e7f68216-fcc4-46fa-b5d9-ff7a68c31eee', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'naval', 'uppal', 'naval@gmail.com', '99141993345', '+91', '', 'Mohali,Phase 5', '1586774449111_', '', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk5MTQxOTkzMzQ1IiwiY29tcGFueUlkIjoiMjVjYmY1OGItNDZiYS00YmEyLWIyNWQtOGY4ZjY1M2U5ZjExIiwiY291bnRyeUNvZGUiOiIrOTEiLCJ0eXBlIjoxLCJpZCI6ImU3ZjY4MjE2LWZjYzQtNDZmYS1iNWQ5LWZmN2E2OGMzMWVlZSIsImlhdCI6MTU4NzYzNjQyNSwiZXhwIjoxNTg3ODA5MjI1fQ.KHFiM0l3yc_2B3xpHt7LkTBNoKYQ_HwxM997r2Sdw5Y', '', 'ios', 1, '2020-04-15 00:00:00', '0000-00-00 00:00:00'),
('e8f1c089-1665-4e6e-8069-f1f0b22aadff', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', '', '', '', '9815974383', '+91', '', NULL, '', 'c3Q-qRx2X6Q:APA91bHhdk4FzN3Fv7x5PmiLw2AULMPphpg39CFvYyy5fpgg_XSO_NkGMRXxSYgiyek793yLesr74HQW-xABDfy6RkWFXd-84CuaxU5r-wWt9nt5odHeht70HT0oCv7VKSsOTGKMb0sH', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk4MTU5NzQzODMiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMyIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsInBhcmVudENvbXBhbnkiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTMiLCJpZCI6ImU4ZjFjMDg5LTE2NjUtNGU2ZS04MDY5LWYxZjBiMjJhYWRmZiIsImlhdCI6MTU5MDQxNjM0MywiZXhwIjoxNTkwNTg5MTQzfQ.v3-QTcKB7QTzdnVbwSnpJ5jOkVCzJGTCacT3s1a1Fr0', '', 'android', 1, '2020-05-24 08:39:29', '2020-05-24 08:39:29'),
('eaacc3db-a139-4a45-9b93-1559f7a88298', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f11', 'Naval', 'uppal', 'nav@gmail.com', '7973015382', '+91', '', 'phase 5 sec 58 ,Mohali', '1594210381081_', '', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijc5NzMwMTUzODIiLCJteUNvbXBhbnlJZCI6IjI1Y2JmNThiLTQ2YmEtNGJhMi1iMjVkLThmOGY2NTNlOWYxMSIsImNvdW50cnlDb2RlIjoiKzkxIiwidXNlclR5cGUiOjEsInBhcmVudENvbXBhbnkiOiIyNWNiZjU4Yi00NmJhLTRiYTItYjI1ZC04ZjhmNjUzZTlmMTEiLCJpZCI6ImVhYWNjM2RiLWExMzktNGE0NS05YjkzLTE1NTlmN2E4ODI5OCIsImlhdCI6MTU5NDIxMDE4OCwiZXhwIjoxNTk0MzgyOTg4fQ.RkHSUsR4Er0SUmJWfjh32yO9PFfvEzDjfCdIyFOXgfA', '', 'ios', 1, '2020-05-24 08:39:29', '2020-05-24 08:39:29'),
('f5201c55-6add-43b0-ad1e-cb9554fb25cc', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 'Staphie', '', 'Staphie@yopmail.com', '9865987452', '91', '', 'Sector 42, Chandigarh', '1586770861086_useeerrr.jpg', '', '1', '', '', 'web', 1, '2020-02-04 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `userType`
--

CREATE TABLE `userType` (
  `id` int(10) NOT NULL,
  `userType` varchar(256) NOT NULL,
  `companyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT '2020-05-07 05:13:43',
  `updatedAt` datetime NOT NULL DEFAULT '2020-05-07 05:13:43'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userType`
--

INSERT INTO `userType` (`id`, `userType`, `companyId`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'New', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, '2020-05-07 05:13:43', '2020-05-07 05:13:43'),
(2, 'Active', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, '2020-05-07 05:13:43', '2020-05-07 05:13:43'),
(3, 'Most Active', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, '2020-05-07 05:13:43', '2020-05-07 05:13:43'),
(4, 'Member', '25cbf58b-46ba-4ba2-b25d-8f8f653e9f13', 1, '2020-05-07 05:14:56', '2020-05-07 05:14:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `assignedEmployees`
--
ALTER TABLE `assignedEmployees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empId` (`empId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `assignRole`
--
ALTER TABLE `assignRole`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employeeId` (`employeeId`),
  ADD KEY `roleTypeId` (`roleTypeId`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `businessType`
--
ALTER TABLE `businessType`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `cancelReasons`
--
ALTER TABLE `cancelReasons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `serviceId` (`serviceId`),
  ADD KEY `companyId` (`companyId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companyRatings`
--
ALTER TABLE `companyRatings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `coupan`
--
ALTER TABLE `coupan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `serviceId` (`serviceId`),
  ADD KEY `companyId` (`companyId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `groupMembers`
--
ALTER TABLE `groupMembers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupId` (`groupId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orderNo` (`orderNo`),
  ADD KEY `addressId` (`addressId`),
  ADD KEY `companyId` (`companyId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `parentCategories`
--
ALTER TABLE `parentCategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `roleTypes`
--
ALTER TABLE `roleTypes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `serviceType`
--
ALTER TABLE `serviceType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suborders`
--
ALTER TABLE `suborders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `serviceId` (`serviceId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- Indexes for table `userType`
--
ALTER TABLE `userType`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`companyId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderNo` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;
--
-- AUTO_INCREMENT for table `roleTypes`
--
ALTER TABLE `roleTypes`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `userType`
--
ALTER TABLE `userType`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `address_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assignedEmployees`
--
ALTER TABLE `assignedEmployees`
  ADD CONSTRAINT `assignedEmployees_ibfk_1` FOREIGN KEY (`empId`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignedEmployees_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
