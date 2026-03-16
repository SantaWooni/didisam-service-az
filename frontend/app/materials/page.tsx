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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  BookOpen,
  ShoppingBag,
  AlertTriangle,
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: '기초 수학 워크북 (1학년)',
    category: '교재',
    price: '12,000원',
    stock: 245,
    sales: 1320,
    status: '판매중',
  },
  {
    id: 2,
    name: '영어 파닉스 카드 세트',
    category: '교구',
    price: '28,000원',
    stock: 3,
    sales: 876,
    status: '재고부족',
  },
  {
    id: 3,
    name: '한국어 받아쓰기 노트',
    category: '교재',
    price: '8,500원',
    stock: 0,
    sales: 2104,
    status: '품절',
  },
  {
    id: 4,
    name: '과학 실험 키트 (초급)',
    category: '세트상품',
    price: '45,000원',
    stock: 58,
    sales: 430,
    status: '판매중',
  },
  {
    id: 5,
    name: '수학 블록 교구',
    category: '교구',
    price: '32,000원',
    stock: 7,
    sales: 654,
    status: '재고부족',
  },
  {
    id: 6,
    name: '독해력 향상 문제집',
    category: '교재',
    price: '15,000원',
    stock: 189,
    sales: 3210,
    status: '판매중',
  },
  {
    id: 7,
    name: '영어 스피킹 교구 세트',
    category: '세트상품',
    price: '65,000원',
    stock: 0,
    sales: 287,
    status: '숨김',
  },
  {
    id: 8,
    name: '사고력 수학 교재 (2학년)',
    category: '교재',
    price: '18,000원',
    stock: 312,
    sales: 1890,
    status: '판매중',
  },
];

const statusConfig: Record<
  string,
  { label: string; variant: 'default' | 'destructive' | 'secondary' | 'outline'; className: string }
> = {
  판매중: {
    label: '판매중',
    variant: 'default',
    className: 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200',
  },
  품절: {
    label: '품절',
    variant: 'destructive',
    className: 'bg-red-100 text-red-700 hover:bg-red-100 border-red-200',
  },
  재고부족: {
    label: '재고부족',
    variant: 'destructive',
    className: 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200',
  },
  숨김: {
    label: '숨김',
    variant: 'secondary',
    className: 'bg-gray-100 text-gray-500 hover:bg-gray-100 border-gray-200',
  },
};

export default function MaterialsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('전체');

  const tabCategories: Record<string, string> = {
    전체: 'all',
    교재: '교재',
    교구: '교구',
    세트상품: '세트상품',
  };

  const filtered = products.filter((p) => {
    const matchSearch =
      search === '' || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === 'all' || p.category === category;
    const matchStatus = status === 'all' || p.status === status;
    const matchTab =
      tabCategories[activeTab] === 'all' ||
      p.category === tabCategories[activeTab];
    return matchSearch && matchCategory && matchStatus && matchTab;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">교재/교구</h1>
          <p className="mt-1 text-sm text-gray-500">
            판매 중인 교재 및 교구 상품을 관리합니다.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          교재 등록
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              전체 교재
            </CardTitle>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">156개</div>
            <p className="mt-1 text-xs text-gray-500">등록된 전체 상품</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              판매중
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">98개</div>
            <p className="mt-1 text-xs text-gray-500">현재 판매 중인 상품</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              재고 부족
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-gray-900">12개</div>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
                주의
              </Badge>
            </div>
            <p className="mt-1 text-xs text-gray-500">재고 10개 미만 상품</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs + Filter + Table */}
      <Card>
        <CardContent className="pt-6">
          <Tabs
            defaultValue="전체"
            onValueChange={(val) => setActiveTab(val)}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="h-9">
                <TabsTrigger value="전체">전체</TabsTrigger>
                <TabsTrigger value="교재">교재</TabsTrigger>
                <TabsTrigger value="교구">교구</TabsTrigger>
                <TabsTrigger value="세트상품">세트상품</TabsTrigger>
              </TabsList>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="상품명 검색..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 w-56"
                  />
                </div>
                <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 카테고리</SelectItem>
                    <SelectItem value="교재">교재</SelectItem>
                    <SelectItem value="교구">교구</SelectItem>
                    <SelectItem value="세트상품">세트상품</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={status} onValueChange={(v) => setStatus(v ?? "all")}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 상태</SelectItem>
                    <SelectItem value="판매중">판매중</SelectItem>
                    <SelectItem value="품절">품절</SelectItem>
                    <SelectItem value="재고부족">재고부족</SelectItem>
                    <SelectItem value="숨김">숨김</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {['전체', '교재', '교구', '세트상품'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700">
                        상품명
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        카테고리
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        판매가
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 text-right">
                        재고
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 text-right">
                        판매량
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        상태
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 text-center">
                        관리
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="py-12 text-center text-gray-400"
                        >
                          검색 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((product) => {
                        const cfg = statusConfig[product.status];
                        return (
                          <TableRow
                            key={product.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <TableCell className="font-medium text-gray-900">
                              {product.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-700">
                              {product.price}
                            </TableCell>
                            <TableCell className="text-right text-gray-700">
                              <span
                                className={
                                  product.stock <= 10 && product.stock > 0
                                    ? 'text-orange-600 font-semibold'
                                    : product.stock === 0
                                    ? 'text-red-600 font-semibold'
                                    : ''
                                }
                              >
                                {product.stock.toLocaleString()}
                              </span>
                            </TableCell>
                            <TableCell className="text-right text-gray-700">
                              {product.sales.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge className={`text-xs border ${cfg.className}`}>
                                {cfg.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>총 {filtered.length}개 상품</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      이전
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-blue-50 text-blue-600 border-blue-200"
                    >
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      다음
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
