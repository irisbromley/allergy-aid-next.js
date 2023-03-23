import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createDailyLog,
  createSymptom,
  deleteSymptoms,
  updateDailyLog,
} from '../../../database/daily-logs';

// creating a schema for strings
const dailyLogSchema = z.object({
  date: z.coerce.date(),
  personID: z.number(),
  notes: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  severity: z.number(),
  symptoms: z.array(
    z.object({
      bodyPart: z.string(),
      attributes: z.array(z.string()),
    }),
  ),
});

const updateDailyLogSchema = dailyLogSchema.extend({
  dailyLogID: z.number(),
});

export type DailyLogInput = z.infer<typeof dailyLogSchema>;
export type CreateDailyLogInput = z.infer<typeof updateDailyLogSchema>;

export type CreateDailyLogResponseBody =
  | { errors: { message: string }[] }
  | { success: boolean };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateDailyLogResponseBody>> {
  const body = await request.json();

  const result = dailyLogSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  const newDailyLog = await createDailyLog(result.data);

  if (!newDailyLog) {
    return NextResponse.json(
      { errors: [{ message: 'user creation failed' }] },
      { status: 500 },
    );
  }
  for (const symptom of result.data.symptoms) {
    await createSymptom(symptom, newDailyLog.id);
  }

  return NextResponse.json(
    { success: true },
    {
      status: 201,
    },
  );
}

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<CreateDailyLogResponseBody>> {
  const body = await request.json();

  const result = updateDailyLogSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  const updatedDailyLog = await updateDailyLog(
    result.data,
    result.data.dailyLogID,
  );

  if (!updatedDailyLog) {
    return NextResponse.json(
      { errors: [{ message: 'updating daily log failed' }] },
      { status: 500 },
    );
  }

  await deleteSymptoms(result.data.dailyLogID);

  for (const symptom of result.data.symptoms) {
    await createSymptom(symptom, updatedDailyLog.id);
  }

  return NextResponse.json(
    { success: true },
    {
      status: 201,
    },
  );
}
