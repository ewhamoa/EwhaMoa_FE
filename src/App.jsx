import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <img src="https://cf-ea.everytime.kr/attach_thumbnail/794/65883227/everytime-1710061011403.jpg?Expires=1710062501&amp;Key-Pair-Id=APKAICU6XZKH23IGASFA&amp;Signature=MxIbZMpUgBAO8QcxqElRNGoKum8IjfmqabV-Gaqc9Sp23D-TC9dS~KrL12kUjdpUaIZasY4bD2TPnOlsIzpFPDX7LUg-e9LbsE1HG40VH-f2qSu7AogmBIs-U5EjBWup-FwdtF6~-jXMCwSzA~A9M~v5NuWFbU5i0H2IRLhaK8HoZxcrsjtpHzQT-Pl6nm9B1iBEprE6jZ4ORX81~PKFry5zKW8ZIH5nWLiodsKU4gzCMyUvDn2e2O3PnxXS8PXRhms3ElYwGOs8Q6cRZ5bP4kA-nXxVhRoTnX9KGe0dD2zeDBm4n2Xt3WPAL9RicLCOhfc4oGi~EJ2BoFSNW6EyXw__" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
