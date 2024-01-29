// import { Controller } from "@hotwired/stimulus"
//
// export default class extends Controller {
//   connect() {
//     this.element.textContent = "Hello World!"
//   }
// }

import { Controller } from "@hotwired/stimulus"
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
export default class extends Controller {
  connect() {
    const root = ReactDOM.createRoot(document.getElementById("app"))
    root.render(
        <App/>
    )
  }
}
