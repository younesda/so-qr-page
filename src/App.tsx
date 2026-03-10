import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicBusinessPage from "@/pages/PublicBusinessPage";
import NotFound from "@/pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicBusinessPage />} />
        <Route path="/p/:slug" element={<PublicBusinessPage />} />
        <Route path="/company/:slug" element={<PublicBusinessPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
