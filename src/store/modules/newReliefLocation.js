const state={
    newReliefLocation: null,
};
const mutations={
    setNewReliefLocation:((state, newReliefLocation)=>{
        state.newReliefLocation = newReliefLocation;
    }),
};
const actions={

};
const getters={
    getNewReliefLocation: state=>{
        return state.newReliefLocation;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}