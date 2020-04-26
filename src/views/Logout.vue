<template>
    <v-card class="mx-auto elevation-12" max-width="500" style="top: 20vh">
        <v-list>
            <v-list-item>
                <v-list-item-title>
                    You have been logged out
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "Logout",
        created() {
            localStorage.removeItem('x-auth');
            this.$store.commit('logout');
        }
    }
</script>

<style scoped>

</style>