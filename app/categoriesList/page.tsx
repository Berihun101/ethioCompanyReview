import CategoryList from "../component/categoryItems/categoryList";
import apiService from "../services/apiServices";
import { getUserId } from "../lib/actions";
import { userDetailType } from "../component/writeReviews/WriteReviews";
const CategoriesListPage = async () => {

  let userDetail: userDetailType | null = null;

    try {
        const userId = await getUserId();
        if (userId) {
            userDetail = await apiService.get(`auth/${userId}`);
        }
    } catch (error) {
        console.error("Failed to fetch user details:", error);
    }

  return (

    <div>
        <CategoryList userDetail={userDetail} />
    </div>
  );
}

export default CategoriesListPage;