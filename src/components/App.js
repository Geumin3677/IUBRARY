import Main from "./Main"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlbumPage from "./AlbumPage";
import NotFound from "./NotFound";
import AlbumDetail from "./AlbumDetail";
import SongDetail from "./Song";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/Albums" element={<AlbumPage />}></Route>
				<Route path="/product/*" element={<NotFound />}></Route>
				<Route path="*" element={<NotFound />}></Route>
        <Route path="/Album/:AlbumName" element={<AlbumDetail />}></Route>
        <Route path="/Album/:AlbumName/:SongName" element={<SongDetail />}></Route>
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;
