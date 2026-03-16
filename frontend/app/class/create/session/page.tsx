'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ListChecks, Check } from 'lucide-react'

const STEPS = ['기본정보', '회차 설정', '수강료', '공개설정']
const CATEGORIES = ['미술', '음악', '체육', '학습', '기타']

export default function SessionClassCreatePage() {
  const router = useRouter()
  const [step] = useState(0)
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    totalSessions: '',
  })

  const isStep1Valid = form.name.trim().length > 0 && form.category !== ''

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <ListChecks size={16} className="text-violet-600" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">회차 클래스 만들기</h1>
              <p className="text-xs text-gray-500">정해진 횟수로 진행되는 클래스</p>
            </div>
          </div>
          <Badge variant="secondary" className="ml-auto text-xs">회차제</Badge>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors ${
                    i < step
                      ? 'bg-violet-600 border-violet-600 text-white'
                      : i === step
                      ? 'bg-white border-violet-600 text-violet-600'
                      : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium ${
                    i === step ? 'text-violet-600' : 'text-gray-400'
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mb-5 mx-1 ${
                    i < step ? 'bg-violet-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-800">
              기본 정보 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* 클래스명 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                클래스명 <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="예: 수채화 10회 완성반"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                maxLength={50}
                className="text-sm"
              />
              <p className="text-xs text-gray-400">{form.name.length}/50</p>
            </div>

            {/* 카테고리 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((p) => ({ ...p, category: v ?? '' }))}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 총 회차 수 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">총 회차 수</label>
              <Input
                type="number"
                placeholder="예: 10"
                min={1}
                max={100}
                value={form.totalSessions}
                onChange={(e) => setForm((p) => ({ ...p, totalSessions: e.target.value }))}
                className="text-sm w-40"
              />
              <p className="text-xs text-gray-400">수강생이 수강할 총 회차 수를 입력하세요</p>
            </div>

            {/* 클래스 소개 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">클래스 소개</label>
              <textarea
                rows={4}
                placeholder="클래스에 대해 간략히 소개해주세요"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                maxLength={500}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="text-xs text-gray-400 text-right">{form.description.length}/500</p>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                이전으로
              </Button>
              <Button
                disabled={!isStep1Valid}
                className="gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40"
              >
                다음 단계
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
