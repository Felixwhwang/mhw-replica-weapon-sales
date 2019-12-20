-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: gameWeaponSales
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cartItems`
--

DROP TABLE IF EXISTS `cartItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cartItems` (
  `cartItemId` int(11) NOT NULL AUTO_INCREMENT,
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`cartItemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartItems`
--

LOCK TABLES `cartItems` WRITE;
/*!40000 ALTER TABLE `cartItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `cartId` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cartId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `cartId` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creditCard` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shippingAddress` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortDescription` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `longDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Diana Moon Blade',17200,'images/dianaMoonBlade.jpg','sword','This huge beautifully finished replica is not just a cnc cut piece of flat steal','Imagine for a moment that you are a successful hero in a popular video game. Your weapon of choice would most likely be one simple to operate with a high damage ratio. Diana\'s Moon Legends Sword has a unique design and powerful blow. This huge beautifully finished replica is not just a cnc cut piece of flat steal like all the other replicas, it is a huge replica that looks just like the game weapon Overall length of this beast is: 120cm'),(2,'Geralt\'s Sword',15900,'images/geraltSword.jpg','sword','126cm overall length with stainless steel blade','The Witcher 3 Wild Hunt Geralt\'s Rivia Sword\r\n\r\n126cm overall length with stainless steel blade\r\n\r\nComes complete with scabbard'),(3,'Darksiders Demon Sword',18900,'images/demonSword.jpg','sword','Beautiful and high quality replica of War\'s sword','Beautiful and high quality replica of War\'s sword Chaoseater from the video game hit Darksiders.\r\nPolished Fiberglass Resin\r\nOverall Size 98cm'),(4,'God of War Blades of Chaos',13900,'images/bladeOfChaos.jpg','sword','Overall Length: 16.75 Inches\r\nBlade Length: 11 Inches\r\nBlade Thickness: 3.9mm','Start your Video Game collection today with this rare find God of War Twin Bladed Sword Set . The swords feature two blades chained together, heavy, with all metal construction. The Blades are made from 440 stainless steel, with the red sign on both sides. The handles are wrapped in a soft leather material. These collectable wall swords come equipped with a wooden wall plaque with the name God of War which also has the sign from the game. This set will make you feel part of the game!\r\n\r\nSpecifications:\r\n\r\nOverall Length: 16.75 Inches\r\nBlade Length: 11 Inches\r\nBlade Thickness: 3.9mm\r\nBlade: 440 Stainless Steel, Sharp\r\nHandle: 4.5 Inches, Leather Wrap\r\nAluminum Guard & Pommel\r\nIncludes: Free Design Wall Plaque'),(5,'Genji Dragon Blade',8900,'images/genjiDragonBlade.jpg','sword','Cosplay Display Prop Tsuba: All Metal, Futuristic Decorative Guard','Overall Length: 40.75 Inches\r\n\r\nBlade Length: 26 Inches\r\n\r\nBlade Material: Carbon Steel, Painted Finish Blade\r\n\r\nThickness: 4mm\r\n\r\nBlade Finish: Black with Green Painted Hamon\r\n\r\nTang: 5 Inches Long, Half Tang Sharpness & Functionality: Unsharpened,\r\n\r\nCosplay Display Prop Tsuba: All Metal, Futuristic Decorative Guard Handle Length: 10.25 Inches Handle: All Cast Metal, High Quality Painted Finish Saya: Wooden, Brown Painted, Futuristic Metal Fittings & Trim'),(6,'Cloud Buster Sword',13900,'images/cloudBusterSword.jpg','sword','The Cloud buster sword is classified as a sword that is both enormous and heavy.','The Cloud Buster sword that has gained much popularity after its use as the trademark sword of the protagonist Cloud in the Final Fantasy series. The much-awaited sword is finally available at our store with the following specifications:\r\n\r\nThe huge sword stretches to an overall length of 43.5 inches!\r\nThe blade consists of segments and has a total length of 32 inches and a width of 5 inches.\r\nThe blade is made up of four different smaller blade segments and can be dismantled just like in the movie.\r\nThe handle extends to up to 11.5 inches and is made up of heavy metal and has black leather-wrapped for providing an easy grip to the heavy sword.\r\nThe blade is very careful with a weight that goes up to 4.46Kg, be careful handling it!\r\nIt comes with a free wooden stand that you can use to show off the most popular final fantasy blade!'),(7,'Soul Calibur - The Evil Sword',9300,'images/evilSword.jpg','sword','Soul Calibur is a 3D fighting game series developed by Project Soul and produced by Namco.','The Evil replica has arrived in our stock. This replica is available at a discount price. Soul Calibur is a 3D fighting game series developed by Project Soul and produced by Namco. It is a collectible-based fighting game series. Soul series released eight instalments in the series. The latest game of the series is Soulcalibur V. The gameplay features a variety of stylish and brutal move sets and each player has his own replica. The most famous replica of the series is Soul Calibur, made to destroy the Soul Edge also referred to as Evil replica. Soul Edge is the main antagonist in the Soul series. Human hands forged this replica. It was an ordinary replica, but when it’s bathed in blood and hatred countless times, the replica turned into a demonic collectible and possessed a wicked soul called Inferno. There is a belief that those who gasp its hilt are unable to escape its curse called malfestation. The spirit inside the replica invades the mind of the wielder, driving him insane. This cheap evil replica can devour souls as shape-shifter- which form it takes depends on the current wielder. Only those with excessive mental power can keep their will while using this replica. This cheap replica has many advantages in the Soul series Shop/Video Games Swords. The attack power of the player using Soul Edge increases and it drains an opponent’s health on contact. Any player wielding this collectible cannot lose if his energy bar is empty unless the opponent lands him a finishing attack. It is a cheap replica with quality materials.'),(8,'Demacia Sword',10300,'images/demaciaSword.jpg','','Demacia Sword from League of Legends','Blade 30\"\r\nHandel 15\"\r\nEngraved design on both sides of the blade\r\nBlade Construction: High-Quality Stainless Steel\r\nFinish: Dull Finish\r\nDouble-Sided Blade edge\r\nHandle: Wooden Mild Leather Wrapped\r\nFitting: Solid Metal, Silver Antique Finish Pommel, and Guard\r\nSword\'s Weight: 2.20 KG\r\nFree Display Stand');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-20 10:22:59
