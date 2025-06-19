'use client';

import { useState } from 'react';

interface Post {
  id: number;
  category: string;
  author: string;
  content: string;
  replies: { text: string; image?: string }[];
  image?: string;
}

const categories = ['All', 'Care Tips', 'Accessories', 'Display Ideas'];

const initialPosts: Post[] = [
  {
    id: 1,
    category: 'Care Tips',
    author: 'User123',
    content: 'How often should I water my staghorn fern?',
    replies: [
      { text: 'Twice a week is usually good!' },
      { text: 'It depends on humidity in your area.' },
    ],
  },
  {
    id: 2,
    category: 'Accessories',
    author: 'PlantLover',
    content: 'What type of frame is best for mounting?',
    replies: [
      { text: 'I prefer wooden frames.' },
      { text: 'Metal works too but may rust.' },
    ],
  },
];

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [replyContent, setReplyContent] = useState<Record<number, string>>({});
  const [replyImages, setReplyImages] = useState<Record<number, File | undefined>>({});
  const [newPost, setNewPost] = useState({
    category: 'Care Tips',
    author: '',
    content: '',
    image: undefined as File | undefined,
  });

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const handleReply = async (postId: number) => {
    const replyText = replyContent[postId]?.trim();
    const imageFile = replyImages[postId];
    if (!replyText && !imageFile) return;

    let imageUrl = '';
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      imageUrl = data.url;
    }

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: [...post.replies, { text: replyText, image: imageUrl || undefined }],
            }
          : post
      )
    );
    setReplyContent((prev) => ({ ...prev, [postId]: '' }));
    setReplyImages((prev) => ({ ...prev, [postId]: undefined }));
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = '';
    if (newPost.image) {
      const formData = new FormData();
      formData.append('file', newPost.image);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      imageUrl = data.url;
    }

    const newEntry: Post = {
      id: posts.length + 1,
      category: newPost.category,
      author: newPost.author,
      content: newPost.content,
      image: imageUrl || undefined,
      replies: [],
    };

    setPosts((prev) => [newEntry, ...prev]);
    setNewPost({ category: 'Care Tips', author: '', content: '', image: undefined });

    await fetch('/api/forum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry),
    });
  };

  return (
    <section id="discussion-section" className="max-w-5xl mx-auto p-6">
      <h1 className="text-5xl font-sans font-bold mb-6 text-center">Community Forum</h1>

      <div className="mb-4 flex gap-4 flex-wrap justify-center">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm border ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-black border-gray-300'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FORM UNTUK POSTING DISKUSI */}
      <form
        className="mb-10 border p-4 rounded-xl bg-white shadow"
        onSubmit={handleCreatePost}
      >
        <h2 className="text-xl font-semibold mb-2">Start a New Discussion</h2>
        <select
          value={newPost.category}
          onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
          className="mb-2 border rounded p-2 w-full"
        >
          {categories.slice(1).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Your name"
          className="mb-2 border rounded p-2 w-full"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
        />
        <textarea
          placeholder="What do you want to ask?"
          className="mb-2 border rounded p-2 w-full"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewPost({ ...newPost, image: e.target.files?.[0] })}
          className="mb-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>

      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <div key={post.id} className="border rounded-xl p-4 bg-white shadow">
            <div className="mb-2 text-sm text-gray-600">{post.category}</div>
            <h3 className="font-semibold text-lg">{post.author}</h3>
            <p className="text-gray-800 mt-2">{post.content}</p>
            {post.image && (
              <img src={post.image} alt="post" className="mt-3 rounded max-w-xs" />
            )}

            <div className="mt-4 pl-4 border-l-2 border-blue-500 space-y-2">
              {post.replies.map((reply, idx) => (
                <div key={idx} className="text-sm text-gray-700">
                  - {reply.text}
                  {reply.image && (
                    <img src={reply.image} alt="reply" className="mt-1 rounded max-w-xs" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <textarea
                className="w-full border rounded p-2 text-sm"
                placeholder="Write a reply..."
                value={replyContent[post.id] || ''}
                onChange={(e) =>
                  setReplyContent({ ...replyContent, [post.id]: e.target.value })
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setReplyImages((prev) => ({ ...prev, [post.id]: e.target.files?.[0] }))
                }
                className="mt-2"
              />
              <button
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                onClick={() => handleReply(post.id)}
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
