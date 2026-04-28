import { Knowledge } from 'types';

interface KnowledgeFormModalProps {
  isOpen: boolean;
  editingKnowledge: Knowledge | null;
  formData: {
    title: string;
    definition: string;
    categories: string;
  };
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: { title?: string; definition?: string; categories?: string }) => void;
}

export default function KnowledgeFormModal({
  isOpen,
  editingKnowledge,
  formData,
  onClose,
  onSubmit,
  onChange,
}: KnowledgeFormModalProps) {
  if (!isOpen) return null;

  return (
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
            onClick={onClose}
            className="rounded-full cursor-pointer bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => onChange({ title: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Definition</label>
            <textarea
              value={formData.definition}
              onChange={(e) => onChange({ definition: e.target.value })}
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
              onChange={(e) => onChange({ categories: e.target.value })}
              placeholder="e.g. Programming, JavaScript, Web Development"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
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
  );
}
