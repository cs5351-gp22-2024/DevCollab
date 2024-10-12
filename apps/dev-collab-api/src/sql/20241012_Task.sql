CREATE TABLE Task (
        `taskid` int NOT NULL AUTO_INCREMENT,
        `name` varchar(1000),
        `description` varchar(1000),
        `priority` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
        `assignee` varchar(1000),
        `status` varchar(1000),
        `duedate` DATETIME ,
        `created` DATETIME ,
        `modified` DATETIME ,
        `projectId` INT NULL ,
        PRIMARY KEY (`taskid`),
        CONSTRAINT `FK_Task_Project` FOREIGN KEY (`projectId`) REFERENCES `Project`(`projectId`) ON DELETE SET NULL ON UPDATE CASCADE
);