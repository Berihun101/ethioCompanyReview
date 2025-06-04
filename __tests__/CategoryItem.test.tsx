import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import CategoryItem from '@/app/component/categoryItems/CategoryItem';
import { categoryType } from '@/app/component/categoryItems/categoryList';

test('renders category item', () => {
  // Mock props
  const mockCategories: categoryType[] = [
    { id: 1, name: 'Fast Food', sector: 'Food & Beverages', icon: '/icons/fast-food.png' },
    { id: 2, name: 'Restaurants', sector: 'Food & Beverages', icon: '/icons/restaurant.png' },
  ];
  const mockSector = 'Food & Beverages';

  render(<CategoryItem sector={mockSector} categories={mockCategories} />);

  // Check if the sector is rendered
  const sectorElement = screen.getByText(/food & beverages/i);
  expect(sectorElement).toBeInTheDocument();

  // Check if the categories are rendered
  const categoryElements = screen.getAllByRole('link');
  expect(categoryElements).toHaveLength(mockCategories.length);
  expect(categoryElements[0]).toHaveTextContent('Fast Food');
});
