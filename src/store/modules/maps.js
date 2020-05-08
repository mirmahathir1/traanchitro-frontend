import GoogleMapsApiLoader from "google-maps-api-loader";

const state={
    maps: null,
    map: null,
};
const mutations={
    setMaps: ((state, maps)=>{
        state.maps = maps;
    }),

};
const actions={
    setupMaps: async ({commit,getters})=>{
        const googleMapApi = await GoogleMapsApiLoader({
            apiKey: process.env.VUE_APP_API_KEY
        });
        commit('setMaps',googleMapApi.maps);
        console.log("%cGOOGLE MAP API INCLUDED: ",'color:#1799B5');
    }
};
const getters={
    getMaps: state => {
        return state.maps;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}