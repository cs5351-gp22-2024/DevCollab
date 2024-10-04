CREATE TABLE
    User (
        `userId` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255),
        PRIMARY KEY (`userId`)
    );

CREATE TABLE
    Flower (
        `flowerId` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255),
        `userId` int NOT NULL,
        PRIMARY KEY (`flowerId`)
    );

ALTER TABLE Flower ADD CONSTRAINT FK_UserFlower FOREIGN KEY (`userId`) REFERENCES User (`userId`);