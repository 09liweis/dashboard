import type { NextPage } from 'next';
import { useEffect, useState, useContext } from 'react';
import KnowledgeCard from '../components/knowledge/KnowledgeCard';
import { Knowledge } from 'types';
import AppContext from '../AppContext';

const KnowledgesPage: NextPage = () => {
  const { user } = useContext(AppContext) as { user: { _id: string } | null };
  const isLoggedIn = !!user?._id;
  
  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
  const [randomKnowledge, setRandomKnowledge] = useState<Knowledge | null>(null);
  const [viewMode, setViewMode] = useState<'random' | 'list'>('random');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingKnowledge, setViewingKnowledge] = useState<Knowledge | null>(null);
  const [editingKnowledge, setEditingKnowledge] = useState<Knowledge | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    definition: '',
    categories: ''
  });

  useEffect(() => {
    fetchRandomKnowledge();
    fetchKnowledges();
  }, []);

  const fetchKnowledges = async () => {
    try {
      const response = await fetch('/api/knowledges');
      const data = await response.json();
      setKnowledges(data);
    } catch (error) {
      console.error('Failed to fetch knowledges:', error);
    }
  };

  const fetchRandomKnowledge = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/knowledges/random');
      if (response.ok) {
        const data = await response.json();
        setRandomKnowledge(data);
      }
    } catch (error) {
      console.error('Failed to fetch random knowledge:', error);
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

  const handleCardClick = (knowledge: Knowledge) => {
    setViewingKnowledge(knowledge);
    setShowViewModal(true);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewingKnowledge(null);
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
        <div className="flex items-center gap-3">
          {/* View Mode Switch */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setViewMode('random')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'random'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Random
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              List
            </button>
          </div>
          {isLoggedIn && (
            <button
              type="button"
              onClick={openModal}
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Knowledge
            </button>
          )}
        </div>
      </div>

      {/* Random Knowledge View */}
      {viewMode === 'random' && randomKnowledge && (
        <div className="mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 border border-blue-100">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{randomKnowledge.title}</h2>
              {isLoggedIn && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(randomKnowledge)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => randomKnowledge._id && handleDelete(randomKnowledge._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-gray-700 mb-6 whitespace-pre-wrap">{randomKnowledge.definition}</p>
            
            {randomKnowledge.categories && randomKnowledge.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {randomKnowledge.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
            
            <button
              type="button"
              onClick={fetchRandomKnowledge}
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next Knowledge →
            </button>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Knowledges</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {knowledges.map((knowledge) => (
              <KnowledgeCard
                key={knowledge._id}
                knowledge={knowledge}
                isLoggedIn={isLoggedIn}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
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
                className="rounded-full cursor-pointer bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="rounded-md cursor-pointer border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex cursor-pointer justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editingKnowledge ? 'Update' : 'Add'} Knowledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingKnowledge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {viewingKnowledge.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeViewModal}
                className="rounded-full cursor-pointer bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Definition</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{viewingKnowledge.definition}</p>
              </div>

              {viewingKnowledge.categories && viewingKnowledge.categories.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingKnowledge.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeViewModal}
                  className="rounded-md cursor-pointer border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgesPage;
