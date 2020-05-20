


CREATE TABLE roles (
	id SERIAL PRIMARY KEY,
	role_name TEXT UNIQUE NOT NULL
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL,
	role_id INTEGER REFERENCES roles(id)
);

CREATE TABLE reimbursement_status (
	id serial PRIMARY KEY,
	status TEXT NOT NULL UNIQUE
);

CREATE TABLE reimbursement_type (
	id serial PRIMARY KEY,
	"type" TEXT  NOT NULL UNIQUE 
);

CREATE TABLE reimbursement (
	id serial PRIMARY KEY,
	author integer  REFERENCES users(id) NOT NULL,
	amount NUMERIC(10,2) NOT NULL,
	date_submitted TEXT NOT NULL,
	date_resolved TEXT,
	description TEXT NOT NULL,
	resolver integer REFERENCES users(id),
	status integer REFERENCES reimbursement_status(id),
	"type" integer REFERENCES reimbursement_type(id)
);


SELECT * FROM reimbursement;

INSERT INTO roles(role_name) VALUES ('Employee'), ('Finance Manager'),('Adming');
INSERT INTO reimbursement_status(status) VALUES ('Pending'),('Approved'),('Denied');
INSERT INTO reimbursement_type("type") VALUES ('Lodging'),('Travel'),('Food'),('Other');
SELECT * FROM reimbursement_type;

INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 1','password 1','first 1','last 1','email 1',1);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 2','password 2','first 2','last 2','email 2',2);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 3','password 3','first 3','last 3','email 3',1);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 4','password 4','first 4','last 4','email 4',2);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 5','password 5','first 5','last 5','email 5',1);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 6','password 6','first 6','last 6','email 6',2);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 7','password 7','first 7','last 7','email 7',1);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 8','password 8','first 8','last 8','email 8',1);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 9','password 9','first 9','last 9','email 9',1);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 10','password 10','first 10','last 10','email 10',1);
INSERT INTO users(username,"password" ,first_name ,last_name ,email,role_id) VALUES ('username 11','password 11','first 11','last 11','email 11',3);


INSERT INTO reimbursement(author,amount,date_submitted,description,status,"type") VALUES (1,100.00,'2020-05-16','this is desc.',1,2);
INSERT INTO reimbursement(author,amount,date_submitted,description,status,"type") VALUES (9,200.00,'2020-05-20','this is desc.',1,1);
INSERT INTO reimbursement(author,amount,date_submitted,date_resolved,description,resolver,status,"type") VALUES (7,100.00,'2020-06-16','2020-10-16','this is another desc',2,2,3);
INSERT INTO reimbursement(author,amount,date_submitted,date_resolved,description,resolver,status,"type") VALUES (3,100.00,'2020-07-16','2020-10-16','this is another desc',4,3,4);



SELECT users.id,username,"password",first_name,last_name,email,roles.role_name 
FROM users 
INNER JOIN roles ON users.role_id = roles.id;


SELECT revature_p0.users.id,username,"password",first_name,last_name,email,roles.role_name 
FROM revature_p0.users 
INNER JOIN revature_p0.roles ON users.role_id = roles.id;


SELECT revature_p0.users.id,username,"password",first_name,last_name,email,roles.role_name 
FROM revature_p0.users 
INNER JOIN revature_p0.roles ON users.role_id = roles.id
WHERE users.id = 3;

SELECT * FROM users;
SELECT * FROM reimbursement_status;

SELECT * FROM revature_p0.reimbursement 
INNER JOIN users u1 ON author = u1.id
--INNER JOIN users u2 ON resolver = u2.id
INNER JOIN reimbursement_status ON reimbursement.status = reimbursement_status.id 
INNER JOIN reimbursement_type  ON reimbursement."type" = reimbursement_type.id
WHERE reimbursement_status.status = 'Pending';

SELECT reimbursement.id,reimbursement.amount,reimbursement.date_submitted,reimbursement.description,
reimbursement_status.status,reimbursement_type."type"
FROM revature_p0.reimbursement
INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
INNER JOIN revature_p0.reimbursement_type ON reimbursement_type.id = reimbursement.id

SELECT * FROM reimbursement;

SELECT * FROM reimbursement 
INNER JOIN users ON reimbursement.author = users.id
WHERE users.id = 1;

SELECT *
FROM revature_p0.reimbursement 
INNER JOIN users AS u1 ON reimbursement.author = u1.id
LEFT JOIN users AS u2 ON reimbursement.resolver = u2.id
INNER JOIN reimbursement_status ON reimbursement_status.id = reimbursement.status
INNER JOIN reimbursement_type ON reimbursement_type.id = reimbursement."type"
INNER JOIN roles r1 ON u1.role_id = r1.id 
LEFT JOIN roles r2 ON u2.role_id = r2.id;

SELECT reimbursement.id, reimbursement.amount, reimbursement.date_submitted, reimbursement.date_resolved, reimbursement.description, u1.id AS author_id, u1.username AS author_username, 
u1."password" AS author_password,u1.first_name AS author_first, u1.last_name AS author_last, u2.id AS resolver_id, u2.username AS reolver_username,u2."password" AS resolver_password,
u2.first_name AS resolver_first,u2.last_name AS resolver_last, u2.email AS resolver_email, r1.role_name AS author_role, reimbursement_type."type", r2.role_name AS resolver_role
FROM revature_p0.reimbursement 
INNER JOIN users AS u1 ON reimbursement.author = u1.id
LEFT JOIN users AS u2 ON reimbursement.resolver = u2.id
INNER JOIN reimbursement_status ON reimbursement_status.id = reimbursement.status
INNER JOIN reimbursement_type ON reimbursement_type.id = reimbursement."type"
INNER JOIN roles r1 ON u1.role_id = r1.id 
LEFT JOIN roles r2 ON u2.role_id = r2.id;


SELECT role_name FROM users
INNER JOIN roles ON users.role_id = roles.id
WHERE users.id = 1;

SELECT * FROM reimbursement_status rs
WHERE id = 1;

SELECT * FROM reimbursement;

SELECT reimbursement.id, reimbursement.amount, reimbursement.date_submitted, 
reimbursement.date_resolved, reimbursement.description, u1.id AS author_id, u1.username AS author_username, 
u1."password" AS author_password,u1.first_name AS author_first, u1.last_name AS author_last,u1.email AS author_email, u2.id AS resolver_id, 
u2.username AS resolver_username,u2."password" AS resolver_password,
u2.first_name AS resolver_first,u2.last_name AS resolver_last, u2.email AS resolver_email, r1.role_name AS author_role, 
reimbursement_type."type", r2.role_name AS resolver_role, reimbursement_status.status
FROM revature_p0.reimbursement 
INNER JOIN revature_p0.users AS u1 ON reimbursement.author = u1.id
LEFT JOIN revature_p0.users AS u2 ON reimbursement.resolver = u2.id
INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
INNER JOIN revature_p0.reimbursement_type ON reimbursement_type.id = reimbursement."type"
INNER JOIN revature_p0.roles r1 ON u1.role_id = r1.id 
LEFT JOIN revature_p0.roles r2 ON u2.role_id = r2.id
WHERE reimbursement.id = 4;


SELECT id FROM revature_p0.reimbursement_status WHERE status = 'Approved'

SELECT max(id) FROM reimbursement r;
SELECT reimbursement.id, reimbursement.amount, reimbursement.date_submitted, 
                                                            reimbursement.date_resolved, reimbursement.description, u1.id AS author_id, u1.username AS author_username, 
                                                            u1."password" AS author_password,u1.first_name AS author_first, u1.last_name AS author_last,u1.email AS author_email, u2.id AS resolver_id, 
                                                            u2.username AS resolver_username,u2."password" AS resolver_password,
                                                            u2.first_name AS resolver_first,u2.last_name AS resolver_last, u2.email AS resolver_email, r1.role_name AS author_role, 
                                                            reimbursement_type."type", r2.role_name AS resolver_role, reimbursement_status.status
                                                            FROM revature_p0.reimbursement 
                                                            INNER JOIN revature_p0.users AS u1 ON reimbursement.author = u1.id
                                                            LEFT JOIN revature_p0.users AS u2 ON reimbursement.resolver = u2.id
                                                            INNER JOIN revature_p0.reimbursement_status ON reimbursement_status.id = reimbursement.status
                                                            INNER JOIN revature_p0.reimbursement_type ON reimbursement_type.id = reimbursement."type"
                                                            INNER JOIN revature_p0.roles r1 ON u1.role_id = r1.id 
                                                            LEFT JOIN revature_p0.roles r2 ON u2.role_id = r2.id
                                                            WHERE reimbursement.id = 7;
SELECT * FROM reimbursement r;
DELETE FROM reimbursement WHERE id >= 9;

  SELECT revature_p0.users.id,username,"password",first_name,last_name,email,roles.role_name 
                                                        FROM revature_p0.users 
                                                        INNER JOIN revature_p0.roles ON revature_p0.users.role_id = revature_p0.roles.id
                                                        WHERE revature_p0.users.username = 'username 1' AND revature_p0.users."password" = 'password 1';                                                          