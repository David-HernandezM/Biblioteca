import {
    createContext,
    useState
} from 'react';
import PropTypes from 'prop-types'

export const userDataContext = createContext({
    userId: null,
    userPassword: null,
    setUserId: null,
    setUserPassword: null
});

export const UserDataProvider = props => {
    const [userId, setUserId] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    return (
        <userDataContext.Provider value={{
            userId,
            userPassword,
            setUserId,
            setUserPassword
        }}>
            {props.children}
        </userDataContext.Provider>
    )
}

UserDataProvider.propTypes = {
    children: PropTypes.element
}