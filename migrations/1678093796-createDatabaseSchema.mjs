export async function up(sql) {
  await sql`
CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" varchar(250) NOT NULL,
  email varchar(250) NOT NULL,
  password_hash varchar(80) NOT NULL
)`;

  await sql`
CREATE TABLE persons (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" varchar(250) NOT NULL,
  user_id integer NOT NULL,
)`;

  await sql`
CREATE TABLE sessions (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  token varchar(250) NOT NULL,
  user_id integer NOT NULL,
  expiry_timestamp integer NOT NULL
)`;

  await sql`
CREATE TABLE daily_logs (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "date" date NOT NULL,
  user_id integer NOT NULL,
  notes text NOT NULL,
  longitude double precision NOT NULL,
  latitude double precision NOT NULL
)`;

  await sql`
CREATE TABLE symptoms (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  body_part varchar(250) NOT NULL,
  daily_log_id integer NOT NULL,
  severity integer NOT NULL,
  attributes json NOT NULL
)
`;
}

export async function down(sql) {
  await sql`
DROP TABLE users
`;
  await sql`
DROP TABLE persons
`;
  await sql`
  DROP TABLE sessions
  `;

  await sql`
DROP TABLE daily_logs
`;

  await sql`
DROP TABLE symptoms
`;
}
