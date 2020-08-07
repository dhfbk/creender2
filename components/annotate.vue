<template>
    <div>
        <modal :id="modalID" :data="modalData"></modal>
        <login :logininfo.sync="logininfo" v-if="!logged" @login="login"></login>

        <div v-else>
            <add-comment :id="commentID" :data.sync="yesData" @confirm="submitForm"></add-comment>
            <div class="container-fluid">
                <nav class="navbar navbar-expand-md navbar-light bg-light">
                    <router-link class="navbar-brand" to="/">
                        <img src="img/creender-top.png" height="30" alt="" class="d-inline-block align-top" />
                    </router-link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/">{{ lang.home }}</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/statistics">{{ lang.statistics }}</router-link>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link" @click.prevent="logout">{{ lang.logout }}</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div class="container">
                    <div id="content" v-if="$route.path == '/statistics'">
                        <div class="row">
                            <div class="col">
                                <h2>{{ lang.statistics }}</h2>
                                <p>{{ lang.user }}: {{ logged_user.username }}</p>
                                <p>{{ lang.photos0 }}: {{ statistics.annotatedPhotos + statistics.todoPhotos }}</p>
                                <p>{{ lang.photos1 }}: {{ statistics.annotatedPhotos }}</p>
                                <p>{{ lang.photos2 }}: {{ statistics.todoPhotos }}</p>
                            </div>
                        </div>
                    </div>
                    <div id="cont-photo" v-else>

                        <div class="row" v-if="photo.id !== undefined">
                            <div class="col-sm-6 p-0 p-sm-4">
                                <img :src="photo.link" class="img-fluid" id="main-image">
                            </div>
                            <div class="col-sm-6 p-4 text-center">
                                <h3 class="d-sm-block">{{ lang.if }}</h3>
                                <form id="photo-form">
                                    <div class="btn btn-danger btn-lg" @click="userClickedYes" :class="{ 'btn-disabled': !buttons.okToClick, 'c-pointer': buttons.okToClick }" id="btn-yes">{{ lang.yes }}</div>
                                    <div class="btn btn-lg" @click="userClickedNo" :class="{ 'btn-success': buttons.clickedNo, 'btn-info': !buttons.clickedNo, 'btn-disabled': !buttons.okToClick, 'c-pointer': buttons.okToClick }" id="btn-no">{{ lang.no }}</div>

                                    <input type="hidden" name="value" v-model="yesData.value" />
                                    <input type="hidden" name="comment" v-model="yesData.comment" />
                                    <input type="hidden" name="no" v-model="buttons.clickedNo" />
                                    <input type="hidden" name="id" v-model="photo.id" />
                                </form>
                            </div>
                        </div>

                        <div v-else>
                            {{ lang.nophoto }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    function absorbEvent_(event) {
        var e = event || window.event;
        e.preventDefault && e.preventDefault();
        e.stopPropagation && e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }

    function preventLongPressMenu(node) {
        node.ontouchstart = absorbEvent_;
        node.ontouchmove = absorbEvent_;
        node.ontouchend = absorbEvent_;
        node.ontouchcancel = absorbEvent_;
    }

    module.exports = {
        data: function() {
            return {
                "modalID": "modalID",
                "commentID": "commentID",
                "modalData": {
                    title: "",
                    body: "",
                    button: ""
                },
                "logininfo": {
                    "username": "",
                    "password": "",
                    institution: "",
                    useGoogle: false
                },
                "statistics": {
                    todoPhotos: 0,
                    annotatedPhotos: 0
                },
                "logged_user": {},
                "photo": {},
                "buttons": {
                    okToClick: false,
                    clickedNo: false
                },
                "yesData": {
                    value: 0,
                    comment: ""
                }
            }
        },
        props: ['logged'],
        components: {
            "login": httpVueLoader('components/login.vue'),
            "modal": httpVueLoader('components/modal.vue'),
            "add-comment": httpVueLoader('components/add-comment.vue')
        },
        computed: {
            submitData: function() {
                ret = {};
                ret['no'] = this.buttons.clickedNo;
                ret['id'] = this.photo.id;
                return $.extend(ret, this.yesData);
            }
        },
        updated: function() {
            var w = Math.max($("#btn-no").width(), $("#btn-yes").width());
            if ($("#btn-no").width() == w) {
                $("#btn-yes").width(w);
            }
            else {
                $("#btn-no").width(w);
            }
        },
        mounted: function() {

            this.updateStatistics();
            // this.updateLoginInfo();

            this.reset();

            $("body").on("contextmenu",function(e){
                return false;
            });
            $("img").mousedown(function(e){
                e.preventDefault()
            });

            if (document.getElementById('main-image')) {
                preventLongPressMenu(document.getElementById('main-image'));
            }

        },
        // beforeRouteEnter: function(to, from, next) {
        //     next(vm => {
        //         if (to.path === "/statistics") {
        //             vm.updateStatistics();
        //         }
        //     });
        // },
        methods: {
            reset: function() {
                var self = this;
                setTimeout(function() {
                    self.buttons.okToClick = true;
                }, 2000);
                this.buttons.okToClick = false;
                this.buttons.clickedNo = false;
            },
            modal: function(title, body) {
                this.modalData.body = body;
                this.modalData.title = title;
                $("#" + this.modalID).modal();
            },
            userClickedYes: function() {
                if (!this.buttons.okToClick) {
                    return;
                }
                this.buttons.clickedNo = false;
                $("#" + this.commentID).modal();
            },
            userClickedNo: function() {
                if (!this.buttons.okToClick) {
                    return;
                }
                if (!this.buttons.clickedNo) {
                    this.buttons.clickedNo = true;
                }
                else {
                    this.submitForm();
                }
            },
            submitForm: function() {
                if (!this.buttons.clickedNo) {
                    if (this.submitData.value == "0") {
                        alert(this.lang.select_type);
                        return;
                    }
                    if (this.submitData.comment == "") {
                        alert(this.lang.insert_comment);
                        return;
                    }
                }
                var self = this;
                $.ajax("api/?action=submit", {
                    method: "POST",
                    data: this.submitData,
                    success: function(data) {
                        if (data.result === "OK") {
                            if (!self.buttons.clickedNo) {
                                $("#" + self.commentID).modal("hide");
                            }
                            self.updateStatistics();
                            self.reset();
                        }
                        else {
                            self.modal(self.lang.error, data.error);
                        }
                    }
                });
            },
            updateLoginInfo() {
                var self = this;
                $.ajax("api/?action=loginInfo", {
                    success: function(data) {
                        self.logged_user = data.login;
                    }
                });
            },
            updateStatistics() {
                var self = this;
                $.ajax("api/?action=statistics", {
                    success: function(data) {
                        if (data.result === "OK") {
                            self.statistics = data.data;
                            self.photo = data.data.nextPhoto;
                        }
                        else {
                            // self.modalData.body = data.error;
                            // self.modalData.title = self.lang.error;
                            // $("#" + self.modalID).modal();
                        }
                    }
                });
            },
            login: function(data) {
                var self = this;
                $.ajax("api/?action=login", {
                    method: "POST",
                    data: data,
                    success: function(data) {
                        if (data.result === "OK") {
                            if (data.data.url) {
                                // console.log(data.data.url);
                                location.href = data.data.url;
                            }
                            else {
                                self.$emit("update:logged", true);
                                self.logged_user = data.data;
                                self.updateStatistics();
                            }
                        }
                        else {
                            self.modal(self.lang.error, data.error);
                        }
                        self.logininfo.password = "";
                    }
                });
            },
            logout: function() {
                this.$emit("logout");
            }
        }
    }
</script>

<style>

    #btn-yes {
        margin-right: 20px;
    }

    #btn-yes, #btn-no {
        font-size: 3em;
    }

    .c-pointer {
        cursor: pointer;
    }

    .btn-disabled, .btn-disabled:hover {
        background-color: #ddd;
    }

    #photo-form {
        margin-top: 20px;
    }

</style>
