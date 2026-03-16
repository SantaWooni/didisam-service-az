'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  PlayCircle,
  Clock,
  CheckCircle2,
  Search,
  X,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type ClassType = '기간' | '회차' | '구독';
type ClassStatus = '진행중' | '대기' | '종료';

interface ClassRow {
  id: number;
  name: string;
  type: ClassType;
  instructor: string;
  enrolled: number;
  capacity: number;
  schedule: string;
  status: ClassStatus;
  registeredAt: string;
}

const SAMPLE_CLASSES: ClassRow[] = [
  {
    id: 1,
    name: '발레 기초 A반',
    type: '기간',
    instructor: '김지수',
    enrolled: 12,
    capacity: 15,
    schedule: '2026.01.06 ~ 2026.03.28',
    status: '진행중',
    registeredAt: '2025.12.20',
  },
  {
    id: 2,
    name: '재즈댄스 입문반',
    type: '기간',
    instructor: '박서연',
    enrolled: 15,
    capacity: 15,
    schedule: '2025.10.07 ~ 2025.12.30',
    status: '종료',
    registeredAt: '2025.09.15',
  },
  {
    id: 3,
    name: '힙합 댄스 B반',
    type: '기간',
    instructor: '김지수',
    enrolled: 10,
    capacity: 12,
    schedule: '2025.09.02 ~ 2025.11.28',
    status: '종료',
    registeredAt: '2025.08.20',
  },
  {
    id: 4,
    name: '현대무용 초급반',
    type: '기간',
    instructor: '이하은',
    enrolled: 6,
    capacity: 10,
    schedule: '2026.04.01 ~ 2026.06.30',
    status: '대기',
    registeredAt: '2026.03.01',
  },
  {
    id: 5,
    name: '현대무용 심화 과정',
    type: '회차',
    instructor: '이하은',
    enrolled: 8,
    capacity: 10,
    schedule: '10회차',
    status: '진행중',
    registeredAt: '2026.01.10',
  },
  {
    id: 6,
    name: '한국무용 기본기 집중반',
    type: '회차',
    instructor: '정수빈',
    enrolled: 0,
    capacity: 12,
    schedule: '12회차',
    status: '대기',
    registeredAt: '2026.03.05',
  },
  {
    id: 7,
    name: '컨템포러리 마스터클래스',
    type: '회차',
    instructor: '이하은',
    enrolled: 0,
    capacity: 8,
    schedule: '8회차',
    status: '대기',
    registeredAt: '2026.03.10',
  },
  {
    id: 8,
    name: '포인트 발레 심화',
    type: '회차',
    instructor: '김지수',
    enrolled: 6,
    capacity: 8,
    schedule: '6회차',
    status: '진행중',
    registeredAt: '2026.01.25',
  },
  {
    id: 9,
    name: '필라테스 소도구 클래스',
    type: '구독',
    instructor: '최민지',
    enrolled: 22,
    capacity: 30,
    schedule: '상시',
    status: '진행중',
    registeredAt: '2025.11.01',
  },
  {
    id: 10,
    name: '요가 플로우 월간 구독',
    type: '구독',
    instructor: '오채원',
    enrolled: 18,
    capacity: 25,
    schedule: '상시',
    status: '진행중',
    registeredAt: '2025.12.01',
  },
  {
    id: 11,
    name: '줌바 댄스 정기권',
    type: '구독',
    instructor: '박서연',
    enrolled: 11,
    capacity: 20,
    schedule: '상시',
    status: '진행중',
    registeredAt: '2026.01.15',
  },
  {
    id: 12,
    name: '스트레칭 구독반',
    type: '구독',
    instructor: '정수빈',
    enrolled: 5,
    capacity: 15,
    schedule: '상시',
    status: '대기',
    registeredAt: '2026.03.01',
  },
];

const PAGE_SIZE = 8;

const TYPE_LABEL: Record<ClassType, string> = {
  기간: '기간 클래스',
  회차: '회차 클래스',
  구독: '구독 클래스',
};

function StatusBadge({ status }: { status: ClassStatus }) {
  if (status === '진행중') {
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border border-green-200 font-medium">
        진행중
      </Badge>
    );
  }
  if (status === '대기') {
    return (
      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border border-amber-200 font-medium">
        대기
      </Badge>
    );
  }
  return (
    <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 border border-gray-200 font-medium">
      종료
    </Badge>
  );
}

function TypeBadge({ type }: { type: ClassType }) {
  const styles: Record<ClassType, string> = {
    기간: 'bg-blue-50 text-blue-600 border-blue-200',
    회차: 'bg-purple-50 text-purple-600 border-purple-200',
    구독: 'bg-orange-50 text-orange-600 border-orange-200',
  };
  return (
    <Badge className={`${styles[type]} hover:${styles[type]} border font-medium text-xs`}>
      {TYPE_LABEL[type]}
    </Badge>
  );
}

function ProgressBar({ enrolled, capacity }: { enrolled: number; capacity: number }) {
  const ratio = capacity === 0 ? 0 : enrolled / capacity;
  const pct = Math.min(100, Math.round(ratio * 100));
  const color =
    ratio >= 1 ? 'bg-red-500' : ratio >= 0.8 ? 'bg-amber-400' : 'bg-green-500';
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${color} transition-all`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap min-w-[52px] text-right">
          {enrolled}/{capacity}명
        </span>
      </div>
    </div>
  );
}

function ClassDetailDialog({ cls, open, onClose }: { cls: ClassRow; open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-gray-900">{cls.name}</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="space-y-3 py-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 w-20 shrink-0">유형</span>
            <TypeBadge type={cls.type} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 w-20 shrink-0">강사</span>
            <span className="font-medium text-gray-800">{cls.instructor}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 w-20 shrink-0">
              {cls.type === '회차' ? '회차' : '기간/상시'}
            </span>
            <span className="font-medium text-gray-800">{cls.schedule}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 w-20 shrink-0">수강생</span>
            <span className="font-medium text-gray-800">
              {cls.enrolled}명 / 정원 {cls.capacity}명
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 w-20 shrink-0">상태</span>
            <StatusBadge status={cls.status} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 w-20 shrink-0">등록일</span>
            <span className="font-medium text-gray-800">{cls.registeredAt}</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-end gap-2 pt-1">
          <Link href={`/class/${cls.id}/edit`}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
              수정하기
            </Button>
          </Link>
          <Button variant="outline" onClick={onClose} className="text-sm border-gray-200">
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RowActionsMenu({
  cls,
  onDetail,
}: {
  cls: ClassRow;
  onDetail: (cls: ClassRow) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-gray-400 hover:text-gray-700"
        onClick={() => setOpen((v) => !v)}
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-1 w-32 rounded-md border border-gray-200 bg-white shadow-lg py-1 text-sm">
            <button
              className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
              onClick={() => { setOpen(false); onDetail(cls); }}
            >
              상세보기
            </button>
            <Link href={`/class/${cls.id}/edit`}>
              <button
                className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
                onClick={() => setOpen(false)}
              >
                수정
              </button>
            </Link>
            <button
              className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-gray-700"
              onClick={() => setOpen(false)}
            >
              복제
            </button>
            <button
              className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600"
              onClick={() => setOpen(false)}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function ClassManagePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [instructorFilter, setInstructorFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [detailClass, setDetailClass] = useState<ClassRow | null>(null);

  const tabTypeMap: Record<string, ClassType | null> = {
    all: null,
    period: '기간',
    session: '회차',
    subscription: '구독',
  };

  const isFilterActive =
    search !== '' ||
    typeFilter !== 'all' ||
    statusFilter !== 'all' ||
    instructorFilter !== 'all';

  function resetFilters() {
    setSearch('');
    setTypeFilter('all');
    setStatusFilter('all');
    setInstructorFilter('all');
    setCurrentPage(1);
  }

  function getFiltered(tab: string) {
    const tabType = tabTypeMap[tab];
    return SAMPLE_CLASSES.filter((cls) => {
      const matchesTab = tabType === null || cls.type === tabType;
      const matchesSearch =
        search === '' ||
        cls.name.toLowerCase().includes(search.toLowerCase()) ||
        cls.instructor.toLowerCase().includes(search.toLowerCase());
      const matchesType =
        typeFilter === 'all' ||
        cls.type === ({ period: '기간', session: '회차', subscription: '구독' } as Record<string, ClassType>)[typeFilter];
      const matchesStatus = statusFilter === 'all' || cls.status === statusFilter;
      const matchesInstructor = instructorFilter === 'all' || cls.instructor === instructorFilter;
      return matchesTab && matchesSearch && matchesType && matchesStatus && matchesInstructor;
    });
  }

  const filtered = getFiltered(activeTab);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const countByTab = {
    all: SAMPLE_CLASSES.length,
    period: SAMPLE_CLASSES.filter((c) => c.type === '기간').length,
    session: SAMPLE_CLASSES.filter((c) => c.type === '회차').length,
    subscription: SAMPLE_CLASSES.filter((c) => c.type === '구독').length,
  };

  const stats = {
    total: SAMPLE_CLASSES.length,
    active: SAMPLE_CLASSES.filter((c) => c.status === '진행중').length,
    waiting: SAMPLE_CLASSES.filter((c) => c.status === '대기').length,
    ended: SAMPLE_CLASSES.filter((c) => c.status === '종료').length,
  };

  function toggleSelect(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (paginated.every((c) => selectedIds.has(c.id))) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((c) => next.delete(c.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((c) => next.add(c.id));
        return next;
      });
    }
  }

  const allPageSelected = paginated.length > 0 && paginated.every((c) => selectedIds.has(c.id));
  const someSelected = selectedIds.size > 0;

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedIds(new Set());
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setSelectedIds(new Set());
  }

  const startItem = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(safePage * PAGE_SIZE, filtered.length);

  const TAB_ITEMS = [
    { value: 'all', label: '전체', count: countByTab.all },
    { value: 'period', label: '기간 클래스', count: countByTab.period },
    { value: 'session', label: '회차 클래스', count: countByTab.session },
    { value: 'subscription', label: '구독 클래스', count: countByTab.subscription },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">클래스 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            총 {stats.total}개의 클래스를 운영 중입니다
          </p>
        </div>
        <Link href="/class/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5">
            <span className="text-base leading-none">＋</span>
            클래스 만들기
          </Button>
        </Link>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-gray-500">전체 클래스</CardTitle>
            <BookOpen className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-900">{stats.total}개</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-gray-500">진행중</CardTitle>
            <PlayCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-green-600">{stats.active}개</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-gray-500">대기중</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-amber-600">{stats.waiting}개</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-medium text-gray-500">종료</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-2xl font-bold text-gray-500">{stats.ended}개</p>
          </CardContent>
        </Card>
      </div>

      {/* 탭 + 테이블 카드 */}
      <Card className="border border-gray-200 shadow-sm">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {/* 탭 헤더 */}
          <div className="px-6 pt-4 border-b border-gray-100">
            <TabsList className="bg-transparent p-0 gap-0 h-auto">
              {TAB_ITEMS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 py-2.5 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {tab.label}
                  <span className="ml-1.5 text-xs font-normal opacity-70">({tab.count})</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* 필터 바 */}
          <div className="px-6 py-4 flex flex-wrap gap-3 items-center border-b border-gray-100">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="클래스명, 강사명 검색"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="pl-9 bg-white border-gray-200 text-sm h-9"
              />
            </div>

            <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v ?? 'all'); setCurrentPage(1); }}>
              <SelectTrigger className="w-32 bg-white border-gray-200 text-sm h-9">
                <SelectValue placeholder="유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="period">기간</SelectItem>
                <SelectItem value="session">회차</SelectItem>
                <SelectItem value="subscription">구독</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v ?? 'all'); setCurrentPage(1); }}>
              <SelectTrigger className="w-32 bg-white border-gray-200 text-sm h-9">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="진행중">진행중</SelectItem>
                <SelectItem value="대기">대기</SelectItem>
                <SelectItem value="종료">종료</SelectItem>
              </SelectContent>
            </Select>

            <Select value={instructorFilter} onValueChange={(v) => { setInstructorFilter(v ?? 'all'); setCurrentPage(1); }}>
              <SelectTrigger className="w-32 bg-white border-gray-200 text-sm h-9">
                <SelectValue placeholder="강사" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="김지수">김지수</SelectItem>
                <SelectItem value="이하은">이하은</SelectItem>
                <SelectItem value="박서연">박서연</SelectItem>
                <SelectItem value="정수빈">정수빈</SelectItem>
                <SelectItem value="오채원">오채원</SelectItem>
                <SelectItem value="최민지">최민지</SelectItem>
              </SelectContent>
            </Select>

            {isFilterActive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-9 px-3 text-gray-500 hover:text-gray-800 gap-1"
              >
                <X className="w-3.5 h-3.5" />
                필터 초기화
              </Button>
            )}

            <div className="ml-auto">
              <Badge variant="outline" className="text-xs text-gray-500 border-gray-200 px-2.5 py-1">
                목록 {filtered.length}개
              </Badge>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          {TAB_ITEMS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="m-0">
              {/* 일괄 액션 바 */}
              {someSelected && (
                <div className="px-6 py-2.5 bg-indigo-50 border-b border-indigo-100 flex items-center gap-3">
                  <span className="text-sm font-medium text-indigo-700">
                    {selectedIds.size}개 선택됨
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                  >
                    상태 변경
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-red-200 text-red-600 hover:bg-red-50"
                  >
                    삭제
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-gray-500"
                    onClick={() => setSelectedIds(new Set())}
                  >
                    취소
                  </Button>
                </div>
              )}

              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="w-10 pl-6">
                      <div
                        onClick={toggleSelectAll}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                          allPageSelected
                            ? 'bg-indigo-600 border-indigo-600'
                            : 'border-gray-300 hover:border-indigo-400'
                        }`}
                      >
                        {allPageSelected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide min-w-[200px]">
                      클래스명
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      강사
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide min-w-[140px]">
                      수강생 / 정원
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      기간/회차
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      상태
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      등록일
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">
                      관리
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-16 text-sm text-gray-400">
                        조건에 맞는 클래스가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginated.map((cls) => (
                      <TableRow key={cls.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="pl-6 pr-0">
                          <div
                            onClick={() => toggleSelect(cls.id)}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                              selectedIds.has(cls.id)
                                ? 'bg-indigo-600 border-indigo-600'
                                : 'border-gray-300 hover:border-indigo-400'
                            }`}
                          >
                            {selectedIds.has(cls.id) && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="font-medium text-gray-900 text-sm leading-snug">
                            {cls.name}
                          </div>
                          <div className="mt-1">
                            <TypeBadge type={cls.type} />
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{cls.instructor}</TableCell>
                        <TableCell>
                          <ProgressBar enrolled={cls.enrolled} capacity={cls.capacity} />
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                          {cls.schedule}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={cls.status} />
                        </TableCell>
                        <TableCell className="text-sm text-gray-400 whitespace-nowrap">
                          {cls.registeredAt}
                        </TableCell>
                        <TableCell className="text-right pr-4">
                          <RowActionsMenu cls={cls} onDetail={(c) => setDetailClass(c)} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* 페이지네이션 */}
              {filtered.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    총 {filtered.length}개 중{' '}
                    <span className="font-medium text-gray-600">
                      {startItem}-{endItem}번째
                    </span>
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(safePage - 1)}
                      disabled={safePage <= 1}
                      className="h-8 w-8 p-0 border-gray-200 text-gray-500 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={safePage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={`h-8 w-8 p-0 text-sm ${
                          safePage === page
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(safePage + 1)}
                      disabled={safePage >= totalPages}
                      className="h-8 w-8 p-0 border-gray-200 text-gray-500 disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* 상세 보기 Dialog */}
      {detailClass && (
        <ClassDetailDialog
          cls={detailClass}
          open={detailClass !== null}
          onClose={() => setDetailClass(null)}
        />
      )}
    </div>
  );
}
