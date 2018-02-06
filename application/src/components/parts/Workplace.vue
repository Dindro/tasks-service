<template>
    <div class="main">
        <div class="workplace">
            <div class="menu">
                <div class="list">
                    <router-link to="/">Главная</router-link>
                    <router-link to="/dialogues">Сообщения</router-link>
                    <router-link to="/login">Авторизация</router-link>
                    <router-link to="/test">Тест</router-link>
                </div>
            </div>
            <div class="router">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    .main {
        display: flex;
        justify-content: center;
        min-width: 960px;
        margin-top: 10px;
    }

    .workplace {
        width: 960px;
        height: 100%;
        display: flex;
        align-items: flex-start;
    }

    .menu {
        width: 165px;
    }

    .list{
        width: 155px;
    }

    a {
        display: block;
        text-decoration: none;
        padding: 7px 7px 7px 35px;
        font-family: "Roboto";
        font-size: 13px;
        color: rgb(42, 88, 133);
    }

    a:hover {
        background-color: rgb(240, 242, 245);
        border-radius: 3px;
    }

    .router {
        width: 795px;
    }
</style>