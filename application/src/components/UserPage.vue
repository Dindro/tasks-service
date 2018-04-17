<script>
export default {
  props: [],
  data() {
    return {
      lastYScrollPos: 0,
      lastDownScrollPos: 0,
      lastUpScrollPos: 0,
      upLeftPos: 0,
      downLeftPos: 0
    };
  },
  methods: {
    scroll(e) {
      const bottom = 15;
      const topScreen = 70;
      const YScrollPos = e.currentTarget.pageYOffset;

      const left = document.getElementById("left");
      const leftHeight = left.clientHeight;
      const leftFullHeight = leftHeight + topScreen + bottom;
      const rodeHeight = leftFullHeight - window.innerHeight;

      // высота экрана больше чем
      if (leftFullHeight > window.innerHeight) {
        // скролл вниз?
        const isToDown = this.lastYScrollPos < YScrollPos;
        if (isToDown) {
          // const isRode = this.lastUpScrollPos + rodeHeight < YScrollPos;
          const isRode = (() => {
            const rode = this.upLeftPos + rodeHeight;
            const isRodeCenter = rode < YScrollPos;

            return isRodeCenter /* YScrollPos > rodeHeight || YScrollPos  */;
          })();
          const isCenter =
            /* this.lastUpScrollPos */ this.upLeftPos - rodeHeight > 0;

          console.log("isRode ", isRode);
          console.log("isCenter ", isCenter);

          // скрол проехал?
          if (isRode) {
            left.classList.add("fixed");
            left.style.bottom = `${bottom}px`;
            left.style.marginTop = "";
            this.downLeftPos = YScrollPos;
          } else if (isCenter) {
            // если скролл в центре
            const leftMarginTop = left.style.marginTop;

            if (leftMarginTop === "") {
              const marginTop = this.upLeftPos;
              left.style.marginTop = `${marginTop}px`;
            }
            left.classList.remove("fixed");
          } else {
            left.classList.remove("fixed");
          }

          // Фиксируем позицию
          this.lastDownScrollPos = YScrollPos;
        } else {
          // иначе: скролл вверх
					//const rodeUpHeight = this.downLeftPos - rodeHeight;
					/* this.lastDownScrollPos */
          const isRodeUp = (() => {
            return this.downLeftPos - rodeHeight > YScrollPos;
          })();
					console.log('isRodeUP ',isRodeUp);
          if (isRodeUp) {
            left.classList.add("fixed");
            left.style.marginTop = "";
            this.upLeftPos = YScrollPos;
          } else {
            if (left.style.marginTop === "") {
              //const marginTop = this.lastDownScrollPos - rodeHeight;
              const marginTop = this.downLeftPos - rodeHeight;
              left.style.marginTop = `${marginTop}px`;
            }
            left.style.bottom = "";
            left.classList.remove("fixed");
          }
          this.lastUpScrollPos = YScrollPos;
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
			<div id="left" class="fixed"></div>
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
    //bottom: 15px;
  }
}

.right {
  margin-left: 400px;
  height: 2000px;
  width: 300px;
  background: linear-gradient(to top, #10f0ca, #cf0f5f);
}
</style>

