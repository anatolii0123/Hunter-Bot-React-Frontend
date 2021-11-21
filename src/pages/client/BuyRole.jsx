import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useParams } from "react-router";

import {
  Box,
  Container,
  IconButton,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from '@mui/material';

import { withStyles } from '@mui/styles';

import { getAuth, getRoles, buyRole } from '../../api';
import NavBar from '../../components/NavBar';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
  // const history = useHistory();

  const data = { "roles": [{ "id": "910451180457586709", "name": "Administrator", "permissions": "1099511103487", "position": 4, "color": 15742004, "hoist": false, "managed": false, "mentionable": false, "icon": null, "unicode_emoji": null, "price": "12" }, { "id": "911554332246302740", "name": "new role", "permissions": "1071698660929", "position": 1, "color": 0, "hoist": false, "managed": false, "mentionable": false, "icon": null, "unicode_emoji": null, "price": null }] }

  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState(data.roles);

  // const [loading, setLoading] = useState(true);
  // const [roles, setRoles] = useState([]);

  const { classes } = props;
  const [userName, setUsername] = useState("");
  const [logo, setLogo] = useState("");
  const [access, setAccess] = useState("");

  const { guildId, userId } = useParams();

  // Buy Role
  const handleBuyRole = (role) => {
    buyRole(guildId, userId, role.id).then((res) => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  // useEffect(() => {
  //   getAuth().then((res) => {
  //     setAccess(res.data.msg);
  //     if (access === "authorized") {
  //       setUsername(res.data.user.discordTag);
  //       setLogo(
  //         `https://cdn.discordapp.com/avatars/${res.data.user.discordId}/${res.data.user.avatar}.png?size=128`
  //       );
  //     }
  //   });
  // }, [access]);
  // useEffect(() => {
  //   if (access != "authorized") {
  //     getRoles(guildId).then(res => {
  //       setRoles(res.data.roles);
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 2000);
  //     });
  //   }
  // }, []);

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <div>
            <NavBar logo={logo} userName={userName} access={access} />

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
                    {roles.map((role) => (
                      <TableRow
                        key={role.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          <SupervisedUserCircleIcon sx={{ color: '#f03434' }} />
                          <span className="ml-3">{role.name}</span>
                        </TableCell>
                        <TableCell align="right"> 1 <PersonIcon /> </TableCell>
                        <TableCell align="right"> {role.price == null ? "NOT ADDED" : ('$ ' + role.price)} </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            endIcon={<ShoppingCartIcon />}
                            onClick={() => handleBuyRole(role)}
                          >
                            BUY
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </div>
        </>
      )
      }
    </>
  );
}

export default withStyles(styles)(Role)