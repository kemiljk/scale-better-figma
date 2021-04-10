figma.showUI(__html__, { width: 300, height: 150 });
// const nodeTypes = ["FRAME", "COMPONENT", "INSTANCE", "GROUP", "RECTANGLE", "ELLIPSE", ""];
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
            node.rescale(result);
            node.resize(Math.round(node.width), Math.round(node.height));
          }
        })
      );
    }
    resizeFrame();
  }
  if (msg.type === "scale-width-value") {
    let result;
    async function resizeFrameByWidth() {
      figma.root.children.flatMap((pageNode) =>
        pageNode.selection.forEach(async (node) => {
          if (!nodeTypes.includes(node.type)) {
            result = msg.scaleWidthAmount / node.width;
            node.rescale(result);
            node.resize(Math.round(node.width), Math.round(node.height));
          }
        })
      );
    }
    resizeFrameByWidth();
  }
};
