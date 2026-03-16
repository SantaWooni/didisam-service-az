'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  Plus,
  Search,
  Phone,
  User,
  Tag,
  Calendar,
} from 'lucide-react'

type ConsultStatus = '대기중' | '진행중' | '완료'

interface Consult {
  date: string
  name: string
  phone: string
  type: string
  manager: string
  status: ConsultStatus
}

const consultations: Consult[] = [
  {
    date: '2024.06.15',
    name: '김민준',
    phone: '010-1234-5678',
    type: '회원권 문의',
    manager: '박상담',
    status: '대기중',
  },
  {
    date: '2024.06.15',
    name: '이서연',
    phone: '010-2345-6789',
    type: '환불 요청',
    manager: '최담당',
    status: '진행중',
  },
  {
    date: '2024.06.14',
    name: '박지호',
    phone: '010-3456-7890',
    type: '클래스 변경',
    manager: '박상담',
    status: '완료',
  },
  {
    date: '2024.06.14',
    name: '최유진',
    phone: '010-4567-8901',
    type: '일정 문의',
    manager: '김매니저',
    status: '대기중',
  },
  {
    date: '2024.06.13',
    name: '정하은',
    phone: '010-5678-9012',
    type: '트레이너 변경',
    manager: '최담당',
    status: '완료',
  },
  {
    date: '2024.06.13',
    name: '강도현',
    phone: '010-6789-0123',
    type: '회원권 연장',
    manager: '박상담',
    status: '진행중',
  },
  {
    date: '2024.06.12',
    name: '윤수아',
    phone: '010-7890-1234',
    type: '시설 불만',
    manager: '김매니저',
    status: '대기중',
  },
  {
    date: '2024.06.11',
    name: '임재원',
    phone: '010-8901-2345',
    type: '회원권 문의',
    manager: '최담당',
    status: '완료',
  },
]

function StatusBadge({ status }: { status: ConsultStatus }) {
  if (status === '대기중') {
    return (
      <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-0">
        대기중
      </Badge>
    )
  }
  if (status === '진행중') {
    return (
      <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-0">
        진행중
      </Badge>
    )
  }
  return (
    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
      완료
    </Badge>
  )
}

function ConsultDetailDialog({ consult }: { consult: Consult }) {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline" size="sm" className="text-xs h-7 px-3">상세보기</Button>}
      />
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">상담 상세 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <User className="w-3 h-3" /> 상담자
              </p>
              <p className="text-sm font-medium text-gray-900">{consult.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Phone className="w-3 h-3" /> 연락처
              </p>
              <p className="text-sm font-medium text-gray-900">{consult.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Tag className="w-3 h-3" /> 상담 유형
              </p>
              <p className="text-sm font-medium text-gray-900">{consult.type}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <User className="w-3 h-3" /> 담당자
              </p>
              <p className="text-sm font-medium text-gray-900">{consult.manager}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> 접수일
              </p>
              <p className="text-sm font-medium text-gray-900">{consult.date}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400">상태</p>
              <StatusBadge status={consult.status} />
            </div>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              상태 변경
            </Button>
            <Button size="sm" className="text-xs bg-indigo-600 hover:bg-indigo-700">
              저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ConsultTable({ data }: { data: Consult[] }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="text-xs font-semibold text-gray-500 pl-5">접수일</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500">상담자</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500">연락처</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500">상담 유형</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500">담당자</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500">상태</TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 pr-5">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-sm text-gray-400 py-10">
                  해당 상담 내역이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              data.map((c, i) => (
                <TableRow key={i} className="hover:bg-gray-50">
                  <TableCell className="text-sm text-gray-500 pl-5">{c.date}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{c.name}</TableCell>
                  <TableCell className="text-sm text-gray-500">{c.phone}</TableCell>
                  <TableCell className="text-sm text-gray-600">{c.type}</TableCell>
                  <TableCell className="text-sm text-gray-600">{c.manager}</TableCell>
                  <TableCell>
                    <StatusBadge status={c.status} />
                  </TableCell>
                  <TableCell className="pr-5">
                    <ConsultDetailDialog consult={c} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function ConsultingPage() {
  const waiting = consultations.filter((c) => c.status === '대기중')
  const inProgress = consultations.filter((c) => c.status === '진행중')
  const completed = consultations.filter((c) => c.status === '완료')

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상담 관리</h1>
          <p className="text-sm text-gray-500 mt-1">회원 상담 내역을 확인하고 관리하세요</p>
        </div>
        <Dialog>
          <DialogTrigger
            render={
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="w-4 h-4" />
                상담 등록
              </Button>
            }
          />
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">상담 등록</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">상담자명</label>
                <Input placeholder="이름을 입력하세요" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">연락처</label>
                <Input placeholder="010-0000-0000" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">상담 유형</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="membership">회원권 문의</SelectItem>
                    <SelectItem value="refund">환불 요청</SelectItem>
                    <SelectItem value="class">클래스 변경</SelectItem>
                    <SelectItem value="schedule">일정 문의</SelectItem>
                    <SelectItem value="trainer">트레이너 변경</SelectItem>
                    <SelectItem value="facility">시설 불만</SelectItem>
                    <SelectItem value="etc">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">담당자</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="담당자 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="park">박상담</SelectItem>
                    <SelectItem value="choi">최담당</SelectItem>
                    <SelectItem value="kim">김매니저</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button variant="outline" size="sm">취소</Button>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">등록</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">전체 상담</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">156건</p>
                <p className="text-xs text-gray-400 mt-1">누적 전체</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">대기중</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">23건</p>
                <p className="text-xs text-orange-500 mt-1">처리 대기 중</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">처리완료</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">133건</p>
                <p className="text-xs text-green-600 mt-1">정상 처리됨</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs + Filter + Table */}
      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <TabsList className="bg-white border border-gray-200 rounded-lg p-1 w-fit">
            <TabsTrigger value="all" className="rounded-md text-sm">전체</TabsTrigger>
            <TabsTrigger value="waiting" className="rounded-md text-sm">대기중</TabsTrigger>
            <TabsTrigger value="inprogress" className="rounded-md text-sm">진행중</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-md text-sm">완료</TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="이름 또는 연락처 검색"
                className="pl-9 w-52 bg-white text-sm h-9"
              />
            </div>
            <Select>
              <SelectTrigger className="w-36 bg-white h-9 text-sm">
                <SelectValue placeholder="날짜 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">오늘</SelectItem>
                <SelectItem value="week">이번 주</SelectItem>
                <SelectItem value="month">이번 달</SelectItem>
                <SelectItem value="all">전체 기간</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32 bg-white h-9 text-sm">
                <SelectValue placeholder="담당자" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="park">박상담</SelectItem>
                <SelectItem value="choi">최담당</SelectItem>
                <SelectItem value="kim">김매니저</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          <ConsultTable data={consultations} />
        </TabsContent>
        <TabsContent value="waiting" className="mt-4">
          <ConsultTable data={waiting} />
        </TabsContent>
        <TabsContent value="inprogress" className="mt-4">
          <ConsultTable data={inProgress} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <ConsultTable data={completed} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
