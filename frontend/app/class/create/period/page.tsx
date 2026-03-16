'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ImagePlus,
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
  Monitor,
  Layers,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const STEPS = ["기본정보", "일정/장소", "수강료", "공개설정"] as const

const CATEGORIES = [
  { value: "art", label: "미술" },
  { value: "music", label: "음악" },
  { value: "sports", label: "체육" },
  { value: "dance", label: "댄스" },
  { value: "yoga", label: "요가&필라테스" },
  { value: "etc", label: "기타" },
]

const CATEGORY_LABEL: Record<string, string> = {
  art: "미술",
  music: "음악",
  sports: "체육",
  dance: "댄스",
  yoga: "요가&필라테스",
  etc: "기타",
}

const DAYS_OF_WEEK = ["월", "화", "수", "목", "금", "토", "일"]

const PAYMENT_METHODS = [
  { id: "card", label: "신용카드" },
  { id: "transfer", label: "무통장입금" },
  { id: "kakao", label: "카카오페이" },
  { id: "naver", label: "네이버페이" },
]

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface FormState {
  // Step 1
  name: string
  category: string
  description: string
  image: File | null
  // Step 2
  startDate: string
  endDate: string
  days: string[]
  startTime: string
  endTime: string
  locationType: "offline" | "online" | "hybrid"
  address: string
  // Step 3
  price: string
  capacity: string
  earlyBirdEnabled: boolean
  earlyBirdPrice: string
  earlyBirdDeadline: string
  paymentMethods: string[]
  // Step 4
  isPublic: boolean
  allowSearch: boolean
  requireApproval: boolean
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function calcDurationDays(start: string, end: string): number | null {
  if (!start || !end) return null
  const s = new Date(start)
  const e = new Date(end)
  const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
  return diff >= 0 ? diff + 1 : null
}

function formatPrice(v: string): string {
  const num = parseInt(v.replace(/\D/g, ""), 10)
  if (isNaN(num)) return ""
  return num.toLocaleString("ko-KR")
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        enabled ? "bg-indigo-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )
}

function DivCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
        checked
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
      }`}
    >
      <div
        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
          checked ? "border-indigo-600 bg-indigo-600" : "border-gray-300 bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>
      {label}
    </button>
  )
}

// ─────────────────────────────────────────────
// Step panels
// ─────────────────────────────────────────────

function Step1({
  form,
  setForm,
}: {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
}) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setForm((p) => ({ ...p, image: file }))
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 클래스명 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-900">
          클래스명 <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="예: 수채화 기초반"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          maxLength={50}
        />
        <p className="text-right text-xs text-gray-400">{form.name.length}/50</p>
      </div>

      {/* 카테고리 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-900">
          카테고리 <span className="text-red-500">*</span>
        </label>
        <Select
          value={form.category}
          onValueChange={(v) => setForm((p) => ({ ...p, category: v ?? "" }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="카테고리를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 클래스 소개 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-900">클래스 소개</label>
        <textarea
          className="min-h-[120px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="클래스에 대해 간략히 소개해주세요"
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          maxLength={500}
        />
        <p className="text-right text-xs text-gray-400">{form.description.length}/500</p>
      </div>

      {/* 대표 이미지 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-900">대표 이미지</label>
        <label
          htmlFor="class-image-upload"
          className={`group flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors ${
            form.image
              ? "border-indigo-400 bg-indigo-50"
              : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
          }`}
        >
          {form.image ? (
            <>
              <Check className="h-6 w-6 text-indigo-600" />
              <span className="max-w-xs truncate text-sm font-medium text-indigo-700">
                {form.image.name}
              </span>
              <span className="text-xs text-gray-400">클릭하여 변경</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-7 w-7 text-gray-300 transition-colors group-hover:text-gray-400" />
              <span className="text-sm font-medium text-gray-500">이미지를 업로드하세요</span>
              <span className="text-xs text-gray-400">PNG, JPG, WEBP · 최대 5MB</span>
            </>
          )}
          <input
            id="class-image-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  )
}

function Step2({
  form,
  setForm,
}: {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
}) {
  const duration = calcDurationDays(form.startDate, form.endDate)

  const toggleDay = (day: string) => {
    setForm((p) => ({
      ...p,
      days: p.days.includes(day) ? p.days.filter((d) => d !== day) : [...p.days, day],
    }))
  }

  const locationCards = [
    { value: "offline", label: "오프라인", icon: MapPin },
    { value: "online", label: "온라인", icon: Monitor },
    { value: "hybrid", label: "혼합", icon: Layers },
  ] as const

  return (
    <div className="flex flex-col gap-6">
      {/* 날짜 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-900">
            시작일 <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-900">
            종료일 <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={form.endDate}
            min={form.startDate}
            onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
          />
        </div>
      </div>
      {duration !== null && (
        <p className="mt-[-12px] text-xs text-indigo-600 font-medium">
          총 {duration}일 진행
        </p>
      )}

      {/* 요일 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-900">
          요일 선택 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const selected = form.days.includes(day)
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  selected
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* 시간 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-900">수업 시작 시간</label>
          <Input
            type="time"
            value={form.startTime}
            onChange={(e) => setForm((p) => ({ ...p, startTime: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-900">수업 종료 시간</label>
          <Input
            type="time"
            value={form.endTime}
            onChange={(e) => setForm((p) => ({ ...p, endTime: e.target.value }))}
          />
        </div>
      </div>

      <Separator />

      {/* 장소 유형 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-900">장소 유형</label>
        <div className="grid grid-cols-3 gap-3">
          {locationCards.map(({ value, label, icon: Icon }) => {
            const selected = form.locationType === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => setForm((p) => ({ ...p, locationType: value }))}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 py-4 text-sm font-medium transition-colors ${
                  selected
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <Icon className={`h-5 w-5 ${selected ? "text-indigo-600" : "text-gray-400"}`} />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 상세 주소 */}
      {(form.locationType === "offline" || form.locationType === "hybrid") && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-900">상세 주소</label>
          <Input
            placeholder="예: 서울시 강남구 테헤란로 123, 2층"
            value={form.address}
            onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
          />
        </div>
      )}
    </div>
  )
}

function Step3({
  form,
  setForm,
}: {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
}) {
  const togglePayment = (id: string) => {
    setForm((p) => ({
      ...p,
      paymentMethods: p.paymentMethods.includes(id)
        ? p.paymentMethods.filter((m) => m !== id)
        : [...p.paymentMethods, id],
    }))
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 정원 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-900">
          정원 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Input
            type="number"
            min={1}
            placeholder="0"
            value={form.capacity}
            onChange={(e) => setForm((p) => ({ ...p, capacity: e.target.value }))}
            className="pr-8"
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-400">
            명
          </span>
        </div>
      </div>

      {/* 수강료 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-900">
          수강료 <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Input
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={form.price ? formatPrice(form.price) : ""}
            onChange={(e) =>
              setForm((p) => ({ ...p, price: e.target.value.replace(/\D/g, "") }))
            }
            className="pr-8"
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-400">
            원
          </span>
        </div>
      </div>

      <Separator />

      {/* 얼리버드 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">얼리버드 할인</p>
            <p className="text-xs text-gray-500">조기 등록자에게 할인 혜택을 제공합니다</p>
          </div>
          <ToggleSwitch
            enabled={form.earlyBirdEnabled}
            onChange={(v) => setForm((p) => ({ ...p, earlyBirdEnabled: v }))}
          />
        </div>

        {form.earlyBirdEnabled && (
          <div className="grid grid-cols-2 gap-4 rounded-xl bg-indigo-50 p-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">얼리버드 가격</label>
              <div className="relative">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={form.earlyBirdPrice ? formatPrice(form.earlyBirdPrice) : ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      earlyBirdPrice: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  className="bg-white pr-8"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-400">
                  원
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">마감일</label>
              <Input
                type="date"
                value={form.earlyBirdDeadline}
                max={form.startDate || undefined}
                onChange={(e) =>
                  setForm((p) => ({ ...p, earlyBirdDeadline: e.target.value }))
                }
                className="bg-white"
              />
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* 결제 방법 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-900">결제 방법</label>
        <div className="flex flex-wrap gap-2">
          {PAYMENT_METHODS.map((method) => (
            <DivCheckbox
              key={method.id}
              checked={form.paymentMethods.includes(method.id)}
              onChange={() => togglePayment(method.id)}
              label={method.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Step4({
  form,
  setForm,
  onSubmit,
  submitted,
}: {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  onSubmit: () => void
  submitted: boolean
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* 공개 범위 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-900">공개 범위</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: true, label: "전체 공개", desc: "누구나 클래스를 볼 수 있습니다" },
            { value: false, label: "비공개", desc: "링크를 가진 사람만 볼 수 있습니다" },
          ].map((opt) => {
            const selected = form.isPublic === opt.value
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => setForm((p) => ({ ...p, isPublic: opt.value }))}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-colors ${
                  selected
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${
                      selected ? "text-indigo-700" : "text-gray-800"
                    }`}
                  >
                    {opt.label}
                  </span>
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                      selected ? "border-indigo-600 bg-indigo-600" : "border-gray-300"
                    }`}
                  >
                    {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{opt.desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* 검색 노출 */}
      <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-900">검색 노출</p>
          <p className="text-xs text-gray-500">검색 결과에 클래스를 노출합니다</p>
        </div>
        <ToggleSwitch
          enabled={form.allowSearch}
          onChange={(v) => setForm((p) => ({ ...p, allowSearch: v }))}
        />
      </div>

      {/* 수강 신청 승인 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-900">수강 신청 승인</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: false, label: "자동 승인", desc: "신청 즉시 자동으로 승인됩니다" },
            { value: true, label: "수동 승인", desc: "강사가 직접 신청을 검토합니다" },
          ].map((opt) => {
            const selected = form.requireApproval === opt.value
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => setForm((p) => ({ ...p, requireApproval: opt.value }))}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-colors ${
                  selected
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${
                      selected ? "text-indigo-700" : "text-gray-800"
                    }`}
                  >
                    {opt.label}
                  </span>
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                      selected ? "border-indigo-600 bg-indigo-600" : "border-gray-300"
                    }`}
                  >
                    {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{opt.desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* 미리보기 요약 카드 */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-gray-900">클래스 미리보기</p>
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-900">{form.name || "클래스명 미입력"}</p>
              {form.category && (
                <Badge variant="secondary" className="w-fit text-xs">
                  {CATEGORY_LABEL[form.category] ?? form.category}
                </Badge>
              )}
            </div>
            <Badge
              className={`shrink-0 text-xs ${
                form.isPublic
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
              variant="secondary"
            >
              {form.isPublic ? "공개" : "비공개"}
            </Badge>
          </div>
          <Separator className="my-3" />
          <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-600">
            {form.startDate && form.endDate && (
              <>
                <span className="font-medium text-gray-500">기간</span>
                <span>
                  {form.startDate} ~ {form.endDate}
                </span>
              </>
            )}
            {form.days.length > 0 && (
              <>
                <span className="font-medium text-gray-500">요일</span>
                <span>{form.days.join(", ")}</span>
              </>
            )}
            {form.capacity && (
              <>
                <span className="font-medium text-gray-500">정원</span>
                <span>{parseInt(form.capacity).toLocaleString("ko-KR")}명</span>
              </>
            )}
            {form.price && (
              <>
                <span className="font-medium text-gray-500">수강료</span>
                <span>{parseInt(form.price).toLocaleString("ko-KR")}원</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 개설하기 버튼 */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitted}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all ${
          submitted
            ? "bg-green-600 text-white"
            : "bg-green-500 text-white hover:bg-green-600 active:bg-green-700"
        }`}
      >
        {submitted ? (
          <>
            <CheckCircle2 className="h-5 w-5" />
            클래스가 개설되었습니다!
          </>
        ) : (
          "클래스 개설하기"
        )}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────
// Step indicator
// ─────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center px-6 py-4">
      {STEPS.map((step, index) => {
        const isCompleted = index < current
        const isCurrent = index === current
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isCompleted
                    ? "bg-indigo-600 text-white"
                    : isCurrent
                    ? "bg-white text-indigo-600 ring-2 ring-indigo-500"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : index + 1}
              </div>
              <span
                className={`text-[11px] font-medium ${
                  isCurrent ? "text-indigo-600" : isCompleted ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`mx-1 mb-5 h-px w-10 transition-colors sm:w-16 ${
                  isCompleted ? "bg-indigo-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────

const INITIAL_FORM: FormState = {
  name: "",
  category: "",
  description: "",
  image: null,
  startDate: "",
  endDate: "",
  days: [],
  startTime: "",
  endTime: "",
  locationType: "offline",
  address: "",
  price: "",
  capacity: "",
  earlyBirdEnabled: false,
  earlyBirdPrice: "",
  earlyBirdDeadline: "",
  paymentMethods: ["card"],
  isPublic: true,
  allowSearch: true,
  requireApproval: false,
}

export default function PeriodClassCreatePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return form.name.trim().length > 0 && form.category.length > 0
      case 1:
        return (
          form.startDate.length > 0 &&
          form.endDate.length > 0 &&
          form.days.length > 0
        )
      case 2:
        return form.price.length > 0 && form.capacity.length > 0
      case 3:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 3 && isStepValid(currentStep)) {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    } else {
      router.back()
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const stepTitles = [
    { title: "기본정보", description: "클래스의 기본 정보를 입력해주세요" },
    { title: "일정/장소", description: "클래스 일정과 장소를 설정해주세요" },
    { title: "수강료", description: "수강료와 결제 방식을 설정해주세요" },
    { title: "공개설정", description: "클래스 공개 범위를 설정하고 개설하세요" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed top header */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            이전
          </button>
          <h1 className="text-sm font-bold text-gray-900">기간 클래스 만들기</h1>
          <span className="text-sm font-semibold text-indigo-600">
            {currentStep + 1}/4
          </span>
        </div>
        <StepIndicator current={currentStep} />
      </header>

      {/* Spacer for fixed header (header ~100px + step indicator ~68px) */}
      <div className="h-[168px]" />

      {/* Scrollable main content */}
      <main className="mx-auto max-w-2xl px-4 pb-32 pt-6">
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-base font-semibold">
              {stepTitles[currentStep].title}
            </CardTitle>
            <CardDescription>{stepTitles[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {currentStep === 0 && <Step1 form={form} setForm={setForm} />}
            {currentStep === 1 && <Step2 form={form} setForm={setForm} />}
            {currentStep === 2 && <Step3 form={form} setForm={setForm} />}
            {currentStep === 3 && (
              <Step4
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                submitted={submitted}
              />
            )}
          </CardContent>
        </Card>
      </main>

      {/* Fixed bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl gap-3">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              type="button"
              onClick={handleBack}
              className="flex-1 gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              이전
            </Button>
          ) : (
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              className="flex-1 gap-1.5 text-gray-500"
            >
              취소
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className="flex-1 gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40"
            >
              다음
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitted}
              className="flex-1 bg-green-500 text-white hover:bg-green-600 disabled:bg-green-400"
            >
              {submitted ? "개설 완료!" : "클래스 개설하기"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
