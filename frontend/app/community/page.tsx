'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Plus,
  Search,
  MessageSquare,
  Eye,
  Pin,
  Trash2,
  Pencil,
  FileText,
  Bell,
  Star,
  HelpCircle,
} from 'lucide-react'

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type Category = '공지사항' | '자유게시판' | 'Q&A' | '후기'

interface Post {
  id: number
  category: Category
  title: string
  author: string
  date: string
  views: number
  comments: number
  pinned?: boolean
}

/* ─── Sample Data ────────────────────────────────────────────────────────────── */
const ALL_POSTS: Post[] = [
  { id: 1,  category: '공지사항',   title: '2024년 1분기 클래스 일정 안내',            author: '운영자',    date: '2024.03.15', views: 1240, comments: 8,  pinned: true },
  { id: 2,  category: '공지사항',   title: '시스템 점검 안내 (3/20 오전 2시~4시)',      author: '운영자',    date: '2024.03.14', views: 892,  comments: 3,  pinned: true },
  { id: 3,  category: '자유게시판', title: '요가 클래스 후기 공유해요!',                author: '김유정',    date: '2024.03.14', views: 354,  comments: 22 },
  { id: 4,  category: 'Q&A',        title: '결제 환불 절차가 어떻게 되나요?',            author: '이민준',    date: '2024.03.13', views: 210,  comments: 5  },
  { id: 5,  category: '후기',       title: '필라테스 3개월 완주 후기 - 강력 추천!',     author: '박서연',    date: '2024.03.13', views: 678,  comments: 34 },
  { id: 6,  category: '자유게시판', title: '스트레칭 루틴 공유합니다',                  author: '최지훈',    date: '2024.03.12', views: 189,  comments: 11 },
  { id: 7,  category: 'Q&A',        title: '클래스 예약 변경 가능한가요?',               author: '정하은',    date: '2024.03.12', views: 143,  comments: 2  },
  { id: 8,  category: '후기',       title: '온라인 줌바 댄스, 생각보다 너무 재밌어요', author: '강민서',    date: '2024.03.11', views: 412,  comments: 19 },
]

/* ─── Category Config ────────────────────────────────────────────────────────── */
const CATEGORY_CONFIG: Record<Category, { color: string; icon: React.ReactNode }> = {
  '공지사항':   { color: 'bg-red-100 text-red-700',    icon: <Bell size={11} />   },
  '자유게시판': { color: 'bg-blue-100 text-blue-700',  icon: <FileText size={11} /> },
  'Q&A':        { color: 'bg-amber-100 text-amber-700',icon: <HelpCircle size={11} /> },
  '후기':       { color: 'bg-green-100 text-green-700',icon: <Star size={11} />   },
}

function CategoryBadge({ category }: { category: Category }) {
  const cfg = CATEGORY_CONFIG[category]
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}
    >
      {cfg.icon}
      {category}
    </span>
  )
}

/* ─── Post Table ─────────────────────────────────────────────────────────────── */
function PostTable({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <MessageSquare size={36} className="mx-auto mb-2 opacity-40" />
        <p className="text-sm">게시글이 없습니다</p>
      </div>
    )
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="w-24 text-xs font-semibold text-gray-600">카테고리</TableHead>
          <TableHead className="text-xs font-semibold text-gray-600">제목</TableHead>
          <TableHead className="w-24 text-xs font-semibold text-gray-600">작성자</TableHead>
          <TableHead className="w-28 text-xs font-semibold text-gray-600">작성일</TableHead>
          <TableHead className="w-20 text-right text-xs font-semibold text-gray-600">조회수</TableHead>
          <TableHead className="w-16 text-right text-xs font-semibold text-gray-600">댓글</TableHead>
          <TableHead className="w-24 text-center text-xs font-semibold text-gray-600">관리</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id} className="hover:bg-gray-50 transition-colors">
            <TableCell>
              <CategoryBadge category={post.category} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1.5">
                {post.pinned && (
                  <Pin size={13} className="text-red-500 flex-shrink-0" />
                )}
                <span
                  className={`text-sm text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors ${
                    post.pinned ? 'font-semibold' : ''
                  }`}
                >
                  {post.title}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm text-gray-600">{post.author}</span>
            </TableCell>
            <TableCell>
              <span className="text-xs text-gray-500">{post.date}</span>
            </TableCell>
            <TableCell className="text-right">
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <Eye size={12} />
                {post.views.toLocaleString()}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <MessageSquare size={12} />
                {post.comments}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-1">
                <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
                  <Pencil size={13} />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function CommunityPage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')
  const [activeTab, setActiveTab] = useState('all')

  const filtered = ALL_POSTS.filter((p) => {
    const matchTab =
      activeTab === 'all' ? true :
      activeTab === 'notice' ? p.category === '공지사항' :
      activeTab === 'free'   ? p.category === '자유게시판' :
      activeTab === 'qna'    ? p.category === 'Q&A' :
      activeTab === 'review' ? p.category === '후기' :
      true
    const matchSearch =
      search === '' ||
      p.title.includes(search) ||
      p.author.includes(search)
    return matchTab && matchSearch
  }).sort((a, b) => {
    if (sort === 'latest')   return b.id - a.id
    if (sort === 'views')    return b.views - a.views
    if (sort === 'comments') return b.comments - a.comments
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">커뮤니티</h1>
            <p className="text-sm text-gray-500 mt-0.5">회원들의 게시글을 관리합니다</p>
          </div>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus size={15} />
            게시글 작성
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">
        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: '전체 게시글', value: '1,234개', icon: <FileText size={18} className="text-indigo-500" />, bg: 'bg-indigo-50' },
            { label: '공지사항',    value: '12개',    icon: <Bell size={18} className="text-red-500" />,    bg: 'bg-red-50'    },
            { label: '이번 주 신규', value: '48개',   icon: <Plus size={18} className="text-green-500" />, bg: 'bg-green-50'  },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Main Card ── */}
        <Card>
          <CardHeader className="pb-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <TabsList>
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="notice">
                    공지사항
                    <Badge variant="secondary" className="ml-1.5 text-xs px-1.5 py-0">12</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="free">자유게시판</TabsTrigger>
                  <TabsTrigger value="qna">Q&A</TabsTrigger>
                  <TabsTrigger value="review">후기</TabsTrigger>
                </TabsList>

                {/* Filters */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="제목 또는 작성자 검색"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 w-56 h-9 text-sm"
                    />
                  </div>
                  <Select value={sort} onValueChange={(v) => setSort(v ?? "latest")}>
                    <SelectTrigger className="w-32 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">최신순</SelectItem>
                      <SelectItem value="views">조회순</SelectItem>
                      <SelectItem value="comments">댓글순</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Table — shared across all tabs */}
              <TabsContent value={activeTab} className="mt-4">
                <PostTable posts={filtered} />
              </TabsContent>
            </Tabs>
          </CardHeader>

          {/* Pagination */}
          <CardContent className="pt-0 pb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
              <span>총 {filtered.length}개의 게시글</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    className={`w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                      p === 1
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
