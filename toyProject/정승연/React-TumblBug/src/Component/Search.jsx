import { useState } from "react";

function Search({ setSearchModal }) {
  const [input, setInput] = useState("");
  console.log(input);
  return (
    <div className="z-50 h-screen">
      <div className="w-full border-b-2 p-5">
        <div className="w-2/5 m-0 m-auto flex justify-between items-center">
          <input
            className="w-full border-solid border-black focus:outline-0 text-xl"
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          ></input>
          <div
            className="rounded-full bg-slate-300 w-4 h-4 text-center text-xs content-center text-slate-50 mx-3"
            onClick={() => {
              setInput("");
            }}
          >
            X
          </div>
          <div
            onClick={() => {
              setSearchModal(false);
            }}
          >
            X
          </div>
        </div>
      </div>
      {input !== "" ? <div className="w-2/5 m-0 m-auto">추천검색어</div> : null}
      <div className="w-2/5 m-0 m-auto">{input}</div>
    </div>
  );
}

export default Search;
