<template>
    <div>
        <admin-login :logininfo.sync="loginInfo" v-if="!admin" @login="login"></admin-login>

        <div v-else class="container-fluid">
            <nav class="navbar navbar-expand-md navbar-light bg-light">
                <router-link class="navbar-brand" to="/admin">
                    <img src="img/creender-top.png" height="30" alt="" class="d-inline-block align-top mr-3" />
                    {{ lang.adminpanel }}
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="#" class="nav-link" @click.prevent="logout">{{ lang.logout }}</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div id="content">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                "loginInfo": {
                    "password": ""
                }
            }
        },
        props: ['admin'],
        components: {
            "admin-login": httpVueLoader('components/admin-login.vue')
        },
        methods: {
            login: function(data) {
                var self = this;
                $.ajax("api/?action=adminLogin", {
                    method: "POST",
                    data: {
                        password: data.password
                    },
                    success: function(data) {
                        if (data.result === "OK") {
                            self.$emit("update:admin", true);
                        }
                        else {
                            self.modalData.body = data.error;
                            self.modalData.button = self.lang.ok;
                            self.modalData.title = self.lang.error;
                            $("#" + self.modalID).modal();
                        }
                        self.loginInfo.password = "";
                    }
                });
            },
            logout: function() {
                this.$emit("logout");
            }
        }
    }
</script>

