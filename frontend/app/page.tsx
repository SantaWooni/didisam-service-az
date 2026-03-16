import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Plus,
  UserPlus,
  CalendarPlus,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const statCards = [
  {
    title: "총 회원수",
    value: "1,284명",
    change: "+12%",
    changeLabel: "지난달 대비",
    icon: Users,
    positive: true,
  },
  {
    title: "이번 달 매출",
    value: "₩8,450,000",
    change: "+8%",
    changeLabel: "지난달 대비",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "진행 중인 클래스",
    value: "24개",
    change: null,
    changeLabel: "현재 운영 중",
    icon: BookOpen,
    positive: null,
  },
  {
    title: "신규 상담",
    value: "7건",
    change: null,
    changeLabel: "처리 필요",
    icon: MessageSquare,
    positive: null,
    urgent: true,
  },
];

const classRows = [
  {
    name: "성인 발레 기초반",
    type: "기간",
    students: 12,
    status: "진행중",
  },
  {
    name: "어린이 발레 A반",
    type: "회차",
    students: 8,
    status: "진행중",
  },
  {
    name: "필라테스 정기반",
    type: "구독",
    students: 15,
    status: "진행중",
  },
  {
    name: "포인트 발레 심화",
    type: "회차",
    students: 6,
    status: "마감",
  },
  {
    name: "줌바 주말반",
    type: "기간",
    students: 10,
    status: "모집중",
  },
];

const scheduleItems = [
  { time: "10:00", title: "어린이 발레 A반 수업" },
  { time: "13:00", title: "성인 발레 기초반 수업" },
  { time: "15:30", title: "신규 회원 상담 — 김지은" },
  { time: "18:00", title: "필라테스 정기반 수업" },
];

function getStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "진행중":
      return "default";
    case "모집중":
      return "secondary";
    case "마감":
      return "outline";
    default:
      return "secondary";
  }
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "진행중":
      return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
    case "모집중":
      return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100";
    case "마감":
      return "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-100";
    default:
      return "";
  }
}

function getTypeBadgeClass(type: string): string {
  switch (type) {
    case "기간":
      return "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100";
    case "회차":
      return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100";
    case "구독":
      return "bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-100";
    default:
      return "";
  }
}

export default function HomePage() {
  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">홈 대시보드</h1>
        <p className="mt-1 text-sm text-gray-500">스튜디오 현황을 한눈에 확인하세요.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="relative overflow-hidden border border-gray-100 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <div className="flex items-center gap-1.5">
                      {card.change ? (
                        <>
                          <ArrowUpRight
                            className={`h-3.5 w-3.5 ${card.positive ? "text-emerald-500" : "text-red-500"}`}
                          />
                          <span
                            className={`text-xs font-semibold ${card.positive ? "text-emerald-600" : "text-red-600"}`}
                          >
                            {card.change}
                          </span>
                          <span className="text-xs text-gray-400">{card.changeLabel}</span>
                        </>
                      ) : (
                        <span
                          className={`text-xs font-medium ${card.urgent ? "text-amber-600" : "text-gray-400"}`}
                        >
                          {card.changeLabel}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      card.urgent
                        ? "bg-amber-50 text-amber-500"
                        : "bg-indigo-50 text-indigo-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content: Two columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Class Status Table (2/3) */}
        <Card className="lg:col-span-2 border border-gray-100 shadow-sm">
          <CardHeader className="border-b border-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-800">
                최근 클래스 현황
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700">
                전체 보기
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/60 hover:bg-gray-50/60">
                  <TableHead className="pl-6 text-xs font-semibold text-gray-500">클래스명</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">유형</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">수강생</TableHead>
                  <TableHead className="pr-6 text-xs font-semibold text-gray-500">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classRows.map((row) => (
                  <TableRow key={row.name} className="hover:bg-gray-50/50">
                    <TableCell className="pl-6 py-3.5 font-medium text-gray-800 text-sm">
                      {row.name}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium px-2 py-0.5 ${getTypeBadgeClass(row.type)}`}
                      >
                        {row.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3.5 text-sm text-gray-600">
                      {row.students}명
                    </TableCell>
                    <TableCell className="pr-6 py-3.5">
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium px-2 py-0.5 ${getStatusBadgeClass(row.status)}`}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right: Today's Schedule (1/3) */}
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="border-b border-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-800">
                오늘의 일정
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700">
                전체 보기
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <ul className="space-y-3">
              {scheduleItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50">
                    <Clock className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-indigo-600">{item.time}</p>
                    <p className="mt-0.5 text-sm font-medium text-gray-700 leading-snug">
                      {item.title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="border-b border-gray-50 px-6 py-4">
          <CardTitle className="text-base font-semibold text-gray-800">빠른 액션</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-5">
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
              <Plus className="h-4 w-4" />
              클래스 만들기
            </Button>
            <Button variant="outline" className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
              <UserPlus className="h-4 w-4" />
              회원 등록
            </Button>
            <Button variant="outline" className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
              <CalendarPlus className="h-4 w-4" />
              상담 등록
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
