'use client';

import { useState } from 'react';
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
import { BookOpen, PlayCircle, CheckCircle, Plus, Search } from 'lucide-react';

type ClassType = '기간 클래스' | '회차 클래스' | '구독 클래스';
type ClassStatus = '진행중' | '대기' | '종료';

interface ClassRow {
  id: number;
  name: string;
  type: ClassType;
  instructor: string;
  enrolled: number;
  capacity: number;
  period: string;
  status: ClassStatus;
}

const SAMPLE_CLASSES: ClassRow[] = [
  {
    id: 1,
    name: '발레 기초 A반',
    type: '기간 클래스',
    instructor: '김지수',
    enrolled: 12,
    capacity: 15,
    period: '2026.01.06 ~ 2026.03.28',
    status: '진행중',
  },
  {
    id: 2,
    name: '현대무용 심화 과정',
    type: '회차 클래스',
    instructor: '이하은',
    enrolled: 8,
    capacity: 10,
    period: '2026.02.03 ~ 2026.04.14',
    status: '진행중',
  },
  {
    id: 3,
    name: '재즈댄스 입문반',
    type: '기간 클래스',
    instructor: '박서연',
    enrolled: 15,
    capacity: 15,
    period: '2025.10.07 ~ 2025.12.30',
    status: '종료',
  },
  {
    id: 4,
    name: '필라테스 소도구 클래스',
    type: '구독 클래스',
    instructor: '최민지',
    enrolled: 22,
    capacity: 30,
    period: '2026.01.01 ~ 상시',
    status: '진행중',
  },
  {
    id: 5,
    name: '한국무용 기본기 집중반',
    type: '회차 클래스',
    instructor: '정수빈',
    enrolled: 0,
    capacity: 12,
    period: '2026.04.01 ~ 2026.06.30',
    status: '대기',
  },
  {
    id: 6,
    name: '힙합 댄스 B반',
    type: '기간 클래스',
    instructor: '김지수',
    enrolled: 10,
    capacity: 12,
    period: '2025.09.02 ~ 2025.11.28',
    status: '종료',
  },
  {
    id: 7,
    name: '요가 플로우 월간 구독',
    type: '구독 클래스',
    instructor: '오채원',
    enrolled: 18,
    capacity: 25,
    period: '2026.02.01 ~ 상시',
    status: '진행중',
  },
  {
    id: 8,
    name: '컨템포러리 마스터클래스',
    type: '회차 클래스',
    instructor: '이하은',
    enrolled: 0,
    capacity: 8,
    period: '2026.05.10 ~ 2026.06.01',
    status: '대기',
  },
];

const TYPE_TAB_MAP: Record<string, ClassType | null> = {
  전체: null,
  '기간 클래스': '기간 클래스',
  '회차 클래스': '회차 클래스',
  '구독 클래스': '구독 클래스',
};

function StatusBadge({ status }: { status: ClassStatus }) {
  if (status === '진행중') {
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
        진행중
      </Badge>
    );
  }
  if (status === '대기') {
    return (
      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200">
        대기
      </Badge>
    );
  }
  return (
    <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 border-gray-200">
      종료
    </Badge>
  );
}

function TypeBadge({ type }: { type: ClassType }) {
  const styles: Record<ClassType, string> = {
    '기간 클래스': 'bg-blue-50 text-blue-600 border-blue-200',
    '회차 클래스': 'bg-purple-50 text-purple-600 border-purple-200',
    '구독 클래스': 'bg-orange-50 text-orange-600 border-orange-200',
  };
  return (
    <Badge className={`${styles[type]} hover:${styles[type]} font-medium`}>
      {type}
    </Badge>
  );
}

export default function ClassManagePage() {
  const [activeTab, setActiveTab] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');

  const filtered = SAMPLE_CLASSES.filter((cls) => {
    const matchesTab =
      activeTab === '전체' || cls.type === TYPE_TAB_MAP[activeTab];
    const matchesSearch = cls.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === '전체' || cls.status === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">클래스 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            개설된 클래스를 조회하고 관리합니다.
          </p>
        </div>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4" />
          클래스 만들기
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              전체 클래스
            </CardTitle>
            <BookOpen className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">48개</p>
            <p className="text-xs text-gray-400 mt-1">개설된 전체 클래스</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              진행중
            </CardTitle>
            <PlayCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">24개</p>
            <p className="text-xs text-gray-400 mt-1">현재 수강 운영 중</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              종료됨
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-500">24개</p>
            <p className="text-xs text-gray-400 mt-1">운영 종료된 클래스</p>
          </CardContent>
        </Card>
      </div>

      {/* 탭 + 필터 + 테이블 */}
      <Card className="border border-gray-200 shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6 pt-4 border-b border-gray-100">
            <TabsList className="bg-transparent p-0 gap-0 h-auto">
              {['전체', '기간 클래스', '회차 클래스', '구독 클래스'].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {tab}
                  </TabsTrigger>
                )
              )}
            </TabsList>
          </div>

          {/* 필터 바 */}
          <div className="px-6 py-4 flex flex-col sm:flex-row gap-3 border-b border-gray-100">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="클래스명 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white border-gray-200 text-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "전체")}>
              <SelectTrigger className="w-full sm:w-36 bg-white border-gray-200 text-sm">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="진행중">진행중</SelectItem>
                <SelectItem value="종료">종료</SelectItem>
                <SelectItem value="대기">대기</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 탭 콘텐츠 (공유 테이블) */}
          {['전체', '기간 클래스', '회차 클래스', '구독 클래스'].map((tab) => (
            <TabsContent key={tab} value={tab} className="m-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-[260px]">
                      클래스명
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      유형
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      강사
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">
                      수강생 / 정원
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      기간
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      상태
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">
                      관리
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-12 text-sm text-gray-400"
                      >
                        조건에 맞는 클래스가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((cls) => (
                      <TableRow
                        key={cls.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-900 py-4">
                          {cls.name}
                        </TableCell>
                        <TableCell>
                          <TypeBadge type={cls.type} />
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {cls.instructor}
                        </TableCell>
                        <TableCell className="text-sm text-center">
                          <span
                            className={
                              cls.enrolled === cls.capacity
                                ? 'text-red-500 font-semibold'
                                : 'text-gray-700'
                            }
                          >
                            {cls.enrolled}
                          </span>
                          <span className="text-gray-400">
                            {' '}
                            / {cls.capacity}명
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {cls.period}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={cls.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50"
                          >
                            상세보기
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {filtered.length > 0 && (
                <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    총{' '}
                    <span className="font-semibold text-gray-600">
                      {filtered.length}
                    </span>
                    개의 클래스
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
