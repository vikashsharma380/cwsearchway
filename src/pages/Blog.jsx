import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  X,
  Upload,
  Star,
  Bookmark,
  MoreHorizontal,
  Award,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

export default function CommunityBlog({
  setCurrentPage,
  userAuth = { id: "user-1", name: "John Doe", role: "Student", avatar: "👤" },
}) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        id: "auth-1",
        name: "Anonymous",
        role: "Student",
        avatar: "👤",
        bio: "Job seeker",
        verified: false,
      },
      title: "Rejected from 7 companies before getting my first IT job",
      content:
        "I applied to more than 120 roles. Most never replied. Here's what actually changed my outcome. I started reading job descriptions carefully, fixing gaps, and preparing explanations for my career transitions.",
      images: [],
      category: "Experience",
      tags: ["hiring", "interview", "tips"],
      timestamp: Date.now() - 7200000,
      likes: 43,
      liked: false,
      comments: 2,
      shares: 5,
      views: 342,
      saves: 12,
      rating: 4.5,
      helpfulCount: 38,
    },
    {
      id: 2,
      author: {
        id: "auth-2",
        name: "Hiring Manager",
        role: "Recruiter",
        avatar: "👨‍💼",
        bio: "Hiring for tech roles",
        verified: true,
      },
      title: "Hiring freshers: what we really evaluate",
      content:
        "CGPA and degrees rarely decide. We care about problem solving, communication, and learning speed. Most candidates fail because they don't understand what the role actually needs.",
      images: [],
      category: "Hiring",
      tags: ["recruitment", "freshers", "hiring-tips"],
      timestamp: Date.now() - 86400000,
      likes: 102,
      liked: false,
      comments: 31,
      shares: 22,
      views: 1250,
      saves: 156,
      rating: 4.8,
      helpfulCount: 98,
    },
    {
      id: 3,
      author: {
        id: "auth-3",
        name: "Alex Kumar",
        role: "Developer",
        avatar: "👨‍💻",
        bio: "Senior Developer @ TechCorp",
        verified: true,
      },
      title: "My interview experience at top 5 tech companies",
      content:
        "Last year I interviewed with Microsoft, Google, Amazon, Meta, and Apple. Here are the common patterns I noticed across all interviews and my tips for cracking them.",
      images: [],
      category: "Experience",
      tags: ["faang", "interview-prep", "career"],
      timestamp: Date.now() - 172800000,
      likes: 287,
      liked: false,
      comments: 45,
      shares: 89,
      views: 5240,
      saves: 412,
      rating: 4.9,
      helpfulCount: 265,
    },
  ]);

  const [sortBy, setSortBy] = useState("newest");
  const [filterRole, setFilterRole] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Experience",
    role: "Student",
    tags: "",
    images: [],
    isAnonymous: false,
  });

  const categories = [
    "Experience",
    "Hiring",
    "Question",
    "Advice",
    "News",
    "Reviews",
  ];
  const roles = ["Student", "Recruiter", "Developer", "HR", "Manager"];

  const filteredAndSorted = [...posts]
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole =
        filterRole === "all" || post.author.role === filterRole;
      const matchesCategory =
        filterCategory === "all" || post.category === filterCategory;
      return matchesSearch && matchesRole && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "comments") return b.comments - a.comments;
      if (sortBy === "helpful") return b.helpfulCount - a.helpfulCount;
      return b.timestamp - a.timestamp;
    });

  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (hours < 1) return "now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const toggleLike = (postId) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const addComment = (postId) => {
    if (!newComment[postId]?.trim()) return;

    setPosts(
      posts.map((p) =>
        p.id === postId ? { ...p, comments: p.comments + 1 } : p
      )
    );

    setNewComment({ ...newComment, [postId]: "" });
  };

  const publishPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: Math.max(...posts.map((p) => p.id), 0) + 1,
      author: {
        id: userAuth.id,
        name: newPost.isAnonymous ? "Anonymous" : userAuth.name,
        role: newPost.role,
        avatar: userAuth.avatar,
        bio: "Active member",
        verified: false,
      },
      title: newPost.title,
      content: newPost.content,
      images: newPost.images,
      category: newPost.category,
      tags: newPost.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      timestamp: Date.now(),
      likes: 0,
      liked: false,
      comments: 0,
      shares: 0,
      views: 0,
      saves: 0,
      rating: 0,
      helpfulCount: 0,
    };

    setPosts([post, ...posts]);
    setNewPost({
      title: "",
      content: "",
      category: "Experience",
      role: "Student",
      tags: "",
      images: [],
      isAnonymous: false,
    });
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* PAGE TITLE SECTION - BELOW NAVBAR */}
      <div className="pt-8 pb-6 bg-white border-b border-slate-200">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Community Discussions
              </h1>
              <p className="mt-1 text-slate-600">
                Share experiences and connect with job seekers and recruiters
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              + New Discussion
            </button>
          </div>

          {/* SEARCH BAR */}
          <div className="relative mb-4">
            <Search className="absolute w-5 h-5 left-4 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search discussions, tags, members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* FILTERS & SORTING */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 text-sm font-medium border rounded-lg border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 text-sm font-medium border rounded-lg border-slate-300 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div className="mx-2 border-l border-slate-300"></div>

            <button
              onClick={() => setSortBy("newest")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                sortBy === "newest"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy("helpful")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                sortBy === "helpful"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Helpful
            </button>
            <button
              onClick={() => setSortBy("comments")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                sortBy === "comments"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Discussed
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-6 py-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* POSTS FEED */}
          <div className="space-y-5 lg:col-span-2">
            {filteredAndSorted.length === 0 ? (
              <div className="py-16 text-center bg-white border rounded-lg border-slate-200">
                <p className="mb-2 text-lg font-semibold text-slate-600">
                  No discussions found
                </p>
                <p className="text-sm text-slate-500">
                  Try adjusting your filters or create a new discussion
                </p>
              </div>
            ) : (
              filteredAndSorted.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden transition bg-white border rounded-lg border-slate-200 hover:shadow-lg"
                >
                  {/* HEADER */}
                  <div className="p-5 border-b border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start flex-1 gap-3">
                        <span className="mt-1 text-3xl">
                          {post.author.avatar}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-slate-900">
                              {post.author.name}
                            </span>
                            {post.author.verified && (
                              <Award
                                className="w-4 h-4 text-blue-600"
                                title="Verified"
                              />
                            )}
                            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-medium">
                              {post.author.role}
                            </span>
                            <span className="text-xs text-slate-500">
                              • {formatTime(post.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {post.author.bio}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 transition rounded-lg hover:bg-slate-100">
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    {/* CATEGORY & VIEWS */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold tracking-wide text-blue-600 uppercase">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {post.views} views
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div
                    className="p-5 border-b cursor-pointer border-slate-200"
                    onClick={() =>
                      setExpandedPostId(
                        expandedPostId === post.id ? null : post.id
                      )
                    }
                  >
                    <h3 className="mb-2 text-lg font-bold leading-snug transition text-slate-900 hover:text-blue-600">
                      {post.title}
                    </h3>
                    <p className="mb-3 text-sm leading-relaxed text-slate-700">
                      {expandedPostId === post.id
                        ? post.content
                        : post.content.substring(0, 150) + "..."}
                    </p>

                    {/* TAGS */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium hover:bg-blue-100 transition cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* RATING */}
                    {post.rating > 0 && (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(post.rating)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-slate-600">
                          {post.rating} • {post.helpfulCount} found helpful
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-between px-5 py-3 border-b bg-slate-50 border-slate-200">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 text-sm font-semibold transition ${
                          post.liked
                            ? "text-red-600"
                            : "text-slate-600 hover:text-red-600"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            post.liked ? "fill-current" : ""
                          }`}
                        />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm font-semibold transition text-slate-600 hover:text-blue-600">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm font-semibold transition text-slate-600 hover:text-blue-600">
                        <Share2 className="w-5 h-5" />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-semibold transition text-slate-600 hover:text-blue-600">
                      <Bookmark className="w-5 h-5" />
                      <span>{post.saves}</span>
                    </button>
                  </div>

                  {/* COMMENT SECTION */}
                  {expandedPostId === post.id && (
                    <div className="p-5 border-t bg-slate-50 border-slate-200">
                      <div className="flex gap-3">
                        <span className="text-2xl">{userAuth.avatar}</span>
                        <div className="flex-1">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Add a thoughtful comment..."
                              value={newComment[post.id] || ""}
                              onChange={(e) =>
                                setNewComment({
                                  ...newComment,
                                  [post.id]: e.target.value,
                                })
                              }
                              onKeyPress={(e) =>
                                e.key === "Enter" && addComment(post.id)
                              }
                              className="flex-1 px-3 py-2 text-sm border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => addComment(post.id)}
                              disabled={!newComment[post.id]?.trim()}
                              className="px-4 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-5">
            {/* STATS CARD */}
            <div className="p-6 bg-white border rounded-lg border-slate-200">
              <h3 className="mb-4 text-lg font-bold text-slate-900">
                Community Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-wide uppercase text-slate-500">
                    Total Discussions
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {posts.length}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <p className="mb-1 text-xs font-semibold tracking-wide uppercase text-slate-500">
                    Active Today
                  </p>
                  <p className="text-2xl font-bold text-slate-900">342</p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <p className="mb-1 text-xs font-semibold tracking-wide uppercase text-slate-500">
                    This Week
                  </p>
                  <p className="text-2xl font-bold text-slate-900">1,240</p>
                </div>
              </div>
            </div>

            {/* TRENDING CARD */}
            <div className="p-6 bg-white border rounded-lg border-slate-200">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-slate-900">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Trending Topics
              </h3>
              <div className="space-y-2">
                {["#hiring", "#interview", "#freshers", "#tips", "#career"].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-left text-blue-600 transition rounded-lg hover:text-blue-700 hover:bg-blue-50 group"
                    >
                      <span>{tag}</span>
                      <ChevronRight className="w-4 h-4 transition opacity-0 group-hover:opacity-100" />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* GUIDELINES */}
            <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="mb-4 font-bold text-blue-900">📋 Guidelines</h3>
              <ul className="space-y-2 text-xs leading-relaxed text-blue-800">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Be respectful and constructive</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Share real experiences and insights</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Include relevant details and context</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>No spam or self-promotion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE POST MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/50">
          <div className="w-full max-w-2xl my-8 bg-white rounded-lg">
            <div className="sticky top-0 flex items-center justify-between p-6 bg-white border-b rounded-t-lg border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                Create New Discussion
              </h2>
              <button onClick={() => setShowCreateModal(false)}>
                <X className="w-6 h-6 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* TITLE */}
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-900">
                  Discussion Title *
                </label>
                <input
                  type="text"
                  placeholder="What's your discussion about?"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  maxLength="150"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-slate-500">
                  {newPost.title.length}/150 characters
                </p>
              </div>

              {/* CONTENT */}
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-900">
                  Content *
                </label>
                <textarea
                  placeholder="Share your experience, question, or insight in detail..."
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  rows="6"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* ROLE & CATEGORY */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    Your Role
                  </label>
                  <select
                    value={newPost.role}
                    onChange={(e) =>
                      setNewPost({ ...newPost, role: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {roles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-900">
                    Category
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) =>
                      setNewPost({ ...newPost, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TAGS */}
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-900">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="hiring, interview, tips"
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost({ ...newPost, tags: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block mb-2 text-sm font-bold text-slate-900">
                  Add Images (Optional)
                </label>
                <div className="p-6 text-center transition border-2 border-dashed rounded-lg cursor-pointer border-slate-300 hover:border-blue-500 hover:bg-blue-50">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-semibold text-slate-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>

              {/* ANONYMOUS */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPost.isAnonymous}
                  onChange={(e) =>
                    setNewPost({ ...newPost, isAnonymous: e.target.checked })
                  }
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-700">
                  Post anonymously
                </span>
              </label>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={publishPost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
                >
                  Publish Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
