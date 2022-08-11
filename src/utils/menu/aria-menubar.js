import MenuItem from './aria-menuitem';

const Menu = function(domNode) {
  this.domNode = domNode;
  this.init();
};

Menu.prototype.init = function() {
  // 添加判断childNodes是否为空
  if (!this.domNode) return;
  let menuChildren = this.domNode.childNodes;
  [].filter.call(menuChildren, child => child.nodeType === 1).forEach(child => {
    new MenuItem(child); // eslint-disable-line
  });
};
export default Menu;
