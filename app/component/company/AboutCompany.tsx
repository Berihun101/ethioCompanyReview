import Link from "next/link"
import Image from 'next/image';
import { companyType } from "@/app/categories/[name]/page";

interface AboutCompanyProps {
    company: companyType;
}
const AboutCompany:React.FC<AboutCompanyProps> = ({company}) => {

    return (
      <div className="lg:flex border border-primary rounded-xl p-4 col-span-1 hidden flex-col mt-6 bg-white space-y-4">
            
                 <p className="mt-2">About the Company</p>

                 <div className="object-cover relative aspect-square overflow-hidden w-48 h-48">
                    <Image src={`http://localhost:8000${company.logo}`} alt="1" fill className="object-cover w-full h-full" />

                 </div>

                 <div className="border-t border-gray-400 ">
                    <p className="mt-2 font-bold">{company.name}</p>
                    <p className="text-gray-700">
                     {company.description}
                    </p>
                 </div>

                 <div className="border-t border-gray-400 ">
                    <p className="mt-2 font-bold">Contact</p>
                    <div className="flex space-x-4">
                        <p className="text-primary">Email:</p>
                        <p className="text-primary">{company.email}</p>

                    </div>
                    <div className="flex space-x-4">
                        <p className="text-primary">Phone:</p>
                        <p className="text-primary">{company.phone}</p>

                    </div>
                 </div>
                 
                 
          </div>
    );
  }
  
  export default AboutCompany;