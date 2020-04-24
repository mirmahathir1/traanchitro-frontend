import Vue from 'vue';
import Vuetify from 'vuetify/lib';


import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.green.darken3,
                secondary: colors.lightGreen.lighten2,
                accent: colors.yellow,
                error: '#b71c1c',
            },
        },
    },
});
