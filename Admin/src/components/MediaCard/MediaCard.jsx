import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

export const MediaCard = ({ name }) => {
    const obtenerIcono = (icon) => {
        switch (icon) {
            case 'Agregar':
                return (<AutoStoriesIcon sx={{ fontSize: 55 }} />)
            case 'Prestar':
                return (<HandshakeIcon sx={{ fontSize: 55 }} />)
            case 'Devolver':
                return (<CheckIcon sx={{ fontSize: 55 }} />)
            case 'Eliminar':
                return (<DeleteIcon sx={{ fontSize: 55 }} />)
            case 'Editar':
                return (<EditNoteOutlinedIcon sx={{ fontSize: 55 }} />)
            default:
                return (<></>)
        }
    }
    return (
        <Card sx={{ width: 200, backgroundColor: '#ffffff', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                    {obtenerIcono(name)}
                </Box>
                <Typography gutterBottom variant="h6" component="div" style={{ lineHeight: '1.2' }}>
                    {`${name} libro`}
                </Typography>
                {/* <Typography variant="body3">
                    <strong>Ubicacion: </strong>{item.location}
                </Typography> */}
            </CardContent>
        </Card>
    );
}