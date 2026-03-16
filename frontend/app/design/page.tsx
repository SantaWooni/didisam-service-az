'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  GripVertical,
  Pencil,
  Save,
  Monitor,
  Palette,
  Type,
  LayoutTemplate,
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Section {
  id: string
  name: string
  visible: boolean
  color: string
  fontSize: string
  layout: string
}

const initialSections: Section[] = [
  { id: '1', name: '히어로 배너',  visible: true,  color: '#6366f1', fontSize: 'large',  layout: 'centered' },
  { id: '2', name: '클래스 소개',  visible: true,  color: '#8b5cf6', fontSize: 'medium', layout: 'grid'     },
  { id: '3', name: '강사 소개',    visible: true,  color: '#ec4899', fontSize: 'medium', layout: 'list'     },
  { id: '4', name: '수강생 후기',  visible: true,  color: '#f59e0b', fontSize: 'small',  layout: 'carousel' },
  { id: '5', name: '공지사항',     visible: false, color: '#10b981', fontSize: 'small',  layout: 'list'     },
  { id: '6', name: '푸터',         visible: true,  color: '#6b7280', fontSize: 'small',  layout: 'columns'  },
]

const COLOR_OPTIONS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#ef4444', '#6b7280',
  '#1e293b', '#f1f5f9',
]

const FONT_SIZE_OPTIONS = [
  { value: 'small',  label: '소형 (14px)' },
  { value: 'medium', label: '중형 (16px)' },
  { value: 'large',  label: '대형 (20px)' },
  { value: 'xlarge', label: '특대 (24px)' },
]

const LAYOUT_OPTIONS = [
  { value: 'centered', label: '중앙 정렬'    },
  { value: 'left',     label: '좌측 정렬'    },
  { value: 'grid',     label: '그리드'       },
  { value: 'list',     label: '목록형'       },
  { value: 'carousel', label: '캐러셀'       },
  { value: 'columns',  label: '다단 레이아웃' },
]

/* ─── Sortable Section Row ─────────────────────────────────────────────────── */
interface SortableRowProps {
  section: Section
  isSelected: boolean
  onSelect: () => void
  onToggle: () => void
  onEdit: () => void
}

function SortableRow({ section, isSelected, onSelect, onToggle, onEdit }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
    zIndex: isDragging ? 999 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-indigo-400 bg-indigo-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
      } ${isDragging ? 'shadow-lg' : ''}`}
    >
      {/* Drag handle */}
      <span
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing flex-shrink-0"
      >
        <GripVertical size={17} />
      </span>

      {/* Color dot */}
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: section.color }}
      />

      {/* Name */}
      <span className="flex-1 text-sm font-medium text-gray-800 truncate">{section.name}</span>

      {/* Visible badge */}
      <Badge
        variant={section.visible ? 'default' : 'secondary'}
        className="text-xs px-1.5 py-0 flex-shrink-0"
      >
        {section.visible ? '표시' : '숨김'}
      </Badge>

      {/* Toggle */}
      <div
        onClick={(e) => { e.stopPropagation(); onToggle() }}
        className={`relative inline-flex items-center w-9 h-5 rounded-full cursor-pointer transition-colors flex-shrink-0 ${
          section.visible ? 'bg-indigo-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block w-3.5 h-3.5 bg-white rounded-full shadow-sm transform transition-transform ${
            section.visible ? 'translate-x-4.5' : 'translate-x-0.5'
          }`}
          style={{ transform: section.visible ? 'translateX(18px)' : 'translateX(2px)' }}
        />
      </div>

      {/* Edit */}
      <button
        onClick={(e) => { e.stopPropagation(); onEdit() }}
        className="p-1 text-gray-400 hover:text-indigo-600 rounded transition-colors flex-shrink-0"
      >
        <Pencil size={14} />
      </button>
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function DesignPage() {
  const [sections, setSections] = useState<Section[]>(initialSections)
  const [selectedId, setSelectedId] = useState<string>('1')
  const [saved, setSaved] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const sel = sections.find((s) => s.id === selectedId) ?? sections[0]

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (over && active.id !== over.id) {
      setSections((prev) => {
        const oldIdx = prev.findIndex((s) => s.id === active.id)
        const newIdx = prev.findIndex((s) => s.id === over.id)
        return arrayMove(prev, oldIdx, newIdx)
      })
    }
  }

  function toggle(id: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)))
  }

  function update(id: string, patch: Partial<Section>) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">홈페이지 디자인</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              섹션을 드래그하여 순서를 변경하고 디자인을 설정하세요
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Monitor size={15} />
              미리보기
            </Button>
            <Button
              onClick={handleSave}
              className={`gap-2 ${
                saved
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <Save size={15} />
              {saved ? '저장됨!' : '변경사항 저장'}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        {/* ── Left (2/3) ── */}
        <div className="flex-[2] min-w-0 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-800">
                  페이지 섹션
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {sections.filter((s) => s.visible).length}/{sections.length} 표시 중
                </Badge>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                드래그 핸들을 잡고 섹션 순서를 변경하세요
              </p>
            </CardHeader>
            <CardContent className="pt-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {sections.map((section, idx) => (
                      <div key={section.id} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-4 text-right flex-shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <SortableRow
                            section={section}
                            isSelected={selectedId === section.id}
                            onSelect={() => setSelectedId(section.id)}
                            onToggle={() => toggle(section.id)}
                            onEdit={() => setSelectedId(section.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-xs text-blue-600">
                  섹션을 클릭하면 오른쪽 패널에서 상세 설정을 변경할 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview hint */}
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Monitor size={18} className="text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">실시간 미리보기</p>
                  <p className="text-xs text-gray-500">변경사항은 저장 후 홈페이지에 반영됩니다</p>
                </div>
                <Button variant="outline" size="sm">
                  미리보기 열기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Right (1/3) ── */}
        <div className="flex-[1] min-w-0">
          <Card className="sticky top-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-800">섹션 설정</CardTitle>
              {sel && (
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: sel.color }}
                  />
                  <span className="text-sm text-indigo-600 font-medium">{sel.name}</span>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-2">
              {sel ? (
                <Tabs defaultValue="color">
                  <TabsList className="w-full grid grid-cols-3 mb-4">
                    <TabsTrigger value="color" className="text-xs gap-1">
                      <Palette size={11} />
                      색상
                    </TabsTrigger>
                    <TabsTrigger value="font" className="text-xs gap-1">
                      <Type size={11} />
                      폰트
                    </TabsTrigger>
                    <TabsTrigger value="layout" className="text-xs gap-1">
                      <LayoutTemplate size={11} />
                      레이아웃
                    </TabsTrigger>
                  </TabsList>

                  {/* Color */}
                  <TabsContent value="color" className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        테마 색상
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {COLOR_OPTIONS.map((c) => (
                          <button
                            key={c}
                            onClick={() => update(sel.id, { color: c })}
                            className={`w-9 h-9 rounded-lg border-2 transition-transform hover:scale-110 ${
                              sel.color === c
                                ? 'border-gray-800 scale-110'
                                : 'border-transparent'
                            }`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        선택된 색상
                      </label>
                      <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                        <div
                          className="w-8 h-8 rounded-md shadow-sm flex-shrink-0"
                          style={{ backgroundColor: sel.color }}
                        />
                        <div>
                          <p className="text-xs font-mono text-gray-700">
                            {sel.color.toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-400">HEX 코드</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        배경 스타일
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['단색', '그라데이션', '패턴', '이미지'].map((s) => (
                          <button
                            key={s}
                            className="p-2 text-xs border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Font */}
                  <TabsContent value="font" className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        제목 크기
                      </label>
                      <select
                        value={sel.fontSize}
                        onChange={(e) => update(sel.id, { fontSize: e.target.value })}
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        {FONT_SIZE_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        폰트 패밀리
                      </label>
                      <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                        <option>Noto Sans KR (기본)</option>
                        <option>Pretendard</option>
                        <option>Nanum Gothic</option>
                        <option>Spoqa Han Sans Neo</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        폰트 두께
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['보통', '중간', '굵게'].map((w) => (
                          <button
                            key={w}
                            className="p-2 text-xs border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        미리보기
                      </label>
                      <div
                        className="p-3 rounded-lg border border-gray-200 text-center"
                        style={{ color: sel.color }}
                      >
                        <p
                          className={`font-semibold ${
                            sel.fontSize === 'xlarge'
                              ? 'text-2xl'
                              : sel.fontSize === 'large'
                              ? 'text-xl'
                              : sel.fontSize === 'medium'
                              ? 'text-base'
                              : 'text-sm'
                          }`}
                        >
                          {sel.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">샘플 텍스트</p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Layout */}
                  <TabsContent value="layout" className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        레이아웃 유형
                      </label>
                      <div className="space-y-1.5">
                        {LAYOUT_OPTIONS.map((o) => (
                          <button
                            key={o.value}
                            onClick={() => update(sel.id, { layout: o.value })}
                            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm border rounded-lg transition-colors ${
                              sel.layout === o.value
                                ? 'border-indigo-400 bg-indigo-50 text-indigo-700 font-medium'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <span>{o.label}</span>
                            {sel.layout === o.value && (
                              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                                선택됨
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        여백 설정
                      </label>
                      <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                        <option>좁게 (16px)</option>
                        <option>보통 (32px)</option>
                        <option>넓게 (48px)</option>
                        <option>매우 넓게 (64px)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-2">
                        컨텐츠 최대 너비
                      </label>
                      <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
                        <option>전체 너비</option>
                        <option>1280px</option>
                        <option>1024px</option>
                        <option>768px</option>
                      </select>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <LayoutTemplate size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">섹션을 선택하세요</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
