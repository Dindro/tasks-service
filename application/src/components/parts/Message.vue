<template>
    <div class="block">
        <div class="dialogues">
            <div class="top"></div>
            <ul class="list">
                <li class="dialog">
                    <div class="photo"></div>
                    <div class="content">
                        <div class="top">
                            <span class="name">Мария Ижуткина акакакакакак</span>
                            <span class="time">17:14</span>
                        </div>
                        <div class="bottom">
                            <span class="text">Вы: Код ебашить</span>
                            <div class="read">*</div>
                        </div>
                    </div>
                </li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique labore ab dicta voluptatibus reiciendis repellat voluptatum
                dolorem error officiis debitis, amet repudiandae commodi nisi a obcaecati eius reprehenderit quod nulla.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique labore ab dicta voluptatibus reiciendis
                repellat voluptatum dolorem error officiis debitis, amet repudiandae commodi nisi a obcaecati eius reprehenderit
                quod nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique labore ab dicta voluptatibus
                reiciendis repellat voluptatum dolorem error officiis debitis, amet repudiandae commodi nisi a obcaecati
                eius reprehenderit quod nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique labore
                ab dicta voluptatibus reiciendis repellat voluptatum dolorem error officiis debitis, amet repudiandae commodi
                nisi a obcaecati eius reprehenderit quod nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique labore ab dicta voluptatibus reiciendis repellat voluptatum dolorem error officiis debitis, amet
                repudiandae commodi nisi a obcaecati eius reprehenderit quod nulla. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Similique labore abLorem ipsum dolor sit amet consectetur adipisicing elit. Similique labore
                ab dicta voluptatibus reiciendis repellat voluptatum dolorem error officiis debitis, amet repudiandae commodi
                nisi a obcaecati eius reprehenderit quod nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique labore ab dicta voluptatibus reiciendis repellat voluptatum dolorem error officiis debitis, amet
                repudiandae commodi nisi a obcaecati eius reprehenderit quod nulla. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Similique labore ab dicta voluptatibus reiciendis repellat voluptatum dolorem error officiis
                debitis, amet repudiandae commodi nisi a obcaecati eius reprehenderit quod nulla. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Similique labore ab dicta voluptatibus reiciendis repellat voluptatum dolorem
                error officiis debitis, amet repudiandae commodi nisi a obcaecati eius reprehenderit quod nulla. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Similique labore ab dicta voluptatibus reiciendis repellat voluptatum
                dolorem error officiis debitis, amet repudiandae commodi nisi a obcaecati eius reprehenderit quod nulla.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique labore ab
            </ul>
            <div class="bottom"></div>
        </div>
        <div class="messages"></div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return 
            {};
        },
        computed:{

        },
        beforeRouteEnter(to, from, next) {
            /* store.dispatch("RouteUpdate", { query: to.query }); */
            next();
        },
        beforeRouteUpdate(to, from, next) {
            /* store.dispatch("RouteUpdate", { query: to.query }); */
            next();
        }
        
    };
</script>


<style scoped>
    .block {
        background-color: rgb(202, 210, 214);
        min-height: 598px;
        position: relative;
    }

    .dialogues {
        width: 316px;
        background-color: bisque;
        /* position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        bottom: 0; */
        position: absolute;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }

    .dialogues>.top {
        background-color: brown;
        height: 50px;
        opacity: 0.5;
        width: 100%;
    }

    .list {
        background-color: white;
        height: 100%;
        width: 316px;
        box-sizing: border-box;
        overflow: auto;
        margin: 0;
        padding: 0;
    }

    .dialogues>.bottom {
        background-color: chartreuse;
        height: 50px;
        opacity: 0.5;
        width: 100%;
    }

    .dialog {
        background-color: rgb(235, 235, 235);
        padding: 10px 0;
    }

    .dialog>.photo {
        height: 50px;
        width: 50px;
        background-color: black;
        border-radius: 50%;
        float: left;
    }

    .dialog>.content {
        background-color: aquamarine;
        margin-left: 70px;
    }

    .time {
        float: right;
    }

    .messages {
        width: 479px;
        background-color: cadetblue;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>