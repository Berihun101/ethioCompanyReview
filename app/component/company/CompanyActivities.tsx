import Link from "next/link"

const CompanyActivities = () => {
    return (
      <div className="lg:flex col-span-1 hidden flex-col  space-y-6">
          <div className="border border-primary rounded-xl p-4">
             <p className="mt-2">Company Activities</p>
             <div className="flex mt-4 border-t border-t-3 py-4 flex-col space-y-3">
             <Link href='' className="flex justify-between">
                <p>Insuranse Company</p>
                  <p>400</p>
  
             </Link>
             <Link href='' className="flex justify-between">
                <p>Universities</p>
                  <p>300</p>
                  
             </Link>
             <Link href='' className="flex justify-between">
                <p>Hotels</p>
                 <p>12000</p>
                  
             </Link>
             <Link href='' className="flex justify-between">
                <p>Resturants</p>
                    <p>12000</p>
                  
             </Link>
             <Link href='' className="flex justify-between">
                <p>Amusment parks</p>
                    <p>12000</p>
                  
             </Link>
             </div>

             
  
          </div>
          </div>
    );
  }
  
  export default CompanyActivities;