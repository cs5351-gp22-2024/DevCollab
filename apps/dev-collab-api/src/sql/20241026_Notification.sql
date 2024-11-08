CREATE TABLE notification (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    comment_id INT NULL,
    mentioned_user_id INT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_date TIMESTAMP NOT NULL
);

-- Insert unread notifications
-- INSERT INTO notification (comment_id, mentioned_user_id, is_read, read_date) VALUES
-- (1, 1000, FALSE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 DAY)),
-- (1, 1001, FALSE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 DAY)),
-- (1, 1000, TRUE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 2 DAY)),
-- (1, 1002, FALSE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 2 DAY)),
-- (2, 1000, FALSE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 3 DAY)),
-- (2, 1003, FALSE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 3 DAY)),
-- (2, 1000, TRUE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 4 DAY)),
-- (2, 1000, FALSE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 4 DAY)),
-- (3, 1000, TRUE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 5 DAY)),
-- (3, 1000, FALSE,  DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 5 DAY));