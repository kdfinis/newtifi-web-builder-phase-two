import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WhoWeAre from "./pages/WhoWeAre";
import Membership from "./pages/Membership";
import Connect from "./pages/Connect";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Person from "./pages/Person";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/newtifi-web-builder-phase-two">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/contact" element={<Connect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/person/:name" element={<Person />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
