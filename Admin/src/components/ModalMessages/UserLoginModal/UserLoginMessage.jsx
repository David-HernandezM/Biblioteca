import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useState, useContext } from 'react';
import { userDataContext } from '../../../app/Context';
import { useSnackbar } from 'notistack';
import { sleep } from '../../../app/utils';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import './UserLoginMessage.css';

const DEFAULT_VALUES = {
    userId: '',
    userPassword: ''
};

export const UserLoginMessage = props => {
    const { setUserId, setUserName } = useContext(userDataContext);
    const { register, handleSubmit } = useForm({ defaultValues: DEFAULT_VALUES });
    const { enqueueSnackbar } = useSnackbar();
    const [doingCall, setDoingCall] = useState(false);
    const [userNameHelperText, setUserNameHelperText] = useState("");
    const [userPasswordHelper, setUserPasswordHelper] = useState("");

    const loginUser = async (userId, password) => {
        const userData = {
            boleta: Number(userId),
            contrasena: password
        };
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:5000/users/login', userData)
            .then(async response => {
                await sleep(1);
                resolve(response.data);
            })
            .catch(async error => {
                await sleep(1);
                reject(error);
            });
        });
    };

    const checkUser = (userId) => {
        const regex = /^[0-9]+$/;
        return regex.test(userId);
    }

    const checkPassword = (password) => {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(password);
    }

    const handleSubmitUserData = async ({ userId, userPassword }) => {
        if (userId.includes(' ')) {
            setUserNameHelperText('No debe contener espacios!');
            return;
        }

        if (!checkUser(userId)) {
            setUserNameHelperText('Contiene caracteres invalidos!')
            return;
        }

        if (userId.length < 4) {
            setUserNameHelperText('Debe de tener mas de 5 caracteres');
            return;
        }

        setUserNameHelperText('');

        if (userPassword.includes(' ')) {
            setUserPasswordHelper('No debe contener espacios!');
            return;
        }

        if (userPassword.length < 4) {
            setUserPasswordHelper('Debe de tener mas de 5 caracteres');
            return;
        }

        if (!checkPassword(userPassword)) {
            setUserPasswordHelper('Contiene caracteres invalidos!');
            return;
        }

        setUserPasswordHelper('');

        try {
            setDoingCall(true);
            const userData = await loginUser(userId, userPassword);

            if (!userData.user.esAdministrador) {
                enqueueSnackbar('No es un administrador!', { variant: 'error' });
                setDoingCall(false);
                return;
            }

            console.log(userData);
            enqueueSnackbar('¡Inicio de sesión exitoso!', { variant: 'success' });
            setUserId(userId);
            setUserName(userData.user.nombre);
            setDoingCall(false);
            props.onLoginModalClose();
        } catch (error) {
            enqueueSnackbar('Usuario o contraseña incorrectos!', { variant: 'error' });
            setDoingCall(false);
        }
    };

    return ( 
        <div className='user-login-message'>
            <h2
                className='user-login-message__title'
            >
                Inicia sesión
            </h2>
            <form 
                className='user-login-message__form'
                onSubmit={handleSubmit(handleSubmitUserData)}
            >
                <TextField 
                    required
                    label='Id administrador'
                    helperText={userNameHelperText}
                    error={userNameHelperText !== ""}
                    {
                        ...register('userId')
                    }
                />
                <TextField 
                    required
                    label="Contraseña"
                    type="password"
                    helperText={userPasswordHelper}
                    error={userPasswordHelper !== ""}
                    {
                        ...register('userPassword')
                    }
                />
                
                {
                    !doingCall ? (
                        <div className='user-login-message__form__buttons'>
                            <Button
                                variant='contained'
                                type='button'
                                sx={{width: '48%'}}
                                onClick={props.onLoginModalClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='contained'
                                color='success'
                                type='submit'
                                sx={{width: '48%'}}
                            >
                                Iniciar sesión
                            </Button>
                        </div>
                    ) : (
                        <div className='user-login-message__form__loader'>
                            <CircularProgress />
                        </div>
                    )
                }
            </form>
        </div>
    )
}


UserLoginMessage.propTypes = {
    onLoginModalClose: PropTypes.func.isRequired,

}