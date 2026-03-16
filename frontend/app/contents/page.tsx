'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Upload,
  Search,
  LayoutGrid,
  List,
  MoreVertical,
  Video,
  FileText,
  Image,
  Film,
  File,
} from 'lucide-react';

type ContentType = '동영상' | '문서' | '이미지';

interface ContentItem {
  id: number;
  title: string;
  type: ContentType;
  uploadDate: string;
  size: string;
  thumbnail?: string;
}

const contents: ContentItem[] = [
  {
    id: 1,
    title: '기초 수학 개념 강의 1강',
    type: '동영상',
    uploadDate: '2026.03.10',
    size: '245 MB',
  },
  {
    id: 2,
    title: '영어 파닉스 학습 자료',
    type: '문서',
    uploadDate: '2026.03.09',
    size: '3.2 MB',
  },
  {
    id: 3,
    title: '한국어 받아쓰기 강의 2강',
    type: '동영상',
    uploadDate: '2026.03.08',
    size: '312 MB',
  },
  {
    id: 4,
    title: '과학 실험 안전 가이드',
    type: '문서',
    uploadDate: '2026.03.07',
    size: '1.8 MB',
  },
  {
    id: 5,
    title: '수학 교구 활용 사진',
    type: '이미지',
    uploadDate: '2026.03.06',
    size: '8.4 MB',
  },
  {
    id: 6,
    title: '독해력 특강 3강',
    type: '동영상',
    uploadDate: '2026.03.05',
    size: '198 MB',
  },
  {
    id: 7,
    title: '영어 스피킹 교재 미리보기',
    type: '이미지',
    uploadDate: '2026.03.04',
    size: '5.1 MB',
  },
  {
    id: 8,
    title: '사고력 수학 워크시트',
    type: '문서',
    uploadDate: '2026.03.03',
    size: '2.6 MB',
  },
  {
    id: 9,
    title: '국어 문법 완성 강의 1강',
    type: '동영상',
    uploadDate: '2026.03.02',
    size: '278 MB',
  },
];

const typeConfig: Record<
  ContentType,
  { label: string; className: string; icon: React.ReactNode; bgColor: string; iconColor: string }
> = {
  동영상: {
    label: '동영상',
    className: 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200',
    icon: <Film className="h-8 w-8" />,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-400',
  },
  문서: {
    label: '문서',
    className: 'bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200',
    icon: <FileText className="h-8 w-8" />,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-400',
  },
  이미지: {
    label: '이미지',
    className: 'bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200',
    icon: <Image className="h-8 w-8" />,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-400',
  },
};

export default function ContentsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = contents.filter((c) => {
    const matchSearch =
      search === '' || c.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">콘텐츠</h1>
          <p className="mt-1 text-sm text-gray-500">
            강의, 문서, 이미지 등 콘텐츠를 관리합니다.
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          콘텐츠 업로드
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="border-0 bg-gray-50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-200 p-2">
                <File className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">전체</p>
                <p className="text-lg font-bold text-gray-900">320개</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-blue-50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-200 p-2">
                <Video className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-blue-600">동영상</p>
                <p className="text-lg font-bold text-blue-900">180개</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-amber-50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-200 p-2">
                <FileText className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <p className="text-xs text-amber-600">문서</p>
                <p className="text-lg font-bold text-amber-900">95개</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-purple-50">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-200 p-2">
                <Image className="h-4 w-4 text-purple-700" />
              </div>
              <div>
                <p className="text-xs text-purple-600">이미지</p>
                <p className="text-lg font-bold text-purple-900">45개</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="콘텐츠 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "all")}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="유형 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 유형</SelectItem>
            <SelectItem value="동영상">동영상</SelectItem>
            <SelectItem value="문서">문서</SelectItem>
            <SelectItem value="이미지">이미지</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex rounded-lg border bg-white overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 transition-colors ${
              viewMode === 'grid'
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 transition-colors ${
              viewMode === 'list'
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500">총 {filtered.length}개 콘텐츠</p>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const cfg = typeConfig[item.type];
            return (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Thumbnail placeholder */}
                <div
                  className={`flex h-40 items-center justify-center ${cfg.bgColor}`}
                >
                  <span className={cfg.iconColor}>{cfg.icon}</span>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 flex-1">
                      {item.title}
                    </h3>
                    <button className="mt-0.5 shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge
                      className={`text-xs border ${cfg.className}`}
                    >
                      {cfg.label}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                    <span>{item.uploadDate}</span>
                    <span>{item.size}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* List View */
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {filtered.map((item) => {
                const cfg = typeConfig[item.type];
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${cfg.bgColor}`}
                    >
                      <span className={`${cfg.iconColor} [&>svg]:h-5 [&>svg]:w-5`}>
                        {cfg.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.uploadDate} · {item.size}
                      </p>
                    </div>
                    <Badge className={`text-xs border shrink-0 ${cfg.className}`}>
                      {cfg.label}
                    </Badge>
                    <button className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
