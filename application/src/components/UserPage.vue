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
      const boxID = "left";
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
      const isBoxOnScreen = boxFullHeight > winHeight;

      // позиция скрола поменялась
      const isScrollChange = this.lastYScrollPos !== YScrollPos;
      if (isBoxOnScreen && isScrollChange) {
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
      }
      this.lastYScrollPos = YScrollPos;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
    window.addEventListener("resize", this.scroll);
  }
};
</script>

<template>
	<div class="dinamic">
		<div class="main-user">
			<div id="left" class=""></div>
			<div class="right"></div>
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

#left {
  float: left;
  height: 900px;
  width: 300px;
  background: linear-gradient(to top, #ff0000, #00ff00);
  //position: fixed;

  &.fixed {
    position: fixed;
    //boxBottom: 15px;
  }
}

.right {
  margin-left: 400px;
  height: 2000px;
  width: 300px;
  background: linear-gradient(to top, #10f0ca, #cf0f5f);
}
</style>

