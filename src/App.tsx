import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AdvisorsPage } from "./pages/AdvisorsPage";
import { AdvisorDetailPage } from "./pages/AdvisorDetailPage";
import { WisdomFeedPage } from "./pages/WisdomFeedPage";
import { ConversationsPage } from "./pages/ConversationsPage";
import { JourneyPage } from "./pages/JourneyPage";
import { VoiceCallPage } from "./pages/VoiceCallPage";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/advisors" element={<AdvisorsPage />} />
        <Route path="/advisor/voice/:id" element={<VoiceCallPage />} />
        <Route path="/advisor/:id" element={<AdvisorDetailPage />} />
        <Route path="/wisdom" element={<WisdomFeedPage />} />
        <Route path="/conversations" element={<ConversationsPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
