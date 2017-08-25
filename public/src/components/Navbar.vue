<template>
    <div id="navbar">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false">
                          <span class="sr-only">Toggle navigation</span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                        </button>
                    <a class="navbar-brand" href="#">Tyler Rhinehart- Vue Music Checkpoint</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form v-show="!loggedIn" class="navbar-form navbar-right">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="email" v-model="email">
                            <input type="password" class="form-control" placeholder="password" v-model="password">
                        </div>
                        <button type="button" class="btn btn-default" @click="login">Login</button>
                        <button type="button" class="btn btn-default" @click="signup">Signup</button>
                    </form>
                    <div v-show="loggedIn" class="nav navbar navbar-right">
                        <button type="button" class="btn btn-default" @click="logout">Logout</button>
                    </div>
                    <!-- <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">Skills</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Resume</a></li>
                    </ul> -->
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'navbar',
        data() {
            return {
                email: '',
                password: '',
                loggedIn: false
            }
        },
        methods: {
            signup() {
                var user = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('signup', user)
                this.loggedIn = true
                this.email = ''
                this.password= ''
            },
            login() {
                var user = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('login', user)
                this.loggedIn = true
                this.email = ''
                this.password= ''
            },
            logout() {
                this.$store.dispatch('logout')
                this.loggedIn = false
            }
        },
        computed: {
        }
    }

</script>