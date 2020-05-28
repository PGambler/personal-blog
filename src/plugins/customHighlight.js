import hljs from "highlight.js"
import "highlight.js/styles/tomorrow-night.css"

/**
 * 自定义代码高亮指令：v-highlight
 */
let Highlight = {}
const MAX_HEIGHT = "180px";
Highlight.install = function (Vue) {
  // 被绑定元素插入父节点时调用
  Vue.directive("highlight", {
    inserted: function (el) {
      let blocks = el.querySelectorAll("pre code");
      for (let i = 0; i < blocks.length; i++) {
        if ($(blocks[i]).find(".line-numbers-rows").length) continue;
        hljs.highlightBlock(blocks[i]);
        blocks[i].style.maxHeight = MAX_HEIGHT;
        let lines = $(blocks[i]).text().split("\n").length - 1;
        let $numbering = $('<span aria-hidden="true" class="line-numbers-rows"></span>');
        if (lines > 9) $numbering.width("2em");
        if (lines > 99) $numbering.width("3em");
        if (lines > 999) $numbering.width("4em");
        for (let j = 1; j <= lines; j++) {
          $numbering.append($('<span/>'));
        }
        $numbering.prependTo($(blocks[i]));
      }
    },
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: function (el) {
      let blocks = el.querySelectorAll("pre code");
      for (let i = 0; i < blocks.length; i++) {
        if ($(blocks[i]).find(".line-numbers-rows").length) continue;
        hljs.highlightBlock(blocks[i]);
        blocks[i].style.maxHeight = MAX_HEIGHT;
        let lines = $(blocks[i]).text().split("\n").length - 1;
        let $numbering = $('<span aria-hidden="true" class="line-numbers-rows"></span>');
        if (lines > 9) $numbering.width("2em");
        if (lines > 99) $numbering.width("3em");
        if (lines > 999) $numbering.width("4em");
        for (let j = 1; j <= lines; j++) {
          $numbering.append($('<span/>'));
        }
        $numbering.prependTo($(blocks[i]));
      }
    }
  })
};

export default Highlight;