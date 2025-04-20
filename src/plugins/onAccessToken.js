import api from './../api';

/**
 * This function is called when a new access token is received.
 * 
 * @param {string} accessToken
 * @param {import('vue').Inject} $cookies
 * @param {import('vuex').useStore} store
 */
export default async (accessToken, $cookies, store) => {
    $cookies.set('AccessToken', accessToken);
    api.setJWT(accessToken);
    const { data: user } = await api.user.get();
    store.commit('setUser', user);
    store.commit('setAuth', true);


    if (user.groups) {
        let lastGroupID = localStorage.getItem('lastGroupID');

        if (lastGroupID) {
            for (const { id } of user.groups) {
                if (id === lastGroupID) lastGroupID = id;
            }
        }

        const useZerothGroup = async () => {
            if (user.groups && user.groups[0]) {
                const { data: group } = await api.group.get(user.groups[0].id);
                store.commit('setGroup', group);
            }
        };

        if (lastGroupID) {
            try {
                const { data: group } = await api.group.get(lastGroup.id);
                store.commit('setGroup', group);
            } catch (e) {
                useZerothGroup();
            }
        } else {
            useZerothGroup();
        }
    }
};