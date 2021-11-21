import axios from "axios";

export function getAuth() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios.get(`/api/auth`, { withCredentials: true, credentials: 'include' })
}

export function getGuilds() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios.get(`/api/guild`, { withCredentials: true, credentials: 'include' })
}

// export function getDetailsGuild(serverId) {
//     return axios.get(`/api/discord/getguildinfo?id=${serverId}`);
// }

export function getRoles(guildId) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios.get(`/api/role?guildId=${guildId}`, { withCredentials: true, credentials: 'include' });
}

export function buyRole(guildId, userId, roleId) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios.post(`/api/role/buyrole`, { guildId, userId, roleId }, { withCredentials: true, credentials: 'include' });
}

export function modifyRole(role) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios.post(`/api/role/modifyRole`, { role }, { withCredentials: true, credentials: 'include' });
}

export function logout() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return axios.get(`/api/auth/logout`, { withCredentials: true, credentials: 'include' })
}