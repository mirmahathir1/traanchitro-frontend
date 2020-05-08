const state={
    filters : {
        typeOfRelief: [],
        schedule: null,
        orgName: null,
    },
};
const mutations={
    setFilters:((state, filters)=>{
        state.filters = filters;
    }),
};
const actions={

};
const getters={
    getFilters: state=>{
        return state.filters;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}