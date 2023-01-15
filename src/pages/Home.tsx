import {gql, NetworkStatus, useLazyQuery, useQuery} from "@apollo/client";
import {useState} from "react";

const Home = () => {
    const [owner, setOwner] = useState<string>('')

    const GET_USER = gql`
        query GET_REPO($login: String!){
            user(login: $login) {
                repositories(first: 100){
                    nodes{
                        name
                        isPrivate
                    }
                }
            }
        }
    `

    const [getUser, {loading, error, data, networkStatus}] = useLazyQuery(GET_USER);

    // if (networkStatus === NetworkStatus.refetch) return <div>Fetching!</div>;
    return <div>
        <input type='text' placeholder="enter an user name" value={owner}
               onChange={(e) => setOwner(e.target.value)}/>
        <button onClick={() => getUser(
            {
                variables: {
                    login: owner
                },
            }
        )}>Find
        </button>
        {loading ? (<div>...Loading</div>) : <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>}
    </div>;
};

export default Home;
