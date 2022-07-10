import React from "react"
import ReactDOM from "react-dom"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import App from "./App"
import "./index.css"
import reportWebVitals from "./reportWebVitals"

if (process.env.NODE_ENV !== "development") {
  console.log = () => {}
}

const client = new ApolloClient({
  uri: "https://us-central1-digitaleyes-prod.cloudfunctions.net/go-digitaleyes-backend-gql",
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
