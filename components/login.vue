<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-9 col-lg-6 mx-auto">
                        <!-- form card login -->
                        <div class="card rounded-0">
                            <div class="card-header" id="login-header">
                                <h3 class="mb-0 text-center"><img src="img/creender.png" /></h3>
                            </div>
                            <div class="card-body">
                                <div class="my-3 row">
                                    <h2 class="col-md-6">
                                        {{ title }}
                                    </h2>
                                    <div class="col-md-6 text-md-right">
                                        <button type="button" class="btn btn-info btn-sm" @click="logininfo.useGoogle = !logininfo.useGoogle">{{ buttonTitle }}</button>
                                    </div>
                                </div>
                                <form class="form" role="form" id="formLogin" @submit.prevent="$emit('login', logininfo)">
                                    <div class="form-group">
                                        <label for="institution1">{{ lang.institution_code }}</label>
                                        <input pattern="[0-9]+-[0-9]{5}" v-model="logininfo.institution" type="text" class="form-control form-control-lg rounded-0" name="institution" id="institution1" required="">
                                    </div>
                                    <div class="form-group" v-if="!logininfo.useGoogle">
                                        <label for="uname1">{{ lang.user }}</label>
                                        <input v-model="logininfo.username" type="text" class="form-control form-control-lg rounded-0" name="username" id="uname1" required="">
                                    </div>
                                    <div class="form-group" v-if="!logininfo.useGoogle">
                                        <label for="pwd1">{{ lang.password }}</label>
                                        <input v-model="logininfo.password" type="password" class="form-control form-control-lg rounded-0" id="pwd1" required="" name="password">
                                    </div>
                                    <button type="submit" class="btn btn-success btn-lg float-right" id="btnLogin">Login</button>
                                </form>
                            </div>
                            <!--/card-block-->
                        </div>

                        <p class="text-center p-3">
                            <router-link to="/admin">{{ lang.adminpanel }}</router-link>
                        </p>
                        <!-- /form card login -->

                    </div>


                </div>
                <!--/row-->

            </div>
            <!--/col-->
        </div>
        <!--/row-->
    </div>
    <!--/container-->
</template>

<script>
    module.exports = {
        props: ['logininfo'],
        computed: {
            title: function() {
                return this.logininfo.useGoogle ? "Social login" : "Login";
            },
            buttonTitle: function() {
                return this.logininfo.useGoogle ? "Standard login" : "Social login";
            }
        }
    }
</script>

<style>
    #login-header img {
        width: 80%;
    }
</style>