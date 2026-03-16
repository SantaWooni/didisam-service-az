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
import { ChevronLeft, RefreshCw, Check } from 'lucide-react'

const STEPS = ['기본정보', '구독 설정', '수강료', '공개설정']
const CATEGORIES = ['미술', '음악', '체육', '학습', '기타']
const BILLING_CYCLES = ['월간 구독', '분기 구독', '연간 구독']

export default function SubscriptionClassCreatePage() {
  const router = useRouter()
  const [step] = useState(0)
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    billingCycle: '',
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
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <RefreshCw size={16} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">구독 클래스 만들기</h1>
              <p className="text-xs text-gray-500">월정액 구독 방식의 클래스</p>
            </div>
          </div>
          <Badge variant="secondary" className="ml-auto text-xs">구독제</Badge>
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
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : i === step
                      ? 'bg-white border-emerald-600 text-emerald-600'
                      : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium ${
                    i === step ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mb-5 mx-1 ${
                    i < step ? 'bg-emerald-600' : 'bg-gray-200'
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
                placeholder="예: 필라테스 월정액반"
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

            {/* 구독 주기 */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">구독 주기</label>
              <Select
                value={form.billingCycle}
                onValueChange={(v) => setForm((p) => ({ ...p, billingCycle: v ?? '' }))}
              >
                <SelectTrigger className="text-sm w-48">
                  <SelectValue placeholder="구독 주기 선택" />
                </SelectTrigger>
                <SelectContent>
                  {BILLING_CYCLES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400">수강생이 결제하는 주기를 설정합니다</p>
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
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40"
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
