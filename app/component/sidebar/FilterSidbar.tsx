import FilterItem from "../filterItem/FilterItem";

interface FilterSidebarProps {
  setFilter3Plus: (filterState: boolean) => void;
  company_sector: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ setFilter3Plus, company_sector }) => {
  return (
    <div>
      <FilterItem company_sector={company_sector} setFilter3Plus={setFilter3Plus} />
    </div>
  );
};

export default FilterSidebar;
