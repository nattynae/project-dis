-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: reg_data
-- ------------------------------------------------------
-- Server version	5.7.21-log

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
-- Table structure for table `building`
--

DROP TABLE IF EXISTS `building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `building` (
  `BABname` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `BTname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `BEname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FID` int(2) NOT NULL,
  PRIMARY KEY (`BABname`),
  KEY `faculty_fk_idx` (`FID`),
  CONSTRAINT `faculty_fk` FOREIGN KEY (`FID`) REFERENCES `faculty` (`FID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
/*!40000 ALTER TABLE `building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `CID` int(7) NOT NULL,
  `credit` int(1) DEFAULT NULL,
  `CTname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CEname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CABname` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum`
--

DROP TABLE IF EXISTS `curriculum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curriculum` (
  `FID` int(2) NOT NULL,
  `deptTname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cyear` year(4) NOT NULL,
  PRIMARY KEY (`FID`,`deptTname`),
  KEY `dep_fk_idx` (`deptTname`),
  CONSTRAINT `fac_dep_fk` FOREIGN KEY (`FID`, `deptTname`) REFERENCES `department` (`FID`, `depTname`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum`
--

LOCK TABLES `curriculum` WRITE;
/*!40000 ALTER TABLE `curriculum` DISABLE KEYS */;
/*!40000 ALTER TABLE `curriculum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculumcourse`
--

DROP TABLE IF EXISTS `curriculumcourse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curriculumcourse` (
  `FID` int(2) NOT NULL,
  `depTname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `CID` int(7) NOT NULL,
  PRIMARY KEY (`FID`,`depTname`,`CID`),
  KEY `course_fk_idx` (`CID`),
  CONSTRAINT `course_fk` FOREIGN KEY (`CID`) REFERENCES `course` (`CID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cur_fk` FOREIGN KEY (`FID`, `depTname`) REFERENCES `curriculum` (`FID`, `deptTname`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculumcourse`
--

LOCK TABLES `curriculumcourse` WRITE;
/*!40000 ALTER TABLE `curriculumcourse` DISABLE KEYS */;
/*!40000 ALTER TABLE `curriculumcourse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `FID` int(2) NOT NULL,
  `depTname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `depEname` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`FID`,`depTname`),
  CONSTRAINT `f_fk` FOREIGN KEY (`FID`) REFERENCES `faculty` (`FID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `DID` int(10) NOT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CRXX` int(2) DEFAULT NULL,
  `docstatus` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` int(3) DEFAULT NULL,
  PRIMARY KEY (`DID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `education` (
  `person_ssn` int(13) NOT NULL,
  `degree` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `field` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `college` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `gradyear` year(4) DEFAULT NULL,
  PRIMARY KEY (`person_ssn`,`college`,`field`,`degree`),
  CONSTRAINT `person_fk` FOREIGN KEY (`person_ssn`) REFERENCES `person` (`SSN`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exam` (
  `BABname` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `room#` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `CID` int(7) NOT NULL,
  `academicyear` year(4) NOT NULL,
  `term` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `examday` char(3) COLLATE utf8_unicode_ci NOT NULL,
  `starttime` time(4) DEFAULT NULL,
  `endtime` time(4) DEFAULT NULL,
  `type` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`BABname`,`room#`,`CID`,`academicyear`,`term`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faculty` (
  `FID` int(2) NOT NULL,
  `FTname` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FEname` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institution`
--

DROP TABLE IF EXISTS `institution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `institution` (
  `IEname` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ITname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ITname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institution`
--

LOCK TABLES `institution` WRITE;
/*!40000 ALTER TABLE `institution` DISABLE KEYS */;
/*!40000 ALTER TABLE `institution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutionroom`
--

DROP TABLE IF EXISTS `institutionroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `institutionroom` (
  `room#` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `BABname` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `ITname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`room#`,`BABname`,`ITname`),
  KEY `inroom_fk2` (`ITname`),
  CONSTRAINT `inroom_fk1` FOREIGN KEY (`room#`, `BABname`) REFERENCES `room` (`room#`, `BABname`),
  CONSTRAINT `inroom_fk2` FOREIGN KEY (`ITname`) REFERENCES `institution` (`ITname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutionroom`
--

LOCK TABLES `institutionroom` WRITE;
/*!40000 ALTER TABLE `institutionroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `institutionroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manage`
--

DROP TABLE IF EXISTS `manage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manage` (
  `DID` int(10) NOT NULL,
  `officer_ssn` int(13) NOT NULL,
  PRIMARY KEY (`DID`,`officer_ssn`),
  KEY `manage_fk2_idx` (`officer_ssn`),
  CONSTRAINT `manage_fk1` FOREIGN KEY (`DID`) REFERENCES `document` (`DID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `manage_fk2` FOREIGN KEY (`officer_ssn`) REFERENCES `personel` (`SSN`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manage`
--

LOCK TABLES `manage` WRITE;
/*!40000 ALTER TABLE `manage` DISABLE KEYS */;
/*!40000 ALTER TABLE `manage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officer`
--

DROP TABLE IF EXISTS `officer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `officer` (
  `SSN` int(13) NOT NULL,
  `Institution_IEname` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officer`
--

LOCK TABLES `officer` WRITE;
/*!40000 ALTER TABLE `officer` DISABLE KEYS */;
/*!40000 ALTER TABLE `officer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `open_course`
--

DROP TABLE IF EXISTS `open_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `open_course` (
  `CID` int(7) NOT NULL,
  `academicyear` year(4) NOT NULL,
  `term` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`CID`,`academicyear`,`term`),
  CONSTRAINT `open_fk` FOREIGN KEY (`CID`) REFERENCES `course` (`CID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `open_course`
--

LOCK TABLES `open_course` WRITE;
/*!40000 ALTER TABLE `open_course` DISABLE KEYS */;
/*!40000 ALTER TABLE `open_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person` (
  `SSN` int(13) NOT NULL,
  `TFname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `TLname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `EFname` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ELname` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nationality` char(3) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthplace` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `religion` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `TEL` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `enrollyear` year(4) DEFAULT NULL,
  `email` varchar(45) COLLATE utf8_unicode_ci DEFAULT '([^@\\s;#%&+=/]+@[a-zA-Z]+(\\.[a-zA-Z]*){1,3})',
  `password` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`SSN`),
  UNIQUE KEY `SSN_UNIQUE` (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personel`
--

DROP TABLE IF EXISTS `personel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personel` (
  `SSN` int(13) NOT NULL,
  `officeTel` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `FID` int(2) NOT NULL,
  `depTname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `room#` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `BABname` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `teacherflag` tinyint(4) DEFAULT NULL,
  `officerflag` tinyint(4) DEFAULT NULL,
  `institution_ITname` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`SSN`),
  KEY `per_fk2_idx` (`FID`,`depTname`),
  KEY `per_fk3_idx` (`room#`,`BABname`),
  KEY `per_fk4_idx` (`institution_ITname`),
  CONSTRAINT `per_fk1` FOREIGN KEY (`SSN`) REFERENCES `person` (`SSN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `per_fk2` FOREIGN KEY (`FID`, `depTname`) REFERENCES `department` (`FID`, `depTname`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `per_fk3` FOREIGN KEY (`room#`, `BABname`) REFERENCES `room` (`room#`, `BABname`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `per_fk4` FOREIGN KEY (`institution_ITname`) REFERENCES `institution` (`ITname`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personel`
--

LOCK TABLES `personel` WRITE;
/*!40000 ALTER TABLE `personel` DISABLE KEYS */;
/*!40000 ALTER TABLE `personel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prerequisite`
--

DROP TABLE IF EXISTS `prerequisite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prerequisite` (
  `CID` int(7) NOT NULL,
  `pre_CID` int(7) NOT NULL,
  PRIMARY KEY (`CID`,`pre_CID`),
  KEY `prereq_fk2_idx` (`pre_CID`),
  CONSTRAINT `prereq_fk1` FOREIGN KEY (`CID`) REFERENCES `course` (`CID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `prereq_fk2` FOREIGN KEY (`pre_CID`) REFERENCES `course` (`CID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prerequisite`
--

LOCK TABLES `prerequisite` WRITE;
/*!40000 ALTER TABLE `prerequisite` DISABLE KEYS */;
/*!40000 ALTER TABLE `prerequisite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `register` (
  `student_ssn` int(13) NOT NULL,
  `CID` int(7) NOT NULL,
  `academicyear` year(4) NOT NULL,
  `term` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `sec#` int(2) NOT NULL,
  `max#student` int(3) DEFAULT NULL,
  `reg_status` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `grade` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`student_ssn`,`CID`,`sec#`,`term`,`academicyear`),
  KEY `reg_fk2` (`CID`,`academicyear`,`term`,`sec#`),
  CONSTRAINT `reg_fk1` FOREIGN KEY (`student_ssn`) REFERENCES `student` (`SSN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `reg_fk2` FOREIGN KEY (`CID`, `academicyear`, `term`, `sec#`) REFERENCES `section` (`CID`, `academicyear`, `term`, `sec#`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request` (
  `Student_SSN` int(13) NOT NULL,
  `Document_id` int(10) NOT NULL,
  KEY `req_fk2_idx` (`Document_id`),
  KEY `req_fk1_idx` (`Student_SSN`),
  CONSTRAINT `req_fk1` FOREIGN KEY (`Student_SSN`) REFERENCES `student` (`SSN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `req_fk2` FOREIGN KEY (`Document_id`) REFERENCES `document` (`DID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `room#` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `BABname` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`room#`,`BABname`),
  KEY `room_fk_idx` (`BABname`),
  CONSTRAINT `room_fk` FOREIGN KEY (`BABname`) REFERENCES `building` (`BABname`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section` (
  `CID` int(7) NOT NULL,
  `academicyear` year(4) NOT NULL,
  `term` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `sec#` int(2) NOT NULL,
  `max#student` int(3) DEFAULT NULL,
  PRIMARY KEY (`CID`,`academicyear`,`term`,`sec#`),
  CONSTRAINT `sec_fk` FOREIGN KEY (`CID`, `academicyear`, `term`) REFERENCES `open_course` (`CID`, `academicyear`, `term`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sectionroom`
--

DROP TABLE IF EXISTS `sectionroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sectionroom` (
  `BABname` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `room#` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `CID` int(7) NOT NULL,
  `academicyear` year(4) NOT NULL,
  `term` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Sday` char(3) COLLATE utf8_unicode_ci NOT NULL,
  `starttime` time(4) DEFAULT NULL,
  `endtime` time(4) DEFAULT NULL,
  `sec#` int(2) NOT NULL,
  PRIMARY KEY (`BABname`,`room#`,`CID`,`academicyear`,`term`,`Sday`,`sec#`),
  KEY `sr_fk2_idx` (`CID`,`academicyear`,`term`,`sec#`),
  CONSTRAINT `sr_fk1` FOREIGN KEY (`BABname`, `room#`) REFERENCES `room` (`BABname`, `room#`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sr_fk2` FOREIGN KEY (`CID`, `academicyear`, `term`, `sec#`) REFERENCES `section` (`CID`, `academicyear`, `term`, `sec#`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sectionroom`
--

LOCK TABLES `sectionroom` WRITE;
/*!40000 ALTER TABLE `sectionroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `sectionroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `SSN` int(13) NOT NULL,
  `SID` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Status` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `AdviserSSN` int(13) NOT NULL,
  `FID` int(2) NOT NULL,
  `depTname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`SSN`),
  KEY `stu_fk2` (`AdviserSSN`),
  KEY `stu_fk3` (`FID`,`depTname`),
  CONSTRAINT `stu_fk2` FOREIGN KEY (`AdviserSSN`) REFERENCES `personel` (`SSN`),
  CONSTRAINT `stu_fk3` FOREIGN KEY (`FID`, `depTname`) REFERENCES `department` (`FID`, `depTname`),
  CONSTRAINT `stu_ssn_fk` FOREIGN KEY (`SSN`) REFERENCES `person` (`SSN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teach`
--

DROP TABLE IF EXISTS `teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teach` (
  `teacher_ssn` int(13) NOT NULL,
  `CID` int(7) NOT NULL,
  `academicyear` year(4) NOT NULL,
  `term` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `sec#` int(2) NOT NULL,
  PRIMARY KEY (`teacher_ssn`,`CID`,`term`,`sec#`,`academicyear`),
  KEY `teach_fk2_idx` (`CID`,`academicyear`,`term`,`sec#`),
  CONSTRAINT `teach_fk1` FOREIGN KEY (`teacher_ssn`) REFERENCES `personel` (`SSN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `teach_fk2` FOREIGN KEY (`CID`, `academicyear`, `term`, `sec#`) REFERENCES `section` (`CID`, `academicyear`, `term`, `sec#`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teach`
--

LOCK TABLES `teach` WRITE;
/*!40000 ALTER TABLE `teach` DISABLE KEYS */;
/*!40000 ALTER TABLE `teach` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-09 10:20:24
