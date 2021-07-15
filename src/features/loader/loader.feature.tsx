import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import BeatLoader from 'react-spinners/BeatLoader';

export function LoaderFeature() {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState('green');

    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '30vh',
                    marginLeft: 'auto',
                    height: '10vh',
                }}
            >
                <BeatLoader loading={loading} size={20} color={color} />
            </div>
        </Container>
    );
}
