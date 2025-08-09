import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import Home from "../pages/Home";
import  NewMovies  from "../pages/NewMovies";
import { Popular } from "../pages/Popular";
import { Search } from "../pages/Search";
import MovieDetail from "../pages/MovieDetail";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

const Router = () => {

  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/new-movies" element={<NewMovies />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />

        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default Router
