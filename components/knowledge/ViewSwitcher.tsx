interface ViewSwitcherProps {
  viewMode: 'random' | 'list';
  onChange: (mode: 'random' | 'list') => void;
}

export default function ViewSwitcher({ viewMode, onChange }: ViewSwitcherProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        type="button"
        onClick={() => onChange('random')}
        className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-colors ${
          viewMode === 'random'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Random
      </button>
      <button
        type="button"
        onClick={() => onChange('list')}
        className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-colors ${
          viewMode === 'list'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        List
      </button>
    </div>
  );
}
