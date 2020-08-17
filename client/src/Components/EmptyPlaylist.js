import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core'

const EmptyPlaylist = () => {
    return (
        <Box
        display="flex" 
        alignItems="center"
        justifyContent="center">
            <Card>
                <CardContent>
                <Typography component="h5" variant="h5">
                    There are no Videos in this list (シ_ _)シ
                </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default EmptyPlaylist