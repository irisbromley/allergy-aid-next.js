export async function up(sql) {
  await sql`
CREATE TABLE sessions (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  token varchar(250) NOT NULL,
  user_id integer NOT NULL,
  expiry_timestamp integer NOT NULL
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE sessions
  `;
}
