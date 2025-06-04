"use client"
import Link from "next/link"
import apiService from "@/app/services/apiServices";
import { useEffect, useState } from "react";
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenuBadge,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
 } from "@/components/ui/sidebar"
  

interface RelatedCompanyProps {
   company_sector: string;
}

const RelatedCompany:React.FC<RelatedCompanyProps> = ({company_sector}) => {
   const [related_categories, setRelatedCategories] = useState<any[]>([]);

   useEffect(() => {
      const fetchRelatedCategories = async () => {
         const related_categories = await apiService.get(`category/related_categories/${company_sector}`);
         setRelatedCategories(related_categories);
      }
      fetchRelatedCategories();
   }, [company_sector]);
   
    return (
      <div className="lg:flex col-span-1 hidden flex-col  space-y-6">
          <div className="border border-primary rounded-xl p-4">
             <p className="mt-2">Related Categories</p>
             <div className="flex mt-4 border-t border-t-3 py-4 flex-col space-y-3">
               {related_categories.map((related_category:any, index:any) => (
                   <Link href={`/categories/${related_category.name}/`} className="flex justify-between" key={index}>
                      <p>{related_category.name}</p>
                      <p>{related_category.count}</p>
                     </Link>
               ))}
            
             </div>
             
           

             
  
          </div>
          </div>
    );
  }
  
  export default RelatedCompany;