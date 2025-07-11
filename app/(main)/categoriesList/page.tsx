import CategoryList from "../../component/categoryItems/categoryList";
import apiService from "../../services/apiServices";
import { getUserId } from "../../lib/actions";
import { userDetailType } from "../../component/writeReviews/WriteReviews";
const CategoriesListPage = async () => {

 

  return (

    <div>
        <CategoryList  />
    </div>
  );
}

export default CategoriesListPage;