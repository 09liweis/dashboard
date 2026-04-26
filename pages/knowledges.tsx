import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import KnowledgeCard from '../components/knowledge/KnowledgeCard';
import { Knowledge } from 'types';

const KnowledgesPage: NextPage = () => {
  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
  const [loading, setLoading] = useState(true);
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
        // Update
        await fetch(`/api/knowledges/${editingKnowledge._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(knowledgeData)
        });
      } else {
        // Create
        await fetch('/api/knowledges', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(knowledgeData)
        });
      }
      
      fetchKnowledges();
      resetForm();
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

  const resetForm = () => {
    setEditingKnowledge(null);
    setFormData({ title: '', definition: '', categories: '' });
  };

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Knowledge Base
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingKnowledge ? 'Edit Knowledge' : 'Add New Knowledge'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Definition</label>
            <textarea
              value={formData.definition}
              onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingKnowledge ? 'Update' : 'Add'} Knowledge
            </button>
            {editingKnowledge && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Knowledge List */}
      <div className="space-y-4">
        {knowledges.map((knowledge) => (
          <KnowledgeCard
            key={knowledge._id}
            knowledge={knowledge}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default KnowledgesPage;