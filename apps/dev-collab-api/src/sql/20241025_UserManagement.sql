CREATE TABLE user_management (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    permission_id INT NOT NULL,
    join_date TIMESTAMP NOT NULL,
    group_role VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (group_id) REFERENCES group_member(group_id),
    FOREIGN KEY (permission_id) REFERENCES group_member(permission_id)
);

INSERT INTO user_management (user_id, group_id, permission_id, join_date, group_role)
SELECT
    u.user_id,
    gm.group_id,
    gm.permission_id,
    gm.join_date,
    gm.group_role
FROM users u
JOIN group_member gm ON u.user_id = gm.user_id;