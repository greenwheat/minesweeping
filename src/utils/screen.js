// 弹窗时锁屏和解锁

function pageLockHandler(e) {
  e.preventDefault();
}

export const Screen = {
  version: "1.0.0",

  /**
   * @function lock the screen
   **/
  lock: function() {
    document.addEventListener("touchmove", pageLockHandler, {
      capture: false,
      passive: false
    });
    document.documentElement.addEventListener(
      "mousewheel",
      pageLockHandler,
      {
        capture: false,
        passive: false
      }
    );
    document.documentElement.addEventListener(
      "DOMMouseScroll",
      pageLockHandler,
      {
        capture: false,
        passive: false
      }
    );
    // document.addEventListener("touchmove", pageLockHandler, false)
  },

  /**
   * @function unlock the screen
   **/
  unlock: function() {
    document.removeEventListener(
      "touchmove",
      pageLockHandler,
      {
        capture: false
      }
    );
    document.documentElement.removeEventListener(
      "mousewheel",
      pageLockHandler,
      {
        capture: false
      }
    );
    document.documentElement.removeEventListener(
      "DOMMouseScroll",
      pageLockHandler,
      {
        capture: false
      }
    );
    // document.removeEventListener("touchmove", pageLockHandler, false)
  }
};
