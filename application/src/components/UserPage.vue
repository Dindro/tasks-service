<script>
export default {
  props: [],
  data() {
    return {
      lastYScrollPos: 0,
      upPos: 0,
      downPos: 0
    };
  },
  methods: {
    scroll(e) {
      // условия - класс элемента не должен фиксироваться
      const boxID = "left-column";
      const boxTop = 70;
      const boxBottom = 15;
      const YScrollPos = e.currentTarget.scrollY;

      // через document, потомучто учитывается без скролл бара
      const winHeight = document.documentElement.clientHeight;

      const box = document.getElementById(boxID);
      const boxHeight = box.clientHeight;
      const boxFullHeight = boxHeight + boxTop + boxBottom;
      const boxInvisibleHeight = boxFullHeight - winHeight;

      // условие при первом запуске
      if (this.downPos === 0) {
        this.downPos = boxInvisibleHeight + YScrollPos;
      }

      // высота экрана больше чем высота блока
      const isBoxOnScreen = boxFullHeight < winHeight;

      // позиция скрола поменялась
      const isScrollChange = this.lastYScrollPos !== YScrollPos;
      if (!isBoxOnScreen && isScrollChange) {
        // скролл вниз
        const isToDown = this.lastYScrollPos < YScrollPos;
        if (isToDown) {
          const rodePos = this.upPos + boxInvisibleHeight;
          const isRodeDown = rodePos < YScrollPos;

          if (isRodeDown) {
            // скрол проехал
            box.classList.add("fixed");
            box.style.bottom = `${boxBottom}px`;
            box.style.marginTop = "";

            // при фиксации меняем позиции
            this.upPos = YScrollPos - boxInvisibleHeight;
            this.downPos = YScrollPos;
          } else {
            // скрол не проехал
            if (box.style.marginTop === "") {
              box.style.marginTop = `${this.upPos}px`;
            }
            box.classList.remove("fixed");
          }
        } else {
          // скролл наверх
          const isRodeUp = this.upPos > YScrollPos;

          if (isRodeUp) {
            // скрол проехал
            box.classList.add("fixed");
            box.style.marginTop = "";

            this.upPos = YScrollPos;
            this.downPos = YScrollPos + boxInvisibleHeight;
          } else {
            if (box.style.marginTop === "") {
              const boxMarginTop = this.downPos - boxInvisibleHeight;
              box.style.marginTop = `${boxMarginTop}px`;
            }
            box.style.bottom = "";
            box.classList.remove("fixed");
          }
        }
      } else if (isBoxOnScreen) {
        box.classList.add("fixed");
        box.style.bottom = "";
        box.style.marginTop = "";
      }
      this.lastYScrollPos = YScrollPos;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
    window.addEventListener("resize", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
    window.removeEventListener("resize", this.scroll);
  }
};
</script>

<template>
	<div class="dinamic">
		<div class="main-user">
			<div id="left-column">
        <div class="user-photo mini-box">
          <div class="photo"></div>
          <button class="send-message">Отправить сообщение</button>
        </div>
        <div class="mini-box friends">
          Избранные 43
          <div class="friends-list">
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
            <div class="friend">
              <div class="friend-photo"></div>
              <span class="friend-name">Дмитрий</span>
            </div>
          </div>
        </div>
        <div class="mini-box tasks">
          Открытые задачи 4
          <div class="tasks-list">
            <div class="task">Описание задачи описание</div>
          </div>
        </div>
      </div>
			<div class="right-column"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dinamic {
  float: right;
  width: 795px;
}
.main-user {
  margin-top: 70px;
  background-color: rgb(159, 185, 185);
}

.mini-box {
  border: 1px solid rgb(230, 230, 230);
  background-color: white;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}

#left-column {
  float: left;
  //height: 900px;
  width: 230px;
  //background: linear-gradient(to top, #ff0000, #00ff00);

  // кроме position ничего добавлять
  &.fixed {
    position: fixed;
  }

  .user-photo {
    .photo {
      height: 200px;
      background-color: violet;
    }

    .send-message {
      width: 100%;
      background-color: slateblue;
      border: none;
      margin-top: 15px;
      border-radius: 3px;
      padding: 10px;
    }
  }

  .friends {
    padding-bottom: 5px;

    .friends-list {
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .friend {
      width: 66px;
      padding-bottom: 10px;

      .friend-photo {
        margin: 0 auto;
        height: 50px;
        width: 50px;
        background-color: grey;
        border-radius: 50%;
      }

      .friend-name {
        text-align: center;
        display: block;
        margin: 0 auto;
        margin-top: 5px;
      }
    }
  }
}

.right-column {
  margin-left: 400px;
  height: 2000px;
  width: 300px;
  background: linear-gradient(to top, #10f0ca, #cf0f5f);
}
</style>

