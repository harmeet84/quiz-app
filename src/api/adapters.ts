import type { Round } from '@/types'
import { getJson, endpoints } from './client'

type ActivityQuestion = { is_correct: boolean; stimulus: string; order: number; user_answers?: any[]; feedback?: string }
type ActivityRound = { round_title?: string; order: number; questions: ActivityQuestion[] }
type Activity = { activity_name: string; order: number; questions?: ActivityQuestion[] | ActivityRound[] }

type FlowRaw = { name?: string; heading?: string; activities: Activity[] }

function qToQuestion(q: ActivityQuestion, idPrefix: string, idx: number) {
  const options = [
    { id: `${idPrefix}_${idx}_true`, text: 'True', isCorrect: q.is_correct === true },
    { id: `${idPrefix}_${idx}_false`, text: 'False', isCorrect: q.is_correct === false }
  ]
  return { id: `${idPrefix}_${idx}`, text: q.stimulus, options, answer: q.is_correct, feedback: q.feedback, order: q.order }
}

export async function loadFlowA(): Promise<Round[]> {
  const data = await getJson<FlowRaw>(endpoints.payload)
  const activity = data.activities.find(a => a.activity_name === 'Activity One')
  if (!activity) return []
  const raw = (activity.questions ?? []) as ActivityQuestion[]
  const questions = raw.map((q, i) => qToQuestion(q, 'A', i + 1))
  return [{ id: 'flowA', title: activity.activity_name, questions }]
}

export async function loadFlowB(): Promise<Round[]> {
  const data = await getJson<FlowRaw>(endpoints.payload)
  const activity = data.activities.find(a => a.activity_name === 'Activity Two')
  if (!activity) return []
  const rawRounds = (activity.questions ?? []) as ActivityRound[]
  return rawRounds.map((r, ri) => ({
    id: `B-${ri + 1}`,
    title: r.round_title ?? `Round ${ri + 1}`,
    questions: (r.questions ?? []).map((q, qi) => qToQuestion(q, `B${ri + 1}`, qi + 1))
  }))
}
