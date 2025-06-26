'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Thread {
  id: number;
  category: string;
  title: string;
  content: string;
  tags: string[];
  replies: Reply[];
  createdAt: string;
}

interface Reply {
  id: number;
  content: string;
  createdAt: string;
}

const CATEGORIES = [
  'Simbar Media and Plants',
  'Simbar Supplies',
  'Simbar Accessories',
];

// backend
const DUMMY_THREADS: Thread[] = [
  {
    id: 1,
    category: 'Simbar Media and Plants',
    title: 'Cara memilih media tanam terbaik?',
    content: 'Apa saja tips memilih media tanam yang cocok untuk simbar?',
    tags: ['media'],
    replies: [
      { id: 1, content: 'Pilih media yang porous dan mudah menyerap air.', createdAt: new Date().toISOString() }
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    category: 'Simbar Supplies',
    title: 'Rekomendasi pupuk untuk simbar?',
    content: 'Ada rekomendasi pupuk yang bagus untuk simbar?',
    tags: ['supplies'],
    replies: [],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    category: 'Simbar Accessories',
    title: 'Aksesoris gantungan simbar yang kuat?',
    content: 'Mau tanya gantungan simbar yang kuat dan awet apa ya?',
    tags: ['accessories'],
    replies: [],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
];

export default function ForumPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    tags: '',
    category: CATEGORIES[0],
  });
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeTopics, setActiveTopics] = useState<{ [tag: string]: { label: string; count: number } }>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  // Inisialisasi threads dan activeTopics (backend)
  useEffect(() => {
    setThreads(DUMMY_THREADS);

    // Hitung jumlah thread per tag 
    const topicMap: { [tag: string]: { label: string; count: number } } = {};
    DUMMY_THREADS.forEach(thread => {
      thread.tags.forEach(tag => {
        if (!topicMap[tag]) {
          // Label default = tag, bisa diubah sesuai kebutuhan
          let label = tag;
          if (tag === 'media') label = 'Simbar Media and Plants';
          if (tag === 'supplies') label = 'Simbar Supplies';
          if (tag === 'accessories') label = 'Simbar Accessories';
          topicMap[tag] = { label, count: 1 };
        } else {
          topicMap[tag].count += 1;
        }
      });
    });
    setActiveTopics(topicMap);
  }, []);
  //akhir backend

  // mulai backend
  useEffect(() => {
    setLoading(true);
    const tag = searchParams.get('tag');
    setActiveTag(tag);
    if (tag) {
      setThreads(DUMMY_THREADS.filter(thread => thread.tags.includes(tag)));
    } else {
      setThreads(DUMMY_THREADS);
    }
    setLoading(false);
  }, [searchParams]);
  // akhir backend

  // Handle new thread submit
  const handleNewThread = (e: React.FormEvent) => {
  e.preventDefault();
  // Ambil tag utama dari kategori dropdown
  let tagUtama = '';
  if (newThread.category === 'Simbar Media and Plants') tagUtama = 'media';
  if (newThread.category === 'Simbar Supplies') tagUtama = 'supplies';
  if (newThread.category === 'Simbar Accessories') tagUtama = 'accessories';

  // Gunakan tag utama saja untuk active topics
  const threadData: Thread = {
    ...newThread,
    id: threads.length + 1 + Math.floor(Math.random() * 10000),
    tags: [tagUtama], // hanya satu tag sesuai kategori
    replies: [],
    createdAt: new Date().toISOString(),
  };
  setThreads(prev => [threadData, ...prev]);
  setShowNewThread(false);
  setNewThread({ title: '', content: '', tags: '', category: CATEGORIES[0] });

  // Update activeTopics count hanya untuk tag utama
  setActiveTopics(prev => {
    const updated = { ...prev };
    let label = tagUtama;
    if (tagUtama === 'media') label = 'Simbar Media and Plants';
    if (tagUtama === 'supplies') label = 'Simbar Supplies';
    if (tagUtama === 'accessories') label = 'Simbar Accessories';
    if (updated[tagUtama]) {
      updated[tagUtama].count += 1;
    } else {
      updated[tagUtama] = { label, count: 1 };
    }
    return updated;
  });
};

  // Handle reply submit (mulai backend)
  const handleReply = (threadId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent[threadId]?.trim()) return;
    setThreads(threads =>
      threads.map(thread =>
        thread.id === threadId
          ? {
              ...thread,
              replies: [
                ...thread.replies,
                {
                  id: thread.replies.length + 1,
                  content: replyContent[threadId],
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : thread
      )
    );
    setReplyContent({ ...replyContent, [threadId]: '' });
    setShowReplies({ ...showReplies, [threadId]: true });
  };
  //akhir backend

  // Handle tag click
  const handleTagClick = (tag: string) => {
    router.replace(`?tag=${tag}`, { scroll: false });
    setActiveTag(tag);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col items-center py-10">
      <div className="w-full max-w-6xl flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="flex gap-8 border-b mb-6">
            <button
              className="py-3 px-2 text-lg font-semibold border-b-2 border-blue-600 text-blue-700"
              disabled
            >
              Community
            </button>
            <button
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
              onClick={() => setShowNewThread(true)}
            >
              + Start a New Thread
            </button>
          </div>

          {/* Thread List */}
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : (
            <div className="space-y-6">
              {threads.map(thread => (
                <div
                  key={thread.id}
                  className="bg-white rounded-xl shadow p-6 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{thread.category}</span>
                    <span className="text-xs text-gray-400 ml-2">{new Date(thread.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-bold">{thread.title}</h3>
                    <p className="text-gray-700 mt-1">{thread.content}</p>
                  </div>
                  <div className="flex gap-4 mt-2 items-center">
                    <div className="flex gap-2">
                      {thread.tags.map(tag => (
                        <span
                          key={tag}
                          className={`bg-gray-100 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-blue-100 ${
                            activeTag === tag ? 'text-black bg-blue-600' : 'text-blue-600'
                          }`}
                          onClick={() => handleTagClick(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className="ml-auto flex items-center gap-1 text-blue-600 font-semibold cursor-pointer"
                      onClick={() => setShowReplies({ ...showReplies, [thread.id]: !showReplies[thread.id] })}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6m-6 0L21 3m-6 6V3m0 6H3" />
                      </svg>
                      Reply
                    </span>
                  </div>

                  {/* Replies */}
                  {showReplies[thread.id] && (
                    <div className="mt-4 border-t pt-4 space-y-3">
                      {thread.replies.length === 0 && (
                        <div className="text-gray-400 text-sm">Belum ada balasan.</div>
                      )}
                      {thread.replies.map(reply => (
                        <div key={reply.id} className="flex gap-2 items-start">
                          <div>
                            <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">{reply.content}</div>
                            <div className="text-xs text-gray-400 mt-1">{new Date(reply.createdAt).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                      <form
                        className="flex gap-2 mt-2"
                        onSubmit={e => handleReply(thread.id, e)}
                      >
                        <input
                          type="text"
                          className="border rounded px-3 py-2 flex-1"
                          placeholder="Tulis balasan..."
                          value={replyContent[thread.id] || ''}
                          onChange={e => setReplyContent({ ...replyContent, [thread.id]: e.target.value })}
                          required
                        />
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Kirim
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="font-bold mb-4">Active Topics</h4>
            <div className="space-y-2">
              {Object.entries(activeTopics).map(([tag, topic]) => (
                <div
                  key={tag}
                  className={`flex justify-between text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded ${
                    activeTag === tag ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  <span className={`font-semibold ${activeTag === tag ? 'text-blue-700' : 'text-blue-600'}`}>#{tag}</span>
                  <span className="text-gray-500">{topic.count} threads</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal New Thread */}
      {showNewThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form
            className="bg-white rounded-xl p-8 min-w-[350px] shadow-lg flex flex-col gap-4"
            onSubmit={handleNewThread}
          >
            <h2 className="text-xl font-bold mb-2">Start a New Thread</h2>
            <select
              className="border rounded px-3 py-2"
              value={newThread.category}
              onChange={e => setNewThread({ ...newThread, category: e.target.value })}
              required
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Title"
              value={newThread.title}
              onChange={e => setNewThread({ ...newThread, title: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <textarea
              placeholder="What do you want to discuss?"
              value={newThread.content}
              onChange={e => setNewThread({ ...newThread, content: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newThread.tags}
              onChange={e => setNewThread({ ...newThread, tags: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowNewThread(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}