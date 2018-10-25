CREATE TEMPORARY TABLE `tmproles` (
	`Name` varchar(255),
	`ColorId` int(11)
);

INSERT INTO `tmproles`	(`Name`,		`ColorId`)
VALUES					('Member',		1),
						('Planner',		4),
						('Admin',		7),
						('Suspended',	8),
						('Banned',		2);

INSERT INTO `roles` (`Name`, `ColorId`, `CreatedBy`, `ModifiedBy`)
SELECT
	Name,
	ColorId,
	'Admin' as CreatedBy,
	'Admin' as ModifiedBy
FROM
	`tmproles` tmp
WHERE
	NOT EXISTS (SELECT `Name` FROM `roles` WHERE `Name` = tmp.`Name`);

DROP TABLE tmproles;
