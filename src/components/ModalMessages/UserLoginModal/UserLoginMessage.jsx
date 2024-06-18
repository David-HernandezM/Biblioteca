import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import './UserLoginMessage.css';

const DEFAULT_VALUES = {
    userId: '',
    userPassword: ''
};

export const UserLoginMessage = props => {
    const { register, handleSubmit } = useForm({ defaultValues: DEFAULT_VALUES });

    const handleSubmitUserData = ({ userId, userPassword }) => {
        console.log('userId: ', userId);
        console.log('user password: ', userPassword);
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
                    label='Num de boleta'
                    helperText='Minimum length is 4'
                    {
                        ...register('userId')
                    }
                />
                <TextField 
                    label="Contraseña"
                    type="password"
                    {
                        ...register('userPassword')
                    }
                />
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
            </form>
        </div>
    )
}


UserLoginMessage.propTypes = {
    onLoginModalClose: PropTypes.func.isRequired,

}