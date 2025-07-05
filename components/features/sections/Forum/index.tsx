'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Thread {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  replies?: Reply[];
  createdAt: string;
  userName?: string;
}

interface Reply {
  id: number;
  content: string;
  createdAt: string;
  userName?: string;
}

const CATEGORIES = [
  'Simbar Media and Plants',
  'Simbar Supplies',
  'Simbar Accessories',
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
  const [threadReplies, setThreadReplies] = useState<{ [key: number]: Reply[] }>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch threads berdasarkan tag aktif
  useEffect(() => {
    async function fetchThreads() {
      setLoading(true);
      const tag = searchParams.get('tag');
      setActiveTag(tag);
      
      try {
        // Fetch threads dari API
        const url = tag 
          ? `/api/forum/threads?tag=${encodeURIComponent(tag)}`
          : '/api/forum/threads';
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch threads');
        
        const data = await response.json();
        setThreads(data);
        
        // Update active topics
        updateActiveTopics(data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchThreads();
  }, [searchParams]);
  
  // Fungsi untuk menghitung jumlah thread per tag
  function updateActiveTopics(threads: Thread[]) {
    const topicMap: { [tag: string]: { label: string; count: number } } = {};
    threads.forEach(thread => {
      thread.tags.forEach(tag => {
        if (!topicMap[tag]) {
          // Gunakan tag sebagai label default
          let label = tag;
          // Bisa custom label jika perlu
          topicMap[tag] = { label, count: 1 };
        } else {
          topicMap[tag].count += 1;
        }
      });
    });
    setActiveTopics(topicMap);
  }

  // Handle new thread submit
  const handleNewThread = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Parse tags jika ada
      const tagsArray = newThread.tags
        ? newThread.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];
        
      // Default tag berdasarkan kategori
      if (tagsArray.length === 0) {
        if (newThread.category === 'Simbar Media and Plants') tagsArray.push('media');
        else if (newThread.category === 'Simbar Supplies') tagsArray.push('supplies');
        else if (newThread.category === 'Simbar Accessories') tagsArray.push('accessories');
      }
      
      // Kirim data ke API
      const response = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newThread.title,
          content: newThread.content,
          category: newThread.category,
          tags: tagsArray
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create thread');
      
      // Refresh threads
      const updatedThreadsResponse = await fetch('/api/forum/threads');
      if (!updatedThreadsResponse.ok) throw new Error('Failed to fetch updated threads');
      
      const updatedThreads = await updatedThreadsResponse.json();
      setThreads(updatedThreads);
      updateActiveTopics(updatedThreads);
      
      // Reset form
      setShowNewThread(false);
      setNewThread({ title: '', content: '', tags: '', category: CATEGORIES[0] });
    } catch (error) {
      console.error('Error creating thread:', error);
      alert('Failed to create thread. Please try again.');
    }
  };

  // Fetch replies for a thread
  const fetchReplies = async (threadId: number) => {
    try {
      const response = await fetch(`/api/forum/replies?threadId=${threadId}`);
      if (!response.ok) throw new Error('Failed to fetch replies');
      
      const data = await response.json();
      setThreadReplies(prev => ({ ...prev, [threadId]: data }));
    } catch (error) {
      console.error(`Error fetching replies for thread ${threadId}:`, error);
    }
  };

  // Toggle replies visibility
  const toggleReplies = async (threadId: number) => {
    // Jika belum pernah diambil, fetch replies dulu
    if (!threadReplies[threadId]) {
      await fetchReplies(threadId);
    }
    
    setShowReplies(prev => ({
      ...prev,
      [threadId]: !prev[threadId]
    }));
  };

  // Handle reply submit
  const handleReply = async (threadId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent[threadId]?.trim()) return;
    
    try {
      // Kirim reply ke API
      const response = await fetch('/api/forum/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId,
          content: replyContent[threadId]
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create reply');
      
      // Refresh replies
      await fetchReplies(threadId);
      
      // Clear form
      setReplyContent({ ...replyContent, [threadId]: '' });
    } catch (error) {
      console.error('Error creating reply:', error);
      alert('Failed to add reply. Please try again.');
    }
  };

  // Handle tag click
  const handleTagClick = (tag: string) => {
    router.replace(`?tag=${encodeURIComponent(tag)}`, { scroll: false });
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
          ) : threads.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              {activeTag ? `No threads found for #${activeTag}` : 'No threads available'}
            </div>
          ) : (
            <div className="space-y-6">
              {threads.map(thread => (
                <div
                  key={thread.id}
                  className="bg-white rounded-xl shadow p-6 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{thread.category}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      by {thread.userName || 'Anonymous'} • {new Date(thread.createdAt).toLocaleString()}
                    </span>
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
                            activeTag === tag ? 'bg-blue-600 text-white' : 'text-blue-600'
                          }`}
                          onClick={() => handleTagClick(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className="ml-auto flex items-center gap-1 text-blue-600 font-semibold cursor-pointer"
                      onClick={() => toggleReplies(thread.id)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6m-6 0L21 3m-6 6V3m0 6H3" />
                      </svg>
                      Reply {threadReplies[thread.id]?.length > 0 && `(${threadReplies[thread.id].length})`}
                    </span>
                  </div>

                  {/* Replies */}
                  {showReplies[thread.id] && (
                    <div className="mt-4 border-t pt-4 space-y-3">
                      {!threadReplies[thread.id] ? (
                        <div className="text-center py-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                      ) : threadReplies[thread.id].length === 0 ? (
                        <div className="text-gray-400 text-sm">Belum ada balasan.</div>
                      ) : (
                        threadReplies[thread.id].map(reply => (
                          <div key={reply.id} className="flex gap-2 items-start">
                            <div className="flex-1">
                              <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                                <div className="font-medium text-gray-600 mb-1">{reply.userName || 'Anonymous'}</div>
                                {reply.content}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">{new Date(reply.createdAt).toLocaleString()}</div>
                            </div>
                          </div>
                        ))
                      )}
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
            {Object.keys(activeTopics).length === 0 ? (
              <div className="text-gray-400 text-sm">No active topics</div>
            ) : (
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
            )}
            
            {/* Show all threads link */}
            {activeTag && (
              <div className="mt-4 text-center">
                <button 
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => router.replace('', { scroll: false })}
                >
                  Show all threads
                </button>
              </div>
            )}
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
              className="border rounded px-3 py-2 min-h-[100px]"
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