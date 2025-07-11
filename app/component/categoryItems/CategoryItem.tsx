import Image from "next/image";
import Link from "next/link";
import { categoryType } from "./categoryList";

interface CategoryItemProps {
  sector: string;
  categories: categoryType[];
}

const CategoryItem: React.FC<CategoryItemProps> =  ({ sector, categories }) => {
  const category_icon = categories[0].icon_url;
  console.log(category_icon)
  return (
    <div className="border border-primary rounded-xl">
      <div className="bg-primary-100 rounded-xl flex flex-col items-center text-center w-full p-4">
        <Image className="mb-3" src={category_icon} alt="icon" width={60} height={60} />
        <p className="font-bold text-xl">{sector}</p>
      </div>
      <div className="p-3 flex flex-col space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="p-2">
            <Link href={`categories/${category.name}`} className="font-bold hover:underline">
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItem;
