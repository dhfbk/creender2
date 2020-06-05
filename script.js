const routes = [
    { path: "/admin", component: httpVueLoader('components/admin.vue') },
    { path: "/", component: httpVueLoader('components/annotate.vue') },
    { path: "/statistics", component: httpVueLoader('components/annotate.vue') }
];

const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    router: router,
    data: {
        logged: false,
        admin: false,
        showAdminLogin: false
    },
    mounted: function() {
        $.ajax("api/", {
            // async: false,
            method: "GET",
            data: {
                action: "lang"
            },
            success: function(data) {
                Vue.prototype.lang = data;
            }
        });
        this.updateLoginInfo();
    },
    methods: {
        logout: function() {
            self = this;
            $.ajax("api/", {
                method: "GET",
                data: {
                    action: "logout"
                },
                success: function(data) {
                    self.logged = false;
                    self.admin = false;
                }
            });
        },
        updateLoginInfo: function() {
            self = this;
            $.ajax("api/", {
                // async: false,
                method: "GET",
                data: {
                    action: "loginInfo"
                },
                success: function(data) {
                    self.logged = data.logged;
                    self.admin = data.admin;
                }
            });
        }
    }
}).$mount("#app");
