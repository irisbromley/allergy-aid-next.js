export async function up(sql) {
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
  DROP TABLE symptoms
  `;
}
