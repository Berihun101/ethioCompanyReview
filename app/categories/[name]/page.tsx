"use client"
import Navbar from "@/app/component/Navbar";
import FilterSidebar from "@/app/component/sidebar/FilterSidbar";
import CompanyItem from "@/app/component/company/CompanyItem";

import { useState, useEffect } from "react";
import apiService from "@/app/services/apiServices";
import { getUserId } from "@/app/lib/actions";
import { userDetailType } from "@/app/component/writeReviews/WriteReviews";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
export type companyType = {
    id: number,
    name: string,
    category: {
        id: number,
        name: string,
        sector: string
    },
    description: string,
    location: string,
    phone: string,
    email: string,
    website: string,
    logo: string,
    average_rating: number,
}

const CategoryPage =  () => {
  const [companies, setCompanies] = useState<companyType[]>([]);
  const [filter3Plus, setFilter3Plus] = useState<boolean>(false); // Track the filter state
  const { name } = useParams();
  const [userDetail, setUserDetail] = useState<userDetailType | null>(null);

  const company_count = companies.length;
  const company_category = companies[0]?.category.name;
  const company_sector = companies[0]?.category.sector;

  // Fetch companies initially
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiService.get(`company/category_company/${name}`);
        setCompanies(response);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };
    fetchCompanies();
  }, [name]);

  // Filter companies based on "3+" rating
  useEffect(() => {
    if (filter3Plus) {
      setCompanies(prevCompanies =>
        prevCompanies.filter(company => company.average_rating > 3)
      );
    } else {
      // Fetch all companies again if the filter is off
      const fetchCompanies = async () => {
        try {
          const response = await apiService.get(`company/category_company/${name}`);
          setCompanies(response);
        } catch (error) {
          console.error("Failed to fetch companies:", error);
        }
      };
      fetchCompanies();
    }
  }, [filter3Plus, name]);

  // User details


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = await getUserId();
        if (userId) {
          const response = await apiService.get(`auth/${userId}`);
          setUserDetail(response);
        }
      } catch (error) {
        console.log("You are not logged in");
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div>
      <Navbar userDetail={userDetail}  />

      <div className="p-4 mt-6 text-center">
        <h1 className="text-5xl font-bold">Here are the best rated in Ethiopa</h1>
        <p className="text-lg">This list of category is based on the review given in this site </p>
      </div>

      <div className="mt-6 flex justify-between 2xl:px-72 xl:px-32 lg:px-12 md:px-6 px-4 py-3">
        <p>{company_count} {company_category} found</p>
       
        <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="Rating">Rating</SelectItem>
          <SelectItem value="Popularity">Popularity</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>

      <div className="grid mt-4 md:grid-cols-4 gap-12 2xl:px-72 xl:px-32 lg:px-12 md:px-6 px-4 px-6">
        <FilterSidebar company_sector={company_sector} setFilter3Plus={setFilter3Plus} />
        <div className={`lg:col-span-3 col-span-4 p-3 rounded-xl border ${companies.length === 0&& 'flex items-center w-full'}`}>
          {companies.map((company: companyType, index: any) => (
            <CompanyItem key={index} company={company} />
          ))}
          
          {companies.length === 0 && (
            <div className=" w-full text-xl">
              <p className="text-center">No companies found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;