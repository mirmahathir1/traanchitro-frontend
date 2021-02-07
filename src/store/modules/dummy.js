import axios from "axios";

const state={
    dummy: [],
    errorDummy: null,
};
const mutations={
    setDummy: ((state, dummy)=> {
        state.dummy = dummy;
    }),
};
const actions={
    fetchDummy: ({commit,getters})=>{


        let params = {};

        let headers = {
            'x-auth': localStorage.getItem('x-auth'),
        };

        let url = '/orgs';

        //this.$apiRequestLog(url,params,headers);

        axios.get(url,
            {
                headers: headers,
                params: params
            })
            .then((res) => {
                console.log("RESPONSE: ", res);
                commit('setDummy', res.data.orgNames);

            }).catch(e => {
                //this.errorDummy = this.$errorMessage(e);
        }).finally(() => {
            console.log('FINISH');

        });
    }
};
const getters={
    getDummy: state=>{
        return state.dummy;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}