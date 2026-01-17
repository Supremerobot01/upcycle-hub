import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

// Layouts
import PortalLayout from "./layouts/PortalLayout";
import DisplayLayout from "./layouts/DisplayLayout";
import DictionaryLayout from "./layouts/DictionaryLayout";

// Portal pages
import Login from "./pages/portal/Login";
import Signup from "./pages/portal/Signup";
import Dashboard from "./pages/portal/Dashboard";
import BrandsList from "./pages/portal/BrandsList";
import BrandNew from "./pages/portal/BrandNew";
import BrandEdit from "./pages/portal/BrandEdit";
import DictionaryList from "./pages/portal/DictionaryList";
import DictionaryEdit from "./pages/portal/DictionaryEdit";
import CategoriesList from "./pages/portal/CategoriesList";
import CategoryEdit from "./pages/portal/CategoryEdit";
import AdminPanel from "./pages/portal/AdminPanel";

// Display pages
import DisplayHome from "./pages/display/DisplayHome";
import DisplayCategory from "./pages/display/DisplayCategory";
import DisplayEntry from "./pages/display/DisplayEntry";
import DisplayIdle from "./pages/display/DisplayIdle";

// Dictionary pages
import DictionaryHome from "./pages/dictionary/DictionaryHome";
import DictionaryCategory from "./pages/dictionary/DictionaryCategory";
import DictionaryEntry from "./pages/DictionaryEntry";

// Other pages
import Remote from "./pages/Remote";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/dictionary" replace />} />

            {/* Portal routes (PRIVATE) */}
            <Route path="/portal/login" element={<Login />} />
            <Route path="/portal/signup" element={<Signup />} />
            <Route path="/portal" element={<PortalLayout />}>
              <Route index element={<Navigate to="/portal/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="brands" element={<BrandsList />} />
              <Route path="brands/new" element={<BrandNew />} />
              <Route path="brands/edit/:brandId" element={<BrandEdit />} />
              <Route path="dictionary" element={<DictionaryList />} />
              <Route path="dictionary/new" element={<DictionaryEdit />} />
              <Route path="dictionary/edit/:entryId" element={<DictionaryEdit />} />
              <Route path="categories" element={<CategoriesList />} />
              <Route path="categories/new" element={<CategoryEdit />} />
              <Route path="categories/edit/:categoryId" element={<CategoryEdit />} />
              <Route path="admin" element={<AdminPanel />} />
            </Route>

            {/* Display routes (PUBLIC, READ-ONLY) */}
            <Route path="/display" element={<DisplayLayout />}>
              <Route index element={<DisplayHome />} />
              <Route path="categories/:categoryId" element={<DisplayCategory />} />
              <Route path="entry/:entryId" element={<DisplayEntry />} />
              <Route path="idle" element={<DisplayIdle />} />
            </Route>
            <Route path="/remote" element={<Remote />} />

            {/* Dictionary routes (PUBLIC, READ-ONLY) */}
            <Route path="/dictionary" element={<DictionaryLayout />}>
              <Route index element={<DictionaryHome />} />
              <Route path="categories/:categoryId" element={<DictionaryCategory />} />
              <Route path="entry/:slug" element={<DictionaryEntry />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
