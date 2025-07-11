import Image from 'next/image';
import apiService from '../services/apiServices';
import CompanyDetail from './CompanyDetail';
import { companyType } from '../(main)/categories/[name]/page';
import Link from 'next/link';

const FeatureCompany = async () => {
  const bestRatedBanks = await apiService.get('company/best_rated_banks/');
  const bestRatedHospitals = await apiService.get('company/best_rated_hospitals/');

  return (
    <div className="2xl:px-72 xl:px-48 lg:px-32 md:px-12 px-6 py-12">
      {/* Best Rated Hospitals */}
      <div className="flex border border-primary justify-between p-3">
        <p>Best Rated Hospitals in Ethiopia</p>
        <Link href={`categories/Hospitals`} className="cursor-pointer text-primary">
          See more
        </Link>
      </div>
      <div className="mt-4 grid xl-custom:grid-cols-3 md:grid-cols-2 gap-4">
        {bestRatedHospitals.map((bestRatedHospital: companyType, index: any) => (
          <CompanyDetail key={index} bestRatedCompnay={bestRatedHospital} />
        ))}
      </div>

      {/* Best Rated Banks */}
      <div className="flex border border-primary mt-10 justify-between p-3">
        <p>Best Rated Banks in Ethiopia</p>
        <Link href={`categories/Bank`} className="cursor-pointer text-primary">
          See more
        </Link>
      </div>
      <div className="mt-4 grid xl-custom:grid-cols-3 lg:grid-cols-2 gap-4">
        {bestRatedBanks.map((bestRatedBank: companyType, index: any) => (
          <CompanyDetail key={index} bestRatedCompnay={bestRatedBank} />
        ))}
      </div>
    </div>
  );
};

export default FeatureCompany;