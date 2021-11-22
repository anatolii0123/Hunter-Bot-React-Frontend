import * as React from 'react';

import config from "../../config"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Add, Edit } from '@material-ui/icons';
export default function ServerCard({ guild, permission }) {
    return (
        <>
            <Card sx={{ width: 300, m: 2 }}>
                <CardActionArea>
                    {
                        guild.icon !== null ? (
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                // image="/assets/image/dashboard/sample-server.png"
                                alt="green iguana"
                            />
                        ) : (
                            <CardMedia
                                component="img"
                                height="140"
                                image="/assets/image/dashboard/default-server.png"
                                alt="green iguana"
                            />
                        )
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {guild.name.substr(0, 20) + (guild.name.length > 20 ? '...' : '')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {
                        permission === true ? (
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<Edit />}
                                onClick={() => window.location.href = `${config.site_url}/${guild.id}/role`}
                            > Manage </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<Add />}
                                // onClick={() => window.location.href = `http://discord.com/oauth2/authorize?client_id=${config.clientId}&scope=bot%20applications.commands&guild_id=${guild.id}&response_type=code&redirect_uri=${encodeURIComponent(config.redirect_uri)}`}
                                onClick={() => window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${config.clientId}&permissions=8&redirect_uri=${encodeURIComponent(config.redirect_uri)}&response_type=code&scope=bot`}
                            > Invite </Button>
                        )
                    }
                </CardActions>
            </Card>
        </>
    );
}