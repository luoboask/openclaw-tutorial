"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { 
  Search, 
  X, 
  FileText, 
  ArrowRight, 
  Command,
  Hash,
  Clock,
  Sparkles,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: string;
  title: string;
  path: string;
  excerpt: string;
  category: string;
  tags?: string[];
}

// 完整的搜索索引
const docsIndex: SearchResult[] = [
  { id: "1", title: "快速开始", path: "/docs/quickstart", excerpt: "5 分钟部署 OpenClaw，快速上手构建你的 AI 助手", category: "入门", tags: ["开始", "部署", "安装"] },
  { id: "2", title: "安装指南", path: "/docs/install", excerpt: "各平台详细安装步骤，包括 macOS、Linux 和 Windows", category: "入门", tags: ["安装", "配置"] },
  { id: "3", title: "配置详解", path: "/docs/config", excerpt: "openclaw.json 完整参考，深入理解每个配置项", category: "配置", tags: ["配置", "JSON", "设置"] },
  { id: "4", title: "配置 Provider", path: "/docs/config/providers", excerpt: "AI 模型提供商配置，OpenAI、Claude、Gemini 等", category: "配置", tags: ["模型", "API", "提供商"] },
  { id: "5", title: "Session 管理", path: "/docs/config/sessions", excerpt: "会话管理和持久化配置", category: "配置", tags: ["会话", "持久化"] },
  { id: "6", title: "频道接入概览", path: "/docs/channels", excerpt: "WhatsApp、Telegram、Discord、iMessage、Signal、Slack 全平台接入", category: "频道", tags: ["接入", "平台", "消息"] },
  { id: "7", title: "WhatsApp 接入", path: "/docs/channels/whatsapp", excerpt: "WhatsApp Business API 配置步骤详解", category: "频道", tags: ["WhatsApp", "Meta", "商业"] },
  { id: "8", title: "Telegram 接入", path: "/docs/channels/telegram", excerpt: "Telegram Bot 配置，创建机器人和设置 Webhook", category: "频道", tags: ["Telegram", "Bot", "机器人"] },
  { id: "9", title: "Discord 接入", path: "/docs/channels/discord", excerpt: "Discord Bot 配置，创建应用和设置权限", category: "频道", tags: ["Discord", "Bot", "社区"] },
  { id: "10", title: "iMessage 接入", path: "/docs/channels/imessage", excerpt: "macOS 信息应用集成，仅限 Mac 用户", category: "频道", tags: ["iMessage", "Mac", "苹果"] },
  { id: "11", title: "Signal 接入", path: "/docs/channels/signal", excerpt: "Signal CLI 配置，隐私优先的消息平台", category: "频道", tags: ["Signal", "隐私", "安全"] },
  { id: "12", title: "Slack 接入", path: "/docs/channels/slack", excerpt: "Slack Bot 配置，企业团队协作集成", category: "频道", tags: ["Slack", "企业", "协作"] },
  { id: "13", title: "进阶技巧", path: "/docs/advanced", excerpt: "多模型切换、定时任务、性能优化、高级配置", category: "进阶", tags: ["高级", "优化", "性能"] },
  { id: "14", title: "安全指南", path: "/docs/security", excerpt: "安全配置最佳实践，保护你的 AI 助手", category: "进阶", tags: ["安全", "隐私", "保护"] },
  { id: "15", title: "工具开发", path: "/docs/tools", excerpt: "自定义工具开发指南，扩展 Agent 能力", category: "开发", tags: ["工具", "开发", "扩展"] },
  { id: "16", title: "故障排查", path: "/docs/troubleshooting", excerpt: "常见问题解决方法，快速定位和修复问题", category: "帮助", tags: ["问题", "故障", "修复"] },
  { id: "17", title: "关于 RedClaw", path: "/about", excerpt: "关于本站，我们的使命和愿景", category: "其他", tags: ["关于", "介绍"] },
  { id: "18", title: "更新日志", path: "/changelog", excerpt: "版本更新记录，了解最新功能和改进", category: "其他", tags: ["更新", "版本", "日志"] },
  { id: "19", title: "博客文章", path: "/blog", excerpt: "深度教程和实战经验分享", category: "博客", tags: ["文章", "教程", "经验"] },
  { id: "20", title: "OpenClaw Agent 完全指南", path: "/blog/openclaw-agent-guide", excerpt: "深入理解 Agent 架构和工作原理", category: "博客", tags: ["Agent", "架构", "原理"] },
];

// 热门搜索词
const hotSearches = ["Agent 配置", "Skill 开发", "Telegram 接入", "快速开始", "模型切换"];

// 搜索历史存储键
const HISTORY_KEY = "redclaw-search-history";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 高亮匹配文本
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-inherit rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // 加载搜索历史
  useEffect(() => {
    if (typeof window !== "undefined") {
      const history = localStorage.getItem(HISTORY_KEY);
      if (history) {
        try {
          setSearchHistory(JSON.parse(history).slice(0, 5));
        } catch {
          setSearchHistory([]);
        }
      }
    }
  }, []);

  // 保存搜索历史
  const saveToHistory = useCallback((term: string) => {
    if (!term.trim()) return;
    const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 5);
    setSearchHistory(newHistory);
    if (typeof window !== "undefined") {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    }
  }, [searchHistory]);

  // 搜索逻辑（带防抖效果）
  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setShowHistory(true);
      return;
    }

    setShowHistory(false);
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const lowercaseQuery = query.toLowerCase();
      const filtered = docsIndex.filter(
        (doc) =>
          doc.title.toLowerCase().includes(lowercaseQuery) ||
          doc.excerpt.toLowerCase().includes(lowercaseQuery) ||
          doc.category.toLowerCase().includes(lowercaseQuery) ||
          doc.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
      // 按相关度排序
      const sorted = filtered.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(lowercaseQuery);
        const bTitleMatch = b.title.toLowerCase().includes(lowercaseQuery);
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        return 0;
      });
      setResults(sorted);
      setSelectedIndex(0);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          saveToHistory(query);
          window.location.href = results[selectedIndex].path;
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // 聚焦输入框
      setTimeout(() => inputRef.current?.focus(), 100);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, results, selectedIndex, query, saveToHistory]);

  // 滚动选中项到视图
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex, results.length]);

  const handleResultClick = () => {
    saveToHistory(query);
    onClose();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(HISTORY_KEY);
    }
  };

  const handleHistoryClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5"
        >
          {/* Search Input */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
            
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文档、教程、文章..."
              className="flex-1 py-4 px-3 bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 text-base"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <button
              onClick={onClose}
              className="ml-2 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto" ref={resultsRef}>
            {/* Empty State - Show History or Suggestions */}
            {query.length < 1 && showHistory && (
              <div className="py-4">
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between px-4 mb-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" />
                        最近搜索
                      </div>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        清除
                      </button>
                    </div>
                    <div className="px-2">
                      {searchHistory.map((term, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleHistoryClick(term)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors group"
                        >
                          <Clock className="w-4 h-4 text-gray-400 group-hover:text-gray-500" />
                          <span className="flex-1">{term}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hot Searches */}
                <div>
                  <div className="flex items-center gap-2 px-4 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    热门搜索
                  </div>
                  <div className="px-4 py-2 flex flex-wrap gap-2">
                    {hotSearches.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleHistoryClick(term)}
                        className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-full transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 text-center">
                    提示：使用 <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 font-mono">↓</kbd> 导航，<kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 font-mono">Enter</kbd> 选择
                  </p>
                </div>
              </div>
            )}

            {/* No Results */}
            {query.length >= 1 && results.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-900 dark:text-white font-medium mb-1">未找到相关结果</p>
                <p className="text-sm text-gray-500">试试其他关键词或浏览热门搜索</p>
              </motion.div>
            )}

            {/* Results List */}
            {results.length > 0 && (
              <ul className="py-2">
                {results.map((result, idx) => (
                  <li key={result.id}>
                    <Link
                      href={result.path}
                      onClick={handleResultClick}
                      className={`flex items-start px-4 py-3 transition-all duration-150 ${
                        idx === selectedIndex
                          ? "bg-red-50 dark:bg-red-900/20 border-l-2 border-red-500"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-2 border-transparent"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className={`w-4 h-4 flex-shrink-0 ${
                            idx === selectedIndex ? "text-red-500" : "text-orange-500"
                          }`} />
                          <span className={`font-medium truncate ${
                            idx === selectedIndex 
                              ? "text-red-900 dark:text-red-100" 
                              : "text-gray-900 dark:text-white"
                          }`}>
                            <HighlightMatch text={result.title} query={query} />
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            idx === selectedIndex
                              ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          }`}>
                            {result.category}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${
                          idx === selectedIndex
                            ? "text-red-700/70 dark:text-red-300/70"
                            : "text-gray-500 dark:text-gray-400"
                        }`}>
                          <HighlightMatch text={result.excerpt} query={query} />
                        </p>
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-2">
                            {result.tags.slice(0, 3).map((tag, tagIdx) => (
                              <span
                                key={tagIdx}
                                className={`text-xs px-1.5 py-0.5 rounded flex items-center gap-1 ${
                                  idx === selectedIndex
                                    ? "bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                <Hash className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowRight className={`w-4 h-4 mt-1 transition-opacity ${
                        idx === selectedIndex 
                          ? "text-red-400 opacity-100" 
                          : "text-gray-300 opacity-0"
                      }`} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
              <span>找到 {results.length} 个结果</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded font-mono">↑↓</span>
                  导航
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded font-mono">↵</span>
                  选择
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// 搜索按钮组件
interface SearchButtonProps {
  onClick: () => void;
  className?: string;
}

export function SearchButton({ onClick, className = "" }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 ${className}`}
    >
      <Search className="w-4 h-4 group-hover:text-red-500 transition-colors" />
      <span className="hidden sm:inline">搜索...</span>
      <span className="hidden md:flex items-center gap-0.5 text-xs px-1.5 py-0.5 bg-white dark:bg-gray-600 rounded text-gray-400 dark:text-gray-300">
        <Command className="w-3 h-3" />
        <span>K</span>
      </span>
    </button>
  );
}

// 导出搜索索引供其他组件使用
export { docsIndex };
export type { SearchResult };
