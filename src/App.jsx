import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import Layout from "./ui/Layout";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sprawdź, czy jest zapisana pozycja scrolla
    const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);

    if (savedPosition) {
      // Odtwórz poprzednią pozycję
      window.scrollTo(0, parseInt(savedPosition, 10));
    } else {
      // Przy zwykłej nawigacji przewiń do góry
      window.scrollTo(0, 0);
    }

    // Zapisz pozycję scrolla przy opuszczaniu strony
    return () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY);
    };
  }, [pathname]);

  return null;
}

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
