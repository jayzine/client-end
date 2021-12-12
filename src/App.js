import React from 'react';
import './App.css';
// import {
//   ApolloClient,
//   ApolloProvider,
//   InMemoryCache
// } from '@apollo/client';
import Menu from './components/Menu';

// const client = new ApolloClient({
//   uri: "http://localhost:4100/graphql",
//   cache: new InMemoryCache()
// })

function App(props) {
  return (
    <div>
      <h2>Launch Schedule</h2>
      <Menu client={props.client}/>
    </div>
  );
}

export default App;
