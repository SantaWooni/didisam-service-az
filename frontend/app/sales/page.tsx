'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  TrendingUp,
  CreditCard,
  BarChart2,
  RefreshCcw,
  Download,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const monthlyRevenue = [
  { month: '1월', revenue: 5200000 },
  { month: '2월', revenue: 6100000 },
  { month: '3월', revenue: 5800000 },
  { month: '4월', revenue: 7200000 },
  { month: '5월', revenue: 7900000 },
  { month: '6월', revenue: 8450000 },
]

const productSales = [
  { name: '1개월 이용권', revenue: 3200000, count: 128 },
  { name: '3개월 이용권', revenue: 2450000, count: 65 },
  { name: '6개월 이용권', revenue: 1800000, count: 30 },
  { name: '1일 체험권', revenue: 600000, count: 120 },
]

const classSales = [
  { name: '요가 기초반', revenue: 1800000, count: 72 },
  { name: '필라테스 중급반', revenue: 1500000, count: 50 },
  { name: '크로스핏', revenue: 2200000, count: 88 },
  { name: '수영 초급반', revenue: 1400000, count: 56 },
  { name: '스피닝', revenue: 1550000, count: 76 },
]

const payments = [
  {
    date: '2024.06.15',
    member: '김민준',
    product: '3개월 이용권',
    method: '신용카드',
    amount: '₩120,000',
    status: '결제완료',
  },
  {
    date: '2024.06.14',
    member: '이서연',
    product: '1개월 이용권',
    method: '카카오페이',
    amount: '₩45,000',
    status: '결제완료',
  },
  {
    date: '2024.06.14',
    member: '박지호',
    product: '6개월 이용권',
    method: '신용카드',
    amount: '₩250,000',
    status: '결제완료',
  },
  {
    date: '2024.06.13',
    member: '최유진',
    product: '1일 체험권',
    method: '현금',
    amount: '₩5,000',
    status: '결제완료',
  },
  {
    date: '2024.06.13',
    member: '정하은',
    product: '1개월 이용권',
    method: '신용카드',
    amount: '₩45,000',
    status: '환불',
  },
  {
    date: '2024.06.12',
    member: '강도현',
    product: '3개월 이용권',
    method: '네이버페이',
    amount: '₩120,000',
    status: '결제완료',
  },
  {
    date: '2024.06.12',
    member: '윤수아',
    product: '1개월 이용권',
    method: '신용카드',
    amount: '₩45,000',
    status: '취소',
  },
  {
    date: '2024.06.11',
    member: '임재원',
    product: '6개월 이용권',
    method: '카카오페이',
    amount: '₩250,000',
    status: '결제완료',
  },
]

function formatCurrency(value: number) {
  return `₩${value.toLocaleString('ko-KR')}`
}

function StatusBadge({ status }: { status: string }) {
  if (status === '결제완료') {
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
        결제완료
      </Badge>
    )
  }
  if (status === '환불') {
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
        환불
      </Badge>
    )
  }
  return (
    <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 border-0">
      취소
    </Badge>
  )
}

export default function SalesPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">매출 관리</h1>
          <p className="text-sm text-gray-500 mt-1">매출 현황 및 결제 내역을 확인하세요</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-36 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">이번 달</SelectItem>
              <SelectItem value="last-month">지난 달</SelectItem>
              <SelectItem value="this-year">올해</SelectItem>
              <SelectItem value="custom">직접 설정</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            내보내기
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">이번 달 매출</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₩8,450,000</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  전월 대비 +8.2%
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">결제 건수</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">342건</p>
                <p className="text-xs text-gray-400 mt-1">이번 달 누적</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">평균 결제액</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₩24,700</p>
                <p className="text-xs text-gray-400 mt-1">건당 평균</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <BarChart2 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">환불</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₩320,000</p>
                <p className="text-xs text-red-500 mt-1">이번 달 누적 환불액</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <RefreshCcw className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Area Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-gray-800">월별 매출 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 13, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value ?? 0)), '매출']}
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="payments">
        <TabsList className="bg-white border border-gray-200 rounded-lg p-1">
          <TabsTrigger value="payments" className="rounded-md text-sm">결제 내역</TabsTrigger>
          <TabsTrigger value="products" className="rounded-md text-sm">상품별 매출</TabsTrigger>
          <TabsTrigger value="classes" className="rounded-md text-sm">클래스별 매출</TabsTrigger>
        </TabsList>

        {/* 결제 내역 */}
        <TabsContent value="payments" className="mt-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-xs font-semibold text-gray-500 pl-5">결제일</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500">회원명</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500">상품명</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500">결제방법</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 text-right">금액</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 pr-5">상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p, i) => (
                    <TableRow key={i} className="hover:bg-gray-50">
                      <TableCell className="text-sm text-gray-500 pl-5">{p.date}</TableCell>
                      <TableCell className="text-sm font-medium text-gray-900">{p.member}</TableCell>
                      <TableCell className="text-sm text-gray-600">{p.product}</TableCell>
                      <TableCell className="text-sm text-gray-500">{p.method}</TableCell>
                      <TableCell className="text-sm font-semibold text-gray-900 text-right">{p.amount}</TableCell>
                      <TableCell className="pr-5">
                        <StatusBadge status={p.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 상품별 매출 */}
        <TabsContent value="products" className="mt-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-800">상품별 매출 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={productSales} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value ?? 0)), '매출']}
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}
                  />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-xs font-semibold text-gray-500 pl-5">상품명</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 text-right">판매 건수</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 text-right pr-5">매출액</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productSales.map((p, i) => (
                    <TableRow key={i} className="hover:bg-gray-50">
                      <TableCell className="text-sm font-medium text-gray-900 pl-5">{p.name}</TableCell>
                      <TableCell className="text-sm text-gray-600 text-right">{p.count}건</TableCell>
                      <TableCell className="text-sm font-semibold text-gray-900 text-right pr-5">{formatCurrency(p.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 클래스별 매출 */}
        <TabsContent value="classes" className="mt-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-800">클래스별 매출 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={classSales} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`}
                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value ?? 0)), '매출']}
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}
                  />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-xs font-semibold text-gray-500 pl-5">클래스명</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 text-right">수강 건수</TableHead>
                    <TableHead className="text-xs font-semibold text-gray-500 text-right pr-5">매출액</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classSales.map((c, i) => (
                    <TableRow key={i} className="hover:bg-gray-50">
                      <TableCell className="text-sm font-medium text-gray-900 pl-5">{c.name}</TableCell>
                      <TableCell className="text-sm text-gray-600 text-right">{c.count}건</TableCell>
                      <TableCell className="text-sm font-semibold text-gray-900 text-right pr-5">{formatCurrency(c.revenue)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
