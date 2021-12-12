import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TaskDetails from './components/TaskDetails';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, location, path}) => {
      console.log(message)
    })
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4100/graphql" })
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
      <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<App client={client}/>} />
                <Route path="/task-details/:id/:taskId" exact element={<TaskDetails />} />
            </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

