CREATE TABLE IF NOT EXISTS `files` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT,
  `filetype` varchar(100) NOT NULL,
  `hash` varchar(200) NOT NULL,
  `link` varchar(200) NOT NULL,
  `user_id` varchar(200) NOT NULL,
  `tags` varchar(200) NOT NULL,
  `user_fk` varchar(100) NOT NULL,
  PRIMARY KEY (file_id),
  FOREIGN KEY (user_fk)
  REFERENCES users(email)
);


CREATE TABLE IF NOT EXISTS `users` (
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (email)
  UNIQUE (email)
)
