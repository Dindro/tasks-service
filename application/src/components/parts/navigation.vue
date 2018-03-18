<template>
	<div class="main">
		<div id="nav">
			<div class="nav-content">
				<span>Моя страница</span>
				<span>Моя страница</span>
				<span>Моя страница</span>
				<span>Моя страница</span>
				<span>Моя страница</span>
				<span>Моя страница</span>
				<router-link tag="span" to="/messages">Сообщения</router-link>
				<router-link tag="span" to="/chats">Чат</router-link>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
</script>

<style lang="scss">
$color-black: #444444;

.main {
  width: 960px;
  margin: 0 auto;
  padding: 0 15px;

  // Нужен для того чтобы сделать размер правильным из за float
  &::after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
  }

  #nav {
    position: fixed;
    min-height: 100vh;
    width: 149px;
    margin-top: 57px;
    float: left;

    > .nav-content {
      width: 100%;

      > span {
        display: block;
        padding: 8px 0 8px 25px;
        color: $color-black;
        white-space: nowrap; /* Запрещаем перенос строк */
        overflow: hidden; /* Обрезаем все, что не помещается в область */

        &:hover {
          background-color: #e1e5eb;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>