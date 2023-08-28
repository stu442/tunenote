import { useState } from "react";
import Button from "./components/Button";
import Modal from "./components/Modal";

function App() {

  const [isModalClosed, setIsModalClosed] = useState<boolean>(false);

  function clickPostBtn() {
    setIsModalClosed(true);
  }

  return (
    <div className="App">
      {isModalClosed ? <Modal setIsModalClosed={setIsModalClosed}/> : null }
      <nav className="flex_center space-x-10 py-9">
          <Button innerText="Post" onClick={clickPostBtn} />
          <Button innerText="Download" />
          <Button innerText="Share" />
      </nav>
      <main>
      </main>
    </div>
  );
}

export default App;