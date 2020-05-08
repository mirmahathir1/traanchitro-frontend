const state={
    snackbar: true,
};
const mutations={
    stopSnackbar:((state) => {
        state.snackbar=false;
    }),
};
const actions={

};
const getters={
    getSnackbar: state => {
        return state.snackbar;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}