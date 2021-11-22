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

import { getAuth, getRoles, modifyRole } from '../../api';
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


// Modal
import Modal from '@mui/material/Modal';

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

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Role(props) {
  // const data = { "roles": [{ "id": "910451180457586709", "name": "Administrator", "permissions": "1099511103487", "position": 4, "color": 15742004, "hoist": false, "managed": false, "mentionable": false, "icon": null, "unicode_emoji": null, "price": "12" }, { "id": "911554332246302740", "name": "new role", "permissions": "1071698660929", "position": 1, "color": 0, "hoist": false, "managed": false, "mentionable": false, "icon": null, "unicode_emoji": null, "price": null }] }

  // const [loading, setLoading] = useState(false);
  // const [roles, setRoles] = useState(data.roles);

  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);

  const [userName, setUsername] = useState("");
  const [logo, setLogo] = useState("");
  const [access, setAccess] = useState("");

  const { classes } = props;
  const { guildId } = useParams();
  const history = useHistory();

  // Edit Role
  const handleEditRole = (role) => {
    console.log(role)
    setCurrentRole({
      id: role.id,
      guildId: guildId,
      price: role.price,
    })
    setModalOpen(true)
  }

  const [currentRole, setCurrentRole] = useState({
    id: '',
    guildId: '',
    price: '',
  })
  // Modal
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleChange = (prop) => (event) => {
    setCurrentRole({ ...currentRole, [prop]: event.target.value });
    console.log(currentRole)
  };

  const handleModalClose = () => setModalOpen(false);
  const handleSaveRolePrice = () => {
    modifyRole(currentRole).then((res) => {
      setRoles(res.data.roles)
      setModalOpen(false)
    }).catch(error => {
      console.log(error)
      setModalOpen(false)
    })
  }
  // Modal

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
      getRoles(guildId).then(res => {
        setRoles(res.data.roles);
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
        <>
          <div>
            <SideHeadBar logo={logo} userName={userName} access={access} />
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
                          <IconButton
                            size="normal"
                            edge="end"
                            aria-label="Edit Role"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => handleEditRole(role)}
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
          <div>
            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Role
                </Typography>
                <FormControl fullWidth sx={{ mt: 3, mb: 3 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">Please enter the price of ths role.</InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    value={currentRole.price}
                    onChange={handleChange('price')}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  sx={{ mr: 3 }}
                  onClick={handleSaveRolePrice}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
          </div>
        </>
      )
      }
    </>
  );
}

export default withStyles(styles)(Role)