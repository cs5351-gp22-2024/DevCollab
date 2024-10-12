CREATE TABLE `UserStory` (
    `userStoryId` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `asA` VARCHAR(255) NOT NULL,
    `iWantTo` VARCHAR(255) NOT NULL,
    `soThat` VARCHAR(255) NOT NULL,
    `priority` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
    `dueDate` TIMESTAMP NULL,
    `projectId` INT NULL,
    `sprintId` INT NULL,
    PRIMARY KEY (`userStoryId`),
    CONSTRAINT `FK_UserStory_Project` FOREIGN KEY (`projectId`) REFERENCES `Project`(`projectId`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `FK_UserStory_Sprint` FOREIGN KEY (`sprintId`) REFERENCES `Sprint`(`sprintId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
