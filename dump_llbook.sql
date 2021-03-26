-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: llbook
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `account_name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birth_date` int DEFAULT NULL,
  `gender` tinyint DEFAULT NULL COMMENT '0 - MAN\\\\\\\\n1 - Woman',
  `type` tinyint NOT NULL DEFAULT '0' COMMENT '0 - common user\\n1 - admin\\n2 - writer\\n3 - approver',
  `active` tinyint(1) DEFAULT '1' COMMENT '0 - inactive\\n1 - active',
  `verify` tinyint(1) DEFAULT '0' COMMENT '0: is not verify\\n1: verified',
  `created_at` int DEFAULT NULL,
  `created_by` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_at` int DEFAULT NULL,
  `updated_by` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `account_id_UNIQUE` (`account_id`),
  UNIQUE KEY `account_name_UNIQUE` (`account_name`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (35,'admin1','Ninh Van Luong','$2b$10$6xumbc525wApjszy8VU50u2Ze8ec5MikLBl.c/k0f1pmLS5p2sCy6','abc@gmail.com',927565200,0,1,1,0,1614089862,'hihi12344',1615920748,'admin1','0351246587',NULL,'Nhà số 2, Ngách 134/48, đường Phú Diễn, Minh Khai, Bắc Từ Niêm, Hà Nội'),(40,'tranvanlong','Trần văn long','$2b$10$df.FVWLFJBUh21AHQ7Uon.uje2sVjizf21zAfdHGXmIBTIR7utKf6','longll@gmail.com',928083600,0,0,1,0,1614181602,NULL,1615511110,'tranvanlong','0345216594',NULL,NULL),(42,'ledinhkhiem','Lê Đình Khiêm','$2b$10$Jqogy6yar1F3P8dESkfOeuK2eTgZt0T6MdDgsF.NjGv0dMXUh7Eu6','khiem@gmail.com',924454800,0,0,1,0,1615474171,NULL,NULL,NULL,'0351649721',NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `advisory`
--

DROP TABLE IF EXISTS `advisory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advisory` (
  `advisory_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_note` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` int DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '0 - cancel\n1 - pending\n2 - approved',
  `handle_history` text COLLATE utf8mb4_general_ci COMMENT 'array object\\n{\\n  id: '' '',\\n  admin_name: '' '',\\n  status: '' '',\\n  admin_note: '' '',\\n}...',
  PRIMARY KEY (`advisory_id`),
  UNIQUE KEY `advisory_id_UNIQUE` (`advisory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advisory`
--

LOCK TABLES `advisory` WRITE;
/*!40000 ALTER TABLE `advisory` DISABLE KEYS */;
INSERT INTO `advisory` VALUES (1,'ninh van luong','hihih','0123456466','asjglahgjkshagkljahkl',1613385839,2,'[{\"admin_id\":33,\"admin\":\"hihi12344\",\"note\":\"dgdfgs\",\"status\":\"2\",\"handle_at\":1613442957},{\"admin_id\":33,\"admin\":\"hihi12344\",\"note\":\"dgdfgs\",\"handle_at\":1613443006},{\"admin_id\":33,\"admin\":\"hihi12344\",\"note\":\"dgdfgs\",\"status\":\"2\",\"handle_at\":1613443056}]'),(2,'sadgsdga','gdgsdg','456789','sdfjglk dfkgjskldfgj sldfkhskdjhlskfdjhls kjdflks',1612781036,1,'asdfasdgaga'),(3,'fsdf',NULL,'0123456789','mgaslgm',1613389923,0,NULL),(4,'fsdf','sdgasd','0123456789','mgaslgm',1613390016,0,NULL);
/*!40000 ALTER TABLE `advisory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `author_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` int DEFAULT NULL,
  `created_by` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_at` int DEFAULT NULL,
  `updated_by` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`author_id`),
  UNIQUE KEY `author_id_UNIQUE` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (7,'Hamada Kazuyuki',NULL,NULL,1614939129,'admin1',NULL,NULL),(8,'Hồng Lan',NULL,NULL,1614940913,'admin1',NULL,NULL),(9,'Matthew Wride',NULL,NULL,1614941307,'admin1',NULL,NULL),(10,'Sally Bibb',NULL,NULL,1614942633,'admin1',NULL,NULL),(11,'Nhóm tác giả VNHR',NULL,NULL,1615128352,'admin1',NULL,NULL),(12,'Nhiều tác giả',NULL,NULL,1615128797,'admin1',NULL,NULL),(13,'Kevin O\'Leary',NULL,NULL,1615129101,'admin1',NULL,NULL),(14,'David Bach',NULL,NULL,1615129552,'admin1',NULL,NULL),(15,'Iwai Shunji',NULL,NULL,1615129880,'admin1',NULL,NULL),(16,'Nhất Linh',NULL,NULL,1615130232,'admin1',NULL,NULL),(17,'Miêu Công Tử',NULL,NULL,1615130563,'admin1',NULL,NULL),(18,'Rysa Walker',NULL,NULL,1615168079,'admin1',NULL,NULL),(19,'J.R.R. Tolkien','avatar-1615168646971.jpg','J.R.R. Tolkien sinh năm 1892 và mất vào năm 1973,2 tác phẩm được biết tới nhiều nhất của ông là anh chàng Hobbit và Chúa tể của những chiếc nhẫn. \n\nAnh chàng Hobbit và Chúa tể của những chiếc nhẫn sớm đưa tên tuổi ông trở thành \"cha đẻ của văn học kỳ ảo hiện đại\". ',1615168649,'admin1',NULL,NULL),(20,'Rupi Kaur',NULL,NULL,1615169031,'admin1',NULL,NULL),(21,'Đào Uyên Minh',NULL,NULL,1615169320,'admin1',NULL,NULL),(22,'Su Hyun Yoo, Mi Hyeon Lee, Hyo Sil Lee, Min Seon Lee',NULL,NULL,1615169949,'admin1',NULL,NULL),(23,'Lê Trung Cường',NULL,NULL,1615170239,'admin1',NULL,NULL),(24,'Vân Anh',NULL,NULL,1615171130,'admin1',NULL,NULL),(25,'Nguyễn Thị Thanh Bình',NULL,NULL,1615171400,'admin1',NULL,NULL),(26,'Thanh Trúc',NULL,NULL,1615171745,'admin1',NULL,NULL),(27,'Mộng Bình Sơn',NULL,NULL,1615172104,'admin1',NULL,NULL),(28,'Bill Bryson',NULL,NULL,1615174260,'admin1',NULL,NULL),(29,'Nicole Vascotto',NULL,NULL,1615174739,'admin1',NULL,NULL),(30,'Jayneen Sanders',NULL,NULL,1615175442,'admin1',NULL,NULL),(31,'Kangaroo Mother',NULL,NULL,1615175722,'admin1',NULL,NULL),(32,'Phạm Văn Bảy',NULL,NULL,1615176076,'admin1',NULL,NULL),(33,'Eleonora Barsotti',NULL,NULL,1615176487,'admin1',NULL,NULL),(34,'Og Mandino',NULL,'Og Mandino sinh ngày 12/12/1923, mất ngày 3/9/1996. Ông là chủ tịch của tạp chí Success Unlimited cho đến năm 1976, và là nhân viên của Hall of Fame của Hội diễn giả Quốc gia. Og Mandino là tác giả dòng sách truyền cảm hứng với các tác phẩm nổi tiếng nhất hiện nay, mười bốn tựa ...',1615189423,'admin1',1615189578,'admin1'),(35,'Karen Hough',NULL,NULL,1615189834,'admin1',NULL,NULL);
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_note` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_method` tinyint DEFAULT '0' COMMENT '0 - cod \\n1 - banking \\n2 - visa',
  `total_price` int DEFAULT NULL,
  `created_at` int DEFAULT NULL,
  `status` tinyint DEFAULT '0' COMMENT '0 - pending\n1 - approved\n2 - cancel',
  `admin_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `admin_note` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`bill_id`),
  UNIQUE KEY `bill_id_UNIQUE` (`bill_id`),
  KEY `bill_fk_acc_idx` (`admin_id`),
  KEY `fk_bill_user_idx` (`user_id`),
  CONSTRAINT `bill_fk_acc` FOREIGN KEY (`admin_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `fk_bill_user` FOREIGN KEY (`user_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (22,'Ninh Van Luong','0351246587','Nhà số 2, Ngách 134/48, đường Phú Diễn, Minh Khai, Bắc Từ Niêm, Hà Nội','',0,396000,1615923447,0,NULL,35,NULL),(23,'Ninh Van Luong','0351246587','Nhà số 2, Ngách 134/48, đường Phú Diễn, Minh Khai, Bắc Từ Niêm, Hà Nội','',0,494100,1615923481,0,NULL,35,NULL);
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_detail`
--

DROP TABLE IF EXISTS `bill_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_detail` (
  `bill_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`bill_id`,`book_id`),
  KEY `bill_detail_fk_book_idx` (`book_id`),
  CONSTRAINT `bill_detail_fk_bill` FOREIGN KEY (`bill_id`) REFERENCES `bill` (`bill_id`),
  CONSTRAINT `bill_detail_fk_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_detail`
--

LOCK TABLES `bill_detail` WRITE;
/*!40000 ALTER TABLE `bill_detail` DISABLE KEYS */;
INSERT INTO `bill_detail` VALUES (22,9,1,396000),(23,8,1,98100),(23,9,1,396000);
/*!40000 ALTER TABLE `bill_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `author_id` int DEFAULT NULL,
  `name` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `cover_image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `language` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `pages` int NOT NULL,
  `dimension` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `weight` double DEFAULT NULL COMMENT 'kg',
  `published_date` int DEFAULT NULL,
  `publisher` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `format` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'audio- text',
  `book_translator` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int NOT NULL,
  `had_bought` int DEFAULT NULL,
  `sale_id` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL COMMENT '0 - sắp có\n1 - không bán\n2 - dừng sản xuất\n',
  `updated_at` int DEFAULT NULL,
  `updated_by` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` int DEFAULT NULL,
  `created_by` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `active` tinyint DEFAULT '1',
  `publishing_id` int DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `book_id_UNIQUE` (`book_id`),
  KEY `book_fk_author_idx` (`author_id`),
  KEY `book_fk_sale_idx` (`sale_id`),
  KEY `book_fk_publishing_idx` (`publishing_id`),
  CONSTRAINT `book_fk_author` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`),
  CONSTRAINT `book_fk_publishing` FOREIGN KEY (`publishing_id`) REFERENCES `publishing_house` (`publishing_id`),
  CONSTRAINT `book_fk_sale` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (8,7,'Cường Quốc Trong Tương Lai','cover_image-1614939980015.jpg','Kinh tế thế giới đến năm 2030 sẽ có những phát triển như thế nào?\nThế giới sẽ thay đổi ra sao?\nVị thế của Mỹ, Trung Quốc trong thời đại mới?\nChiến tranh thương mại Mỹ - Trung liệu còn tiếp diễn?\nĐiều kiện để trở thành một trong các cường quốc trong tương lai?\nTrong cuốn sách, tác giả Hamada Kazuyuki dành hẳn một phần để luận bàn về kinh tế Việt Nam. Việt Nam được đánh giá là quốc gia có nền kinh tế phát triển nổi bật nhất ở châu Á. Với dân số trẻ, tầng lớp thượng lưu ngày càng đông, thị trường quốc nội phát triển nhanh chóng, thêm vào đó là tinh thần vượt lên nghịch cảnh, biến đau thương thành sức mạnh, cùng một chiến lược ngoại giao khôn khéo..., Việt Nam có đủ tham vọng, tầm nhìn và năng lực chuyển mình thành cường quốc trong tương lai, thách thức các cường quốc hiện tại.','Tiếng Việt',280,'14 x 20.5 cm',330,1577811600,'Nxb Thế giới','Bìa mềm','Võ Vương Ngọc Chân',50,109000,NULL,11,NULL,1616568565,'admin1',1614939981,'admin1',1,2),(9,8,'Biểu Thuế Suất Hàng Hóa Xuất Khẩu - Nhập Khẩu 2017','cover_image-1614941210641.jpg','  &lt;p&gt;\n                             Danh mục h&#224;ng h&#243;a v&#224; mức thuế tuyệt đối, thuế hỗn hợp, thuế nhập khẩu ngo&#224;i hạn ngạch thuế quan được ban h&#224;nh theo c&#225;c Nghị định sau:&amp;nbsp; &lt;/p&gt; &lt;p&gt;• Nghị định 122/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ về Biểu thuế xuất khẩu, Biểu thuế nhập khẩu ưu đ&#227;i, Danh mục h&#224;ng h&#243;a v&#224; mức thuế tuyệt đối, thuế hỗn hợp, thuế nhập khẩu ngo&#224;i hạn ngạch thuế quan.&lt;/p&gt; &lt;p&gt;• Quyết định 36/2016/QĐ-TTg của Thủ tướng Ch&#237;nh phủ ban h&#224;nh ng&#224;y 1/9/2016 &amp;nbsp;Quy định việc &#225;p dụng thuế suất th&#244;ng thường đối với h&#224;ng ho&#225; nhập khẩu&lt;/p&gt; &lt;p&gt;• Nghị định số 124/2016/NĐ-CP của Ch&#237;nh phủ ng&#224;y 01/9/2016 về Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt để thực hiện Hiệp định thương mại song phương giữa Ch&#237;nh phủ nước Cộng h&#242;a x&#227; hội chủ nghĩa Việt Nam v&#224; Ch&#237;nh phủ nước Cộng h&#242;a d&#226;n chủ nh&#226;n d&#226;n L&#224;o&lt;/p&gt; &lt;p&gt;• Nghị định số 125/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ V/v Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định giữa Cộng h&#242;a x&#227; hội chủ nghĩa Việt Nam v&#224; Nhật Bản về Đối t&#225;c kinh tế giai đoạn 2016-2019 (VJEPA).&lt;/p&gt; &lt;p&gt;• Nghị định số 126/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ V/v Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại h&#224;ng h&#243;a ASEAN - Ấn Độ giai đoạn 2016-2018. (AIFTA)&lt;/p&gt; &lt;p&gt;• Nghị định số 127/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ V/v Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định th&#224;nh lập Khu vực Thương mại tự do ASEAN - &#212;t-xtr&#226;y-lia - Niu Di-l&#226;n giai đoạn 2016-2018.(AANZFTA)&lt;/p&gt; &lt;p&gt;• Nghị định số 128/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ V/v Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại h&#224;ng h&#243;a ASEAN - Trung Quốc giai đoạn 2016-2018. (ACFTA)&lt;/p&gt; &lt;p&gt;• Nghị định số 129/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ V/v Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại h&#224;ng h&#243;a ASEAN giai đoạn 2016-2018.(ATIGA)&lt;/p&gt; &lt;p&gt;• Nghị định số 130/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ V/v Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại h&#224;ng h&#243;a ASEAN - H&#224;n Quốc giai đoạn 2016-2018. (AKFTA)&lt;/p&gt; &lt;p&gt;• Nghị định số 131/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ V/v Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại Tự do Việt Nam - H&#224;n Quốc giai đoạn 2016-2018.(VKFTA)&lt;/p&gt; &lt;p&gt;• Nghị định số 132/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ V/v Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại tự do giữa Việt Nam v&#224; Chi L&#234; giai đoạn 2016-2018. (VCFTA)&lt;/p&gt; &lt;p&gt;• Nghị định số 133/2016/NĐ-CP ng&#224;y 1/9/2016 của Ch&#237;nh phủ V/v Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định Đối t&#225;c kinh tế to&#224;n diện ASEAN - Nhật Bản giai đoạn 2016-2019.&lt;/p&gt; &lt;p&gt;• Nghị định 137/2016/NĐ-CP Biểu thuế nhập khẩu ưu đ&#227;i đặc biệt của Việt Nam để thực hiện Hiệp định Thương mại tư do giữa một b&#234;n l&#224; Nh&#224; nước Việt Nam v&#224; b&#234;n kia l&#224; Li&#234;n minh Kinh tế &#193; - &#194;u v&#224; c&#225;c nước th&#224;nh vi&#234;n giai đoạn 2016-2018&lt;/p&gt; &lt;p&gt;Nội dung s&#225;ch gồm 4 phần sau:&amp;nbsp;&lt;/p&gt; &lt;p&gt;Phần 1: Danh mục c&#225;c văn bản quy chiếu v&#224; bố cục biểu thuế&lt;/p&gt; &lt;p&gt;Phần 2: Danh mục h&#224;ng h&#243;a v&#224; biểu thuế xuất khẩu&lt;/p&gt; &lt;p&gt;Phần 3: Danh mục h&#224;ng h&#243;a v&#224; biểu thuế nhập khẩu&lt;/p&gt; &lt;p&gt;Phần 4: Thuế xuất MFN đối với một số mặt &amp;nbsp;h&#224;ng thực hiện cam kết WTO cho c&#225;c năm 2017, 2018 v&#224; từ 2019 trở đi&lt;/p&gt;\n                        &lt;p&gt;Phần 5: Phụ lục&lt;/p&gt;\n                        &lt;b&gt;Mời bạn đ&#243;n đọc.&lt;/b&gt;','Tiếng Việt',768,'20 x 28 cm',1496,1481475600,'Nxb Lao động','Bìa mềm',NULL,60,495000,NULL,12,NULL,1616304672,'admin1',1614940979,'admin1',1,17),(10,9,'Trải Nghiệm Nhân Viên','cover_image-1614942390637.jpg','Trong nhiều thập kỷ qua, nhiều nhà quản lý doanh nghiệp luôn bị ám ảnh bởi việc tạo ra lợi nhuận và thúc đẩy tăng trưởng bằng cách liên tục cải tiến sản phẩm, thực hiện các cuộc khảo sát khách hàng cũng như đổ chi phí vào các chương trình khuyến mãi. Thế nhưng, phần lớn những nỗ lực đó đều đổ sông đổ bể.\n\nTuy nhiên, vẫn có những tổ chức khác điềm tĩnh xây dựng đội ngũ nhân viên ưu tú và liên tiếp đạt được mục tiêu kinh doanh từ năm này qua năm khác, bởi họ hiểu rằng: Mọi thành quả quan trọng của doanh nghiệp đều được tạo nên từ trải nghiệm và nhiệt huyết của những người làm việc trong tổ chức.\n\nThành công không xuất phát từ một bảng số liệu, một câu khẩu hiệu hoặc là một dây chuyền công nghệ hiện đại, mà thành công bắt nguồn từ con người và kết thúc cũng ở con người. Đây chính là ý nghĩa của khái niệm Trải nghiệm Nhân viên: Kiến tạo một môi trường làm việc đầy cảm hứng để nhân viên có thể làm nên những điều tuyệt vời.\n\nTrải nghiệm Nhân viên: Cách thức thu hút nhân tài, nâng cao hiệu suất và đạt kết quả xuất sắc\n\nVì thành công của tổ chức đều bắt nguồn từ nhân viên, nên trách nhiệm lớn lao nhất của người lãnh đạo là cho nhân viên một lý do để họ có chung lý tưởng, một lý do để họ ở lại và gắn bó với tổ chức.\n\nTrong Trải nghiệm Nhân viên, các tác giả sẽ hướng dẫn bạn cách xây dựng một môi trường để mang đến sự gắn kết của nhân viên – cũng là các nguyên liệu chủ chốt của một Trải nghiệm Nhân viên tuyệt vời:\n\n1. Tương thích Kỳ vọng\n\n2. Ba loại Hợp đồng\n\n3. Uy tín\n\nMột khi bạn đã hiểu rõ về Tương thích Kỳ vọng, Ba loại Hợp đồng, Uy tín và sử dụng hiệu quả các công cụ này, bạn sẽ tạo ra nếp văn hóa giúp nuôi dưỡng Trải nghiệm Nhân viên trên cả tuyệt vời.\n\nSaigon Books ky vọng sẽ mang đến cho bạn một lợi thế đặc biệt trong cuộc chiến cạnh tranh của mình: có thể thu hút, giữ chân và phát triển nguồn nhân lực – đội ngũ góp phần giúp cho tổ chức của bạn tốt hơn và mang lại hạnh phúc cho khách hàng.','Tiếng Việt',228,'20.5 x 14 cm',350,1633194000,'Nxb Thế giới','Bìa mềm',NULL,30,130000,NULL,12,NULL,1614942391,'admin1',1614941957,'admin1',1,18),(11,10,'Chọn Đúng Người Vào Đúng Việc','cover_image-1614942651055.jpg','“Công việc luôn chiếm một phần lớn trong cuộc đời bạn, cách duy nhất để thấy mãn nguyện là làm một công việc mà bạn tin là tuyệt vời. Và cách duy nhất để làm một công việc tuyệt vời là yêu điều bạn đang làm.” - Steve Jobs -\n\nBẠN ĐÃ TỪNG NGHE VỀ KHÁI NIỆM “CHỌN ĐÚNG NGƯỜI VÀO ĐÚNG VIỆC”?\nỞ khắp nơi trên thế giới, mỗi ngày đều có những người đi làm mà chẳng vui vẻ gì, họ luôn khát khao được làm điều gì đó khiến bản thân cảm thấy mãn nguyện và yêu đời hơn. Một số cảm thấy khổ sở vì bị mắc kẹt trong cái vòng luẩn quẩn, tự hỏi tại sao mình lại dính phải cái công việc chán ngắt này. Một số cảm thấy hối tiếc vì chưa bao giờ được hướng dẫn, được truyền kinh nghiệm hay được động viên lúc cần thiết để tìm một công việc mới phù hợp với họ.\n\nĐể có thể sống một cuộc đời trọn vẹn và đầy màu sắc, chúng ta phải được làm những công việc mình yêu thích, bởi không thì chúng ta sẽ dành cả ngày chỉ để ngóng cho đến hết giờ làm, mỗi ngày đi làm như mang một cục nợ và ta chỉ thấy được cứu rỗi vào ngày nghỉ cuối tuần.\n\nKhi tiếp xúc với một người nào đó, rất dễ biết nếu họ đang làm công việc mà họ thực sự yêu thích bởi từ họ sẽ luôn tỏa ra cảm giác hài lòng và tích cực. Ở bên cạnh những người này, ta thấy mình được truyền cảm hứng. Và nếu bạn đang chán ghét công việc hiện tại của mình, thì phải thành thật là bạn sẽ thấy cay đắng, có khi còn ghen tị với những người đó!\n\nChúng ta đều đang tìm kiếm cảm giác hài lòng và tích cực, cảm giác biết rằng mình đang đi đúng hướng. Chúng ta đều muốn tuyên bố “Tôi yêu công việc này!” – và thực sự chúng ta cũng cảm thấy như thế. Và chúng ta đều muốn làm việc cho một tổ chức biết trân trọng con người thực sự của chúng ta.\n\nTẠI SAO CÁC TỔ CHỨC CẦN PHẢI “CHỌN ĐÚNG NGƯỜI VÀO ĐÚNG VIỆC”?\nVấn đề ở chỗ, không phải tổ chức nào cũng có thói quen khen ngợi những việc nhân viên làm tốt, mà thay vào đó là cố gắng xác định những gì họ làm không tốt và tìm cách khắc phục. Ngay cả những người hoàn thành xuất sắc công việc cũng cảm thấy mất tinh thần bởi thế mạnh của họ không được công ty coi trọng đúng mức. Thông điệp mà các tổ chức thường đưa ra là: “Tôi muốn các anh trở thành nhân viên ‘lý tưởng’ theo khuôn mẫu của chúng tôi”.\n\nKhách hàng không thể yêu thích một tổ chức nếu như chính các nhân viên làm việc ở đó cũng không yêu thích những gì họ đang làm. Cần có một cuộc cách mạng trong cách chúng ta nghĩ về công việc và đánh giá nhân viên, cũng như cho họ được làm những việc đúng với con người họ thay vì uốn nắn họ theo một hình mẫu lý tưởng nào đó khô khan và thiếu cảm xúc.\n\nCuộc cách mạng định hướng công việc dựa trên sở trường của mỗi người đã bắt đầu diễn ra. Một số lãnh đạo có tầm nhìn đều nhận thấy đây là hướng đi đúng đắn và đang áp dụng cho tổ chức của họ. Điều này không chỉ thay đổi kết quả hoạt động của công ty mà thay đổi cả lối tư duy của nhà lãnh đạo, nhà quản lý. Dù vậy, một số người vẫn tranh cãi về cách tiếp cận dựa trên sở trường này. Một số tổ chức vốn có định hướng tuyển dụng và đào tạo dựa trên tiền đề rằng: Mọi người đều có thể học được mọi thứ. Trong khi đó, tiền đề của cách tiếp cận dựa trên sở trường lại nói rằng: Nếu ban đầu đó không phải là thế mạnh của bạn thì bạn sẽ không thể phát triển được sở trường đó. Bạn chỉ có thể học hỏi kỹ năng và kinh nghiệm chứ không thể học cách để trở thành một người khác xa bản chất của bạn, trừ khi bạn trải qua một biến cố có sức tác động mạnh mẽ.\n\nSuy cho cùng, mọi sự tranh cãi đều là nền tảng cho một cuộc cách mạng!\n\nChọn đúng người vào đúng việc sẽ truyền cho bạn cảm hứng và khiến bạn phải suy nghĩ về việc chọn đúng người vào đúng việc. Quản lý nhân tài dựa trên sở trường có thể thay đổi hoàn toàn hoạt động tuyển dụng và quản trị hiệu suất trong một tổ chức.\n\nNếu bạn muốn tạo nên thay đổi đáng kể trong kết quả hoạt động của tổ chức và trong tinh thần của nhân viên, thì Chọn đúng người vào đúng việc chính là cuốn sách dành cho bạn!','Tiếng Việt, Tiếng Trung',208,'20.5 x 14 cm',450,1633107600,'Nxb Thế giới','Bìa mềm',NULL,56,120000,NULL,12,NULL,NULL,NULL,1614942652,'admin1',1,18),(12,11,'Nghề Nhân Sự Việt - Nghìn Lẻ Chuyện Giờ Mới Kể','cover_image-1615128697620.jpg','\nLần đầu tiên những người làm nghề Nhân Sự tại Việt Nam không ngần ngại “kể” lại các câu chuyện xúc động, thấm đậm tình người đã đi theo họ cùng năm tháng suốt cuộc đời làm nghề. Các câu chuyện được kể lại một cách chân thật, mộc mạc, nhưng cũng để lại những cảm nhận và nhiều bài học sâu sắc về chữ “Nhân”, chữ “Tâm” trong cuộc sống. Cuốn sách là tập hợp các bài viết hấp dẫn, sinh động của nhóm tác giả Câu lạc bộ Nhân sự Việt Nam – Vietnam Human Resources Association (VNHR).\n\nNhững câu chuyện được kể trong tập sách này bởi chính những người thật việc thật trong nghề, bạn đọc sẽ hiểu thêm về Nghề Nhân sự, về những con người đã chọn Nhân sự làm “nghề nghiệp” cho đời mình. Cũng như những công việc khác, họ cũng phải liên tục học hỏi trao dồi chuyên môn, chịu đựng nhiều thách thức và áp lực công việc, nhưng với lòng yêu nghề, họ luôn tìm cách vượt qua khó khăn, thử thách để sống với nghề.\n\nNhững câu chuyện được chọn giới thiệu trong tập sách này rất đa dạng và sinh động. Từ những câu chuyện mới vào nghề cho đến những câu chuyện của tác giả đã tuổi hưu đang vui thú điền viên. Những câu chuyện sâu sắc, đáng suy ngẫm của các anh chị lão làng trong nghề 20, 30 năm xen lẫn các câu chuyện để lại nhiều bài học sâu sắc của các bạn thế hệ 7x, 8x đã thành danh trong nghề. Chưa hết, các bạn còn tìm thấy những chia sẻ đáng yêu của những bạn 9x đang bước vào nghề Nhân sự với nhiều khát khao, kỳ vọng.\n\nCác bạn cũng có thể tìm thấy trong những mẩu chuyện kể, những nghị lực vượt qua khó khăn, những sai lầm “chết người”, những quyết định mạo hiểm “có thể mất việc”, những tấm gương của những người “trồng người”. Hơn thế nữa, những người làm nghề nhân sự cũng luôn suy tư, trăn trở làm sao để có thể liên tục cập nhật kiến thức chuyên môn để có thể trở thành một “đối tác chiến lược” đáng tin cậy của các nhà quản lý doanh nghiệp, cùng với họ đưa doanh nghiệp đi tới thành công.\n\nCác đoạn trích:\n\n“Lần đầu tiên những người làm Nhân Sự không ngần ngại “kể” lại các câu chuyện xúc động, thấm đậm tình người đã đi theo họ cùng năm tháng suốt cuộc đời làm nghề. Các câu chuyện được kể lại một cách chân thật, mộc mạc, nhưng cũng để lại những cảm nhận và nhiều bài học sâu sắc về chữ “Nhân”, chữ “Tâm” trong cuộc sống…”    -   Lê Hồng Phúc - Chủ tịch VNHR   \n\n“Trước đây, có thể đã từng có một thời, cảm nghĩ chung về ngành Nhân Sự là: ‘Ai không làm được việc gì khác thì mới làm Nhân Sự.’ Đó là suy nghĩ cũ. Tôi muốn mời tất cả chúng ta cùng thử nhìn nhận vấn đề theo hướng mới: ‘Ai giỏi nhất, thích lắm việc khó nhất để đem lại giá trị cao nhất, thì mới làm Nhân Sự’.”   – Alexis Phạm, Giám đốc Khối Nhân sự (CHRO) One Mount Group\n\n“Trong thực tế, không ít người làm Nhân Sự tự định vị hoặc để người khác định vị mình là những người hỗ trợ, hoặc như một văn phòng phụ trợ (back office). Đợi cấp trên giao xuống rồi làm theo, lúc đó Nhân Sự gián tiếp vẽ nên một chân dung Phòng Nhân sự là “follower” (người theo sau) không hơn không kém. Thực tế đã chứng minh, khi Nhân Sự can đảm đứng lên nhận lãnh vai trò “leader” (người dẫn dắt), một mặt khẳng định được năng lực và giá trị của mình, mặt khác được thỏa chí sáng tạo đưa ra những ý tưởng và cách làm của Nhân Sự”. – Văn Thị Anh Thư, Phó Tổng Giám đốc Cấp cao Công ty Nước Giải Khát Suntory PepsiCo Việt Nam\n\n“Để có thể phát triển và trường tồn theo thời gian, doanh nghiệp cần đội ngũ lãnh đạo có “Tâm” trong việc đào tạo và phát triển con người, có “Tầm” nhìn xa trông rộng, định hướng, dẫn dắt nhân viên đi theo và hơn hết là để lại “di sản” thông qua những gì mà họ xây dựng và đóng góp cho công ty và cộng đồng …”     –  Tăng Trị Trọng, Giám đốc Kinh doanh Cấp cao, Thành viên Hội đồng Quản trị của Navigos Group Việt Nam\n\n“Nhìn lại những ngày đầu vào nghề Nhân Sự tại Price Waterhouse cho đến hành trình theo đuổi khát vọng xây dựng một thương hiệu Việt xứng tầm trong lĩnh vực Tư vấn Chiến lược và Tuyển dụng Nhân sự cấp cao, xa hơn nữa là ước mơ kết nối, nâng tầm năng lực phát triển nhân sự của Việt Nam, tôi thấy mọi chuyện đều không thể thiếu khát vọng, thiếu niềm đam mê mãnh liệt để có thể đi hết con đường mình muốn đi…”   – Tiêu Yến Trinh, Phó Chủ tịch VNHR  – Tổng Giám đốc Talentnet (Công ty Cổ phần Kết Nối Nhân Tài)\n\nVề tác giả:\n\nSách do nhóm tác giả thuộc Câu lạc bộ Nhân sự Việt Nam –Vietnam Human Resources Association (VNHR) viết.  VNHR là một tổ chức nghề nghiệp về nghề Nhân sự tại Việt Nam, thành lập ngày 30 tháng 01 năm 2001, hoạt động với sứ mệnh “gắn kết và nâng tầm nguồn Nhân lực Việt\". VNHR thu hút sự tham gia của những chuyên gia nhân sự đầu ngành của Việt Nam, với hơn 1.200 thành viên chính thức.','Tiếng Việt',199,'24 x 16 cm',300,1614445200,'Nxb Công Thương','Bìa mềm',NULL,70,160000,NULL,12,NULL,NULL,NULL,1615128698,'admin1',1,2),(13,12,'Kích Hoạt Tiềm Năng - Talent Unleashed','cover_image-1615128979197.jpg','Cuốn sách giới thiệu về ba cuộc trò chuyện “quyền năng” giúp người lãnh đạo khai phóng tối đa tiềm lực của bất cứ ai xung quanh họ\n\nĐôi khi nhân viên của bạn cần một bước “nhảy vọt về niềm tin” để có thể dấn thân vào một vai trò giúp phát huy trọn vẹn mọi năng lực, giới hạn sáng tạo của họ.“Nghệ thuật lãnh đạo là truyền đạt cho người khác biết giá trị và tiềm năng của họ một cách rõ ràng, đến độ họ được truyền cảm hứng để nhận ra những điều đó trong chính con người mình”, tiến sĩ Stephen R. Covey, nhà giáo dục, doanh nhân, tác giả nổi tiếng từng chia sẻ.\n\nCuốn sách gửi đi thông điệp: Vai trò cơ bản nhưng lại mang tính cốt lõi của người lãnh đạo chính là nhận diện, công nhận, và quan trọng nhất là kích hoạt được tiềm năng của từng cá nhân trong đội mình.\n\n“Kích hoạt tiềm năng” được viết bởi các tác giả thuộc FranklinCovey - tổ chức toàn cầu chuyên về đào tạo và phát triển lãnh đạo, kiến tạo văn hóa, triển khai chiến lược cho các doanh nghiệp.\n\nTrong cuốn sách, các tác giả trình bày 3 “cuộc trò chuyện khai mở”, được sử dụng để khai phá và kích hoạt tài năng của đội ngũ nhân viên:\n\nCuộc trò chuyện về Tiếng nói: Đây là cuộc trò chuyện đầu tiên trong hành trình khai phóng tài năng. Trong quá trình này, nhà quản lý dẫn dắt để cấp dưới mở lòng về niềm đam mê, những điều họ khát khao nhất, những điều thật sự quan trọng đối với họ. Cuộc trò chuyện về tiếng nói giúp xác định tài năng và sự đóng góp độc đáo của mỗi cá nhân.\n\nCuộc trò chuyện về Tính hiệu quả: Thông qua những cuộc họp và trao đổi, lãnh đạo thiết lập mục tiêu, phân công công việc cũng như trách nhiệm cụ thể cho từng thành viên. Những cuộc trò chuyện về tính hiệu quả giúp biến đổi những “nhân viên có thể thay thế được” thành  đối tác đáng tin cậy với lãnh đạo, từ đó hợp sức cùng nhau hoàn thành những mục tiêu thiết yếu.\n\nCuộc trò chuyện về Sự khai thông: Giúp tháo gỡ những chướng ngại vật trên đường đi của nhân viên và hướng dẫn để chắc chắn rằng họ đang đi đúng đường. Đây là lúc nhà quản lý hỗ trợ, giúp đỡ và sắp xếp để các nhân viên của mình hoàn thành tốt nhiệm vụ được giao với kết quả tốt nhất.\n\nNhững “cuộc trò chuyện khai mở”, theo các tác giả, không phải là các sự kiện riêng lẻ và diễn ra một lần, mà là một chuỗi những thảo luận cởi mở và liên tục, được xây dựng nhằm phát huy tối đa tiềm lực của con người.\n\nBốn tác giả của cuốn sách - Shawn Moon, Todd Davis, Michael Simpson, Roger Merrill - đều là chuyên gia cấp cao về cố vấn lãnh đạo và phát triển tài năng, từng chứng kiến cách những lãnh đạo tại hàng chục quốc gia khai phóng tiềm năng của cá nhân xung quanh họ. Phần lớn nội dung “Kích hoạt tiềm năng” được viết dựa trên kết quả của quá trình làm việc giữa 4 tác giả với hàng ngàn lãnh đạo trong 30 năm qua.\n\n“3 Cuộc trò chuyện khai mở trong cuốn sách được xem là những công cụ hữu ích cho các nhà lãnh đạo khai phá và kích hoạt tiềm năng đội ngũ nhân viên của mình”, Marshall Goldsmith - tác giả của những cuốn sách bán chạy nhất theo tờ New York Times - đánh giá.\n\n“Kích hoạt tiềm năng” có lối viết logic, chặt chẽ và sử dụng nhiều câu chuyện minh họa thú vị xen kẽ. Cuốn sách sẽ giúp các nhà quản lý xây dựng một đội ngũ xuất chúng dựa vào việc kích hoạt tiềm năng của các thành viên.\n\nBOX:\n\nFranklinCovey là tổ chức toàn cầu, chuyên về đào tạo và phát triển lãnh đạo, kiến tạo văn hóa, triển khai chiến lược và thúc đẩy bán hàng cho các doanh nghiệp. Tính tới nay, FranklinCovey hoạt động tại hơn 160 quốc gia và tham gia kiến tạo đội ngũ lãnh đạo của gần 90% tập đoàn lớn nhất thế giới theo bình chọn của tạp chí Fortune.\n\nNhững cuốn sách khác từ FranklinCovey nhận được nhiều phản hồi tích cực gồm: 7 Thói quen của bạn trẻ thành đạt, Tư duy tối ưu, Lựa chọn tối ưu thứ 3, Thói quen thứ 8, Niềm tin thông minh…','Tiếng Việt',271,'20.5 x 14.5 cm',350,1613754000,'Nxb Tổng hợp TP.HCM','Bìa mềm','Thanh Thảo',29,138000,NULL,12,NULL,NULL,NULL,1615128980,'admin1',1,8),(14,13,'Sự Thật Mất Lòng Về Đàn Ông Đàn Bà Và Tiền Bạc','cover_image-1615129427314.jpg','Cuốn sách đặc biệt của tác giả Kevin O’Leary “ Sự thật mất lòng về đàn ông, đàn bà và tiền bạc” giống như một cẩm nang để các cặp vợ chồng hay những bạn nào chuẩn bị bước vào hôn nhân có những suy nghĩ và hành động thật thông minh trong mối quan hệ vợ chồng với tiền bạc.\n\nCuốn sách là câu chuyện kể về tiền tài của tác giả và hành trình cá nhân mà tác giả đã trải qua. Bạn không nên suy luận các nội dung, giai thoại, câu chuyện, quan điểm hay trải nghiệm trong cuốn sách thành lời khuyên đầu tư, đặc biệt khi chúng có liên quan đến bất kỳ sản phẩm tài chính.\n\nMục tiêu của tác giả là cung cấp cho bạn những phương pháp thực tế nhằm tiết kiệm tiền, đầu tư tốt hơn và giảm chi phí ở mọi giai đoạn trong cuộc đời bạn, từ khi bạn sinh ra cho đến khi bạn nằm xuống. Chính tác giả sẽ chỉ cho bạn cách dạy con cái nhạy bén với tiền bạc, để chúng không tiêu pha lãng phí hay rơi vào cảnh nợ nần quá sớm.\n\nTác giả sẽ chỉ cho bạn làm sao để trẻ có thể tốt nghiệp đại học mà ít mang nợ và có điều kiện thuận lợi trả hết khoản vay vốn sinh viên. Tác giả cũng đưa ra lời khuyên chuyện trao đổi tiền bạc với người thân và đảm bảo tình yêu, hôn nhân cũng như mối quan hệ đối tác mà không bị ảnh hưởng nợ nần, thói tiêu tiền vượt quá khả năng và những mối lo tài chính. Chúng ta sẽ thấy được những sai lầm và tránh được nó trong tín dụng và thẻ tín dụng, khi mua nhà hay mua xe…. Nhưng trên hết, tác giả sẽ nói về điều đó theo từng giai đoạn cuộc đời và các cột mốc quyết định quan trọng, giúp chúng ta có được cuộc sống tuổi xế chiều thoải mái, an toàn nhờ tài chính ổn định và tự do.\n\nChúng ta, bất cứ ai cũng nên đọc cuốn sách này: Bởi tiền là năng lượng lớn của con người. Bởi tiền chi phối hạnh phúc gia đình. Bởi tiền chi phối được cuộc sống của chúng ta.\n\nVà cuốn sách sẽ giúp chúng ta trở nên thông minh hơn trong mối quan hệ gia đình và tiền bạc, đặc biệt vợ-chồng và tiền.','Tiếng Việt',178,'13 x 20.5 cm',200,1582131600,'NXB Hồng Đức','Bìa mềm','Phúc Chi',18,178000,NULL,13,NULL,NULL,NULL,1615129428,'admin1',1,19),(15,14,'Phụ Nữ Thông Minh Sống Trong Giàu Có','cover_image-1615129693892.jpg','Sống thoải mái trong giàu có chính là thông điệp quan trọng nhất trong cuốn sách “Phụ nữ thông minh sống trong giàu có“. Cuốn sách chia sẻ khái niệm đơn giản rằng bất kỳ người phụ nữ nào - không phân biệt thu nhập, tuổi, chủng tộc hay tình trạng hôn nhân - đều có quyền để được tận hưởng tương lai đủ đầy, tự do đồng thời tài chính thật sự được đảm bảo.\n\nTrong cuốn sách, bạn sẽ được dấn thân vào hành trình gồm 8 bước bắt đầu với việc hỏi hỏi và kết thúc bằng hành động của bạn. Rồi bạn sẽ thấy, 8 bước này chiếm trọn hành trình đi đến tự do tài chính của chúng ta. Tuy nhiên, bản thân từng bước cũng dễ thực hiện. Thật ra chúng rất đơn giản, đến nỗi mà không chỉ bạn có thể áp dụng mà bạn hoàn toàn có thể dạy chúng cho những người bạn yêu quý để họ đạt được thành công như bạn.','Tiếng Việt',568,'14 x 20.5 cm',630,1587315600,'NXB Hồng Đức','Bìa mềm','Nguyệt Minh',35,192000,NULL,13,NULL,NULL,NULL,1615129695,'admin1',1,19),(16,15,'Lá Thư Cuối','cover_image-1615130155028.jpg','“Gửi Misaki,\nĐây là câu chuyện bắt đầu sau cái chết của em.\nCâu chuyện về mùa hè của những người xung quanh em, những người mà em thật lòng yêu thương, và chắc chắn cũng rất yêu thương em.\nVà cũng là câu chuyện của anh trong mùa hè ấy.\nMong em sẽ đọc tiểu thuyết này như là bức thư tình cuối cùng của anh gửi đến em nơi thiên đường.”\n\nTÁC GIẢ:\nIwai Shunji sinh năm 1963 tại Miyagi. Là một đạo diễn, tiểu thuyết gia, nhà soạn nhạc nổi tiếng. Năm 1995, ông ra mắt làng phim trong vai trò đạo diễn phim điện ảnh Thư tình. Các tác phẩm tiêu biểu khác của ông bao gồm phim Swallowtail Butterfly, All About Lily Chou-Chou; tiểu thuyết Người cá Wallace, Chó giữ vườn, Cô dâu của Rip Van Winkle... Ông còn mở rộng hoạt động ra nước ngoài với những phim NewYork, I Love You, Vampire. Ông đã viết lời cho bài hát Hoa sẽ nở tưởng niệm và hỗ trợ các nạn nhân của thảm họa động đất và sóng thần năm 2011. Ông cũng từng lấn sân sang lĩnh vực anime bằng phim dài Hana, Alice và lời nguyền của linh hồn Judas và nhận được đánh giá cao ở cả trong và ngoài nước. Năm 2018, phim Trung Quốc đầu tiên do ông đạo diễn mang tên Chào em, Chi Hoa dựa trên nguyên tác tiểu thuyết Lá thư cuối được công chiếu tại Trung Quốc. Năm 2020, phiên bản phim chuyển thể của Nhật Bản Lá thư cuối được công chiếu. Tháng 7 cùng năm, phim 12 ngày của con quái vật đã chết trong 8 ngày công chiếu, gần như toàn bộ phim này được quay từ xa bởi giãn cách xã hội do ảnh hưởng của virus corona chủng mới.','Tiếng Việt',240,'20.5 x 14 cm',350,1611075600,'NXB Hà Nội','Bìa mềm','Vương Hải Yến',20,100000,NULL,13,NULL,NULL,NULL,1615130156,'admin1',1,20),(17,16,'Lạnh Lùng','cover_image-1615130408901.jpg','Tiểu thuyết Lạnh lùng của Nhất Linh đăng dài kỳ trên báo Ngày nay, từ số 16 (ngày 12-7-1936) đến số 37 (ngày 6-12-1936), NXB Đời Nay xuất bản lần đầu năm 1937. Lạnh lùng là câu chuyện về Nhung - một góa phụ trẻ tuổi, lòng đầy khát khao yêu đương nhưng bị trói buộc trong nghĩa vụ thủ tiết thờ chồng. Tác phẩm là tiếng nói lên án lễ giáo phong kiến kìm hãm và đi ngược lại quyền sống của con người, đồng thời ngợi ca và cổ vũ tình yêu tự do, giải phóng cá nhân.\n\nẤn bản này của Nhã Nam được thực hiện theo bản in Lạnh lùng của NXB Đời Nay in xong ngày 7/6/ 1940, chỉ sửa một số cách viết cho phù hợp với quy tắc chính tả hiện nay như “dồn dập” thay cho “rồn rập”, “xồng xộc” thay cho “sồng sộc”…\n\nNgười đọc đã quen thuộc với Nhất Linh trong tư cách là thủ lĩnh và cây bút chủ đạo của Tự Lực văn đoàn, nhưng ông còn là một hoạ sĩ. Thi đỗ vào Cao đẳng Mỹ thuật Đông Dương năm 1925, sau này, với bút danh Đông Sơn, Nhất Linh là người vẽ tranh minh họa cho rất nhiều những tiểu thuyết đăng báo nhiều kỳ của các thành viên trong Tự Lực văn đoàn.\n\nẤn bản này ngoài kênh chữ còn có sự kiện diện của kênh hình với những tranh minh họa do chính Nhất Linh vẽ. Trong 32 bức họa thì 24 bức có sự xuất hiện của Nhung. Qua những bức họa, bạn đọc cũng có thể bắt gặp không gian sinh hoạt, những phong cảnh truyền thống của làng quê Việt Nam với cổng làng, lũy tre, rặng cây, dò hoa thủy tiên ngày Tết…','Tiếng Việt',224,'20.5 x 14.5 cm',360,1614013200,'Nxb Hội Nhà Văn','Bìa mềm',NULL,30,68000,NULL,13,NULL,NULL,NULL,1615130409,'admin1',1,20),(18,17,'999 Lá Thư Gửi Cho Chính Mình - Mong Bạn Trở Thành Phiên Bản Hoàn Hảo Nhất (Phiên Bản Song Ngữ) - Tập 1','cover_image-1615130723859.jpg','“999 lá thư gửi cho chính mình” của tác giả Miêu Công Tử là một tác phẩm truyền cảm hứng cực kỳ nổi tiếng trên các diễn đàn văn học mạng, các phương tiện thông tin đại chúng và là một trong những tác phẩm luôn nằm trong TOP#1 Những cuốn sách bán chạy nhất kể từ khi ra mắt tại Việt Nam. Tác phẩm mang một màu sắc riêng biệt qua những bức thư ngắn chất chứa lời động viên, nhắn nhủ dành cho độc giả về giá trị cuộc sống, tình yêu, tuổi trẻ, tương lai… v.v..\n\nBằng những ngôn từ sâu sắc và lắng đọng, tác phẩm đã được rất nhiều độc giả trẻ tại Việt Nam ủng hộ bởi ý nghĩa truyền cảm hứng, tiếp sức giúp mọi người ngày một nỗ lực hơn để có thể vững bước trên con đường thành công và khẳng định bản thân.\n\nNhằm đáp ứng nhu cầu của những độc giả có niềm yêu thích ngôn ngữ Trung Quốc, Vanvietbooks hân hạnh ra mắt “999 lá thư gửi cho chính mình” (*) – Phiên bản song ngữ cùng với nội dung được trình bày khoa học, hợp lý và đẹp mắt, là một công cụ rất tốt để giúp bạn đọc rèn luyện và nâng cao khả năng ngoại ngữ, trau dồi kiến thức, đúng với tiêu chí giúp bạn trở nên hoàn hảo hơn.\n\n“Hãy để sự nỗ lực xứng đáng với ước mơ của bạn” – phiên bản song ngữ của 999 lá thư gửi cho chính mình sẵn sàng cùng bạn học tốt tiếng Trung mỗi ngày!','Tiếng Việt',256,'20.5 x 14.5 cm',400,1614704400,'NXB Thanh Niên','Bìa mềm','Quỳnh Nhi',50,129000,NULL,13,NULL,1616309131,'admin1',1615130724,'admin1',1,21),(19,17,'999 Lá Thư Gửi Cho Chính Mình - Mong Bạn Trở Thành Phiên Bản Hoàn Hảo Nhất (Phiên Bản Song Ngữ) - Tập 2','cover_image-1615130892508.jpg','“999 lá thư gửi cho chính mình” của tác giả Miêu Công Tử là một tác phẩm truyền cảm hứng cực kỳ nổi tiếng trên các diễn đàn văn học mạng, các phương tiện thông tin đại chúng và là một trong những tác phẩm luôn nằm trong TOP#1 Những cuốn sách bán chạy nhất kể từ khi ra mắt tại Việt Nam. Bằng những ngôn từ sâu sắc và lắng đọng, tác phẩm đã được rất nhiều độc giả trẻ tại Việt Nam ủng hộ bởi ý nghĩa truyền cảm hứng, tiếp sức giúp mọi người ngày một nỗ lực hơn để có thể vững bước trên con đường thành công và khẳng định bản thân.\n\nGiờ đây, nhằm đáp ứng nhu cầu của những độc giả có niềm yêu thích ngôn ngữ Trung Quốc, Vanvietbooks hân hạnh ra mắt “999 lá thư gửi cho chính mình” (**) – Phiên bản song ngữ với các lá thư tiếp nối “Lá thư thứ 315” của Phần 1 được trình bày khoa học, hợp lý và đẹp mắt, là một công cụ rất tốt để giúp bạn đọc rèn luyện và nâng cao khả năng ngoại ngữ, trau dồi kiến thức, đúng với tiêu chí giúp bạn trở nên hoàn hảo hơn.\n\n“Mỗi ngày hãy như hoa hướng dương hướng về phía mặt trời!” – phiên bản song ngữ của 999 lá thư gửi cho chính mình đã sẵn sàng để cùng bạn học tốt tiếng Trung mỗi ngày!','Tiếng Việt',264,'20.5 x 14.5 cm',400,1614704400,'NXB Thanh Niên','Bìa mềm','Quỳnh Nhi',50,129000,NULL,13,NULL,NULL,NULL,1615130893,'admin1',1,21),(20,18,'Khe Nứt Thời Gian','cover_image-1615168225486.jpg','Khe nứt thời gian - Tập 3 và cũng là tập cuối trong bộ Hồ sơ CHRONOS (gồm Giải cứu thời gian, Bên rìa thời gian, Khe nứt thời gian) đã được trao giải Tiểu thuyết đột phá của Amazon năm 2013.\n\nSeries sách về đề tài du hành thời gian cực hấp dẫn đã đi đến hồi kết. Trong tập này, một lần nữa, Kate, nhân vật nữ chính của chúng ta sẽ phải ngăn chặn âm mưu của ông ngoại mình và giải cứu thế giới khỏi Vụ Thanh Trừng mà ông ta và tổ chức của mình đang thực hiện. Có điều, cái giá mà cô phải trả còn vượt xa những gì cô có thể tưởng tượng…\n\nĐược viết bởi một Tiến sĩ Khoa học, nên bộ sách này có kết cấu cực kỳ chặt chẽ và logic, người đọc sẽ bị cuốn vào trang sách mà quên hết cả thời gian.','Tiếng Việt',576,'15.5 x 24 cm',824,1629306000,'NXB Hà Nội','Bìa mềm','Vương Minh Thu',28,209000,NULL,12,NULL,NULL,NULL,1615168226,'admin1',1,20),(21,19,'Chúa Tể Những Chiếc Nhẫn - Tập 2: Hai Tòa Tháp (Tái Bản 2019)','cover_image-1615168738251.jpg','Chín Bộ Hành còn Bảy.\n\nMột con đường chia hai.\n\nNgười Mang Nhẫn dấn thân vào Vùng Đất Đen\n\ncùng bạn đường trung nghĩa và kẻ dẫn đường bất trắc.\n\nHai Hobbit bị cướp đi giữa ba phe Orc,\n\nđể Ba Thợ Săn làm nên kỳ tích đuổi theo.\n\nVà một giống dân cổ xưa bừng tỉnh, hai tòa tháp xuất quân,\n\nmột đất nước Con Người tập hợp binh mã đương đầu với ngoại xâm.\n\nĐại Nhẫn Chiến đã bắt đầu ở Trung Địa.\n\nNhận định:\n\n“Cộng đồng Anh ngữ được phân làm hai: những người đã đọc Anh chàng Hobbit cùng Chúa tể những chiếc Nhẫn, và những người sẽ đọc.”\n\n    - Sunday Times\n\n“Tín đồ Thiên Chúa giáo chưa đọc hết Kinh thánh còn có thể tạm tha thứ, chứ một fan tiểu thuyết kỳ ảo mà chưa đọc cuốn phúc âm của thể loại kỳ ảo này thì không thể chấp nhận được.”\n\n     - Amazon.com\n\n“Cuốn thứ hai... là một tác phẩm phi thường: nỗi hứng khởi tinh ròng, lời văn sáng sủa, đạo lý thấm thía, ca tụng cái đẹp không dè dặt - mà hứng khởi vẫn là trên hết; nhưng đây lại là một câu chuyện đứng đắn và nghiêm khắc chứ chẳng hề gần gũi, chẳng phải những chuyến viếng thăm nho nhỏ về thế giới tuổi thơ.”\n\n      - New York Times\n\n“Là cảm hứng bất tận cho mô phỏng sau này, là đỉnh cao mãi mãi chưa ai vượt qua được.”\n\n      - Kansas City Star','Tiếng Việt',464,'15 x 24 cm',704,1562518800,'Nxb văn học','Bìa mềm','Đặng Trần Việt',56,138000,NULL,14,NULL,NULL,NULL,1615168739,'admin1',1,20),(22,20,'Sữa Và Mật','cover_image-1615169205873.jpg','“Tình yêu khiến hiểm nguy\n\nnơi anh trông tựa bình yên”\n\n“em muốn đôi tay anh\n\ngiữ lấy\n\nkhông phải đôi tay em\n\nđôi môi anh\n\nhôn lấy\n\nkhông phải đôi môi em\n\nmà là những nơi khác”\n\n“em mất anh từng chút một như em mất những sợi mi không hay biết và ở khắp nơi nơi”\n\nNhững bài thơ và văn trong Sữa và mật nói với ta về chuyện sống còn, cùng những trải nghiệm về bạo lực, về lạm dụng, về yêu đương, về mất mát, và trên hết, về nữ tính không ngừng rạng ngời. Sữa và mật là một chuyến viễn du xuyên qua những thời khắc đau khổ, để tìm thấy ở đó cả sữa lẫn mật ngọt, trong thân phận người nữ.\n\nVừa triết lý xa xăm, vừa nồng nàn nhục cảm, khi yếu mềm, lúc cứng cỏi, với Sữa và mật, Rupi Kaur đã cho ra đời một tập thơ nữ tính và đáo để và hấp dẫn đến mức làm khuynh đảo nền cả xuất bản Mỹ. Với 2,5 triệu lượt mua online, cùng hơn triệu bản in chỉ sau một năm ra mắt, và được dịch ra 25 ngôn ngữ trên thế giới, Sữa và mật đã thay đổi cái nhìn của người đọc về sự cuốn hút của thơ hiện đại.','Tiếng Việt',212,'14 x 20.5 cm',220,1570813200,'Nxb Hội Nhà Văn','Bìa mềm','Anh Thư',56,108000,NULL,13,NULL,NULL,NULL,1615169206,'admin1',1,20),(23,21,'Đào Uyên Minh Toàn Tập','cover_image-1615169718955.jpg','Đào Tiềm tự là Uyên Minh lại có tự là Nguyên Lượng, người Tầm Dương, Sài Tang (nay ở Tây Nam huyện Cửu Giang tỉnh Giang Tây). Ông sinh vào năm thứ 3 niên hiệu Ai Đế đời Đông Tấn (năm 365), mất năm thứ 4 niên hiệu Nguyên Gia vua Văn Đế đời Tống (năm 427), hưởng thọ 63 tuổi. Sau khi ông chết, bạn bè đặt thuỵ là Tịnh Tiết Trưng Sỹ, nên còn có tên là Đào Tịnh Tiết.\n\nĐào Uyên Minh là một tác gia quan trọng hàng đầu trong lịch sử văn học Trung Quốc, thơ Uyên Minh đều là những áng thơ ca bất hủ, được người đời tán thưởng. Ảnh hưởng của ông vượt ra ngoài cả Trung Hoa; các nước Nhật Bản, Pháp, Liên Xô đều đã xuất bản các bản dịch và chuyên luận nghiên cứu về ông. Đối với một tác gia quan trọng như vậy, việc giới thiệu và nghiên cứu là điều cần yếu.','Tiếng Việt',536,'15.5 x 23.5 cm',682,1536685200,'Nxb Tổng hợp TP.HCM','Bìa mềm','Trần Trọng Dương',29,175000,NULL,12,NULL,NULL,NULL,1615169719,'admin1',1,22),(24,22,'Một Ngày Rồi Thôi','cover_image-1615170074151.jpg','Kể từ ngày người vợ bỏ đi, ông Vĩnh Hoài đã phải chịu đựng khoảng thời gian cô đơn cùng cực, thế nhưng đây không phải chỉ là sự biến mất của một người vợ mà còn là của một người mẹ.\n\nHai chị em Diễm và Nguyện một mặt phải chứng kiến nỗi đau của cha, một mặt phải tự lớn lên giữa những cảm xúc xáo trộn của chính mình. Diễm đi qua một cuộc tình bấp bênh còn Nguyện tha thiết muốn biết tình yêu là gì. Diễm nhẹ nhàng đi tìm sự hàn gắn còn Nguyện vô tư lao vào đời như muốn phá mọi thứ tan ra.\n\nMột Ngày Rồi Thôi là câu chuyện về những trái tim khao khát yêu và khao khát được yêu. Câu chuyện về những người trẻ với tâm hồn thanh tao, mơ mộng, và phảng phất buồn tựa như những cơn mưa xứ Huế.\n\nTÁC GIẢ:\nNguyễn Thị Hoàng (sinh 1939) là một nhà văn, nhà thơ nữ Việt Nam.\nBà sinh ngày 11 tháng 12 năm 1939 tại Huế thuộc Liên bang Đông Dương. Năm 1957, bà chuyển vào sinh sống ở Nha Trang rồi đến năm 1960 bà vào Sài Gòn học Đại học Văn khoa và Luật nhưng bà bỏ ngang, không học hết mà lên Đà Lạt dạy học. Đến năm 1966, bà chuyển sang chuyên tâm viết tiểu thuyết.','Tiếng Việt',342,'14 x 20.5 cm',450,1610384400,'Nxb Hội Nhà Văn','Bìa mềm',NULL,34,140000,NULL,13,NULL,NULL,NULL,1615170075,'admin1',1,20),(25,23,'Phú Quốc Trong Mắt Kính Thần','cover_image-1615170347535.jpg','“Trong cuộc sống khi ta thiếu hụt thứ gì thì khát khao có được thứ đó. Thiếu ánh sáng là sự thiệt thòi nhất của người khiếm thị. Những giấc mơ ánh sáng là khát khao của những người không thấy được mặt trời. Nhưng thực tế với những người khiếm thị từ nhỏ không có ánh sáng cả trong những giấc mơ, thì khát vọng ánh sáng là nội dung chính của cuốn sách này. Với tất cả những người bình thường, ánh sáng đẹp nhất là lúc bình minh, khi vừa qua một đêm dài. Với những người khiếm thị được nhìn thấy mặt trời, ánh sáng chắc đẹp không thể có từ ngữ nào miêu tả được.”','Tiếng Việt',168,'13.5 x 20.5 cm',198,1583946000,'Nxb Tổng hợp TP.HCM','Bìa mềm',NULL,21,50000,NULL,12,NULL,NULL,NULL,1615170348,'admin1',1,22),(26,24,'50 Truyện Cổ Tích Hay Nhất Dành Cho Thiếu Nhi (Tái Bản 2019)','cover_image-1615171319545.jpg','Thế giới cổ tích từ lâu đã là một phần không thể thiếu trong tuổi thơ mỗi người. Qua lời kể của bà, của mẹ… các bé sẽ được đắm mình trong thế giới thần tiên với những ông Bụt, bà tiên, công chúa, hoàng tử… từ đó nuôi dưỡng tâm hồn trẻ. Vì thế các bố mẹ hãy đọc nhiều truyện cổ tích cho các bé nhé!\n\nMột người mẹ muốn con mình trở thành nhà khoa học giống như Einstein nên đã hỏi ông rằng, nên cho con mình đọc sách gì trong những năm tháng là học sinh để cháu có thể trở thành nhà bác học như ông.\n\nEinstein đã trả lời: “Nếu bà muốn bọn trẻ được thông minh, hãy đọc truyện cổ tích cho chúng nghe. Nếu bà muốn bọn trẻ thông minh hơn, hãy đọc cho các bé nghe nhiều truyện cổ tích hơn.”','Tiếng Việt',284,'13.5 x 20.5 cm',330,1552323600,'NXB Dân Trí','Bìa mềm',NULL,30,68000,NULL,11,NULL,NULL,NULL,1615171320,'admin1',1,23),(27,25,'Hành Trình Mùa Thu','cover_image-1615171515528.jpg','Heo Củn bị vứt ra đồng cỏ chỉ vài tiếng sau khi chào đời, nó phải tự mình xoay xở giữa đồng cỏ mênh mông. Cuộc sống ở đồng cỏ thật thú vị, các loài thú chung sống hòa thuận với nhau, thương mến nhau như thành viên trong gia đình. Đến một ngày, khu đồng cỏ đối diện với nguy cơ bị san bằng, tụi thú nhỏ quyết định đây là thời điểm phải ra đi để nhìn thế giới và khám phá nhiều điều thú vị bên ngoài đồng cỏ quen thuộc, chúng gọi đó là hành trình mùa thu.','Tiếng Việt',108,'13 x 20 cm',132,1552323600,'Nxb Trẻ','Bìa mềm',NULL,35,40000,NULL,12,NULL,NULL,NULL,1615171516,'admin1',1,6),(28,26,'Thiết Kỵ Vô Song - Trọn Bộ 3 Tập','cover_image-1615171993246.jpg','Bộ tiểu thuyết kiếm hiệp Thiết Kỵ Vô Song mô tả một bi kịch vĩnh viễn của con người. Bi kịch ấy dồn tích bởi: một là sự khám phá bản thân, hai là sự tranh đấu và ba là kết cục mãi mãi không minh bạch.\n\nNỗi bất hạnh của nhân vật chính Điền Phi Long bùng cháy bởi dòng nham thạch sục sôi của những suy nghĩ cực đoan và quan niệm man dại khủng khiếp chảy sâu kín dưới những mạch máu.\n\nCuộc tranh đấu bắt đầu một cách vô thức sau cái chết của người cha. Điền Phi Long đi tìm kẻ thù hữu hình, không hề hay biết mình đang bước vào cuộc quyết đấu với chính bản thể, một thứ bản thể hoang dã, vô hình nhưng quyền năng không giới hạn.\n\nBi kịch của Điền Phi Long đã được khơi ra, nhưng có chấm dứt hay không… có lẽ không bao giờ, bởi nó là số phận, là mâu thuẫn chung của con người.\n\nPhải chăng vì thế giới quá đen tối tàn bạo, Hình Nhất Phiến phản bội, Thanh Trần phản bội… cuối cùng đến A Thái cũng phản bội. Những người chưa phản bội là những người đã bị giết, như Phàn Liễu, Lý Túc… Vậy thì còn biết nương tựa vào ai để cứu mình nửa đây?\n\nGợi hình ở những đoạn tả cảnh. Thú vị ở những đoạn đối đáp, suy tư. Lời thoại cũng là một thế mạnh của tác phẩm, khiến người ta phải đăm chiêu ở những câu triết lý.\n\nGiọng văn lạnh lùng, nhưng không bao giờ chua xót. Có lẽ vì vậy mà cái hình ảnh quằn quại tàn tạ của Điền Phi Long, trong một tiểu trấn, dưới làn mưa bay và gió rét căm cắm, mãi mãi in sâu trong lòng người đọc.\n\nTrọn bộ Thiết Kỵ Vô Song gồm 3 tập\n\nTập 1: Quỷ Ảnh\n\nTập 2: Nhân Tính\n\nTập 3: Ma Tâm',NULL,624,'13.5 x 20.5 cm',624,1252688400,'Nxb văn học','Bìa mềm',NULL,50,90000,NULL,12,NULL,1616309126,'admin1',1615171994,'admin1',1,24),(29,27,'Diệp Gia Kiếm','cover_image-1615172182078.jpg','Bình Định là cái nôi võ thuật dân tộc, nơi phát xuất những anh hùng áo vải chống ngoại xâm như nhà Tây Sơn, anh hùng Mai Xuân Thưởng, và các võ tướng lừng danh như Trần Quang Diệu...\nTrong quá trình tồn tại của võ nghiệp, từ xa xưa đã trải qua những nếp sinh hoạt đặc biệt của địa phương để rồi tự nó nổi lên những phong trào khởi nghĩa như nhà Tây Sơn, phong trào cần vương như Mai Xuân Thưởng.\n\nTrong bộ sách này tác giả muốn nhắc lại truyền thống võ thuật dân tộc và quá trình sinh hoạt trong dân gian.\n\nLà một bộ tiểu thuyết về võ thuật tất nhiên có phần hư cấu, nhưng không ngoài mục đích đề cao võ học dân tộc và những phong tục địa phương từ ngàn xưa.\n\n\"Ai về Bình Định mà coi\n\nCon gái Bình Định đánh roi đi quyền\" (Ca dao Việt Nam)',NULL,420,'16 x 24 cm',572,1252688400,'Nxb Văn Nghệ TP.HCM','Bìa mềm',NULL,36,80000,NULL,12,NULL,1615291354,'admin1',1615172183,'admin1',1,25),(30,28,'Lược Sử Vạn Vật (Phiên Bản Dành Cho Nhà Khoa Học Nhí)','cover_image-1615174433661.jpg','Lược Sử Vạn Vật phiên bản gốc dành cho người lớn (cuốn sách này đã được Alpha Books xuất bản năm 2017 và tái bản nhiều lần) là cuốn sách phổ biến khoa học trình bày một cách ngắn gọn lịch sử nghiên cứu khoa học tự nhiên, những thành tựu khoa học trong các lĩnh vực khoa học tự nhiên chính: vật lý, hóa học, sinh học, địa chất, thiên văn… với nhiều tên tuổi, giai thoại và sự thật.\n\nVới cuốn sách này, người đọc sẽ biết được những giới hạn trong tri thức của con người về vũ trụ và cả về chính trái đất. Đây là cuốn sách khoa học phổ thông bán chạy nhất nước Anh năm 2005 với hơn 300.000 bản in. Nhà phê bình người Anh, Craig Brown thậm chí đã nhận xét rằng tác phẩm này xứng đáng bán được 500.000.000.000 cuốn (theo cách nói của chính Bryson, \"bằng với số proton có trong một dấu chấm câu\").\n\nTrong phiên bản rút gọn dành cho thiếu nhi của cuốn sách này, Bill Bryson đã tìm kiếm bí mật của không gian, thời gian; và lý giải bằng cách nào, chỉ với tỷ lệ mong manh, sự sống lại có thể đến được hành tinh tuyệt vời mà chúng ta gọi là nhà. Suốt hành trình đó, chúng ta sẽ gặp những nhà khoa học lập dị, những lý thuyết điên khùng với sức ảnh hưởng quá lâu dài, và những khám phá tình cờ sẽ thay đổi mãi mãi tiến trình phát triển của khoa học. \n\nKỹ năng kể chuyện của Bill Bryson sẽ khiến câu hỏi “Bao nhiêu?” cũng như “Là ai?” trong khoa học trở nên cuốn hút và dễ tiếp cận với mọi lứa tuổi.','Tiếng Việt',170,'21 x 28 cm',275,1600016400,'NXB Dân Trí','Bìa cứng','Nguyễn Linh Chi',28,350000,NULL,13,NULL,NULL,NULL,1615174434,'admin1',1,2),(31,29,'Cùng Laila Khám Phá Về Virus Corona','cover_image-1615175097203.jpg','Chứng kiến sự bối rối của nhiều phụ huynh khi phải giải thích cho con cái về dịch bệnh đã buộc các trường học đóng cửa và xã hội phải thực hiện dãn cách, Nicole Vascotto đã quyết định đăng lên mạng xã hội một bài viết. Trong vòng chưa đầy 36 tiếng đồng hồ, bài đăng đã đạt hàng trăm nghìn lượt xem, đồng thời được nhiều trường học, chính quyền thành phố, các hiệu thuốc, các nhà tâm lý và các chuyên gia chia sẻ. Bài đăng ấy chính là tiền thân của Cùng Laila khám phá về virus corona.\n\nXuất bản hồi tháng Ba năm 2020 tại Ý, một trong những tâm dịch lớn của thế giới, cuốn sách nhỏ với tranh minh họa bắt mắt này hy vọng sẽ mang lại những giải thích khoa học đơn giản mà đầy đủ cho các bé về loại virus đã khiến cả thế giới chao đảo suốt thời gian qua.\n\nMột số câu hỏi mà cuốn sách sẽ trả lời cho các bạn nhỏ:\n\n- Virus corona gây bệnh Covid 19 là gì?\n\n- Nó hoạt động và lây lan như thế nào?\n\n- Tại sao em phải tạm nghỉ học một thời gian cho dù chính em không ốm sốt?\n\n- Tại sao mọi người lại hoang mang đến vậy? Ta có nên sợ hãi không?\n\n- Em có thể làm gì để giúp kiểm soát dịch bệnh này?','Tiếng Việt',48,'15 x 15 cm',110,1598806800,'NXB Dân Trí','Bìa mềm','Thủy Luna',50,49000,NULL,12,NULL,NULL,NULL,1615175098,'admin1',1,20),(32,30,'Phát Triển Trí Tuệ Cảm Xúc - Chúng Mình Tôn Trọng Cơ Thể Và Cảm Xúc Của Nhau','cover_image-1615175566609.jpg','Hữu ích cho phụ huynh và trẻ 3+\n\nBộ sách thiết thực này là kết hợp giữa những minh họa trực quan cao độ và chủ đề giáo dục trọng yếu. Tất các cuốn sách trong bộ đều có Phần câu hỏi thảo luận để hỗ trợ phụ huynh khơi gợi và dẫn dắt những cuộc trò chuyện với trẻ về cảm xúc, nỗi lo lắng, thất bại, sự tử tế, bảo vệ thân thể, bình đẳng giới và đa dạng giới,... Bộ sách là công cụ giúp trẻ nói lên tiếng nói của mình và khuyến khích trẻ tham gia chủ động, tích cực vào việc học hỏi.\n\n“Trẻ em được tôn trọng và trao quyền từ nhỏ sẽ trở thành những người lớn độc lập, tự tin, có chính kiến.” – Jayneen Sanders\n\nVỀ TÁC GIẢ:\n\nJayneen Sanders là nhà giáo dục, nhà hoạt động vì quyền trẻ em, tác giả bộ sách AN TOÀN CHO CON YÊU và nhiều bộ sách giáo dục đạt giải thưởng của Hiệp hội xuất bản Úc. Cô cũng là đồng sáng lập nhà xuất bản Educate2Empower chuyên về sách giáo dục An toàn thân thể, Bình đẳng giới và Trí tuệ cảm xúc cho thiếu nhi. Cô Jayneen vận động không ngừng nghỉ để An toàn thân thể được đưa vào giáo dục trong cộng đồng. Mong muốn lớn nhất của cô là được thấy MỌI trường học ở Úc (và trên toàn thế giới) đưa Giáo dục An toàn thân thể trở thành một môn học.\n\n------------\n\nCHÚNG MÌNH TÔN TRỌNG CƠ THỂ VÀ CẢM XÚC CỦA NHAU\n\nMỗi ngày, con học thêm những điều mới để lớn lên. Con học cách thế giới vận hành thế nào, mọi người sống vui vẻ bên nhau ra sao. Con học cách làm người tử tế, biết quan tâm và tôn trọng mọi người. Con cũng học cách giữ an toàn cho bản thân và mọi người nữa.\n\n“Chúng mình tôn trọng cơ thể và cảm xúc của nhau!” giúp phụ huynh trò chuyện cùng con về bảo vệ thân thể, tôn trọng cảm xúc của mình và mọi người.\n\n- Tình huống quen thuộc\n\n- Câu hỏi thảo luận ở cuối sách\n\n- Kiến thức về Ranh Giới Cơ Thể và Mạng Lưới An Toàn của trẻ','Tiếng Việt',40,'18 x 24 cm',110,1600362000,'NXB Dân Trí','Bìa mềm','Phương Thủy',55,50000,NULL,12,NULL,NULL,NULL,1615175567,'admin1',1,20),(33,31,'Bé Nhận Thức Thế Giới- Mọi Thứ Ở Đâu? (Song Ngữ)','cover_image-1615175845300.jpg','SÁCH TRANH SONG NGỮ VIỆT - ANH CHO BÉ TỪ 1-6 TUỔI\n\nBé nhận thức thế giới là bộ sách gồm 4 cuốn cung cấp kiến thức về các sự vật, sự việc, những điều nên và không nên trong đời sống hằng ngày cho các bé từ 1-6 tuổi qua loạt hình vẽ rực rỡ sinh động. Song ngữ Việt-Anh giúp phát triển khả năng ngôn ngữ.\n\nSách in màu trên giấy couche nhập khẩu.','Tiếng Việt',48,'20.5 x 18 cm',100,1597856400,'Nxb Hà Nội','Bìa mềm','Hoang Nhi Nho',39,49000,NULL,12,NULL,NULL,NULL,1615175846,'admin1',1,20),(35,32,'Hồ Chí Minh: Từ Việc Nhỏ - Người Học Trò Nhỏ Nhìn Từ Thế Kỷ XXI','cover_image-1615285065751.jpg','Cả cuộc đời của Bác là một kho sách dễ hiểu. Tập hợp vô vàn việc nhỏ, câu nói với các giới, các tầng lớp đồng bào mà Người làm, tiếp xúc hằng ngày trong tư cách người lãnh đạo tối cao của đất nước từ những ngày đầu tại Pác Bó... sắp xếp, hệ thống lại và từ đó đúc kết thành những bài học thành công lớn như thực tiễn đã chứng minh.\n\nNhững câu nói, viết của Bác với “thanh niên, phụ nữ, các cụ ông, cụ bà đến các cháu thiếu niên đều thích nghe, thích đọc và nghe, đọc thì đều hiểu” vì đó là tiếng nói mà Người cúi xuống để nâng đỡ mọi người lên ngang tầm của thời đại - như Cố Thủ tướng Phạm Văn Đồng, người gần gũi lãnh tụ trong nhiều năm mới cảm nhận được hình tượng cao quý này.\n\nĐó là một khoa học, một nghệ thuật về quản lý con người mà Hồ Chí Minh, người tự nhận mình là một Người học trò nhỏ của các thời đại, đã thức tỉnh và huy động sức mạnh tổng hợp của toàn dân tộc đứng lên tự giải phóng cho mình; tiếp theo phải đương đầu với các thế lực đế quốc - thực dân hung bạo mưu đồ cướp nước ta, cai trị nhân dân ta, biến nhân dân ta thành nô lệ hoặc phụ thuộc chúng trong các cuộc chiến tranh xâm lược đẫm máu thế kỷ XX. Đồng thời lay động cả thế giới bị thực dân áp bức vùng lên tranh đấu vì tự do và công lý, góp phần quan trọng xóa bỏ chế độ thực dân cũ trên phạm vi toàn cầu, đánh đòn chí mạng ý chí xâm lược của chủ nghĩa thực dân mới, chủ nghĩa bành trướng bá quyền của giới phản động quốc tế.','Tiếng Việt',376,'16 x 24 cm',440,1534698000,'NXB Hồng Đức','Bìa mềm',NULL,39,95000,NULL,16,NULL,1615285066,'admin1',1615176412,'admin1',1,13),(36,33,'Nhân Vật Nổi Tiếng Thế Giới - Các Lãnh Tụ Lẫy Lừng','cover_image-1615176568774.jpg','Mong muốn được sống tử tế và sống có ích là điều then chốt tạo nên một cuộc sống hạnh phúc cho bạn trong tương lai. Các nhà lãnh đạo tự cổ chí kim đều mang trong mình những tố chất khơi gợi cảm hứng ấy và truyền cho bạn động lực bước lên những nấc thang mới.\n\nCuốn sách này không chỉ là tiểu sử khô cứng của 300 vị lãnh tụ từ Đông sang Tây, sách tập trung mô tả những điểm nhấn xuất sắc trong cuộc đời họ. Những điểm sáng ấy sẽ trở thành trời sao lấp lánh soi cho bạn nhìn rõ con đường của mình trong tương lai.\n\nHọc hỏi những nhà lãnh đạo xuất sắc của toàn nhân loại vô cùng hữu ích cho sự trưởng thành của bạn!','Tiếng Việt',126,'24 x 31 cm',1320,1597856400,'Nxb Hà Nội','Bìa cứng','Cao Thu Thủy',45,195000,NULL,12,NULL,NULL,NULL,1615176569,'admin1',1,20),(37,34,'Hãy Chọn Một Cách Sống','cover_image-1615189704162.jpg','Nếu có một điều mà bạn nhất định phải nhớ trong cuộc đời này, thì đó chính là: Luôn luôn có một cách sống tốt hơn, chỉ là bạn chưa từng lựa chọn nó mà thôi!\n\nBạn vẫn luôn thắc mắc tại sao người này lại có thể thành công đến như vậy, trong khi người kia thì lại không. Phải chăng là vì họ vừa sinh ra đã ngậm thìa vàng? Hay vì họ được trời phú cho một khả năng thiên bẩm nào đó, mà dù có cố gắng cả đời thì bạn cũng chưa chắc đã có được? Hàng trăm, hàng ngàn có mở đầu bằng “tại vì” xuất hiện trong đầu bạn. Đáng tiếc là chẳng có cái cớ nào là đúng cả. Họ thành công vì họ nắm giữ một bí mật - và bí mật đó mang tên là “lựa chọn”.\n\nTrong cuộc đời mỗi người, ai cũng có ít nhất một lần thất bại. Nhưng thất bại không to tát như bạn vẫn nghĩ. Thất bại sẽ là dấu chấm hết, nếu bạn mãi nằm ở đó. Nhưng thất bại cũng chính là khởi đầu cho một sự thành công, nếu bạn biết đứng lên và đi tiếp. Hãy cứ ước mơ và sẵn sàng đánh đổi vì ước mơ đó. Bạn nên nhớ, bạn là những gì bạn làm được, chứ không phải là những gì bạn dự định sẽ làm.\n\nOg Mandino đã từng là người đàn ông chìm đắm trong chuỗi ngày dài của sự thất bại và bê bối: li hôn, say xỉn, bị bắt giam và tệ hơn là từng có ý định kết liễu đời mình. Nhưng sau đó, ông đã tự mình vực dậy tinh thần và chọn một ngả rẽ khác. Ông bắt đầu bằng việc đắm chìm vào những cuốn sách tự lực và thực hiện theo những quy tắc thành công. Ông đã áp dụng những gì mình tích lũy được vào các công việc mình đảm nhận. Dần dần, với nhiều nỗ lực, Og Mandino từ một người nghiện rượu, trở thành quản lý bán hàng rồi trở thành tổng biên tập của tờ báo Success Unlimited. Ông có được thành quả ấy là vì ông đã lựa chọn chúng. Ngày nay, Og Mandino còn được biết đến là một nhà truyền cảm hứng hàng đầu thế giới, là tác giả của những cuốn sách bán chạy nhất theo New York Times, và cũng là tác giả của cuốn sách bạn sắp khám phá – Hãy chọn một cách sống.\n\nHãy chọn một cách sống được xem như một kim chỉ nam, giúp người đọc tìm thấy con đường dẫn đến hạnh phúc cho chính mình. Thông qua 17 quy tắc, cây bút truyền cảm hứng hàng đầu thế giới đã trao cho người đọc một “liều thuốc” để phát triển nội tâm và đặt chân đến cuộc sống thịnh vượng. 17 quy tắc chính là 17 lời giải đáp cho những vướng mắc về mặt tâm lý của chúng ta. Những điều ấy rất đỗi bình thường, xảy ra hằng ngày, nhưng chúng ta lại hầu như không thể nhận ra và cũng không tự mình tìm được hướng giải quyết. Đó là lý do tại sao chúng ta luôn thấy cuộc đời mình trúc trắc, trong khi của người khác thì lại suôn sẻ. Mỗi ngày, bạn chỉ cần tập trung và làm tốt một quy tắc là đủ. Dần dần, bạn sẽ thấy thái độ sống của mình tích cực hơn, vui vẻ hơn. Kết quả là bạn sẽ tìm thấy được sự mỹ mãn và bình an trong chính tâm hồn và cuộc đời của mình.\n\nNếu có một điều mà bạn nhất định phải nhớ trong cuộc đời này, thì đó chính là: luôn luôn có một cách sống tốt hơn, chỉ là bạn chưa từng lựa chọn nó mà thôi.','Tiếng Việt',152,'13 x 20.5 cm',300,1609693200,'Nxb Tổng hợp TP.HCM','Bìa mềm','Đỗ Hoàng Phương An',45,78000,NULL,12,NULL,NULL,NULL,1615189705,'admin1',1,8),(38,35,'Ứng Biến Giữa Đời Vạn Biến','cover_image-1615189938572.jpg','Cuộc sống luôn thay đổi và biến hóa với những điều bất ngờ không thể nào tránh được. Nếu cứ tuân thủ quy luật, đi theo lối mòn và quanh quẩn trong vòng an toàn, bạn sẽ tụt hậu và bị đào thải. Bạn cần học cách sáng tạo và đổi mới. Để làm được như thế, hãy trở nên linh hoạt, thêm một chút hài hước và phải tập trung - Đó chính là ỨNG BIẾN.\n\nỨng Biến Giữa Đời Vạn Biến  sẽ đem đến cho bạn những lời khuyên hữu ích, những lập luận dí dỏm và những ví dụ thực tế, để bạn có thể thỏa sức thể hiện và sáng tạo trên sân khấu cuộc đời của chính mình.','Tiếng Việt',164,'13.5 x 21 cm',250,1609261200,'NXB Hồng Đức','Bìa mềm','Thế Anh',59,59000,NULL,13,NULL,NULL,NULL,1615189939,'admin1',1,10);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `acc_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`acc_id`,`book_id`),
  KEY `fk_cart_book_idx` (`book_id`),
  CONSTRAINT `fk_cart_acc` FOREIGN KEY (`acc_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `fk_cart_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (35,9,8),(35,11,4),(35,14,7);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  `odering` int DEFAULT NULL,
  `created_at` int DEFAULT NULL,
  `created_by` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` int DEFAULT NULL,
  `updated_by` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint DEFAULT '1',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (5,'Sách Kinh Tế',0,-1,NULL,1614090046,'admin1',NULL,NULL,1),(6,'Sách Văn Học Nước Ngoài',0,-1,NULL,1614090115,'admin1',NULL,NULL,1),(7,'Sách Văn Học Trong Nước',0,-1,NULL,1614090125,'admin1',NULL,NULL,1),(8,'Sách Thiếu Nhi',0,-1,NULL,1614090136,'admin1',NULL,NULL,1),(9,'Sách Phát Triển Bản Thân',0,-1,NULL,1614090149,'admin1',NULL,NULL,1),(10,'Ngoại Thương',0,5,NULL,1614090257,'admin1',NULL,NULL,1),(11,'Quản Trị - Lãnh Đạo',0,5,NULL,1614090271,'admin1',NULL,NULL,1),(12,'Nhân Sự & Việc Làm',0,5,NULL,1614090297,'admin1',NULL,NULL,1),(13,'Tài Chính & Tiền Tệ',0,5,NULL,1614090307,'admin1',NULL,NULL,1),(14,'Tiểu thuyết tình yêu',0,6,NULL,1614090357,'admin1',NULL,NULL,1),(15,'Truyện Ngắn',0,6,NULL,1614090364,'admin1',NULL,NULL,1),(16,'Truyện Viễn Tưởng',0,6,NULL,1614090384,'admin1',NULL,NULL,1),(17,'Thơ ca',0,6,NULL,1614090416,'admin1',NULL,NULL,1),(18,'Truyện Dài',0,7,NULL,1614090426,'admin1',NULL,NULL,1),(19,'Truyện thiếu nhi',0,7,NULL,1614090446,'admin1',NULL,NULL,1),(20,'Truyện kiếm hiệp',0,7,NULL,1614090450,'admin1',NULL,NULL,1),(23,'Khoa học tự nhiên',0,8,NULL,1614090603,'admin1',NULL,NULL,1),(24,'Khoa học xã hội',0,8,NULL,1614090609,'admin1',NULL,NULL,1),(25,'Sách học làm người',0,9,NULL,1614090661,'admin1',NULL,NULL,1),(26,'Danh nhân văn hóa',0,9,NULL,1614090667,'admin1',NULL,NULL,1),(27,'1234',0,-1,NULL,1614927119,'admin1',1614937170,'admin1',0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_detail`
--

DROP TABLE IF EXISTS `category_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_detail` (
  `category_id` int NOT NULL,
  `book_id` int NOT NULL,
  PRIMARY KEY (`category_id`,`book_id`),
  KEY `cat_fk_book_idx` (`book_id`),
  CONSTRAINT `cat_fk_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  CONSTRAINT `cat_fk_cat` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_detail`
--

LOCK TABLES `category_detail` WRITE;
/*!40000 ALTER TABLE `category_detail` DISABLE KEYS */;
INSERT INTO `category_detail` VALUES (5,8),(10,8),(5,9),(10,9),(5,10),(11,10),(5,11),(11,11),(5,12),(11,12),(5,13),(12,13),(5,14),(13,14),(5,15),(13,15),(6,16),(14,16),(6,17),(14,17),(6,18),(15,18),(6,19),(15,19),(6,20),(16,20),(6,21),(16,21),(6,22),(17,22),(6,23),(17,23),(7,24),(18,24),(7,25),(18,25),(7,26),(19,26),(7,27),(19,27),(7,28),(20,28),(7,29),(20,29),(8,30),(23,30),(8,31),(23,31),(8,32),(24,32),(8,33),(24,33),(9,35),(26,35),(9,36),(26,36),(9,37),(25,37),(9,38),(25,38);
/*!40000 ALTER TABLE `category_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int unsigned NOT NULL,
  `acc_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `is_first_comment` bit(1) DEFAULT b'0' COMMENT '0 - false\n1 - true',
  `parent_comment_id` int DEFAULT NULL,
  `created_at` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_fk_book_idx` (`book_id`),
  KEY `comment_fk_account_idx` (`acc_id`),
  CONSTRAINT `comment_fk_account` FOREIGN KEY (`acc_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `comment_fk_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite`
--

DROP TABLE IF EXISTS `favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite` (
  `acc_id` int NOT NULL,
  `book_id` int NOT NULL,
  PRIMARY KEY (`acc_id`,`book_id`),
  KEY `favourite_fk_book_idx` (`book_id`),
  CONSTRAINT `favourite_fk_account` FOREIGN KEY (`acc_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `favourite_fk_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite`
--

LOCK TABLES `favourite` WRITE;
/*!40000 ALTER TABLE `favourite` DISABLE KEYS */;
INSERT INTO `favourite` VALUES (35,8),(35,9),(35,11),(35,13),(35,14),(35,17),(35,25),(35,26),(42,26);
/*!40000 ALTER TABLE `favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `news_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` int DEFAULT NULL,
  `created_by` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published_at` int DEFAULT NULL,
  `published_by` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` int DEFAULT NULL,
  `updated_by` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint DEFAULT NULL COMMENT '0 - draft\n1 - published\n2 - pending\n3 - approved',
  PRIMARY KEY (`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publishing_house`
--

DROP TABLE IF EXISTS `publishing_house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publishing_house` (
  `publishing_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `created_at` int DEFAULT NULL,
  `created_by` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_at` int DEFAULT NULL,
  `updated_by` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `active` tinyint DEFAULT '1',
  PRIMARY KEY (`publishing_id`),
  UNIQUE KEY `publishing_id_UNIQUE` (`publishing_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publishing_house`
--

LOCK TABLES `publishing_house` WRITE;
/*!40000 ALTER TABLE `publishing_house` DISABLE KEYS */;
INSERT INTO `publishing_house` VALUES (2,'Alpha books','image-1614913980448.jpg','Alpha Books là một trong những thương hiệu hàng đầu tại Việt Nam về mảng sách quản trị kinh doanh và giáo dục, tư duy với nhiều dòng sách mới hấp dẫn, từng bước trở thành người bạn thân thiết của hàng triệu độc giả Việt Nam.',1614913981,'admin1',NULL,NULL,1),(6,'NXB Trẻ','image-1614915930502.jpg','Nhà xuất bản Trẻ xuất bản sách và văn hóa phẩm các loại, phục vụ chủ yếu cho thanh niên, thiếu nhi, tổ chức Đoàn các cấp của thành phố, đồng thời phục vụ bạn đọc trong và ngoài nước. Đây là một trong những đơn vị sớm nhất kí và tuân thủ Công ước Berne năm 2003.',1614915931,'admin1',NULL,NULL,1),(7,'Kinh Tế',NULL,NULL,1614915961,'admin1',NULL,NULL,1),(8,'Trí Việt','image-1614916097238.jpg','First News đã có gần 1000 đầu sách và ấn phẩm các loại phát hành với hàng triệu bản in được bạn đọc yêu thích thuộc các tủ sách: Sống đẹp, Hạt giống Tâm hồn, Quản lý, Kinh doanh, Phong thủy, Y học Gia đình, Thường thức Gia đình, Danh nhân, Thiếu nhi, Ngoại ngữ, Tin học, Điện tử, Kiến trúc, Âm nhạc và Văn học. Sách Sống đẹp và Hạt Giống Tâm Hồn viết về những chia sẻ con người và cuộc sống đã được bạn đọc cả nước nồng nhiệt đón nhận. Trong đó bộ sách Chicken Soup for the Soul gồm hơn 20 quyển của hai tác giả Jack Canfield và Mark Victor Hansen đã được ra mắt độc giả. Đây là bộ truyện song ngữ được biên dịch một cách công phu và tỉ mỉ với những câu chuyện rất đỗi đời thường nhưng thấm đẫm tình người, xứng đáng là quà tặng cuộc sống dành cho nhau.',1614916098,'admin1',NULL,NULL,1),(9,'Thái Hà','image-1614916174256.jpg','Cty sách Thái Hà Books với cam kết tạo ra những cuốn sách có chất lượng, có giá trị, luôn bắt kịp xu thế thời đại, 100% sách có bản quyền và tầm nhìn Hội tụ tri thức - Kết nối tương lai, Sách Thái Hà được độc giả biết đến với các tủ sách nổi bật: *V- Biz: Sách cung cấp kinh nghiệm, kỹ năng mang tính ứng dụng cao tới các nhà lãnh đạo, những người quản lý qua các tựa sách kinh doanh, sách doanh nhân. *V-Buddism: Sách Phật và Tâm linh. *V-Parents: Sách dành cho cha mẹ để nuôi dạy con cái khỏe mạnh, thông minh và có tư cách đạo đức tốt. *V-Teen: Sách giúp tháo gỡ vướng mắc, khơi dậy tiềm năng, định hướng nghề nghiệp cho tuổi mới lớn. *V-Smile: Sách giúp mọi người sống hạnh phúc, yêu đời và có ích. Một số sách văn học, truyện tiểu thuyết và sách kinh tế hay của Thái Hà Books: Đọc Vị Bất Kỳ Ai - Để Không Bị Lừa Dối Và Lợi Dụng, 42 Năm Làm Ăn Tại Mỹ Và Trung Quốc, Tam Quốc @ Diễn Nghĩa, Em Gái Của Trời, Chuyện Nhỏ Sài Gòn ...',1614916175,'admin1',NULL,NULL,1),(10,'Văn Lang',NULL,NULL,1614916203,'admin1',NULL,NULL,1),(11,'Nhân Văn',NULL,NULL,1614916231,'admin1',NULL,NULL,1),(12,'abc','image-1614926780212.jpg','',NULL,NULL,1614928416,'admin1',0),(13,'Phương Nam',NULL,NULL,1614926173,'admin1',NULL,NULL,1),(14,'FAHASA','image-1614926254547.jpg','Mạng lưới phát hành của Công ty FAHASA rộng khắp trên toàn quốc, gồm 5 Trung tâm sách, 1 Xí nghiệp in và với gần 60 Nhà sách trải dọc khắp các tỉnh thành từ TP.HCM đến Thủ Đô Hà Nội, miền Trung, Tây Nguyên, miền Đông và Tây Nam Bộ như: Hà Nội, Vĩnh Phúc, Hải Phòng, Thanh Hóa, Hà Tĩnh, Huế, Đà Nẵng, Quảng Nam, Quảng Ngãi, Quy Nhơn, Nha Trang, Gia Lai, Đăklăk, Bảo Lộc - Lâm Đồng, Ninh Thuận, Bình Thuận, Bình Phước, Bình Dương, Đồng Nai, Vũng Tàu, Long An, Tiền Giang, Bến Tre, Vĩnh Long, Cần Thơ, Hậu Giang, An Giang, Kiên Giang, Sóc Trăng, Cà Mau.\nSách quốc văn với nhiều thể loại đa dạng như sách giáo khoa – tham khảo, giáo trình, sách học ngữ, từ điển, sách tham khảo thuộc nhiều chuyên ngành phong phú: văn học, tâm lý – giáo dục, khoa học kỹ thuật, khoa học kinh tế - xã hội, khoa học thường thức, sách phong thủy, nghệ thuật sống, danh ngôn, sách thiếu nhi, truyện tranh, truyện đọc, từ điển, công nghệ thông tin, khoa học – kỹ thuật, nấu ăn, làm đẹp...  của nhiều Nhà xuất bản, nhà cung cấp sách có uy tín như: NXB Trẻ, Giáo Dục, Kim Đồng, Văn hóa -Văn Nghệ, Tổng hợp TP.HCM, Chính Trị Quốc Gia; Công ty Đông A, Nhã Nam, Bách Việt, Alphabook, Thái Hà, Minh Lâm, Đinh Tị, Minh Long, TGM, Sáng Tạo Trí Việt, Khang Việt, Toàn Phúc…\nSách ngoại văn bao gồm: từ điển, giáo trình, tham khảo, truyện tranh thiếu nhi , sách học ngữ, từ vựng, ngữ pháp, luyện thi TOEFL, TOEIC, IELS…được nhập từ các NXB nước ngoài như: Cambridge, Mc Graw-Hill, Pearson Education, Oxford, Macmillan, Cengage Learning…',1614926255,'admin1',NULL,NULL,1),(15,'Bookshop-Loc',NULL,NULL,1614926290,'admin1',1614928361,'admin1',0),(16,'Đông Tây',NULL,NULL,1614938076,'admin1',NULL,NULL,1),(17,'Thông tin việt',NULL,NULL,1614941033,'admin1',NULL,NULL,1),(18,'Saigon Books',NULL,NULL,1614941840,'admin1',NULL,NULL,1),(19,'BIZBooks',NULL,NULL,1615129320,'admin1',NULL,NULL,1),(20,'Nhã Nam','image-1615130069567.jpg','Nhã Nam là một đơn vị phát hành sách văn học, văn hóa và triết học, tập trung vào mảng văn học dịch. Tác phẩm do Nhã Nam phát hành là những ấn bản kinh điển xen lẫn hiện đại bán chạy trên thế giới, trong đó có những tác giả được giải Nobel như: Elfriede Jelinek, Orhan Pamuk; Booker như: Yann Martel, John Banville; Goncourt như: Laurent Gaudé và các tác giả ăn khách như Murakami Haruki, Marc Levy...',1615130070,'admin1',NULL,NULL,1),(21,'AZ books','image-1615130688530.jpg','Công ty cổ phần sách Văn Việt - Văn Việt Books được thành lập tháng 9 năm 2010, là doanh nghiệp hoạt động trong lĩnh vực xuất bản. Đến nay Văn Việt Books đã khẳng định được chỗ đứng trên thị trường với nhiều thương hiệu sách uy tín. Với những tiểu thuyết hay, tiểu thuyết tình cảm, truyện ngôn tình, đam mỹ như Mùa hạ chung tình, Nếu em là tiểu thuyết của anh, 7 ngày để nói anh yêu em,...',1615130689,'admin1',NULL,NULL,1),(22,'NXBTH TPHCM',NULL,NULL,1615169459,'admin1',NULL,NULL,1),(23,'Huy Hoàng','image-1615171205473.jpg','HUY HOÀNG thành lập từ năm 1996. Sau 18 năm hoạt động, Huy Hoang Bookstore hiện nay đã tạo dựng cho mình một vị trí vững vàng trên thị trường xuất bản, phát hành và in ấn các loại ấn phẩm và nhận được nhiều sự yêu mến từ độc giả.',1615171206,'admin1',NULL,NULL,1),(24,'NS Kiến Thức',NULL,NULL,1615171820,'admin1',NULL,NULL,1),(25,'Phương Đông',NULL,NULL,1615172084,'admin1',NULL,NULL,1);
/*!40000 ALTER TABLE `publishing_house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale` (
  `sale_id` int NOT NULL AUTO_INCREMENT,
  `active` tinyint DEFAULT '1' COMMENT '0 - inactive\\\\\\\\\\\\\\\\n1 - active',
  `percent` double DEFAULT NULL,
  `date_start` int DEFAULT NULL,
  `date_end` int DEFAULT NULL,
  `created_at` int DEFAULT NULL,
  `created_by` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_at` int DEFAULT NULL,
  `updated_by` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`sale_id`),
  UNIQUE KEY `sale_id_UNIQUE` (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
INSERT INTO `sale` VALUES (11,1,10,1614939782,1625480580,1614939860,'admin1',NULL,NULL),(12,1,20,1614939782,1625480580,1614940806,'admin1',NULL,NULL),(13,1,15,1614939782,1625480580,1615129248,'admin1',NULL,NULL),(14,1,14,1614939782,1625480580,1615168292,'admin1',NULL,NULL),(15,1,40,1614939782,1625480580,1615171664,'admin1',NULL,NULL),(16,1,11,1614939782,1625480580,1615176303,'admin1',NULL,NULL);
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-26 10:09:22
