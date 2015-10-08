CREATE DATABASE IF NOT EXISTS uwatchData


	CREATE TABLE IF NOT EXISTS users(
	username varchar(60) NOT NULL unique,
	password varchar(30) NOT NULL,
	email varchar(100) NOT NULL,
	PRIMARY KEY (username)
	)


CREATE TABLE IF NOT EXISTS files(
data_id   int NOT NULL AUTO_INCREMENT,
fileType ENUM('Audio','Video','Image') NOT NULL,
link  varchar(500) NOT NULL,
username varchar(60) NOT NULL,
tags varchar(1000) ,
primary key(data_id),
 FOREIGN KEY(username) references  users(username)

 )

 
 --insert into users(username,password,email) values("userA","123","a@b.com")
 --INSERT INTO files (data_id, fileType, link, username, tags) VALUES (NULL, 'Video', 'a.com', 'userA', 'dumb');
 --select link from files where username="$_POST['uname']"

