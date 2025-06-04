"use client";
import Navbar from "../Navbar";
import CategoryItem from "./CategoryItem";
import styles from "./categoryList.module.css";
import { useState, useEffect } from "react";
import apiService from "@/app/services/apiServices";
import { userDetailType } from "../writeReviews/WriteReviews";

import Link from "next/link";

export type categoryType = {
    id: number;
  name: string;
  sector: string;
  icon: string;
};

interface CategoryListProps {
  userDetail: userDetailType | null;
}

const CategoryList: React.FC<CategoryListProps> = ({ userDetail }) => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [searchedCategories, setSearchedCategories] = useState<categoryType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  // Fetch categories based on the search input
  useEffect(() => {
    const fetchCategories = async () => {
      if (debouncedSearchText.trim() === "") {
        setSearchedCategories([]);
        return;
      }

      setLoading(true);
      try {
        const response = await apiService.get(
          `/category/search_category?query=${debouncedSearchText}`
        );
        setSearchedCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [debouncedSearchText]);

  // Fetch all categories
  const getCategories = async () => {
    const url = "category/category_list/";
    try {
      const category = await apiService.get(url);
      setCategories(category);
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };

  // Group categories by sector
  const groupBySector = (categories: categoryType[]) => {
    return categories.reduce((grouped: Record<string, categoryType[]>, category) => {
      grouped[category.sector] = grouped[category.sector] || [];
      grouped[category.sector].push(category);
      return grouped;
    }, {});
  };

  // Fetch all categories on component mount
  useEffect(() => {
    getCategories();
  }, []);

  const groupedCategories = groupBySector(categories);

  return (
    <>
      <Navbar userDetail={userDetail}   />

      <div className="px-12 py-24 text-center bg-primary-300 w-full">
        <h1 className="text-3xl font-bold">What are you looking for?</h1>
        <input
          placeholder="search category"
          className="p-3 md:w-[500px] w-[400px] mt-4 border border-primary rounded-xl"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label="search category"
        />
        {debouncedSearchText && (
          <div className="bg-white mt-2 box-shadow-xl p-4 max-w-md mx-auto">
            {loading ? (
              <p className="text-black">Loading...</p>
            ) : searchedCategories.length > 0 ? (
              <ul className="text-left text-black">
                {searchedCategories.map((category) => (
                  <li key={category.id} className="p-2 border-b border-primary">
                    <Link className="hover:text-primary" href={`/categories/${category.name}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-black">No results found.</p>
            )}
          </div>
        )}
      </div>

      <div className="2xl:px-96 xl:px-48 lg:px-32 md:px-12 px-6 py-12">
        <h2 className="font-bold text-primary text-center mb-9">
          Explore the categories in different sectors
        </h2>
        <div
          className="grid xl:grid-cols-3 md:grid-cols-2 gap-9 auto-rows-auto"
          style={{ gridAutoFlow: "dense" }}
        >
          {Object.entries(groupedCategories).map(([sector, sectorCategories], index) => (
            <div key={index}>
              <CategoryItem sector={sector} categories={sectorCategories} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
