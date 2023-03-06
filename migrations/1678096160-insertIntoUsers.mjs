const users = [
  {
    id: 1,
    first_name: 'Joe',
    last_name: 'Bloggs',
    email: 'joe@test.com',
    password_hash: '',
  },
  {
    id: 2,
    first_name: 'Minnie',
    last_name: 'Mouse',
    email: 'mini@test.com',
    password_hash: '',
  },
  {
    id: 3,
    first_name: 'Wim',
    last_name: 'Wenders',
    email: 'wim@test.com',
    password_hash: '',
  },
  {
    id: 4,
    first_name: 'Max',
    last_name: 'Muster',
    email: 'joe@test.com',
    password_hash: '',
  },
  {
    id: 5,
    first_name: 'Christopher',
    last_name: 'Columbus',
    email: 'chris@america.com',
    password_hash: '',
  },
  {
    id: 6,
    first_name: 'Axel',
    last_name: 'Schweiss',
    email: 'axel@test.com',
    password_hash: '',
  },
  {
    id: 7,
    first_name: 'Stan',
    last_name: 'Kubrik',
    email: 'stanly@test.com',
    password_hash: '',
  },
  {
    id: 8,
    first_name: 'Franz',
    last_name: 'Franitzky',
    email: 'fran@test.com',
    password_hash: '',
  },
];

export async function up(sql) {
  await sql`
INSERT INTO users ${sql(
    users,
    'first_name',
    'last_name',
    'email',
    'password_hash',
  )}
`;
}

export async function down(sql) {
  for (const user of users) {
    await sql`
    DELETE FROM
    users
    WHERE id= ${user.id}`;
  }
}
