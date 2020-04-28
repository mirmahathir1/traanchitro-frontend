<template>
    <div class="about">
        <v-card class="mx-auto elevation-12" max-width="500" style="top: 20vh" v-if="text">
            <v-list>
                <v-list-item>
                    <v-list-item-title>
                        {{text}}
                    </v-list-item-title>
                </v-list-item>
                <v-card-actions>
                    <v-btn class="primary lighten-2" block to="/search">Go to maps</v-btn>
                </v-card-actions>
            </v-list>
        </v-card>
    </div>
</template>

<script>
    export default {
        props: ['text'],
        name: "Notice",
    }
</script>

<style scoped>

</style>