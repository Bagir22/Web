CREATE TABLE post
(
    `post_id` INT AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(255),
    `author` VARCHAR(255) NOT NULL,
    `author_url` VARCHAR(255),
    `publish_date` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(255),
    `featured` TINYINT(1) DEFAULT 0,
    `content` TEXT NOT NULL,
   PRIMARY KEY (`post_id`)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
;
