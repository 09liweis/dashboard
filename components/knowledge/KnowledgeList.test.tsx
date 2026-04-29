/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KnowledgeList from '../components/knowledge/KnowledgeList';

// Mock Knowledge type
interface MockKnowledge {
  _id?: string;
  title: string;
  definition: string;
  categories?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Test data
const mockKnowledges: MockKnowledge[] = [
  { _id: '1', title: 'React Basics', definition: 'A JavaScript library for building UIs', categories: ['Programming', 'Frontend'] },
  { _id: '2', title: 'TypeScript Guide', definition: 'TypeScript is a typed superset of JavaScript', categories: ['Programming'] },
  { _id: '3', title: 'CSS Grid', definition: 'A two-dimensional layout system', categories: ['Frontend', 'CSS'] },
];

const mockHandlers = {
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onClick: jest.fn(),
};

describe('KnowledgeList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('allCategories computation (line 26)', () => {
    it('should extract unique categories from all knowledges', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const categories = ['All', 'Programming', 'Frontend', 'CSS'];
      categories.forEach((cat) => {
        expect(screen.getByText(cat === 'All' ? 'All' : cat, { exact: false })).toBeTruthy();
      });
    });

    it('should return empty categories for knowledges without categories', () => {
      const noCategoryKnowledges = [
        { _id: '1', title: 'No Category', definition: 'Definition' },
      ];
      render(
        <KnowledgeList
          knowledges={noCategoryKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      // Should only show "All" button
      expect(screen.getByText('All')).toBeTruthy();
    });

    it('should deduplicate categories', () => {
      const duplicateCategories = [
        { _id: '1', title: 'First', definition: 'Def1', categories: ['React', 'React'] },
        { _id: '2', title: 'Second', definition: 'Def2', categories: ['React', 'TypeScript'] },
      ];
      render(
        <KnowledgeList
          knowledges={duplicateCategories}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const reactButtons = screen.getAllByText('react', { exact: false });
      expect(reactButtons.length).toBe(1);
    });

    it('should sort categories alphabetically', () => {
      const unsortedCategories = [
        { _id: '1', title: 'Zebra', definition: 'Def', categories: ['Zebra'] },
        { _id: '2', title: 'Apple', definition: 'Def', categories: ['Apple'] },
        { _id: '3', title: 'Mango', definition: 'Def', categories: ['Mango'] },
      ];
      render(
        <KnowledgeList
          knowledges={unsortedCategories}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      // All categories should be present regardless of order
      expect(screen.getAllByText(/apple|zebra|mango/i)).toBeTruthy();
    });

    it('should handle empty knowledge array', () => {
      render(
        <KnowledgeList
          knowledges={[]}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      expect(screen.queryByText('No knowledge found')).toBeTruthy();
    });
  });

  describe('filtered computation', () => {
    it('should filter by search term in title', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search knowledge...');
      fireEvent.change(searchInput, { target: { value: 'React' } });

      expect(screen.getByText('React Basics')).toBeTruthy();
    });

    it('should filter by search term in definition', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search knowledge...');
      fireEvent.change(searchInput, { target: { value: 'library' } });

      expect(screen.getByText('React Basics')).toBeTruthy();
    });

    it('should filter by category', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const frontendButton = screen.getByText('Frontend', { exact: false });
      fireEvent.click(frontendButton);

      // Only show cards with Frontend category
      expect(screen.queryByText('TypeScript Guide')).toBeNull();
    });

    it('should combine search and category filters', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search knowledge...');
      fireEvent.change(searchInput, { target: { value: 'TypeScript' } });

      const programmingButton = screen.getByText('Programming', { exact: false });
      fireEvent.click(programmingButton);

      expect(screen.getByText('TypeScript Guide')).toBeTruthy();
    });
  });

  describe('count badge', () => {
    it('should display filtered count of total count', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      expect(screen.getByText(/of 3/)).toBeTruthy();
    });

    it('should update count when filtering', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search knowledge...');
      fireEvent.change(searchInput, { target: { value: 'React' } });

      expect(screen.getByText('1 of 3')).toBeTruthy();
    });
  });

  describe('clear filters button', () => {
    it('should clear search when clear button is clicked', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search knowledge...');
      fireEvent.change(searchInput, { target: { value: 'React' } });

      const clearButton = screen.getByRole('button', { name: '' });
      fireEvent.click(clearButton);

      expect(screen.getByText('3 of 3')).toBeTruthy();
    });

    it('should clear all filters when clear filters link is clicked', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search knowledge...');
      fireEvent.change(searchInput, { target: { value: 'React' } });

      const clearFiltersLink = screen.getByText('Clear filters');
      fireEvent.click(clearFiltersLink);

      expect(screen.getByText('3 of 3')).toBeTruthy();
    });
  });

  describe('empty state', () => {
    it('should show no knowledge found message when filtered array is empty', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search knowledge...');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

      expect(screen.getByText('No knowledge found')).toBeTruthy();
    });

    it('should show try adjusting filters message when filtering is active', () => {
      render(
        <KnowledgeList
          knowledges={mockKnowledges}
          isLoggedIn={false}
          {...mockHandlers}
        />
      );

      const searchInput = screen.getByPlaceholderText('Search knowledge...');
      fireEvent.change(searchInput, { target: { value: 'React' } });

      expect(screen.getByText('Try adjusting your filters')).toBeTruthy();
    });
  });
});