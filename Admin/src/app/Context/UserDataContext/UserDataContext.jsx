import {
    createContext,
    useState
} from 'react';
import PropTypes from 'prop-types'

export const userDataContext = createContext({
    userId: null,
    userName: null,
    userPassword: null,
    setUserId: null,
    setUserName: null,
    setUserPassword: null
});

export const UserDataProvider = props => {
    const [userId, setUserId] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userName, setUserName] = useState("");
    return (
        <userDataContext.Provider value={{
            userId,
            userName,
            userPassword,
            setUserId,
            setUserName,
            setUserPassword
        }}>
            {props.children}
        </userDataContext.Provider>
    )
}

UserDataProvider.propTypes = {
    children: PropTypes.element
}