<template>
    <div class="about">
        <v-card class="mx-auto elevation-12" max-width="500" style="top: 20vh">
            <v-list>
                <v-list-item>
                    <v-list-item-title>
                        {{text}}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script>
    export default {
        props: ['text'],
        name: "Notice",
        // data(){
        //     return{
        //         text:null,
        //     }
        // },
        created() {

        }
    }
</script>

<style scoped>

</style>