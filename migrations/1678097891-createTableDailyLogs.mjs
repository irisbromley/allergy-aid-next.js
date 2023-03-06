export async function up(sql) {
  await sql`
CREATE TABLE daily_logs (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  date date NOT NULL,
  user_id integer NOT NULL,
  notes text NOT NULL,
  longitude double precision NOT NULL,
  latitude double precision NOT NULL
)`;
}

export async function down(sql) {
  await sql`
  DROP TABLE daily_logs
  `;
}
