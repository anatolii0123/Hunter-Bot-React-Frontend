import { useState, useEffect } from "react";

import config from "../../config";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import { getAuth } from "../../api";

function Home() {
  const [access, setAccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUsername] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    getAuth().then((res) => {
      setAccess(res.data.msg);
      if (access === "authorized") {
        setUsername(res.data.user.discordTag);
        setLogo(
          `https://cdn.discordapp.com/avatars/${res.data.user.discordId}/${res.data.user.avatar}.png?size=128`
        );
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }).catch(err => {
      console.log(err)
      setLoading(false);
      setAccess('unauthorized');
    });
  }, [access]);
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div
          className="leading-normal tracking-normal text-white h-full"
          style={{ width: "100%", minHeight: "100vh" }}
        >
          <div>
            <NavBar logo={logo} userName={userName} access={access} />
            <div className="pt-36">
              <div className="container mx-auto flex flex-wrap flex-col md:flex-row">
                <div className="flex flex-col w-full  items-center text-center md:text-left">
                  <h1 className="w-full my-5 text-5xl font-bold leading-tight text-center text-black">
                    Discord Bot
                  </h1>
                  <p className="leading-normal text-2xl mb-8">
                    {config.botName} is the best customizable bot for discord with a
                    dashboard.
                  </p>
                  <div className="flex">
                    <button className="flex items-center px-7 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-500 rounded-md hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800">
                      <span className="mx-1">Invite Bot</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
