import { Suspense } from "react";
import Results from "./Results";

const SearchPage = () => {
    return (
        <Suspense fallback={<p>Loading search results...</p>}>
            <Results />
        </Suspense>
    )
}

export default SearchPage;