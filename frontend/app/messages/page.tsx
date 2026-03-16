'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  PenSquare,
  Phone,
  Video,
  Send,
  MoreVertical,
  Smile,
  Paperclip,
} from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: '김지수',
    initials: '김지',
    preview: '다음 주 수업 일정 확인 부탁드려요!',
    time: '방금 전',
    unread: 3,
    active: true,
  },
  {
    id: 2,
    name: '이민준',
    initials: '이민',
    preview: '결제 영수증 다시 보내주실 수 있나요?',
    time: '5분 전',
    unread: 1,
    active: false,
  },
  {
    id: 3,
    name: '박서연',
    initials: '박서',
    preview: '감사합니다. 수업 잘 들었어요 :)',
    time: '32분 전',
    unread: 0,
    active: false,
  },
  {
    id: 4,
    name: '최현우',
    initials: '최현',
    preview: '이번 달 수강료 납부 완료했습니다.',
    time: '1시간 전',
    unread: 0,
    active: false,
  },
  {
    id: 5,
    name: '정유나',
    initials: '정유',
    preview: '잠시 수강을 중단하고 싶은데요...',
    time: '어제',
    unread: 2,
    active: false,
  },
  {
    id: 6,
    name: '한도현',
    initials: '한도',
    preview: '보강 수업 신청 가능한가요?',
    time: '2일 전',
    unread: 0,
    active: false,
  },
];

const chatMessages = [
  {
    id: 1,
    sender: 'other',
    text: '안녕하세요! 다음 주 화요일 요가 수업 일정이 어떻게 되는지 여쭤보고 싶어서요.',
    time: '오전 10:12',
  },
  {
    id: 2,
    sender: 'me',
    text: '안녕하세요, 김지수 회원님! 다음 주 화요일은 오전 10시와 오후 7시 두 타임이 있습니다.',
    time: '오전 10:14',
  },
  {
    id: 3,
    sender: 'other',
    text: '오전 10시 수업으로 예약하고 싶은데 자리가 있을까요?',
    time: '오전 10:15',
  },
  {
    id: 4,
    sender: 'me',
    text: '네, 현재 3자리 남아 있습니다! 바로 예약해 드릴까요?',
    time: '오전 10:16',
  },
  {
    id: 5,
    sender: 'other',
    text: '네, 예약 부탁드려요! 다음 주 수업 일정 확인 부탁드려요!',
    time: '오전 10:17',
  },
];

export default function MessagesPage() {
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConvs = conversations.filter((c) =>
    c.name.includes(searchQuery) || c.preview.includes(searchQuery)
  );

  const handleSend = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Panel */}
      <div className="w-80 flex-shrink-0 border-r border-gray-100 bg-white flex flex-col">
        {/* Left Header */}
        <div className="px-4 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">메시지</h1>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <PenSquare className="w-4.5 h-4.5" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="전체">
            <TabsList className="w-full bg-gray-100 h-8 p-0.5">
              {['전체', '읽지않음', '보낸메시지'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 text-xs h-7 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
            <Input
              placeholder="대화 검색"
              className="pl-7 h-8 text-sm bg-gray-50 border-gray-100 focus:bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Separator />

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((conv) => (
            <div key={conv.id}>
              <button
                onClick={() => setSelectedConv(conv)}
                className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${
                  selectedConv.id === conv.id ? 'bg-indigo-50/60' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`/avatars/${conv.id}.png`} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm font-medium">
                      {conv.initials}
                    </AvatarFallback>
                  </Avatar>
                  {conv.active && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className={`text-sm font-semibold ${
                        selectedConv.id === conv.id ? 'text-indigo-700' : 'text-gray-800'
                      }`}
                    >
                      {conv.name}
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 truncate pr-2">{conv.preview}</p>
                    {conv.unread > 0 && (
                      <Badge className="bg-indigo-600 text-white text-[10px] h-4 min-w-4 px-1 flex-shrink-0 rounded-full">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
              <Separator className="mx-4 w-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={`/avatars/${selectedConv.id}.png`} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm font-medium">
                {selectedConv.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-gray-900">{selectedConv.name}</p>
              <p className="text-xs text-green-500">온라인</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <Video className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-400 hover:text-gray-600"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Date Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 px-2">2024년 3월 11일 월요일</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {msg.sender === 'other' && (
                <Avatar className="w-8 h-8 flex-shrink-0 mb-1">
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-medium">
                    {selectedConv.initials}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[65%] flex flex-col ${
                  msg.sender === 'me' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'me'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex-shrink-0">
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 px-4 py-2.5 flex items-center gap-2 focus-within:border-indigo-300 focus-within:bg-white transition-colors">
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-gray-400 hover:text-gray-600 flex-shrink-0 p-0"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none min-w-0"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-gray-400 hover:text-gray-600 flex-shrink-0 p-0"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleSend}
              className={`w-10 h-10 rounded-xl p-0 flex-shrink-0 transition-colors ${
                messageInput.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-default'
              }`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
