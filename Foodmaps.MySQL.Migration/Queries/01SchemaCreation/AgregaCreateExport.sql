CREATE TABLE IF NOT EXISTS `addresses` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Street` varchar(255) NOT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Province` varchar(255) DEFAULT NULL,
  `PostalCode` varchar(255) NOT NULL,
  `Country` varchar(255) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `authentication` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `Password` text NOT NULL,
  `Salt` varchar(255) NOT NULL,
  `PasswordToken` varchar(255) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `colors` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Hex` varchar(255) NOT NULL,
  `Rgb` varchar(255) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `comments` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `EventId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Message` text NOT NULL,
  `Rate` int(11) NOT NULL DEFAULT '0',
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `contact` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ContactTypeId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` varchar(255) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `ContactType_idx` (`ContactTypeId`),
  CONSTRAINT `ContactType` FOREIGN KEY (`ContactTypeId`) REFERENCES `contacttypes` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `contacttypes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Icon` varchar(255) NOT NULL,
  `UrlPrefix` varchar(255) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `eventcategories` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `ColorId` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `events` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text,
  `ImageId` int(11) DEFAULT NULL,
  `CategoryId` int(11) NOT NULL,
  `TypeId` int(11) NOT NULL,
  `Price` decimal(10,0) DEFAULT NULL,
  `Pinned` bit(1) NOT NULL DEFAULT b'0',
  `Link` varchar(255) DEFAULT NULL,
  `StartDate` datetime NOT NULL,
  `EndDate` datetime NOT NULL,
  `ApprovedOn` datetime DEFAULT NULL,
  `ApprovedBy` varchar(255) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `eventtypes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `images` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Content` blob NOT NULL,
  `MimeType` varchar(255) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `organizations` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `OrganizationTypeId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Abbreviation` varchar(15) NOT NULL,
  `Description` text,
  `ImageId` int(11) DEFAULT NULL,
  `AddressId` int(11) DEFAULT NULL,
  `Identifier` varchar(255) DEFAULT NULL,
  `ApprovedOn` datetime DEFAULT NULL,
  `ApprovedBy` varchar(255) DEFAULT NULL,
  `ContactId` int(11) DEFAULT NULL,
  `ParentId` int(11) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `OrganizationType_idx` (`OrganizationTypeId`),
  KEY `Address_idx` (`AddressId`),
  CONSTRAINT `Address` FOREIGN KEY (`AddressId`) REFERENCES `addresses` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `OrganizationType` FOREIGN KEY (`OrganizationTypeId`) REFERENCES `organizationtypes` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `organizationtypes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `ColorId` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `roles` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `ColorId` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `sessions` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `IPAddress` varchar(255) NOT NULL,
  `Browser` varchar(255) NOT NULL,
  `Expires` datetime NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `subscriptions` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `From` int(11) NOT NULL,
  `To` int(11) NOT NULL,
  `FromTypeId` int(11) NOT NULL,
  `ToTypeId` int(11) NOT NULL,
  `NotifyOfChange` bit(1) NOT NULL DEFAULT b'0',
  `LastNotified` datetime DEFAULT NULL,
  `ConfirmedOn` datetime DEFAULT NULL,
  `ConfirmedBy` varchar(255) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FromType_idx` (`FromTypeId`),
  KEY `ToType_idx` (`ToTypeId`),
  CONSTRAINT `FromType` FOREIGN KEY (`FromTypeId`) REFERENCES `subscriptiontypes` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ToType` FOREIGN KEY (`ToTypeId`) REFERENCES `subscriptiontypes` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `subscriptiontypes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `RequiresConfirmation` bit(1) NOT NULL DEFAULT b'0',
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `userroles` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(255) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(255) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserId_idx` (`UserId`),
  KEY `RoleId_idx` (`RoleId`),
  CONSTRAINT `RoleId` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Surname` varchar(255) DEFAULT NULL,
  `Birthday` datetime DEFAULT NULL,
  `Gender` varchar(100) DEFAULT NULL,
  `AboutMe` text,
  `Year` int(11) DEFAULT NULL,
  `Type` varchar(40) DEFAULT NULL,
  `CPF` varchar(100) DEFAULT NULL,
  `Course` varchar(255) DEFAULT NULL,
  `ImageId` int(11) DEFAULT NULL,
  `AddressId` int(11) DEFAULT NULL,
  `Telephone` varchar(36) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` varchar(100) NOT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ModifiedBy` varchar(100) NOT NULL,
  `ObsoletedOn` datetime DEFAULT NULL,
  `ObsoletedBy` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;