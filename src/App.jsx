import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState("8");
  const [numbers, setNumbers] = useState(true);
  const [symbol, setSymbol] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let passContent = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (!numbers) passContent += "0123456789";
    if (!symbol) passContent += "!@#$`~%^&*'|?=+-_;:";

    for (let index = 1; index <= length; index++) {
      let fullPassword = Math.floor(Math.random() * passContent.length + 1);
      pass += passContent.charAt(fullPassword);
    }
    setPassword(pass);
  }, [length, numbers, symbol, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, symbol, passwordGenerator]);
  return (
    <div className="bg-gradient-to-br from-[#354f52] to-[#84a98c] w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center align-middle justify-center text-center px-4 md:px-0">
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
          Generate a Random Password
        </h1>
        <div className="w-full max-w-lg mt-8 bg-gradient-to-br from-[#80b918] to-[#aacc00] rounded-2xl py-10 px-6 md:px-10">
          <div className="flex items-center">
            <input
              type="text"
              readOnly="readonly"
              value={password}
              ref={passwordRef}
              className="w-full md:w-[22rem] h-10 rounded-tl-lg rounded-bl-lg bg-gray-900 text-white text-xl px-4 md:px-10 outline-none border-none"
            />
            <button
              onClick={copyPassword}
              className="bg-violet-700 text-white h-10 text-xl items-center cursor-pointer px-5 rounded-tr-lg rounded-br-lg"
            >
              Copy
            </button>
          </div>
          <div className="space-x-4 flex flex-col md:flex-row justify-center align-middle mt-5">
            <div className="space-x-1">
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="cursor-pointer accent-violet-700"
              />
              <label>Length : {length}</label>
            </div>
            <div className="space-x-1 mt-4 md:mt-0">
              <input
                type="checkbox"
                name="numbers"
                onClick={() => {
                  setNumbers((prev) => !prev);
                }}
                className="bg-white accent-violet-700"
              />
              <label>Numbers</label>
            </div>
            <div className="space-x-1 mt-4 md:mt-0">
              <input
                type="checkbox"
                name="symbol"
                onClick={() => {
                  setSymbol((prev) => !prev);
                }}
                className="bg-white accent-violet-700"
              />
              <label>Symbol</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
