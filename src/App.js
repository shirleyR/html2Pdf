/*global chrome*/
import React, {useRef} from 'react';
import './App.css';
import jsPDF from 'jspdf';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  // var blob = new Blob(["array of"], {type: "text/plain"});
  // var url =URL.createObjectURL(blob);
  // chrome.downloads.download({
  //   url: url
  // })

  var doc = new jsPDF();
  doc.fromHTML(message.data, 400,500,{
    'width': 170
  });
  doc.save('two-by-four.pdf')
});

function InputApp() {
  const inputEl = useRef(null);
  const onButtonClick = ()=> {
    console.log("Popup DOM fully loaded and parsed");
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const tab = tabs[0];
        console.log(tab.id);
        chrome.tabs.sendMessage(tab.id, {text:  inputEl.current.value});
    });
  }
  return (
    <div className="App">
        <input ref={inputEl} type="text"/>
        <button onClick={onButtonClick}> Focus the input</button>
        <p>
          {/* <TrafficContainer traffic={this.state.traffic}/> */}
        </p>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
      <label> Input</label>
      <InputApp ></InputApp>
      </>
    )
  }
}

export default App;
