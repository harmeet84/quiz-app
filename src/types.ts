export type FlowType = 'A'|'B'

export type Option = { id: string; text: string; isCorrect: boolean }
export type Question = { id: string; text: string; options: Option[]; answer?: boolean; userAnswer?: boolean; feedback?: string }
export type Round = { id: string; title?: string; questions: Question[] }
