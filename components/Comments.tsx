"use client";

import { useEffect, useState, useCallback } from "react";
import { CommentType } from "../types";
import { COMMENT_LIST_API } from "../constants";

export default function Comments() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(COMMENT_LIST_API);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

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
      fetchComments();
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
              className="shrink-0 px-5 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
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
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
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
        )}
      </div>
    </section>
  );
}
