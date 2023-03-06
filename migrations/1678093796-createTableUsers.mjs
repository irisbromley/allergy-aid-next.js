export async function up(sql) {
  await sql`
CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(250) NOT NULL,
  last_name varchar(250) NOT NULL,
  email varchar(250) NOT NULL,
  password_hash varchar(80) NOT NULL
)`;
}

export async function down(sql) {
  await sql`
DROP TABLE users
`;
}
