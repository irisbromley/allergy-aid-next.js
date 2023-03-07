const users = [
  {
    id: 1,
    firstname: 'Joe',
    email: 'joe@test.com',
    password_hash: '',
  },
  {
    id: 2,
    firstname: 'Minnie',
    email: 'mini@test.com',

    password_hash: '',
  },
  {
    id: 3,
    firstname: 'TheMonolith',
    email: 'wim@test.com',
    password_hash: '',
  },

  {
    id: 5,
    firstname: 'MrAmerica',
    email: 'chris@america.com',
    password_hash: '',
  },

  {
    id: 7,
    firstname: 'StanBoy',
    email: 'stanly@test.com',
    password_hash: '',
  },
  {
    id: 8,
    firstname: 'Franzi',
    email: 'fran@test.com',
    password_hash: '',
  },
];

export async function up(sql) {
  await sql`
INSERT INTO users ${sql(users, 'firstname', 'email', 'password_hash')}
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
