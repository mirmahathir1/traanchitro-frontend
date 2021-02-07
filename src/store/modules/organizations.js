import axios from "axios";
import {formatError,formatRequest} from "../../mixins/helpers";

const state={
    organizations: [],
    organizationsLoader: false,
    organizationsError: null,
};
const mutations={
    setOrganizations: ((state, organizations)=> {
        state.organizations = organizations;
    }),
    organizationsLoaderOff: (state)=>{
        state.organizationsLoader=false;
    },
    organizationsLoaderOn: (state)=>{
        state.organizationsLoader=true;
    },
    setOrganizationsError: (state,payload)=>{
        state.organizationsError = payload;
    }
};
const actions={
    fetchOrganizations: ({commit,getters})=>{
        commit('setOrganizationsError',null);

        if(getters.organizations.length!==0){
            return;
        }

        commit('organizationsLoaderOn');

        let params = {};

        let headers = {
            'x-auth': localStorage.getItem('x-auth'),
        };


        let url = '/orgs';

        formatRequest(url,params,headers);
        //this.$apiRequestLog(url,params,headers);

        axios.get(url,
            {
                headers: headers,
                params: params
            })
            .then((res) => {
                console.log("RESPONSE: ", res);
                commit('setOrganizations', res.data.orgNames);
            }).catch(e => {
                commit('setOrganizationsError',formatError(e));
        }).finally(() => {
            console.log('FINISH');
            commit('organizationsLoaderOff');
        });
    }
};
const getters={
    organizations: state=>{
        return state.organizations;
    },
    organizationsError: state =>{
        return state.organizationsError;
    },
    organizationsLoader: state =>{
        return state.organizationsLoader;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}