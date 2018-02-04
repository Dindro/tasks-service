<template>
    <div>
        <div class="upp">
            <div class="content"></div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

</script>

<style scoped>
    .upp {
        height: 42px;
        background-color: #4a76a8;
        display: flex;
        justify-content: center;
        min-width: 960px;
    }
    .content{
        width: 960px;
        background-color: #6584a8;
        height: 100%;
    }
</style>