CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task VARCHAR (160) NOT NULL,
  complete BOOLEAN NOT NULL
);

INSERT INTO tasks (task, complete) VALUES ('Mow the lawn', false);
INSERT INTO tasks (task, complete) VALUES ('Water the dog', false);
INSERT INTO tasks (task, complete) VALUES ('Have sex with the wife', false);
INSERT INTO tasks (task, complete) VALUES ('Trim pubes', false);
