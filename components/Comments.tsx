"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { CommentType, PaginationType } from "../types";
import { COMMENT_LIST_API } from "../constants";

const LIMIT = 10;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-gradient-to-br from-blue-500 to-blue-600",
    "bg-gradient-to-br from-emerald-500 to-emerald-600",
    "bg-gradient-to-br from-amber-500 to-orange-500",
    "bg-gradient-to-br from-rose-500 to-pink-500",
    "bg-gradient-to-br from-violet-500 to-purple-500",
    "bg-gradient-to-br from-cyan-500 to-teal-500",
    "bg-gradient-to-br from-red-500 to-rose-500",
  ];
  const index = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
}

export default function Comments() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const commentsListRef = useRef<HTMLDivElement>(null);

  const fetchComments = useCallback(async (p: number) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${COMMENT_LIST_API}?page=${p}&limit=${LIMIT}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setComments(data.comments || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
    } catch {
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments(page);
  }, [page, fetchComments]);

  useEffect(() => {
    if (!loading && commentsListRef.current) {
      commentsListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [comments, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    setSubmitMsg("");
    setSubmitSuccess(false);
    try {
      const res = await fetch(COMMENT_LIST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), content: content.trim() }),
      });
      if (!res.ok) throw new Error("Failed to post");
      setName("");
      setContent("");
      setSubmitMsg("Thanks for your comment!");
      setSubmitSuccess(true);
      setPage(1);
      fetchComments(1);
      setTimeout(() => {
        setSubmitMsg("");
        setSubmitSuccess(false);
      }, 4000);
    } catch {
      setSubmitMsg("Failed to post. Please try again.");
      setSubmitSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      }).format(date);
    }
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const charCount = content.length;
  const maxChars = 500;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg shadow-slate-900/20 mb-5">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Join the Conversation
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Share your thoughts, ask questions, or leave feedback. Your comment
            will appear here for others to see.
          </p>
        </div>

        {/* Comment Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    maxLength={30}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Comment Textarea */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Comment
                </label>
                <textarea
                  id="comment"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your thoughts here..."
                  maxLength={maxChars}
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">
                    Be respectful and constructive
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      charCount > maxChars * 0.9
                        ? "text-amber-600"
                        : "text-gray-400"
                    }`}
                  >
                    {charCount}/{maxChars}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting || !name.trim() || !content.trim()}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-sm font-semibold rounded-xl hover:from-slate-900 hover:to-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-slate-800 disabled:hover:to-slate-900 transition-all shadow-lg shadow-slate-900/20"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      <span>Post Comment</span>
                    </>
                  )}
                </button>
                {submitMsg && (
                  <div
                    className={`flex items-center gap-2 text-sm font-medium ${
                      submitSuccess ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {submitSuccess ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    <span>{submitMsg}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Comments List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg
                className="animate-spin w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Loading comments...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <button
              onClick={() => fetchComments(page)}
              className="mt-3 text-sm text-red-700 font-medium hover:text-red-800 underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        ) : comments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No comments yet
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Be the first to share your thoughts and start the discussion.
            </p>
          </div>
        ) : (
          <>
            {/* Comment count */}
            <div ref={commentsListRef} className="flex items-center gap-3 mb-6">
              <span className="text-sm font-semibold text-gray-900">
                {pagination?.total || comments.length} Comment
                {(pagination?.total || comments.length) !== 1 ? "s" : ""}
              </span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Comments */}
            <div className="space-y-4">
              {comments.map((c) => (
                <article
                  key={c._id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200"
                >
                  <div className="p-5 md:p-6">
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full ${getAvatarColor(
                          c.name
                        )} flex items-center justify-center text-white text-sm font-bold shadow-sm`}
                      >
                        {getInitials(c.name)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">
                              {c.name}
                            </h4>
                            <time
                              className="text-xs text-gray-400"
                              dateTime={c.created_at}
                            >
                              {formatDate(c.created_at)}
                            </time>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed break-words whitespace-pre-wrap">
                          {c.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Showing page {pagination.page} of {pagination.pages}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                      .filter(
                        (n) =>
                          n === 1 ||
                          n === pagination.pages ||
                          (n >= page - 1 && n <= page + 1)
                      )
                      .map((n, idx, arr) => {
                        const showEllipsis = idx > 0 && n - arr[idx - 1] > 1;
                        return (
                          <span key={n} className="flex items-center">
                            {showEllipsis && (
                              <span className="px-2 text-gray-300 text-sm">
                                ...
                              </span>
                            )}
                            <button
                              onClick={() => setPage(n)}
                              className={`min-w-[36px] h-9 px-3 text-sm font-medium rounded-lg border transition-all ${
                                n === page
                                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                              }`}
                            >
                              {n}
                            </button>
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
