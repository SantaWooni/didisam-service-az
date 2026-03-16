'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  Building2,
  CreditCard,
  Bell,
  User,
  Crown,
  Upload,
  Save,
  CheckCircle2,
  Zap,
  Shield,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

/* ─── Toggle ─────────────────────────────────────────────────────────────────── */
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center w-11 h-6 rounded-full cursor-pointer transition-colors select-none ${
        checked ? 'bg-indigo-500' : 'bg-gray-300'
      }`}
    >
      <span
        className="inline-block w-4 h-4 bg-white rounded-full shadow-sm transition-transform"
        style={{ transform: checked ? 'translateX(22px)' : 'translateX(4px)' }}
      />
    </div>
  )
}

/* ─── Form Row ───────────────────────────────────────────────────────────────── */
function FormRow({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-3 gap-4 items-start py-4">
      <label className="text-sm font-medium text-gray-700 pt-2 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500 text-xs">*</span>}
      </label>
      <div className="col-span-2">{children}</div>
    </div>
  )
}

/* ─── 스튜디오 정보 ────────────────────────────────────────────────────────────── */
function StudioInfoTab() {
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-800">스튜디오 기본 정보</CardTitle>
        <p className="text-xs text-gray-500">스튜디오의 기본 정보를 입력하고 저장하세요.</p>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-100">
          <FormRow label="스튜디오명" required>
            <Input defaultValue="디디샘 필라테스 스튜디오" className="text-sm" />
          </FormRow>
          <FormRow label="대표자명" required>
            <Input defaultValue="김지수" className="text-sm" />
          </FormRow>
          <FormRow label="연락처">
            <Input defaultValue="010-1234-5678" className="text-sm" />
          </FormRow>
          <FormRow label="이메일">
            <Input defaultValue="hello@didisam.co.kr" type="email" className="text-sm" />
          </FormRow>
          <FormRow label="주소">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input defaultValue="06234" className="text-sm w-28" placeholder="우편번호" />
                <Button variant="outline" size="sm" className="flex-shrink-0 text-xs">
                  주소 검색
                </Button>
              </div>
              <Input defaultValue="서울특별시 강남구 테헤란로 123" className="text-sm" />
              <Input placeholder="상세 주소를 입력하세요" className="text-sm" />
            </div>
          </FormRow>
          <FormRow label="사업자번호">
            <Input defaultValue="123-45-67890" className="text-sm" />
          </FormRow>
          <FormRow label="스튜디오 로고">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload size={20} className="text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-600">클릭하여 로고 업로드</p>
              <p className="text-xs text-gray-400">PNG, JPG, SVG · 최대 2MB · 권장 256×256px</p>
            </div>
          </FormRow>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            className={`gap-2 ${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
            {saved ? '저장됨!' : '저장하기'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/* ─── 결제 설정 ──────────────────────────────────────────────────────────────── */
function PaymentTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">PG사 설정</CardTitle>
          <p className="text-xs text-gray-500">결제를 처리할 PG사를 선택하고 연동하세요.</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { name: '카카오페이', status: '연동됨', active: true },
              { name: '토스페이먼츠', status: '미연동', active: false },
              { name: '나이스페이', status: '미연동', active: false },
            ].map((pg) => (
              <div
                key={pg.name}
                className={`p-4 border rounded-xl cursor-pointer transition-all ${
                  pg.active
                    ? 'border-indigo-400 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">{pg.name}</p>
                  <Badge
                    variant={pg.active ? 'default' : 'secondary'}
                    className="text-xs px-1.5 py-0"
                  >
                    {pg.status}
                  </Badge>
                </div>
                <Button
                  variant={pg.active ? 'outline' : 'default'}
                  size="sm"
                  className={`w-full text-xs ${!pg.active ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                >
                  {pg.active ? '설정 변경' : '연동하기'}
                </Button>
              </div>
            ))}
          </div>

          <Separator className="my-5" />

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">정산 주기</label>
              <Select defaultValue="monthly">
                <SelectTrigger className="w-56 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">매일 정산</SelectItem>
                  <SelectItem value="weekly">주 1회 정산</SelectItem>
                  <SelectItem value="monthly">월 1회 정산</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400 mt-1.5">
                정산은 선택한 주기에 따라 등록된 계좌로 자동 입금됩니다.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">정산 계좌</label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <CreditCard size={16} className="text-gray-400" />
                <span className="text-sm text-gray-700">국민은행 123-456-789012 (김지수)</span>
                <Button variant="outline" size="sm" className="ml-auto text-xs">
                  변경
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── 알림 설정 ──────────────────────────────────────────────────────────────── */
interface NotifRow {
  key: string
  label: string
  description: string
  channel: string
}

const NOTIF_ROWS: NotifRow[] = [
  { key: 'payment',    label: '신규 결제 알림',   description: '새로운 결제가 발생하면 알림을 보냅니다', channel: '앱 · 이메일' },
  { key: 'consult',    label: '신규 상담 알림',   description: '새로운 상담 신청이 들어오면 알림을 보냅니다', channel: '앱 · SMS'   },
  { key: 'expire',     label: '수강 만료 알림',   description: '수강권 만료 7일 전에 알림을 보냅니다', channel: '앱 · 이메일' },
  { key: 'community',  label: '커뮤니티 댓글 알림', description: '새 댓글이 달리면 알림을 보냅니다',   channel: '앱'          },
  { key: 'marketing',  label: '마케팅 정보 수신', description: '프로모션 및 이벤트 정보를 받습니다',   channel: '이메일'       },
]

function NotificationsTab() {
  const [states, setStates] = useState<Record<string, boolean>>({
    payment: true, consult: true, expire: true, community: false, marketing: false,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-800">알림 설정</CardTitle>
        <p className="text-xs text-gray-500">수신할 알림 유형을 선택하세요.</p>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-100">
          {NOTIF_ROWS.map((row) => (
            <div key={row.key} className="flex items-center justify-between py-4">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-800">{row.label}</p>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {row.channel}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{row.description}</p>
              </div>
              <Toggle
                checked={states[row.key]}
                onChange={(v) => setStates((p) => ({ ...p, [row.key]: v }))}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Save size={15} />
            저장하기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/* ─── 관리자 계정 ─────────────────────────────────────────────────────────────── */
function AdminTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">관리자 프로필</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <User size={28} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">김지수</p>
              <p className="text-xs text-gray-500">superadmin@didisam.co.kr</p>
              <Button variant="outline" size="sm" className="mt-2 text-xs gap-1.5">
                <Upload size={12} />
                프로필 사진 변경
              </Button>
            </div>
          </div>

          <Separator className="mb-5" />

          <div className="divide-y divide-gray-100">
            <FormRow label="이름" required>
              <Input defaultValue="김지수" className="text-sm" />
            </FormRow>
            <FormRow label="이메일">
              <Input defaultValue="superadmin@didisam.co.kr" type="email" className="text-sm" />
            </FormRow>
            <FormRow label="연락처">
              <Input defaultValue="010-1234-5678" className="text-sm" />
            </FormRow>
            <FormRow label="비밀번호">
              <Button variant="outline" size="sm" className="text-xs">
                비밀번호 변경
              </Button>
            </FormRow>
            <FormRow label="2단계 인증">
              <div className="flex items-center gap-3">
                <Toggle checked={false} onChange={() => {}} />
                <span className="text-xs text-gray-500">로그인 시 추가 인증을 요구합니다</span>
              </div>
            </FormRow>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Save size={15} />
              저장하기
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">최근 로그인 기록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { date: '2024.03.15 14:32', device: 'Chrome · macOS', ip: '121.xxx.xxx.12', current: true },
              { date: '2024.03.14 09:15', device: 'Safari · iPhone',  ip: '121.xxx.xxx.12' },
              { date: '2024.03.12 18:04', device: 'Chrome · Windows', ip: '58.xxx.xxx.44'  },
            ].map((log, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-xs text-gray-600"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-700">{log.date}</span>
                  <span className="text-gray-400">{log.device}</span>
                  <span className="text-gray-400">{log.ip}</span>
                </div>
                {log.current && (
                  <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0 border-0">
                    현재 세션
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── 구독 플랜 ──────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: 'Basic',
    price: '무료',
    icon: <Zap size={18} className="text-gray-500" />,
    color: 'border-gray-200',
    features: ['회원 관리 100명', '클래스 3개', '기본 통계'],
    current: false,
  },
  {
    name: 'Pro',
    price: '월 49,000원',
    icon: <Shield size={18} className="text-indigo-500" />,
    color: 'border-indigo-400',
    features: ['회원 관리 무제한', '클래스 무제한', '고급 분석', '커뮤니티', '결제 연동'],
    current: true,
    badge: '현재 플랜',
  },
  {
    name: 'Enterprise',
    price: '월 149,000원',
    icon: <Crown size={18} className="text-amber-500" />,
    color: 'border-amber-300',
    features: ['Pro 전체 포함', '다중 지점 관리', '전담 매니저', 'API 연동', '브랜드 화이트라벨'],
    current: false,
  },
]

function SubscriptionTab() {
  return (
    <div className="space-y-4">
      {/* Current plan */}
      <Card className="border-indigo-200 bg-indigo-50/40">
        <CardContent className="py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Shield size={20} className="text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">Pro 플랜 이용 중</p>
                  <Badge className="bg-indigo-600 text-white text-xs px-2 py-0 border-0">
                    활성
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">다음 갱신일: 2024년 4월 15일 · 월 49,000원</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              결제 내역 보기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan cards */}
      <div className="grid grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={`border-2 ${plan.color} ${plan.current ? 'ring-2 ring-indigo-200' : ''} transition-shadow hover:shadow-md`}
          >
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {plan.icon}
                  <span className="text-sm font-bold text-gray-800">{plan.name}</span>
                </div>
                {plan.badge && (
                  <Badge className="bg-indigo-600 text-white text-xs px-2 py-0 border-0">
                    {plan.badge}
                  </Badge>
                )}
              </div>
              <p className="text-lg font-bold text-gray-900 mb-4">{plan.price}</p>
              <ul className="space-y-1.5 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.current ? 'outline' : 'default'}
                size="sm"
                className={`w-full text-xs gap-1.5 ${
                  !plan.current && plan.name === 'Enterprise'
                    ? 'bg-amber-500 hover:bg-amber-600'
                    : !plan.current
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : ''
                }`}
                disabled={plan.current}
              >
                {plan.current ? (
                  '현재 플랜'
                ) : (
                  <>
                    <Sparkles size={12} />
                    업그레이드
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <Card>
        <CardContent className="py-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">자주 묻는 질문</p>
          <div className="space-y-2">
            {[
              '플랜을 변경하면 언제부터 적용되나요?',
              '환불 정책은 어떻게 되나요?',
              'Enterprise 플랜의 맞춤 견적을 받고 싶어요.',
            ].map((q) => (
              <button
                key={q}
                className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span>{q}</span>
                <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
const TAB_ITEMS = [
  { value: 'studio',       label: '스튜디오 정보', icon: <Building2 size={15} /> },
  { value: 'payment',      label: '결제 설정',     icon: <CreditCard size={15} /> },
  { value: 'notifications',label: '알림 설정',     icon: <Bell size={15} />       },
  { value: 'admin',        label: '관리자 계정',   icon: <User size={15} />       },
  { value: 'subscription', label: '구독 플랜',     icon: <Crown size={15} />      },
]

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">설정</h1>
          <p className="text-sm text-gray-500 mt-0.5">스튜디오 운영에 필요한 설정을 관리합니다</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Tabs defaultValue="studio" orientation="vertical">
          <div className="flex gap-6">
            {/* Left nav */}
            <div className="flex-shrink-0 w-48">
              <Card>
                <CardContent className="py-3 px-2">
                  <TabsList className="flex flex-col h-auto bg-transparent gap-0.5 w-full">
                    {TAB_ITEMS.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="w-full justify-start gap-2.5 px-3 py-2.5 text-sm font-medium text-gray-600
                          data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700
                          hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="flex-shrink-0">{tab.icon}</span>
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <TabsContent value="studio" className="mt-0">
                <StudioInfoTab />
              </TabsContent>
              <TabsContent value="payment" className="mt-0">
                <PaymentTab />
              </TabsContent>
              <TabsContent value="notifications" className="mt-0">
                <NotificationsTab />
              </TabsContent>
              <TabsContent value="admin" className="mt-0">
                <AdminTab />
              </TabsContent>
              <TabsContent value="subscription" className="mt-0">
                <SubscriptionTab />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
