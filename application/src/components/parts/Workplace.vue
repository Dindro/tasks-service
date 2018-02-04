<template>
    <div class="main">
        <div class="workplace">
            <div class="menu">
                <ul>
                    <li><router-link to="/">Главная</router-link></li>
                    <li><router-link to="/dialogues">Сообщения</router-link></li>
                    <li><router-link to="/login">Авторизация</router-link></li>
                </ul>
            </div>
            <router-view></router-view>
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
        background-color: rgb(238, 238, 238);
        display: flex;
    }

    .menu {
        width: 200px;
        height: 400px;
        background-color: rgb(194, 193, 193);
    }
</style>