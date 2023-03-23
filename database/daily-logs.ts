import { cache } from 'react';
import { DailyLogInput } from '../app/api/daily-log/route';
import { sql } from './connect';

export const createDailyLog = cache(async (input: DailyLogInput) => {
  const [dailyLog] = await sql<{ id: number }[]>`
    INSERT INTO daily_logs
    ("date", person_id, notes, severity, longitude, latitude)
    VALUES
    (${input.date}, ${input.personID}, ${input.notes}, ${input.severity}, ${input.longitude},${input.latitude})
    RETURNING
    id`;
  return dailyLog;
});

export const createSymptom = cache(
  async (input: DailyLogInput['symptoms'][number], dailyLogID: number) => {
    const [symptom] = await sql<{ id: number }[]>`
    INSERT INTO symptoms
    (body_part, daily_log_id, attributes)
    VALUES
    (${input.bodyPart}, ${dailyLogID}, ${input.attributes})
    RETURNING
    id`;
    return symptom;
  },
);
//
async function getSymptoms(dailyLogID: number) {
  const symptoms = await sql<any[]>`
    SELECT
    *
    FROM
    symptoms
    WHERE
    daily_log_id = ${dailyLogID}
    `;

  return symptoms;
}

export const getDailyLogsByPerson = cache(async (personID: number) => {
  const dailyLogsList = await sql<any[]>`
  SELECT
  *
  FROM
  daily_logs
  WHERE
  person_id = ${personID}
  ORDER BY
  "date"
  DESC
  `;

  for (const log of dailyLogsList) {
    log.symptoms = await getSymptoms(log.id);
  }

  return dailyLogsList;
});

export const getDailyLogByID = cache(
  async (dailyLogID: number, personID: number) => {
    const [log] = await sql<any[]>`
  SELECT
  *
  FROM
  daily_logs
    WHERE
  id = ${dailyLogID}
  AND
  person_id = ${personID}

  `;
    log.symptoms = await getSymptoms(log.id);
    return log;
  },
);

export const updateDailyLog = cache(
  async (input: DailyLogInput, id: number) => {
    const [dailyLog] = await sql<{ id: number }[]>`
    UPDATE daily_logs
    SET "date" = ${input.date},
      notes = ${input.notes},
      severity = ${input.severity},
      longitude = ${input.longitude},
      latitude = ${input.latitude}
    WHERE id = ${id}
      RETURNING id`;
    return dailyLog;
  },
);

export const deleteSymptoms = cache(async (id: number) => {
  await sql`
  DELETE FROM
  symptoms
  WHERE
  daily_log_id = ${id}
  `;
});
