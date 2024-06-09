import { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";
import {
  PrivateLayout,
  Home,
  Profile,
  Purchase,
  MovieTrailer,
  PageNotFound,
  SupplierPage,
  MovieHistory,
  FAQS,
  CharteDonnées,
  AboutUs

} from "@/pages";
import { MovieGuard, InverseMovieGuard } from "@/guards/MovieGuard";
import { SupplierGuard } from "@/guards/SupplierGuard";
import SearchResults from "@/pages/search-by-name/SearchResults";
import TagsResults from "@/pages/search-by-tags/TagsResults";


const PrivateRouter: FunctionComponent = () => {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie-history" element={<MovieHistory />} /> 
        <Route
          path="/purchase/:id"
          element={
            <InverseMovieGuard>
              <Purchase />
            </InverseMovieGuard>
          }
        />
        <Route
          path="/movie-trailer/:id"
          element={
            <MovieGuard>
              <MovieTrailer />
            </MovieGuard>
          }
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/tags" element={<TagsResults />} />
        <Route
          path="/supplier"
          element={
            <SupplierGuard>
              <SupplierPage />
            </SupplierGuard>
          }
        />
        
        <Route path="*" element={<PageNotFound />} />
        <Route path="/charteDonnées" element={<CharteDonnées />} />
        <Route path= "/FAQS" element={<FAQS />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Route>
    </Routes>
  );
};

export default PrivateRouter;
