import Vue from 'vue';
import Vuetify from 'vuetify/lib';


import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#0b877d',
                secondary: colors.lightGreen.lighten2,
                //primary: colors.blue.darken4,
                //secondary: colors.lightBlue.lighten2,
                accent: colors.yellow,
                error: '#b71c1c',
            },
        },
    },
});
