import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useParams } from "react-router";

import {
  Box,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { withStyles } from '@mui/styles';

import { getAuth, getRoles, setRole } from '../../api';
import SideHeadBar from '../../components/SideHeadbar';
import Loading from "../../components/Loading";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const data = { "members": 2, "channels": 5, "region": "russia", "roles": [{ "id": "910229408248373279", "name": "@everyone", "permissions": "1071698660929", "position": 0, "color": 0, "hoist": false, "managed": false, "mentionable": false, "icon": null, "unicode_emoji": null }, { "id": "910230857967611915", "name": "globalhunter727", "permissions": "8", "position": 4, "color": 0, "hoist": false, "managed": true, "mentionable": false, "icon": null, "unicode_emoji": null, "tags": { "bot_id": "910229962349486082" } }, { "id": "910451180457586709", "name": "Administrator", "permissions": "1099511103487", "position": 3, "color": 15277667, "hoist": false, "managed": false, "mentionable": false, "icon": null, "unicode_emoji": null }, { "id": "910910919268253697", "name": "Donate Bot", "permissions": "268453952", "position": 1, "color": 0, "hoist": false, "managed": true, "mentionable": false, "icon": null, "unicode_emoji": null, "tags": { "bot_id": "404365332912930827" } }], "roles2": [{ "id": "910229408248373279", "name": "@everyone", "permissions": "1071698660929", "position": 0, "color": 0, "hoist": false, "managed": false, "mentionable": false, "icon": null, "unicode_emoji": null }, { "id": "910230857967611915", "name": "globalhunter727", "permissions": "8", "position": 4, "color": 0, "hoist": false, "managed": true, "mentionable": false, "icon": null, "unicode_emoji": null, "tags": { "bot_id": "910229962349486082" } }, { "id": "910451180457586709", "name": "Administrator", "permissions": "1099511103487", "position": 3, "color": 15277667, "hoist": false, "managed": false, "mentionable": false, "icon": null, "unicode_emoji": null }, { "id": "910910919268253697", "name": "Donate Bot", "permissions": "268453952", "position": 1, "color": 0, "hoist": false, "managed": true, "mentionable": false, "icon": null, "unicode_emoji": null, "tags": { "bot_id": "404365332912930827" } }] };

  const [roleInfo, setRoleInfo] = useState({
    name: '',
    price: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  // const [roles, setRoles] = useState([data.roles]);
  const [roles, setRoles] = useState([]);
  const [userName, setUsername] = useState("");
  const [logo, setLogo] = useState("");
  const [access, setAccess] = useState("");

  const { classes } = props;
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getAuth().then((res) => {
      setAccess(res.data.msg);
      if (access === "authorized") {
        setUsername(res.data.user.discordTag);
        setLogo(
          `https://cdn.discordapp.com/avatars/${res.data.user.discordId}/${res.data.user.avatar}.png?size=128`
        );
      }
    });
  }, [access]);
  useEffect(() => {
    if (access != "authorized") {

      getRoles(id).then(result => {
        setRoles(result.data.roles);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    }
  }, []);

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          <SideHeadBar />
          <Container maxWidth="lg" >
            <Box sx={{ width: '100%', paddingTop: '50px' }}>
              <Typography variant="h4" gutterBottom component="div">
                Roles
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Use roles to organize your server members and customize their permissions.
              </Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, border: 0 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ROLES</TableCell>
                    <TableCell align="right">MEMBERS</TableCell>
                    <TableCell align="right">PRICE</TableCell>
                    <TableCell align="right">ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        <SupervisedUserCircleIcon sx={{ color: '#f03434' }} />
                        <span className="ml-3">{row.name}</span>
                      </TableCell>
                      <TableCell align="right"> 1 <PersonIcon /> </TableCell>
                      <TableCell align="right"> $17.00 </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="normal"
                          edge="end"
                          aria-label="Edit Role"
                          aria-haspopup="true"
                          color="inherit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="normal"
                          edge="end"
                          aria-label="Edit Role"
                          aria-haspopup="true"
                          color="inherit"
                          sx={{ marginLeft: '20px' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </div>
      )}
    </>
  );
}

export default withStyles(styles)(Role)