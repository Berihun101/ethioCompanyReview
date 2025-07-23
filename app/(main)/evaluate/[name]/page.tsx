import apiService from "@/app/services/apiServices";
import { getUserId } from "@/app/lib/actions";
import ReviewComponent from "@/app/component/ReviewComponent/ReviewComponent";

type PageParams = Promise<{ name: string }>;
type PageSearchParams = Promise<{ id: string }>;

interface PageProps {
  params: PageParams;
  searchParams: PageSearchParams;
}

const EvaluatePage = async ({ params, searchParams }: PageProps) => {
    // Await the promises to get the actual values
    const awaitedParams = await params;
    const awaitedSearchParams = await searchParams;
    
    const id = awaitedSearchParams.id;
    const userId = await getUserId();

    let userDetail = null;

    try {
        if (userId) {
            userDetail = await apiService.get(`auth/${userId}`);
        }
    } catch (error) {
        console.error("Failed to fetch user details:", error);
    }

    const company = await apiService.get(`company/company_detail/${id}/`);

    return (
        <>
            <ReviewComponent userId={userId} userDetail={userDetail} company={company} />
        </>
    );
};

export default EvaluatePage;