import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useParams  } from "react-router";
import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {  
  Avatar,
  Box,
  Button, 
  Card, 
  CardContent, 
  Grid,
  Grow,
  Link, 
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField,
  Typography, 
} from '@mui/material';
import { withStyles } from '@mui/styles';

import { getDetailsGuild, setRole } from '../../api';
import SideHeadBar from '../../components/SideHeadbar';

const styles = {
  formControl: {
    marginBottom: '20px'
  },

  card: {
    minWidth: '200px',
    maxWidth: '350px',
    display: 'flex',
    justifyContent: 'center'
  },
  
  noRole: {
    fontSize: '30px'
  }
}


function Role(props) {
  const [roleInfo, setRoleInfo] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [checked, setChecked] = useState(false);
  const [roles, setRoles] = useState([]);
  const { classes } = props;
  const { id } = useParams();
  useEffect(() => {
    getDetailsGuild(id).then(result => {
      setRoles(result.data.roles);
    })
  }, []);

  const handleClickItem = (role) => {
    setRoleInfo(role);
    setChecked(false);
    setTimeout(() => setChecked(true), 500);
  }

  const handleSaveRole = () => {
    setRole(id, roleInfo).then(result => {
      console.log("result", result);
    });
  }
  return (
    <>
      <SideHeadBar />
      {
        roles.length == 0 ?
        <Grid 
          container  
          justifyContent="center"
          alignItems="center">
          <span className={classes.noRole}>No Role</span>
        </Grid>
        :
      <Grid container style={{padding: '100px'}} spacing={5}>
        <Grid item xs={12} sm={6} md={8} lg={8}>
          <Grid container>
            <Grid item >    
              <List>
                { 
                  roles.map(role => 
                  <ListItem style={{cursor: 'pointer'}} onClick={() => handleClickItem(role)}>
                    <ListItemAvatar>
                      <Avatar>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    />
                    {role.name}
                  </ListItem>,
                )}

              </List>
            </Grid>
            <Box sx={{ display: 'flex' }}>
              {/* Conditionally applies the timeout prop to change the entry speed. */}
              <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 1000 } : {})}
              >
                <Grid item >
                  <Card className={classes.card} style={{border: '1px solid black'}}>
                    <CardContent>
                        <TextField
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          style={{marginBottom: '20px'}}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={roleInfo.name}
                          onChange={(e)=>setRoleInfo({...roleInfo, name: e.target.value})}
                        />
                        <TextField
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        type="number"
                        style={{marginBottom: '20px'}}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        multiline
                        fullWidth
                        id="description"
                        label="Description"
                        style={{marginBottom: '20px'}}
                        rows={10}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      
                      <Button 
                        fullWidth 
                        variant="outlined"
                        color="primary" 
                        startIcon={<SaveIcon />} 
                        onClick={handleSaveRole}
                        >
                        Save
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            </Box>
            
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card 
            className={classes.card} 
            style={{ border: '1px solid green' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Your Public Checkout Link
              </Typography>
              <TextField
                fullWidth
                id="outlined-size-small"
                size="sm"
                style={{marginBottom: '20px'}}
              />
              <Button 
                fullWidth 
                style={{marginBottom: '20px'}} 
                variant="contained" 
                color="success">
                View your public store
              </Button>
              <Typography style={{marginBottom: '20px'}}  variant="body1" color="text.secondary">
                Share this link anywhere. This is also the link you place on your
                <Link href="#" underline="none">
                  {' Medal profile. '}
                </Link>
                Users who buy donations are not required to be in your server.
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                  Donations inside Discord
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                The roles on the left sync directly with your 
                <Link href="#" underline="none">
                  {' Discord Roles '}
                </Link>
                . To get started, price your roles and set a PayPal email in settings.
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Your users can type <strong>"donate"</strong>  in your Discord Server, they will be sent your donate link.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    }
    </>
  );
}

export default withStyles(styles)(Role)