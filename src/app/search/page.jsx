import { Suspense } from "react";
import Results from "./Results";
import PostListSkeleton from "@/components/helper/PostListSkeleton";

const SearchPage = () => {
    return (
        <Suspense fallback={<div className="loader"></div>}>
            <Results />
        </Suspense>
    )
}

export default SearchPage;