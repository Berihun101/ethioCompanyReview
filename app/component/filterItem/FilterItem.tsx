import React from 'react';
import RelatedCompany from './RelatedCompany';

interface FilterItemProps {
  setFilter3Plus: (filterState: boolean) => void;
  company_sector: string;
}

const FilterItem: React.FC<FilterItemProps> = ({ setFilter3Plus, company_sector }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter3Plus(e.target.checked); // Update the filter state when the checkbox is clicked
  };

  return (
    <div className="lg:flex col-span-1 hidden flex-col space-y-6">
      <div className="border border-primary rounded-xl p-4">
        <p className="mt-2">Filter</p>
        <div className="flex mt-4 border-t border-t-3 py-4 flex-col space-y-3">
          <div className="flex justify-between">
            <p>Verified</p>
            <input className="w-4" type="checkbox" />
          </div>
          <div className="flex justify-between">
            <p>Unverified</p>
            <input className="w-4" type="checkbox" />
          </div>
        </div>
        <div className="border border-primary flex w-full">
       

          <div
            className="flex-1 border-r border-primary flex justify-center items-center hover:bg-primary-200 cursor-pointer"
            onClick={() => setFilter3Plus(false)} // When clicking on "All"
          >
            
            <p className="text-center">All</p>
          </div>

          <div
            className="flex-1 border-r border-primary flex justify-center items-center hover:bg-primary-200 cursor-pointer"
            onClick={() => setFilter3Plus(true)} // When clicking on "3+"
          >
            <p className="text-center">⭐️</p>
            <p className="text-center">3+</p>
          </div>
        </div>
      </div>
      <RelatedCompany company_sector={company_sector} />
    </div>
  );
};

export default FilterItem;
