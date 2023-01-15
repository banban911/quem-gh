import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {observer} from "mobx-react"; // Or "mobx-react".
import {useRoutes} from "react-router-dom";
import {routesConfig} from "./config/routes";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
});
    const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: process.env.REACT_APP_GITHUB_PERSONAL_TOKEN ? `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_TOKEN}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});



const App = () => {

    const routes = useRoutes(routesConfig);

    return (
        <ApolloProvider client={client}>
            {routes}
        </ApolloProvider>
    );
};

const ObserverApp = observer(App);

export default ObserverApp;
