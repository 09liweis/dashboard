import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import KnowledgeCard from '../components/knowledge/KnowledgeCard';
import { Knowledge } from 'types';

const KnowledgesPage: NextPage = () => {
  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingKnowledge, setEditingKnowledge] = useState<Knowledge | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    definition: '',
    categories: ''
  });

  useEffect(() => {
    fetchKnowledges();
  }, []);

  const fetchKnowledges = async () => {
    try {
      const response = await fetch('/api/knowledges');
      const data = await response.json();
      setKnowledges(data);
    } catch (error) {
      console.error('Failed to fetch knowledges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categories = formData.categories.split(',').map(cat => cat.trim()).filter(cat => cat);
    
    const knowledgeData = {
      title: formData.title,
      definition: formData.definition,
      categories
    };

    try {
      if (editingKnowledge?._id) {
        await fetch(`/api/knowledges/${editingKnowledge._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(knowledgeData)
        });
      } else {
        await fetch('/api/knowledges', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(knowledgeData)
        });
      }
      
      fetchKnowledges();
      closeModal();
    } catch (error) {
      console.error('Failed to save knowledge:', error);
    }
  };

  const handleEdit = (knowledge: Knowledge) => {
    setEditingKnowledge(knowledge);
    setFormData({
      title: knowledge.title,
      definition: knowledge.definition,
      categories: knowledge.categories.join(', ')
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this knowledge?')) {
      try {
        await fetch(`/api/knowledges/${id}`, { method: 'DELETE' });
        fetchKnowledges();
      } catch (error) {
        console.error('Failed to delete knowledge:', error);
      }
    }
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingKnowledge(null);
    setFormData({ title: '', definition: '', categories: '' });
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Knowledge Base
        </h1>
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Knowledge
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {knowledges.map((knowledge) => (
          <KnowledgeCard
            key={knowledge._id}
            knowledge={knowledge}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingKnowledge ? 'Edit Knowledge' : 'Add New Knowledge'}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Use this form to save a definition and categories for your knowledge item.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Definition</label>
                <textarea
                  value={formData.definition}
                  onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categories (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.categories}
                  onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                  placeholder="e.g. Programming, JavaScript, Web Development"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editingKnowledge ? 'Update' : 'Add'} Knowledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgesPage;