import Image from "next/image";
import { reviewCommentType } from "./review/Review";
interface RecentUserActivityProps {
    userComments: reviewCommentType[];
}


const RecentUserActivity:React.FC<RecentUserActivityProps> = ({userComments}) => {
    return (
        <div className="md:px-64 px-12 mt-6 bg-white">
            <div className="rounded-lg border-2 border-primary-100 p-2">
            <h2>Recent User Activity</h2>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {userComments.map((comment) => (
                   <div className="flex gap-2 p-2 bg-primary-100 rounded-lg">
                   <div className="rounded-full relative overflow-hidden w-12 h-12 ">
                              {/* Main Image */}
                              <Image
                                  fill
                                  className="rounded-full"
                                  src="/item1.jpg"
                                  alt="Profile"
                              />
                              
                              </div>
                              <div className="flex flex-col">
                                  <p className="text-gray-500"><span className="font-bold">Bob</span> liked your <span className="font-bold">comment</span> on</p>
                                  <p className="text-gray-500"> 2 weeks ago</p>

                              </div>

              </div>
                ))}
               
                <div className="flex gap-2 p-2 bg-primary-100 rounded-lg">
                     <div className="rounded-full relative overflow-hidden w-12 h-12 ">
                                {/* Main Image */}
                                <Image
                                    fill
                                    className="rounded-full"
                                    src="/item1.jpg"
                                    alt="Profile"
                                />
                                
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-500"><span className="font-bold">Bob</span> liked your <span className="font-bold">comment</span> on</p>
                                    <p className="text-gray-500"> 2 weeks ago</p>

                                </div>

                </div>

            </div>
        
          

                        
                

        </div>
    );
    }
export default RecentUserActivity;