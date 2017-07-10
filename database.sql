CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task VARCHAR (160) NOT NULL,
  complete BOOLEAN NOT NULL,
  priority BOOLEAN NOT NULL
);

INSERT INTO tasks (task, complete, priority) VALUES ('Mow the lawn', false, false);
INSERT INTO tasks (task, complete, priority) VALUES ('Water the dog', false, false);
INSERT INTO tasks (task, complete, priority) VALUES ('Bust a move', false, false);
INSERT INTO tasks (task, complete, priority) VALUES ('Eat peanut butter', false, true);
INSERT INTO tasks (task, complete, priority) VALUES ('Floss armpits', false, true);
INSERT INTO tasks (task, complete, priority) VALUES ('Notice the wonder of existence', true, false);
INSERT INTO tasks (task, complete, priority) VALUES ('Donate skin', false, true);
