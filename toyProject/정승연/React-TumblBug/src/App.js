import "./App.css";
import Navbar from "./Component/Navbar";
import Carousel from "./Component/Carousel";
import NotableProject from "./Component/NotableProject";
import PopularProject from "./Component/PopularProject";
import Footer from "./Component/Footer";
import { useState } from "react";
import Search from "./Component/Search";
function App() {
  const [searchModal, setSearchModal] = useState(false);
  return (
    <div className="App">
      {searchModal ? (
        <Search setSearchModal={setSearchModal}></Search>
      ) : (
        <>
          <Navbar setSearchModal={setSearchModal}></Navbar>
          <div className="flex justify-center">
            <div className="w-9/12 flex flex-wrap max-[1100px]:flex-col max-[1100px]:w-full">
              <div className=" w-4/6 max-[1100px]:w-full">
                <Carousel></Carousel>
                <NotableProject></NotableProject>
              </div>
              <div className="w-2/6 max-[1100px]:w-full">
                <PopularProject></PopularProject>
              </div>
            </div>
          </div>
          <div className="w-full border-t-2">
            <div className="w-9/12 m-0 m-auto">
              <Footer></Footer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
