<template>
    <v-snackbar
            v-model="snackbar"
            v-if="$store.getters.getDragZoomNotifier"
            vertical
            color="black"
            left
            style="width: 300px"
    >
        {{ snackbarText }}
        <div>
            <v-btn
                    color="white"
                    text
                    @click="stopDragZoomNotifier"
            >
                Don't show again
            </v-btn>
            <v-btn
                    color="white"
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </div>

    </v-snackbar>
</template>

<script>
    export default {
        name: "MapNotification",
        props: ['snackbar'],
        data(){
            return{
                //snackbar: true,
                snackbarText: "Please press reload to show pins",
            }
        },
        methods:{
            stopDragZoomNotifier() {
                this.$store.commit('stopDragZoomNotifier');
                this.snackbar = false;
            },
        }
    }
</script>

<style scoped>

</style>