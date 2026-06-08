"use client";

import { useEffect, useState, useCallback } from "react";
import { CommentType, PaginationType } from "../types";
import { COMMENT_LIST_API } from "../constants";

const LIMIT = 5;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    setSubmitMsg("");
    try {
      const res = await fetch(COMMENT_LIST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), content: content.trim() }),
      });
      if (!res.ok) throw new Error("Failed to post");
      setName("");
      setContent("");
      setSubmitMsg("Comment posted!");
      setPage(1);
      fetchComments(1);
    } catch {
      setSubmitMsg("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-200 bg-white">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Comments</h3>
        <p className="text-sm text-gray-400 mb-6">
          Share your thoughts or ask a question.
        </p>

        {/* Comment form */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={30}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              maxLength={300}
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={submitting || !name.trim() || !content.trim()}
              className="shrink-0 px-5 py-3 bg-primary text-white text-sm font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
            >
              {submitting ? (
                <span className="flex items-center gap-1">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </span>
              ) : (
                "Post"
              )}
            </button>
          </div>
          {submitMsg && (
            <p
              className={`text-sm font-medium ${submitMsg.includes("Failed") ? "text-red-500" : "text-emerald-600"}`}
            >
              {submitMsg}
            </p>
          )}
        </form>

        {/* Comments list */}
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading comments...
          </div>
        ) : error ? (
          <p className="text-sm text-red-500 py-4">{error}</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 italic">No comments yet. Be the first!</p>
        ) : (
          <>
            <div className="space-y-3">
              {comments.map((c) => (
                <div
                  key={c._id}
                  className="rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-gray-800">
                      {c.name}
                    </span>
                    <time className="text-xs text-gray-400">
                      {formatDate(c.created_at)}
                    </time>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed break-words">
                    {c.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  Page {pagination.page} of {pagination.pages} &middot;{" "}
                  {pagination.total} comment{pagination.total !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={!pagination.hasPrev}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    Prev
                  </button>
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                    .filter(
                      (n) =>
                        n === 1 ||
                        n === pagination.pages ||
                        (n >= page - 1 && n <= page + 1)
                    )
                    .map((n, idx, arr) => {
                      const showEllipsis =
                        idx > 0 && n - arr[idx - 1] > 1;
                      return (
                        <span key={n} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="px-1 text-xs text-gray-300">...</span>
                          )}
                          <button
                            onClick={() => setPage(n)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition cursor-pointer ${
                              n === page
                                ? "border-blue-400 bg-blue-50 text-blue-600"
                                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {n}
                          </button>
                        </span>
                      );
                    })}
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!pagination.hasNext}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
