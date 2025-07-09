'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';


interface Thread {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  userName?: string;
  imageUrl?: string;
  userId?: number;
}

interface Reply {
  id: number;
  content: string;
  createdAt: string;
  userName?: string;
  imageUrl?: string;
  userId?: number;
}

function useSimpleAuth() {
  const [user, setUser] = useState<{id: number; name: string} | null>(null);
  const [status, setStatus] = useState('unauthenticated');
  
  const login = (userData: {id: number; name: string}) => {
    setUser(userData);
    setStatus('authenticated');
    localStorage.setItem('forum_user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    setStatus('unauthenticated');
    localStorage.removeItem('forum_user');
  };

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('forum_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setStatus('authenticated');
      }
    } catch (err) {
      console.error('Error loading saved user:', err);
    }
  }, []);
  
  return {
    data: { user },
    status,
    login,
    logout
  };
}

const CATEGORIES = [
  'Simbar Media and Plants',
  'Simbar Supplies',
  'Simbar Accessories',
];

export default function ForumPage() {

  const { data: session, status, login, logout } = useSimpleAuth();
  const user = session?.user;

  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewThread, setShowNewThread] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [postAsGuest, setPostAsGuest] = useState(false);
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    tags: '',
    category: CATEGORIES[0],
    imageUrl: '',
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>({});
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeTopics, setActiveTopics] = useState<{ [tag: string]: { label: string; count: number } }>({});
  const [threadReplies, setThreadReplies] = useState<{ [key: number]: Reply[] }>({});
  const [replyImages, setReplyImages] = useState<{ [key: number]: string }>({});
  const [replyUploading, setReplyUploading] = useState<{ [key: number]: boolean }>({});
  const [replyButtonsLoading, setReplyButtonsLoading] = useState<{ [key: number]: boolean }>({});
  const [replyAsGuest, setReplyAsGuest] = useState<{ [key: number]: boolean }>({});
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [postAfterLogin, setPostAfterLogin] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    async function fetchThreads() {
      setLoading(true);
      const tag = searchParams.get('tag');
      setActiveTag(tag);
      
      try {
        const url = tag 
          ? `/api/forum/threads?tag=${encodeURIComponent(tag)}`
          : '/api/forum/threads';
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch threads');
        
        const data = await response.json();
        setThreads(data);
        updateActiveTopics(data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchThreads();
  }, [searchParams]);
  
  function updateActiveTopics(threads: Thread[]) {
    const topicMap: { [tag: string]: { label: string; count: number } } = {};
    threads.forEach(thread => {
      thread.tags.forEach((tag: string) => {
        if (!topicMap[tag]) {
          let label = tag;
          topicMap[tag] = { label, count: 1 };
        } else {
          topicMap[tag].count += 1;
        }
      });
    });
    setActiveTopics(topicMap);
  }
  
  const handleNewThread = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tagsArray = newThread.tags
        ? newThread.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];
      if (tagsArray.length === 0) {
        if (newThread.category === 'Simbar Media and Plants') tagsArray.push('media');
        else if (newThread.category === 'Simbar Supplies') tagsArray.push('supplies');
        else if (newThread.category === 'Simbar Accessories') tagsArray.push('accessories');
      }
      const response = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newThread.title,
          content: newThread.content,
          category: newThread.category,
          tags: tagsArray,
          imageUrl: newThread.imageUrl,
          userId: postAsGuest ? null : user?.id 
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create thread');
      setPostAsGuest(false);
      setShowNewThread(false);
      setNewThread({ 
        title: '', 
        content: '', 
        tags: '', 
        category: CATEGORIES[0],
        imageUrl: '' 
      });
      const updatedThreadsResponse = await fetch('/api/forum/threads');
      if (!updatedThreadsResponse.ok) throw new Error('Failed to fetch updated threads');
      
      const updatedThreads = await updatedThreadsResponse.json();
      setThreads(updatedThreads);
      updateActiveTopics(updatedThreads);
    } catch (error) {
      console.error('Error creating thread:', error);
      alert('Failed to create thread. Please try again.');
    }
  };
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
  const toggleReplies = async (threadId: number) => {
    if (!threadReplies[threadId]) {
      await fetchReplies(threadId);
    }
    
    setShowReplies(prev => ({
      ...prev,
      [threadId]: !prev[threadId]
    }));
  };
  const handleNewThreadClick = () => {
    if (status === 'authenticated' || postAsGuest) {
      setShowNewThread(true);
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleLoginAndPost = () => {
    setShowLoginDialog(false);
    setShowLoginForm(true);
    // Simpan tujuan setelah login sebagai state
    setPostAfterLogin(true);
  };
  
  const handlePostAsGuest = () => {
    setPostAsGuest(true);
    setShowLoginDialog(false);
    setShowNewThread(true);
  };
  const handleReply = async (threadId: number, e: React.FormEvent) => {
    e.preventDefault();
    const content = replyContent[threadId]?.trim() || '';
    const hasImage = !!replyImages[threadId];
    
    if (!content && !hasImage) {
      const inputElement = document.querySelector(`[data-reply-input="${threadId}"]`) as HTMLInputElement;
      if (inputElement) {
        inputElement.classList.add('ring-2', 'ring-red-500');
        setTimeout(() => {
          inputElement.classList.remove('ring-2', 'ring-red-500');
        }, 1500);
      }
      return;
    }
    
    try {
      setReplyButtonsLoading({ ...replyButtonsLoading, [threadId]: true });
      const response = await fetch('/api/forum/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId,
          content,
          imageUrl: replyImages[threadId] || null,
          userId: replyAsGuest[threadId] ? null : user?.id 
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create reply');
      
      setReplyAsGuest({ ...replyAsGuest, [threadId]: false });
      setReplyContent({ ...replyContent, [threadId]: '' });
      handleRemoveReplyImage(threadId);
      await fetchReplies(threadId);
      
      setTimeout(() => {
        const repliesContainer = document.querySelector(`[data-replies-container="${threadId}"]`);
        if (repliesContainer) {
          repliesContainer.scrollTop = repliesContainer.scrollHeight;
        }
      }, 100);
    } catch (error) {
      console.error('Error creating reply:', error);
      alert('Failed to add reply. Please try again.');
    } finally {
      setReplyButtonsLoading({ ...replyButtonsLoading, [threadId]: false });
    }
  };
  const handleRemoveReplyImage = (threadId: number) => {
    setReplyImages(prev => {
      const updated = { ...prev };
      delete updated[threadId];
      return updated;
    });
    const fileInput = document.querySelector(`[data-reply-file-input="${threadId}"]`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };
  const handleReplyImageUpload = (threadId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setReplyUploading({ ...replyUploading, [threadId]: true });
    const reader = new FileReader();
    reader.onloadend = () => {
      setReplyImages({ ...replyImages, [threadId]: reader.result as string });
      setReplyUploading({ ...replyUploading, [threadId]: false });
    };
    reader.readAsDataURL(file);
  };
  const handleTagClick = (tag: string) => {
    router.replace(`?tag=${encodeURIComponent(tag)}`, { scroll: false });
  };

  const handleLogin = () => {
    setShowLoginForm(true);
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginName.trim()) {
      login({ id: Date.now(), name: loginName });
      setShowLoginForm(false);
      setLoginName('');
      
      // Jika login dilakukan untuk posting thread baru, buka dialog thread baru
      if (postAfterLogin) {
        setShowNewThread(true);
        setPostAfterLogin(false); // Reset flag
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col items-center py-10">
      <div className="w-full max-w-6xl flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Tabs dan Auth Status */}
          <div className="flex gap-8 border-b mb-6 items-center">
            <button
              className="py-3 px-2 text-lg font-semibold border-b-2 border-blue-600 text-blue-700"
              disabled
            >
              Community
            </button>
            
            {/* Auth status dan menu */}
            <div className="ml-auto flex gap-4 items-center">
              {status === 'authenticated' && user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {user.name?.[0] || 'U'}
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={logout}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              )}
              
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                onClick={handleNewThreadClick}
              >
                + Start a New Thread
              </button>
            </div>
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
                  data-thread={thread.id}
                  className="bg-white rounded-xl shadow p-6 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar user jika ada */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {thread.userName ? thread.userName[0] : 'A'}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-semibold">{thread.category}</span>
                      <div className="text-xs text-gray-400">
                        by <span className="font-medium">{thread.userName || 'Anonymous'}</span> • {new Date(thread.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content thread tetap sama */}
                  <div className="mt-2">
                    <h3 className="text-lg font-bold">{thread.title}</h3>
                    <p className="text-gray-700 mt-1">{thread.content}</p>
                    
                    {thread.imageUrl && (
                      <div className="mt-3">
                        <Image
                          src={thread.imageUrl}
                          alt="Thread image"
                          width={300}
                          height={200}
                          className="rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Tags dan tombol reply tetap sama */}
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
                      {replyButtonsLoading[thread.id] ? (
                        <>
                          <span className="animate-spin h-4 w-4 mr-1 border-2 border-blue-600 border-t-transparent rounded-full"></span>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-2" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6m-6 0L21 3m-6 6V3m0 6H3" />
                          </svg>
                          Reply {threadReplies[thread.id]?.length > 0 && `(${threadReplies[thread.id].length})`}
                        </>
                      )}
                    </span>
                  </div>

                  {/* Replies */}
                  {showReplies[thread.id] && (
                    <div className="mt-4 border-t pt-4 space-y-3 replies-container">
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
                        className="flex flex-col gap-2 mt-2"
                        onSubmit={e => handleReply(thread.id, e)}
                      >
                        <div className="text-xs text-gray-500 mb-1">
                          Replying as: {status === 'authenticated' && !replyAsGuest[thread.id] ? 
                            <span className="text-green-600 font-medium">{user?.name}</span> : 
                            <span>Guest</span>
                          }
                        </div>
                        
                        <input
                          type="text"
                          className="border rounded px-3 py-2 flex-1 reply-input"
                          data-reply-input={thread.id}
                          placeholder="Tulis balasan..."
                          value={replyContent[thread.id] || ''}
                          onChange={e => setReplyContent({ ...replyContent, [thread.id]: e.target.value })}
                        />
                        
                        {/* Upload gambar untuk reply */}
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            data-reply-file-input={thread.id}
                            onChange={e => handleReplyImageUpload(thread.id, e)}
                            className="text-sm"
                          />
                          
                          {replyUploading[thread.id] && (
                            <div className="text-xs text-blue-600 flex items-center">
                              <span className="animate-spin h-3 w-3 mr-1 border border-blue-600 border-t-transparent rounded-full"></span>
                              Uploading...
                            </div>
                          )}
                        </div>
                        
                        {/* Preview gambar reply */}
                        {replyImages[thread.id] && (
                          <div className="mt-2 relative inline-block">
                            <Image
                              src={replyImages[thread.id]}
                              alt="Reply image"
                              width={150}
                              height={100}
                              className="rounded"
                            />
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                              onClick={() => handleRemoveReplyImage(thread.id)}
                            >
                              ×
                            </button>
                          </div>
                        )}
                        
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          disabled={replyButtonsLoading[thread.id]}
                        >
                          {replyButtonsLoading[thread.id] ? 'Sending...' : 'Kirim'}
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
            
            {activeTag && (
              <div className="mt-4 text-center">
                <button 
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => router.replace('/', { scroll: false })}
                >
                  Show all threads
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showLoginDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-8 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">Talk as:</h3>
            <div className="flex flex-col gap-4">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                onClick={handleLoginAndPost}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login as yourname
              </button>
              <button
                className="border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                onClick={handlePostAsGuest}
              >
                Continue as anonymous
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 text-sm mt-2"
                onClick={() => setShowLoginDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal New Thread */}
      {showNewThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form
            className="bg-white rounded-xl p-8 min-w-[500px] shadow-lg flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            onSubmit={handleNewThread}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Start a New Thread</h2>
              {/* Tampilkan indikator mode posting */}
              <div className={`px-3 py-1 rounded-full text-sm ${
                status === 'authenticated' && !postAsGuest
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                Posting as: {status === 'authenticated' && !postAsGuest ? user?.name : 'Guest'}
              </div>
            </div>
            
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
            
            {/* Upload image field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setUploading(true);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewThread(prev => ({ ...prev, imageUrl: reader.result as string }));
                      setUploading(false);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="border rounded px-3 py-2 text-sm w-full"
              />
              
              {/* Preview image */}
              {newThread.imageUrl && (
                <div className="mt-3">
                  <Image
                    src={newThread.imageUrl}
                    alt="Image preview"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>
            
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

      {/* Login Form Popup */}
      {showLoginForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 max-w-md shadow-lg w-full mx-4 sm:mx-0 sm:w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Sign In</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowLoginForm(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                  autoFocus
                />
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </button>
                <button
                  type="button"
                  className="text-gray-500 text-sm hover:text-gray-700"
                  onClick={() => setShowLoginForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Login is only for identification purposes in the forum
            </p>
          </div>
        </div>
      )}
    </div>
  );
}