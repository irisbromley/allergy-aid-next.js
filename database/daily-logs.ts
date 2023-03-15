import { cache } from 'react';
import { DailyLogInput } from '../app/api/daily-log/route';
import { sql } from './connect';

export const createDailyLog = cache(async (input: DailyLogInput) => {
  const [dailyLog] = await sql<{ id: number }[]>`
    INSERT INTO daily_logs
    ("date", user_id, notes, longitude, latitude)
    VALUES
    (${input.date}, ${input.userID}, ${input.notes},${input.longitude},${input.latitude})
    RETURNING
    id`;
  return dailyLog;
});

export const createSymptom = cache(
  async (input: DailyLogInput['symptoms'][number], dailyLogID: number) => {
    const [symptom] = await sql<{ id: number }[]>`
    INSERT INTO symptoms
    (body_part, daily_log_id, severity, attributes)
    VALUES
    (${input.bodyPart}, ${dailyLogID}, ${input.severity},${input.attributes})
    RETURNING
    id`;
    return symptom;
  },
);
// export const createDailyLog = cache(async (token: string, userId: number) => {
//   const [session] = await sql<{ id: number; token: string; user_id: number }[]>`
//     INSERT INTO sessions
//     (token, user_id)
//     VALUES
//     (${token}, ${userId})
//     RETURNING
//     id, user_id, token
//   `;

//   await deleteExpiredSession();
//   return session;
// });

// export const deleteExpiredSession = cache(async () => {
//   await sql`
//   DELETE FROM
//   sessions
//   WHERE
//   expiry_timestamp < now()
//   `;
// });

// export const deleteSessionByToken = cache(async (token: string) => {
//   const [session] = await sql<{ id: number; token: string }[]>`
//   DELETE FROM
//     sessions
//   WHERE
//     sessions.token = ${token}
//   RETURNING
//     id,
//     token
// `;

//   return session;
// });
