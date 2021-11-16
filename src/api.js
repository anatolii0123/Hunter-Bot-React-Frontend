import axios from "axios";

export const Name = 'Hunter';

export function getAuth() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios.get(`/api/auth`, { withCredentials: true, credentials: 'include' })
}

export function getGuilds() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios.get(`/api/discord/guilds`, { withCredentials: true, credentials: 'include' })
}
