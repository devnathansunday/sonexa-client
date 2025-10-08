import { Suspense } from "react";
import Results from "./Results";

const SearchPage = () => {
    return (
        <Suspense fallback={<p className="text-xs text-my-muted-text">...</p>}>
            <Results />
        </Suspense>
    )
}

export default SearchPage;