"use client";

import { useState, useEffect } from "react";
import apiService from "@/app/services/apiServices";
import { companyType } from "../(main)/categories/[name]/page";
import Link from "next/link";

const Hero = () => {
  const [searchText, setSearchText] = useState("");
  const [companies, setCompanies] = useState<companyType[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce state
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300); // Adjust debounce delay as needed

    return () => clearTimeout(handler);
  }, [searchText]);

  // Fetch companies when debouncedSearchText changes
  useEffect(() => {
    if (debouncedSearchText.trim() === "") {
      setCompanies([]);
      return;
    }

    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/review/search_companies?query=${debouncedSearchText}`
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [debouncedSearchText]);

  return (
    <div
      className="w-full relative bg-cover bg-center h-[600px]"
      style={{ backgroundImage: 'url(/hero2.jpg)' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>

      {/* Content */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white z-10">
          {/* Headline */}
          <h1 className="text-4xl font-bold">Help people to choose the Right one</h1>
          <p className="text-lg mt-2 mb-4">Find the best companies in Ethiopia</p>

          {/* Search Input */}
          <div className="relative mt-4 w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for companies"
              className="w-full p-4 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-label="Search for companies"
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full p-2"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.1-4.65A7 7 0 1111 4a7 7 0 016.75 8.75z"
                />
              </svg>
            </button>
          </div>

          {/* Render search results */}
          {debouncedSearchText && (
            <div className=" bg-white mt-2 box-shadow-xl p-4 max-w-md mx-auto">
              {loading ? (
                <p className="text-black">Loading...</p>
              ) : companies.length > 0 ? (
                <ul className="text-left text-black">
                  {companies.map((company) => (
                    <li key={company.id} className="p-2 border-b border-primary">
                      <Link className="hover:text-primary" href={`/review/${encodeURIComponent(company.name)}?id=${company.id}`}>
                      {company.name}
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
      </div>
    </div>
  );
};

export default Hero;
