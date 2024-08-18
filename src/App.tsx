import { useRoutes } from 'react-router-dom';
import routes from './router';
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const client = new ApolloClient({
    uri: 'https://onegym-api-wapbfgrvja-uk.a.run.app/graphql',
    cache: new InMemoryCache(),
  });

  if (!client) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        {useRoutes(routes)}
        <ToastContainer />
      </ApolloProvider>
    );
  }
}

export default App;
