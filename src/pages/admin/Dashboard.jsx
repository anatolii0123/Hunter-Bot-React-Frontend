import { useEffect, useState } from "react";
// import { useHistory } from "react-router";
import { getGuilds, getAuth } from "../../api";

import { Container, Box } from '@mui/material';

import Loading from "../../components/Loading";
import ServerCard from "../../components/Dashboard/ServerCard"
import SideHeadBar from '../../components/SideHeadbar';

export default function Dashboard() {
  // const history = useHistory();

  // const data = { "permissionNoGuilds": [{ "id": "905608636674473994", "name": "guardian's server", "icon": null, "owner": true, "permissions": 2147483647, "features": [], "permissions_new": "1099511627775" }, { "id": "907703489780666378", "name": "InnovDEVTeam(Blockchain Developers)", "icon": "640645ffef0cc61b6abdc5485b270405", "owner": false, "permissions": 2147483647, "features": [], "permissions_new": "1099511627775" }], "permissionHasGuilds": [{ "id": "910229408248373279", "name": "Hunter", "icon": null, "owner": true, "permissions": 2147483647, "features": [], "permissions_new": "1099511627775" }], "msg": "authorized" }
  // const [permissionNoGuilds, setPermissionNoGuilds] = useState(data.permissionNoGuilds);
  // const [permissionHasGuilds, setPermissionHasGuilds] = useState(data.permissionHasGuilds);
  // const [loading, setLoading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [permissionNoGuilds, setPermissionNoGuilds] = useState([]);
  const [permissionHasGuilds, setPermissionHasGuilds] = useState([]);
  const [userName, setUsername] = useState("");
  const [logo, setLogo] = useState("");
  const [access, setAccess] = useState("");


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
      getGuilds().then((res) => {
        if (res.data.msg === "unauthorized") return (window.location.href = `/api/auth/discord/`);
        setPermissionNoGuilds(res.data.permissionNoGuilds);
        setPermissionHasGuilds(res.data.permissionHasGuilds);
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
          <SideHeadBar logo={logo} userName={userName} access={access} />
          <Container maxWidth="lg" >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                justifyContent: 'center',
                p: 1,
                m: 1,
                height: 100,
              }}
            >
              {
                permissionHasGuilds.map((guild, i) =>
                  <ServerCard guild={guild} permission={true} key={i} />
                )
              }
              {
                permissionNoGuilds.map((guild, i) =>
                  <ServerCard guild={guild} permission={false} key={i} />
                )
              }
            </Box>
          </Container>
        </>
      )}
    </>
  );
}
