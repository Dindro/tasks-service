<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<template>
	<div class="dinamic">
		<router-view></router-view>
		<div id="options">
			<div class="options-content">
				<router-link
          class="active"
          tag="span"
          :to="{name:'chats'}">
          Все сообщения
        </router-link>
				<span >Непрочитанные</span>
				<span>Важные</span>
				<!-- <div class="line"></div>
				<span>Яковлев Андрей</span>
				<span>Потрясилов Дмитрий</span>
				<span>Доставить букет цветов</span>
				<div class="line"></div>
				<span>C задачами 34</span>
				<div id="tasks">
					<span>Все сообщенияrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</span>
					<span>Очень сложное задание по моему</span>
					<span>Важные</span>
					<span>Все сообщения</span>
					<span>Непрочитанные</span>
					<span>Важные</span>
					<span>Все сообщения</span>
					<span>Непрочитанные</span>
					<span>Важные</span>
					<span>Все сообщения</span>
					<span>Непрочитанные</span>
					<span>Важные</span>
					<span>Все сообщения</span>
					<span>Непрочитанные</span>
					<span>Важные</span>
					<span>Все сообщения</span>
					<span>Непрочитанные</span>
					<span>Важные</span>
					<span>Все сообщения</span>
					<span>Непрочитанные</span>
					<span>Важные</span>
					<span>Все сообщения</span>
					<span>Непрочитанные</span>
					<span>Важные</span>
				</div> -->
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "../../assets/colors.scss";

$color-border: #e3e4e8;
$color-black: #444444;

.dinamic {
  float: right;
  width: 795px;

  #options {
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: fixed;
    width: 230px;
    float: right;
    margin-left: 565px;

    .line {
      border-top: 1px solid $color-border;
      margin: 7px 15px;
    }

    .options-content {
      max-height: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 57px;
      margin-bottom: 15px;
      overflow: hidden;
      background-color: white;
      padding: 7px 0 0 0;
      border: 1px solid $color-border;
      border-radius: 2px 2px;

      > span {
        flex: 0 0 auto;
        display: block;
        color: $color-black;
        padding: 8px 10px 8px 20px;
        white-space: nowrap; // Запрещаем перенос строк
        text-overflow: ellipsis; // Добавляем многоточие
        overflow: hidden;
        cursor: pointer;

        &.active {
          background-color: #f0f2f5;
          font-weight: 500;
          border-left: 2px solid $clr-blue;
          padding-left: 18px;
        }

        &:hover {
          background-color: #f0f2f5;
        }
      }
    }

    #tasks {
      flex: 1 1 auto;
      overflow: auto;
      padding-bottom: 8px;

      &::-webkit-scrollbar {
        width: 7px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: $color-border;
        border-radius: 10px;

        &:hover {
          background-color: #d9dadd;
        }
      }

      span {
        white-space: nowrap; /* Запрещаем перенос строк */
        overflow: hidden; /* Обрезаем все, что не помещается в область */
        text-overflow: ellipsis; /* Добавляем многоточие */
        display: block;
        color: $color-black;
        padding: 8px 10px 8px 40px;
        transition: background-color ease-out 0.1s;

        &:hover {
          background-color: #f0f2f5;
        }
      }
    }
  }
}
</style>