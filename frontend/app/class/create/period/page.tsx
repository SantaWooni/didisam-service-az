'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ImagePlus, ChevronRight, Check } from "lucide-react"
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

const STEPS = ["기본정보", "일정/장소", "수강료", "공개설정"] as const

const CATEGORIES = [
  { value: "art", label: "미술" },
  { value: "music", label: "음악" },
  { value: "sports", label: "체육" },
  { value: "study", label: "학습" },
  { value: "etc", label: "기타" },
]

export default function PeriodClassCreatePage() {
  const router = useRouter()
  const [currentStep] = useState(0)

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    image: null as File | null,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setForm((prev) => ({ ...prev, image: file }))
  }

  const isStepValid =
    form.name.trim().length > 0 && form.category.length > 0

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {/* Page header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-3 px-3 py-1 text-xs font-medium">
            기간 클래스
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            새 클래스 만들기
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            특정 기간 동안 진행되는 클래스를 개설합니다
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep
              return (
                <div key={step} className="flex flex-1 items-center">
                  {/* Step circle + label */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isCurrent
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground ring-1 ring-foreground/10"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isCurrent ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step}
                    </span>
                  </div>

                  {/* Connector line (not after last step) */}
                  {index < STEPS.length - 1 && (
                    <div
                      className={`mx-2 mb-5 h-px flex-1 transition-colors ${
                        isCompleted ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form card */}
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-base font-semibold">기본정보</CardTitle>
            <CardDescription>클래스의 기본 정보를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 pt-6">
            {/* 클래스명 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                클래스명
                <span className="ml-1 text-destructive">*</span>
              </label>
              <Input
                placeholder="예: 수채화 기초반"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground">
                수강생에게 표시되는 클래스 이름입니다 ({form.name.length}/50)
              </p>
            </div>

            {/* 카테고리 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                카테고리
                <span className="ml-1 text-destructive">*</span>
              </label>
              <Select
                value={form.category}
                onValueChange={(value) => setForm((prev) => ({ ...prev, category: value ?? '' }))}
              >
                <SelectTrigger className="w-full h-9">
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
              <label className="text-sm font-medium text-foreground">클래스 소개</label>
              <textarea
                className="min-h-[120px] w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="클래스에 대해 간략히 소개해주세요"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                {form.description.length}/500자
              </p>
            </div>

            {/* 대표 이미지 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">대표 이미지</label>
              <label
                htmlFor="class-image-upload"
                className={`group flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors ${
                  form.image
                    ? "border-primary/50 bg-primary/5"
                    : "border-border hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                {form.image ? (
                  <>
                    <Check className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-primary">{form.image.name}</span>
                    <span className="text-xs text-muted-foreground">클릭하여 변경</span>
                  </>
                ) : (
                  <>
                    <ImagePlus className="h-7 w-7 text-muted-foreground/60 transition-colors group-hover:text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      이미지를 업로드하세요
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP · 최대 5MB
                    </span>
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

            {/* Actions */}
            <div className="flex items-center justify-between border-t pt-4">
              <Button
                variant="ghost"
                type="button"
                onClick={() => router.back()}
                className="text-muted-foreground"
              >
                이전으로
              </Button>
              <Button
                type="button"
                disabled={!isStepValid}
                className="gap-1.5"
              >
                다음 단계
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step progress text */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          {currentStep + 1} / {STEPS.length} 단계
        </p>
      </div>
    </div>
  )
}
