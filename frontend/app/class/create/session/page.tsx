'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
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
import { Separator } from '@/components/ui/separator'
import {
  ChevronLeft,
  ListChecks,
  Check,
  Upload,
  MapPin,
  Video,
  Layers,
  Calendar,
  Shuffle,
  Clock,
  Globe,
  Lock,
  Search,
  UserCheck,
  Tag,
  Users,
  Banknote,
  AlarmClock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

/* ─── Constants ──────────────────────────────────────────────── */
const STEPS = ['기본정보', '회차 설정', '수강료', '공개설정']

const CATEGORIES = [
  '미술',
  '음악',
  '체육',
  '댄스',
  '요가&필라테스',
  '기타',
]

const DURATION_OPTIONS = [
  { value: '30', label: '30분' },
  { value: '60', label: '1시간' },
  { value: '90', label: '1시간 30분' },
  { value: '120', label: '2시간' },
  { value: 'custom', label: '직접입력' },
]

const VALIDITY_OPTIONS = [
  { value: '30', label: '30일' },
  { value: '60', label: '60일' },
  { value: '90', label: '90일' },
  { value: '180', label: '180일' },
  { value: '0', label: '무제한' },
]

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

/* ─── Form State Type ────────────────────────────────────────── */
interface FormState {
  // Step 1
  name: string
  category: string
  description: string
  image: File | null
  // Step 2
  totalSessions: string
  sessionDuration: string
  scheduleType: 'fixed' | 'flexible'
  days: string[]
  startTime: string
  endTime: string
  locationType: 'offline' | 'online' | 'hybrid'
  address: string
  // Step 3
  price: string
  capacity: string
  validityDays: string
  earlyBirdEnabled: boolean
  earlyBirdPrice: string
  // Step 4
  isPublic: boolean
  allowSearch: boolean
  requireApproval: boolean
}

const INITIAL_FORM: FormState = {
  name: '',
  category: '',
  description: '',
  image: null,
  totalSessions: '',
  sessionDuration: '60',
  scheduleType: 'fixed',
  days: [],
  startTime: '',
  endTime: '',
  locationType: 'offline',
  address: '',
  price: '',
  capacity: '',
  validityDays: '90',
  earlyBirdEnabled: false,
  earlyBirdPrice: '',
  isPublic: true,
  allowSearch: true,
  requireApproval: false,
}

/* ─── Helpers ────────────────────────────────────────────────── */
function formatPrice(val: string) {
  const num = parseInt(val.replace(/,/g, ''), 10)
  if (isNaN(num)) return ''
  return num.toLocaleString('ko-KR')
}

function pricePerSession(price: string, sessions: string) {
  const p = parseInt(price.replace(/,/g, ''), 10)
  const s = parseInt(sessions, 10)
  if (!isNaN(p) && !isNaN(s) && s > 0) {
    return Math.round(p / s).toLocaleString('ko-KR')
  }
  return null
}

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function SessionClassCreatePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [imageName, setImageName] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  /* ── Validation ─────────────────────────────────────────── */
  const isStep1Valid = form.name.trim().length > 0 && form.category !== ''
  const isStep2Valid = form.totalSessions.trim().length > 0 && parseInt(form.totalSessions) >= 1
  const isStep3Valid = form.price.trim().length > 0 && form.capacity.trim().length > 0
  const stepValid = [isStep1Valid, isStep2Valid, isStep3Valid, true]

  /* ── Handlers ───────────────────────────────────────────── */
  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  function toggleDay(day: string) {
    setForm((p) => ({
      ...p,
      days: p.days.includes(day) ? p.days.filter((d) => d !== day) : [...p.days, day],
    }))
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    set('image', file)
    setImageName(file?.name ?? null)
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1)
  }

  function handlePrev() {
    if (step > 0) setStep((s) => s - 1)
    else router.back()
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  /* ══════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* ── Fixed Top Header ───────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
              <ListChecks size={16} className="text-violet-600" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">회차 클래스 만들기</h1>
              <p className="text-xs text-gray-500 leading-tight">정해진 횟수로 진행되는 클래스</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge className="bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100 text-xs font-medium">
              회차제
            </Badge>
            <span className="text-xs text-gray-400 font-medium">
              {step + 1} / {STEPS.length}
            </span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto px-6 pb-4">
          <div className="flex items-center">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => i < step && setStep(i)}
                  className="flex flex-col items-center group"
                  disabled={i > step}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all duration-200 ${
                      i < step
                        ? 'bg-violet-600 border-violet-600 text-white'
                        : i === step
                        ? 'bg-white border-violet-600 text-violet-600'
                        : 'bg-white border-gray-200 text-gray-400'
                    }`}
                  >
                    {i < step ? <Check size={12} /> : i + 1}
                  </div>
                  <span
                    className={`text-xs mt-1 font-medium transition-colors ${
                      i === step
                        ? 'text-violet-600'
                        : i < step
                        ? 'text-gray-500'
                        : 'text-gray-300'
                    }`}
                  >
                    {label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-1 mb-5 transition-colors duration-200 ${
                      i < step ? 'bg-violet-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">
        {/* ════════════════════════════════════════════════════
            STEP 1 — 기본정보
        ════════════════════════════════════════════════════ */}
        {step === 0 && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">기본 정보</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  클래스의 이름과 카테고리를 입력해주세요
                </CardDescription>
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
                    onChange={(e) => set('name', e.target.value)}
                    maxLength={50}
                    className="text-sm"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">클래스를 대표하는 이름을 입력해주세요</p>
                    <span
                      className={`text-xs tabular-nums ${
                        form.name.length >= 45 ? 'text-amber-500' : 'text-gray-400'
                      }`}
                    >
                      {form.name.length}/50
                    </span>
                  </div>
                </div>

                {/* 카테고리 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => set('category', v ?? '')}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="카테고리를 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c} className="text-sm">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">클래스 소개</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  수강생들이 클래스를 이해하는 데 도움이 되는 정보를 작성해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* 소개 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">소개글</label>
                  <textarea
                    rows={5}
                    placeholder="클래스 목표, 커리큘럼, 준비물 등을 자유롭게 소개해주세요"
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    maxLength={500}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-shadow"
                  />
                  <div className="flex justify-end">
                    <span
                      className={`text-xs tabular-nums ${
                        form.description.length >= 480 ? 'text-amber-500' : 'text-gray-400'
                      }`}
                    >
                      {form.description.length}/500
                    </span>
                  </div>
                </div>

                {/* 대표 이미지 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">대표 이미지</label>
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-violet-50 hover:border-violet-300 transition-colors group">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    {imageName ? (
                      <div className="flex flex-col items-center gap-1.5 text-center px-4">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                          <Check size={18} className="text-violet-600" />
                        </div>
                        <span className="text-sm font-medium text-violet-700 truncate max-w-xs">
                          {imageName}
                        </span>
                        <span className="text-xs text-gray-400">클릭하여 변경</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-center px-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                          <Upload size={18} className="text-gray-400 group-hover:text-violet-500 transition-colors" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">이미지 업로드</span>
                        <span className="text-xs text-gray-400">JPG, PNG, WEBP · 최대 5MB</span>
                      </div>
                    )}
                  </label>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 2 — 회차 설정
        ════════════════════════════════════════════════════ */}
        {step === 1 && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">회차 구성</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  총 회차 수와 수업 시간을 설정해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* 총 회차 수 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    총 회차 수 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="10"
                        min={1}
                        max={100}
                        value={form.totalSessions}
                        onChange={(e) => set('totalSessions', e.target.value)}
                        className="text-sm w-28 pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                        회
                      </span>
                    </div>
                    {form.totalSessions && parseInt(form.totalSessions) > 0 && (
                      <Badge className="bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100 text-xs font-medium animate-in fade-in slide-in-from-left-2 duration-200">
                        총 {form.totalSessions}회차 과정
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">수강생이 수강할 총 회차 수 (최대 100회)</p>
                </div>

                {/* 회차당 수업 시간 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">회차당 수업 시간</label>
                  <Select
                    value={form.sessionDuration}
                    onValueChange={(v) => set('sessionDuration', v ?? '60')}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="시간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATION_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value} className="text-sm">
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 일정 유형 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">일정 유형</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  수업 일정을 어떻게 운영할지 선택해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* 정기 수업 */}
                  <button
                    onClick={() => set('scheduleType', 'fixed')}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      form.scheduleType === 'fixed'
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {form.scheduleType === 'fixed' && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <Calendar size={20} className={`mb-2 ${form.scheduleType === 'fixed' ? 'text-violet-600' : 'text-gray-400'}`} />
                    <p className={`text-sm font-semibold ${form.scheduleType === 'fixed' ? 'text-violet-700' : 'text-gray-700'}`}>
                      정기 수업
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">매주 특정 요일</p>
                  </button>

                  {/* 자유 수업 */}
                  <button
                    onClick={() => set('scheduleType', 'flexible')}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      form.scheduleType === 'flexible'
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {form.scheduleType === 'flexible' && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <Shuffle size={20} className={`mb-2 ${form.scheduleType === 'flexible' ? 'text-violet-600' : 'text-gray-400'}`} />
                    <p className={`text-sm font-semibold ${form.scheduleType === 'flexible' ? 'text-violet-700' : 'text-gray-700'}`}>
                      자유 수업
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">개별 일정 조율</p>
                  </button>
                </div>

                {/* 정기 수업 — 요일 + 시간 */}
                {form.scheduleType === 'fixed' && (
                  <div className="space-y-4 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">수업 요일</label>
                      <div className="flex gap-2 flex-wrap">
                        {DAYS.map((day) => (
                          <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`w-10 h-10 rounded-full text-sm font-semibold border-2 transition-all ${
                              form.days.includes(day)
                                ? 'bg-violet-600 border-violet-600 text-white'
                                : 'border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-600'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">시작 시간</label>
                        <Input
                          type="time"
                          value={form.startTime}
                          onChange={(e) => set('startTime', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">종료 시간</label>
                        <Input
                          type="time"
                          value={form.endTime}
                          onChange={(e) => set('endTime', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 자유 수업 — 안내 */}
                {form.scheduleType === 'flexible' && (
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-violet-50 border border-violet-100 animate-in fade-in slide-in-from-top-1 duration-200">
                    <Clock size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-violet-700 leading-relaxed">
                      수강생과 개별적으로 일정을 조율합니다. 클래스 등록 후 수강생이 신청하면 직접 시간을 협의해 수업을 진행할 수 있어요.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 장소 유형 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">수업 장소</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  수업이 진행될 장소 유형을 선택해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      { value: 'offline', label: '오프라인', icon: MapPin },
                      { value: 'online', label: '온라인', icon: Video },
                      { value: 'hybrid', label: '혼합', icon: Layers },
                    ] as const
                  ).map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => set('locationType', value)}
                      className={`relative p-4 rounded-xl border-2 text-center transition-all ${
                        form.locationType === value
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {form.locationType === value && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center">
                          <Check size={9} className="text-white" />
                        </div>
                      )}
                      <Icon
                        size={20}
                        className={`mx-auto mb-1.5 ${form.locationType === value ? 'text-violet-600' : 'text-gray-400'}`}
                      />
                      <p className={`text-xs font-semibold ${form.locationType === value ? 'text-violet-700' : 'text-gray-700'}`}>
                        {label}
                      </p>
                    </button>
                  ))}
                </div>

                {(form.locationType === 'offline' || form.locationType === 'hybrid') && (
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    <label className="text-sm font-medium text-gray-700">상세 주소</label>
                    <Input
                      placeholder="예: 서울시 마포구 연남동 123-4 2층"
                      value={form.address}
                      onChange={(e) => set('address', e.target.value)}
                      className="text-sm"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 3 — 수강료
        ════════════════════════════════════════════════════ */}
        {step === 2 && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">수강 정원 및 수강료</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  정원과 수강료를 입력해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* 정원 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    정원 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-36">
                    <Input
                      type="number"
                      placeholder="10"
                      min={1}
                      value={form.capacity}
                      onChange={(e) => set('capacity', e.target.value)}
                      className="text-sm pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                      명
                    </span>
                  </div>
                </div>

                <Separator />

                {/* 수강료 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    수강료 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="예: 150,000"
                      value={form.price}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '')
                        set('price', raw ? formatPrice(raw) : '')
                      }}
                      className="text-sm pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                      원
                    </span>
                  </div>
                  {pricePerSession(form.price, form.totalSessions) && (
                    <div className="flex items-center gap-1.5 animate-in fade-in duration-200">
                      <Badge variant="outline" className="text-xs text-violet-600 border-violet-200 bg-violet-50 font-normal">
                        회차당 {pricePerSession(form.price, form.totalSessions)}원
                      </Badge>
                      <span className="text-xs text-gray-400">
                        ({form.totalSessions}회 기준)
                      </span>
                    </div>
                  )}
                </div>

                {/* 수강권 유효기간 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">수강권 유효기간</label>
                  <Select
                    value={form.validityDays}
                    onValueChange={(v) => set('validityDays', v ?? '90')}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="유효기간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {VALIDITY_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value} className="text-sm">
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400">수강권 구매 후 사용 가능한 기간</p>
                </div>
              </CardContent>
            </Card>

            {/* 얼리버드 */}
            <Card>
              <CardContent className="pt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Sparkles size={15} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">얼리버드 할인</p>
                      <p className="text-xs text-gray-500">조기 등록 수강생에게 특별 가격 제공</p>
                    </div>
                  </div>
                  <button
                    onClick={() => set('earlyBirdEnabled', !form.earlyBirdEnabled)}
                    className={`relative inline-flex w-11 h-6 items-center rounded-full transition-colors ${
                      form.earlyBirdEnabled ? 'bg-violet-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                        form.earlyBirdEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {form.earlyBirdEnabled && (
                  <div className="mt-4 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <label className="text-sm font-medium text-gray-700">얼리버드 가격</label>
                    <div className="relative">
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="예: 120,000"
                        value={form.earlyBirdPrice}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '')
                          set('earlyBirdPrice', raw ? formatPrice(raw) : '')
                        }}
                        className="text-sm pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                        원
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">정가보다 낮게 설정해주세요</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* ════════════════════════════════════════════════════
            STEP 4 — 공개설정
        ════════════════════════════════════════════════════ */}
        {step === 3 && !submitted && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">공개 범위</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  클래스를 누구에게 공개할지 설정해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {/* 전체 공개 */}
                  <button
                    onClick={() => set('isPublic', true)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      form.isPublic
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {form.isPublic && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <Globe size={20} className={`mb-2 ${form.isPublic ? 'text-violet-600' : 'text-gray-400'}`} />
                    <p className={`text-sm font-semibold ${form.isPublic ? 'text-violet-700' : 'text-gray-700'}`}>
                      전체 공개
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">누구나 클래스를 볼 수 있어요</p>
                  </button>

                  {/* 비공개 */}
                  <button
                    onClick={() => set('isPublic', false)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      !form.isPublic
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {!form.isPublic && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </div>
                    )}
                    <Lock size={20} className={`mb-2 ${!form.isPublic ? 'text-violet-600' : 'text-gray-400'}`} />
                    <p className={`text-sm font-semibold ${!form.isPublic ? 'text-violet-700' : 'text-gray-700'}`}>
                      비공개
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">링크를 가진 사람만 볼 수 있어요</p>
                  </button>
                </div>

                {/* 검색 노출 */}
                <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${form.allowSearch ? 'border-violet-200 bg-violet-50/50' : 'border-gray-200 bg-white'}`}>
                  <div className="flex items-center gap-2.5">
                    <Search size={16} className={form.allowSearch ? 'text-violet-500' : 'text-gray-400'} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">검색 노출</p>
                      <p className="text-xs text-gray-500">플랫폼 검색 결과에 클래스가 표시됩니다</p>
                    </div>
                  </div>
                  <button
                    onClick={() => set('allowSearch', !form.allowSearch)}
                    disabled={!form.isPublic}
                    className={`relative inline-flex w-11 h-6 items-center rounded-full transition-colors disabled:opacity-40 ${
                      form.allowSearch && form.isPublic ? 'bg-violet-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                        form.allowSearch && form.isPublic ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* 수강 신청 승인 */}
                <div className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${form.requireApproval ? 'border-violet-200 bg-violet-50/50' : 'border-gray-200 bg-white'}`}>
                  <div className="flex items-center gap-2.5">
                    <UserCheck size={16} className={form.requireApproval ? 'text-violet-500' : 'text-gray-400'} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">수강 신청 승인</p>
                      <p className="text-xs text-gray-500">수강생의 신청을 직접 승인 후 등록됩니다</p>
                    </div>
                  </div>
                  <button
                    onClick={() => set('requireApproval', !form.requireApproval)}
                    className={`relative inline-flex w-11 h-6 items-center rounded-full transition-colors ${
                      form.requireApproval ? 'bg-violet-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                        form.requireApproval ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* 요약 미리보기 */}
            <Card className="border-violet-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Tag size={16} className="text-violet-500" />
                  클래스 요약
                </CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  개설 전 마지막으로 내용을 확인해주세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {/* 기본정보 */}
                  <div className="flex gap-3">
                    <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">클래스명</span>
                    <span className="font-medium text-gray-800 break-all">
                      {form.name || <span className="text-gray-300">미입력</span>}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">카테고리</span>
                    <span className="font-medium text-gray-800">
                      {form.category ? (
                        <Badge variant="outline" className="text-xs">{form.category}</Badge>
                      ) : (
                        <span className="text-gray-300">미선택</span>
                      )}
                    </span>
                  </div>
                  <Separator />
                  {/* 회차 */}
                  <div className="flex gap-3">
                    <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">총 회차</span>
                    <span className="font-medium text-gray-800">
                      {form.totalSessions ? `${form.totalSessions}회` : <span className="text-gray-300">미입력</span>}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">수업 시간</span>
                    <span className="font-medium text-gray-800">
                      {DURATION_OPTIONS.find((o) => o.value === form.sessionDuration)?.label ?? '-'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">장소</span>
                    <span className="font-medium text-gray-800">
                      {form.locationType === 'offline' ? '오프라인' : form.locationType === 'online' ? '온라인' : '혼합'}
                      {form.address && ` · ${form.address}`}
                    </span>
                  </div>
                  <Separator />
                  {/* 수강료 */}
                  <div className="flex gap-3">
                    <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">정원</span>
                    <span className="font-medium text-gray-800">
                      {form.capacity ? `${form.capacity}명` : <span className="text-gray-300">미입력</span>}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">수강료</span>
                    <span className="font-medium text-gray-800">
                      {form.price ? (
                        <span>
                          {form.price}원
                          {pricePerSession(form.price, form.totalSessions) && (
                            <span className="text-xs text-gray-400 ml-1">
                              (회차당 {pricePerSession(form.price, form.totalSessions)}원)
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-300">미입력</span>
                      )}
                    </span>
                  </div>
                  {form.earlyBirdEnabled && form.earlyBirdPrice && (
                    <div className="flex gap-3">
                      <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">얼리버드</span>
                      <span className="font-medium text-amber-600">{form.earlyBirdPrice}원</span>
                    </div>
                  )}
                  <Separator />
                  {/* 공개설정 */}
                  <div className="flex gap-3">
                    <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">공개 범위</span>
                    <span className="font-medium text-gray-800">
                      {form.isPublic ? '전체 공개' : '비공개'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-20 text-xs text-gray-500 shrink-0 pt-0.5">신청 방식</span>
                    <span className="font-medium text-gray-800">
                      {form.requireApproval ? '승인 후 등록' : '즉시 등록'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* ════════════════════════════════════════════════════
            SUCCESS STATE
        ════════════════════════════════════════════════════ */}
        {step === 3 && submitted && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center mb-5">
              <CheckCircle2 size={40} className="text-violet-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">클래스가 개설되었습니다!</h2>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-semibold text-gray-700">{form.name}</span> 클래스가 성공적으로 등록되었어요.
            </p>
            <p className="text-xs text-gray-400 mb-8">수강생들이 지금 바로 신청할 수 있습니다.</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-sm"
                onClick={() => router.push('/class')}
              >
                클래스 목록 보기
              </Button>
              <Button
                className="bg-violet-600 hover:bg-violet-700 text-sm gap-2"
                onClick={() => router.push('/class/create')}
              >
                <ListChecks size={15} />
                새 클래스 만들기
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ── Fixed Bottom Action Bar ──────────────────────────── */}
      {!(step === 3 && submitted) && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              className="gap-1.5 text-sm"
            >
              <ChevronLeft size={15} />
              {step === 0 ? '취소' : '이전'}
            </Button>

            <div className="flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-200 ${
                    i === step
                      ? 'w-5 h-1.5 bg-violet-600'
                      : i < step
                      ? 'w-1.5 h-1.5 bg-violet-300'
                      : 'w-1.5 h-1.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {step < 3 ? (
              <Button
                size="sm"
                disabled={!stepValid[step]}
                onClick={handleNext}
                className="gap-1.5 text-sm bg-violet-600 hover:bg-violet-700 disabled:opacity-40 min-w-[80px]"
              >
                다음
                <Check size={14} />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleSubmit}
                className="gap-1.5 text-sm bg-violet-600 hover:bg-violet-700 min-w-[100px]"
              >
                <Sparkles size={14} />
                클래스 개설하기
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
