'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  UserCheck,
  UserMinus,
  UserX,
  Search,
  UserPlus,
  ChevronRight,
} from 'lucide-react';

const members = [
  {
    id: 1,
    name: '김지수',
    initials: '김지',
    phone: '010-1234-5678',
    email: 'jisoo.kim@email.com',
    class: '요가 기초반',
    registeredAt: '2024-01-15',
    status: '수강중',
  },
  {
    id: 2,
    name: '이민준',
    initials: '이민',
    phone: '010-2345-6789',
    email: 'minjun.lee@email.com',
    class: '필라테스 심화반',
    registeredAt: '2024-02-03',
    status: '수강중',
  },
  {
    id: 3,
    name: '박서연',
    initials: '박서',
    phone: '010-3456-7890',
    email: 'seoyeon.park@email.com',
    class: '발레 입문반',
    registeredAt: '2023-11-20',
    status: '수강완료',
  },
  {
    id: 4,
    name: '최현우',
    initials: '최현',
    phone: '010-4567-8901',
    email: 'hyunwoo.choi@email.com',
    class: '댄스 스포츠반',
    registeredAt: '2024-03-01',
    status: '수강중',
  },
  {
    id: 5,
    name: '정유나',
    initials: '정유',
    phone: '010-5678-9012',
    email: 'yuna.jeong@email.com',
    class: '요가 심화반',
    registeredAt: '2023-09-10',
    status: '휴면',
  },
  {
    id: 6,
    name: '한도현',
    initials: '한도',
    phone: '010-6789-0123',
    email: 'dohyun.han@email.com',
    class: '필라테스 기초반',
    registeredAt: '2024-01-28',
    status: '수강중',
  },
  {
    id: 7,
    name: '오소희',
    initials: '오소',
    phone: '010-7890-1234',
    email: 'sohee.oh@email.com',
    class: '발레 중급반',
    registeredAt: '2023-12-05',
    status: '수강완료',
  },
  {
    id: 8,
    name: '윤태양',
    initials: '윤태',
    phone: '010-8901-2345',
    email: 'taeyang.yoon@email.com',
    class: '댄스 스포츠반',
    registeredAt: '2024-02-14',
    status: '휴면',
  },
];

const statusConfig: Record<
  string,
  { label: string; variant: 'default' | 'secondary' | 'outline'; className: string }
> = {
  수강중: {
    label: '수강중',
    variant: 'default',
    className: 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200',
  },
  수강완료: {
    label: '수강완료',
    variant: 'default',
    className: 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200',
  },
  휴면: {
    label: '휴면',
    variant: 'secondary',
    className: 'bg-gray-100 text-gray-500 hover:bg-gray-100 border-gray-200',
  },
};

const stats = [
  {
    label: '전체 회원',
    value: '1,284명',
    icon: Users,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    label: '활성',
    value: '1,156명',
    icon: UserCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: '휴면',
    value: '89명',
    icon: UserMinus,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    label: '탈퇴',
    value: '39명',
    icon: UserX,
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
];

export default function MembersPage() {
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('전체');

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.includes(search) ||
      m.email.includes(search) ||
      m.phone.includes(search);
    const matchClass =
      classFilter === 'all' || m.class.includes(classFilter);
    const matchTab =
      activeTab === '전체' ||
      (activeTab === '수강중' && m.status === '수강중') ||
      (activeTab === '수강완료' && m.status === '수강완료') ||
      (activeTab === '휴면' && m.status === '휴면');
    return matchSearch && matchClass && matchTab;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
          <p className="text-sm text-gray-500 mt-1">등록된 회원을 조회하고 관리합니다.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <UserPlus className="w-4 h-4" />
          회원 등록
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-gray-100 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Card */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="pb-0 px-6 pt-5">
          <Tabs
            defaultValue="전체"
            onValueChange={(v) => setActiveTab(v)}
          >
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <TabsList className="bg-gray-100">
                {['전체', '수강중', '수강완료', '휴면'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="이름, 이메일, 연락처 검색"
                    className="pl-8 w-52 h-9 text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={classFilter} onValueChange={(v) => setClassFilter(v ?? "all")}>
                  <SelectTrigger className="w-36 h-9 text-sm">
                    <SelectValue placeholder="클래스 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 클래스</SelectItem>
                    <SelectItem value="요가">요가</SelectItem>
                    <SelectItem value="필라테스">필라테스</SelectItem>
                    <SelectItem value="발레">발레</SelectItem>
                    <SelectItem value="댄스">댄스 스포츠</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={(v) => setDateFilter(v ?? "all")}>
                  <SelectTrigger className="w-32 h-9 text-sm">
                    <SelectValue placeholder="등록일" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 기간</SelectItem>
                    <SelectItem value="1m">최근 1개월</SelectItem>
                    <SelectItem value="3m">최근 3개월</SelectItem>
                    <SelectItem value="6m">최근 6개월</SelectItem>
                    <SelectItem value="1y">최근 1년</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {['전체', '수강중', '수강완료', '휴면'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-semibold text-gray-600 w-44">회원명</TableHead>
                      <TableHead className="font-semibold text-gray-600">연락처</TableHead>
                      <TableHead className="font-semibold text-gray-600">이메일</TableHead>
                      <TableHead className="font-semibold text-gray-600">수강 클래스</TableHead>
                      <TableHead className="font-semibold text-gray-600">등록일</TableHead>
                      <TableHead className="font-semibold text-gray-600">상태</TableHead>
                      <TableHead className="font-semibold text-gray-600 text-right">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-12 text-gray-400">
                          해당하는 회원이 없습니다.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((member) => {
                        const sc = statusConfig[member.status];
                        return (
                          <TableRow
                            key={member.id}
                            className="hover:bg-gray-50/60 transition-colors"
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={`/avatars/${member.id}.png`} />
                                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-medium">
                                    {member.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-gray-800 text-sm">
                                  {member.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">{member.phone}</TableCell>
                            <TableCell className="text-sm text-gray-600">{member.email}</TableCell>
                            <TableCell className="text-sm text-gray-700">{member.class}</TableCell>
                            <TableCell className="text-sm text-gray-500">{member.registeredAt}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`text-xs font-medium ${sc.className}`}
                              >
                                {sc.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1 text-xs"
                              >
                                상세보기
                                <ChevronRight className="w-3.5 h-3.5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardHeader>
        <CardContent className="px-6 pb-4">
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              총 <span className="font-semibold text-gray-600">{filtered.length}</span>명 표시 중
            </p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-7 text-xs px-3" disabled>
                이전
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs px-3 bg-indigo-50 text-indigo-600 border-indigo-200">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs px-3">
                다음
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
