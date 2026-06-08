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
      setComments(data);
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
    <section className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Comments</h3>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={30}
            className="sm:col-span-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
          />
          <div className="sm:col-span-3 flex gap-3">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              maxLength={300}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
            <button
              type="submit"
              disabled={submitting || !name.trim() || !content.trim()}
              className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              {submitting ? "..." : "Post"}
            </button>
          </div>
        </div>
        {submitMsg && (
          <p
            className={`text-sm ${submitMsg.includes("Failed") ? "text-red-500" : "text-emerald-600"}`}
          >
            {submitMsg}
          </p>
        )}
      </form>

      {/* Comments list */}
      {loading ? (
        <p className="text-sm text-gray-400">Loading comments...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {comments.map((c) => (
            <div
              key={c._id}
              className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
            >
              <div className="flex items-center justify-between mb-1">
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
    </section>
  );
}
