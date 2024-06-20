import { Outlet } from 'react-router-dom';
import { Header } from '../../..';

export const Root = () => {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
        </>
    );
};