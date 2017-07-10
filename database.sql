CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task VARCHAR (160) NOT NULL,
  complete BOOLEAN NOT NULL,
  priority BOOLEAN NOT NULL
);

INSERT INTO tasks (task, complete) VALUES ('Mow the lawn', false, false);
INSERT INTO tasks (task, complete) VALUES ('Water the dog', false, false);
INSERT INTO tasks (task, complete) VALUES ('Bust a move', false, false);
INSERT INTO tasks (task, complete) VALUES ('Eat peanut butter', false, true);
INSERT INTO tasks (task, complete) VALUES ('Floss armpits', false, true);
INSERT INTO tasks (task, complete) VALUES ('Notice the wonder of existence', true, false);
INSERT INTO tasks (task, complete) VALUES ('Donate skin', false, true);
