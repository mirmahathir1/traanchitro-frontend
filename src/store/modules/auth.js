const state={
    token:null,
    loggedIn: false,
    //nsa_admin,  tFyEQ
};
const mutations={
    setToken:((state, token)=>{
        state.token = token;
    }),
    logout:((state)=>{
        state.loggedIn=false;
    }),
    login: ((state)=>{
        state.loggedIn=true;
    }),
};
const actions={

};
const getters={
    getLoggedIn: state=>{
        return state.loggedIn;
    },

    getToken: state =>{
        return state.token;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}