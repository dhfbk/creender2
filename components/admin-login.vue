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
                            <h1 class="my-3">{{ lang.adminpanel }}</h1>
                                <form class="form" role="form" id="formLogin" @submit.prevent="$emit('login', logininfo)">
                                    <div class="form-group">
                                        <label for="pwd1">{{ lang.password }}</label>
                                        <input v-model="logininfo.password" type="password" class="form-control form-control-lg rounded-0" id="pwd1" required="" name="pwd1">
                                    </div>
                                    <button type="submit" class="btn btn-success btn-lg float-right" id="btnLogin">Login</button>
                                </form>
                            </div>
                            <!--/card-block-->
                        </div>

                        <p class="text-center p-3">
                            <router-link to="/">{{ lang.loginpanel }}</router-link>
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
        props: ['logininfo']
    }
</script>

<style>
    #login-header img {
        width: 80%;
    }
</style>