figma.showUI(__html__, { width: 300, height: 255 });
const nodeTypes = ["DOCUMENT", "PAGE"];
const { selection } = figma.currentPage;

figma.ui.onmessage = (msg) => {
  if (msg.type === "scale-value") {
    let result;
    async function resizeFrame() {
      figma.root.children.flatMap((pageNode) =>
        pageNode.selection.forEach(async (node) => {
          if (!nodeTypes.includes(node.type)) {
            result = msg.scaleAmount / 100;
            node.constraints = {
              horizontal: msg.horizontalConstraint,
              vertical: msg.verticalConstraint,
            };
            node.rescale(result);
            node.resize(Math.round(node.width), Math.round(node.height));
          }
        })
      );
    }
    resizeFrame();
    if (msg.checkboxOn === true) {
      figma.closePlugin();
    }
  }

  if (msg.type === "scale-width-value") {
    let result;
    async function resizeFrameByWidth() {
      figma.root.children.flatMap((pageNode) =>
        pageNode.selection.forEach(async (node) => {
          if (!nodeTypes.includes(node.type)) {
            result = msg.scaleWidthAmount / node.width;
            node.constraints = {
              horizontal: msg.horizontalConstraint,
              vertical: msg.verticalConstraint,
            };
            node.rescale(result);
            node.resize(Math.round(node.width), Math.round(node.height));
          }
        })
      );
    }
    resizeFrameByWidth();
    if (msg.checkboxOn === true) {
      figma.closePlugin();
    }
  }

  if (msg.type === "scale-height-value") {
    let result;
    async function resizeFrameByHeight() {
      figma.root.children.flatMap((pageNode) =>
        pageNode.selection.forEach(async (node) => {
          if (!nodeTypes.includes(node.type)) {
            result = msg.scaleHeightAmount / node.height;
            node.constraints = {
              horizontal: msg.horizontalConstraint,
              vertical: msg.verticalConstraint,
            };
            node.rescale(result);
            node.resize(Math.round(node.width), Math.round(node.height));
          }
        })
      );
    }
    resizeFrameByHeight();
    if (msg.checkboxOn === true) {
      figma.closePlugin();
    }
  }
};
