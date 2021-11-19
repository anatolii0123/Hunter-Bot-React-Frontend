import React from 'react'
import { useParams, useLocation, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Loading from "../../components/Loading";
import NavBar from "../../components/navBar";
import Role from "./Role";

import { getAuth } from "../../api";
export default function Server() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [prefix, setPrefix] = useState("");
  const [userName, setUsername] = useState("");
  const [logo, setLogo] = useState("");
  const [acces, setAcces] = useState("");

  const [members, setMembers] = useState(0);
  const [channels, setChannels] = useState(0);
  const [region, setRegion] = useState("");
  const [roles, setRoles] = useState(0);
  const { location } = useLocation();

  let guildsarray = [];
  useEffect(() => {
    getAuth().then((res) => {
      setAcces(res.data.msg);
      if (acces === "authorized") {
        setUsername(res.data.user.discordTag);
        setLogo(
          `https://cdn.discordapp.com/avatars/${res.data.user.discordId}/${res.data.user.avatar}.png?size=128`
        );
      }
    });
  }, [acces]);
  useEffect(() => {
    function getGuilds() {
      axios
        .get(`/api/discord/guilds`, {
          withCredentials: true,
        })
        .then((res) => {
          let comservers = res.data.comservs;

          comservers.map((guild) => guildsarray.push(guild.id));
          if (!guildsarray.includes(id)) {
            window.location.href = `/account`;
          }
        });
    }
    function getPrefix() {
      axios.get(`/discord/prefixs?id=${id}`).then(
        (res) => {
          setPrefix(res.data.prefix);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    function getDetailsGuild() {
      axios
        .get(`/api/discord/getguildinfo?id=${id}`)
        .then((res) => {
          // setMembers(res.data.members);
          setChannels(res.data.channels);
          setRegion(res.data.region);
          setRoles(res.data.roles);
        });
    }
    setTimeout(() => {
      getGuilds();
      getPrefix();
      getDetailsGuild();
    }, 1000);
    setTimeout(() => setLoading(false), 2500);
    // eslint-disable-next-line
  }, []);
  const onSubmit = (data) => {
    axios
      .post(`/api/discord/prefixs`, {
        id,
        prefix: data.prefix,
      })
      .then((res) => {
        toast.success("The settings have been changed.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("An error occurred.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const arayu = ["informations", "Settings"];
  const [cpe, setCpe] = useState(0);

  return (
    <>
      {/* {loading === true ? (
        <Loading />
      ) : ( */}
        <React.Fragment
          // className="leading-normal tracking-normal text-white h-full bg-gray-900"
          // style={{ width: "100%", minHeight: "100vh" }}
        >
          <NavBar logo={logo} userName={userName} acces={acces} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          {/* <Role roles={roles || []} /> */}
          <Switch location={location}>
            <Route 
              path="/role" 
              render={(props) => <Role {...props} roles={roles} />} >
            </Route>
          </Switch>
        </React.Fragment>
      {/* )} */}
    </>
  );
}
