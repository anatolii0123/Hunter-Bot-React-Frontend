import { useHistory } from "react-router-dom";
import {useState} from 'react'
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Link, 
  TextField,
  Typography, 
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { ColorPicker } from 'material-ui-color';
import 'react-color-picker/index.css'

import SideHeadBar from '../../components/SideHeadbar';


const styles = {
  formControl: {
    marginBottom: '20px'
  }
}

function Role(props) {
    function BoxItem(props) {
        const { sx, ...other } = props;
        return (
          <Box
            sx={{
              color: 'white',
              p: 1,
              m: 1,
              borderRadius: 1,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: '700',
              ...sx,
            }}
            {...other}
          />
        );
      }

const [rolename, getRole] = useState(''); 
const [roles, setRoles] = useState([]);
const addRole = (e) => {
  setRoles([...roles, rolename]);
  console.log("roles", roles)
  getRole('');
  e.preventDefault();
}

const { classes } = props;
return (
  <>
    <SideHeadBar />
    <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
        }}
      >
        <BoxItem>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent id="rolelist">
              <Typography gutterBottom variant="h5" component="div">
                Roles
              </Typography>
              <Button variant="outlined" onClick={addRole} startIcon={<AddCircleOutlineIcon />}>
                New Role
              </Button>

              <div>
                <ul>
                {
                    roles.map(role => {
                      console.log("role", role)
                      return <li>{role}</li>
                    })
                }
                </ul>
              </div>
            </CardContent>
          </Card>
        </BoxItem>
        <BoxItem>
            <Card>
              <CardContent>
                <div className={classes.formControl}>
                  <TextField
                    required
                    id="name"
                    label="Name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={rolename}
                    onChange={(e)=>getRole(e.target.value)}
                  />
                </div>
                <div className={classes.formControl}>
                  <TextField
                  required
                  id="price"
                  label="Price"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </div>
                <div className={classes.formControl}>
                  <ColorPicker defaultValue="transparent"/>
                </div> 
                <div className={classes.formControl}>
                  <TextField
                  multiline
                  id="description"
                  label="Description"
                  rows={10}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                </div>
              </CardContent>
              <div className={classes.formControl}>
                <Button variant="contained" color="primary">
                  Save
                </Button>
                <Button variant="contained" color="default">Cancel</Button>
              </div>
            </Card>
        </BoxItem>
        <BoxItem>
          <Card sx={{ border: '1px solid green', maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Your Public Checkout Link
                </Typography>
              <TextField
                id="outlined-size-small"
                size="small"
              />
            </CardContent>
              <Button variant="contained" color="success">
                View your public store
              </Button>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                Share this link anywhere. This is also the link you place on your
                <Link href="#" underline="none">
                  {' Medal profile. '}
                </Link>
                Users who buy donations are not required to be in your server.
              </Typography>
            </CardContent>
            <CardContent>
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
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="body1" component="div">
                Your users can type <strong>"donate"</strong>  in your Discord Server, they will be sent your donate link.
              </Typography>
            </CardContent>
          </Card>
        </BoxItem>
      </Box>
    </>
  );
}

export default withStyles(styles)(Role)