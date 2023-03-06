
-- // This file is not needed

CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(250) NOT NULL,
  last_name varchar(250) NOT NULL,
  email varchar(250) NOT NULL,
  password_hash varchar(80) NOT NULL
);

CREATE TABLE sessions (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  token varchar(250) NOT NULL,
  user_id integer NOT NULL,
  expiry_timestamp integer NOT NULL
);

CREATE TABLE daily_logs (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  date date NOT NULL,
  user_id integer NOT NULL,
  notes text NOT NULL,
  longitude double precision NOT NULL,
  latitude double precision NOT NULL
);

CREATE TABLE symptoms (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  body_part varchar(250) NOT NULL,
  daily_log_id integer NOT NULL,
  severity integer NOT NULL,
  attributes json NOT NULL
);
