figma.showUI(__html__, { width: 300, height: 280 });
const nodeTypes = ["DOCUMENT", "PAGE", "SLICE"];

const { selection } = figma.currentPage;

figma.ui.onmessage = (msg) => {
  if (msg.type === "scale-value") {
    let result;
    async function resizeFrame() {
      selection.forEach(async (node) => {
        if (!nodeTypes.includes(node.type)) {
          result = msg.scaleAmount / 100;
          if (
            node.type === "COMPONENT" ||
            node.type === "COMPONENT_SET" ||
            node.type === "RECTANGLE" ||
            node.type === "ELLIPSE" ||
            node.type === "INSTANCE" ||
            node.type === "STAR" ||
            node.type === "POLYGON"
          ) {
            node.constraints = {
              horizontal: msg.horizontalConstraint as ConstraintType,
              vertical: msg.verticalConstraint as ConstraintType,
            };
          }
          node.rescale(result);
          node.resize(Math.round(node.width), Math.round(node.height));
          figma.notify(
            `Rescaled to ${node.width}px wide and ${node.height}px high`
          );
        }
      });
    }
    resizeFrame();
    if (msg.checkboxOn === true) {
      figma.closePlugin();
    }
  }

  if (msg.type === "scale-width-value") {
    let result;
    async function resizeFrameByWidth() {
      selection.forEach(async (node) => {
        if (!nodeTypes.includes(node.type)) {
          result = msg.scaleWidthAmount / node.width;
          if (
            node.type === "COMPONENT" ||
            node.type === "COMPONENT_SET" ||
            node.type === "RECTANGLE" ||
            node.type === "ELLIPSE" ||
            node.type === "INSTANCE" ||
            node.type === "STAR" ||
            node.type === "POLYGON"
          ) {
            node.constraints = {
              horizontal: msg.horizontalConstraint as ConstraintType,
              vertical: msg.verticalConstraint as ConstraintType,
            };
          }
          node.rescale(result);
          node.resize(Math.round(node.width), Math.round(node.height));
          figma.notify(`Rescaled to ${node.width}px wide`);
        }
      });
    }
    resizeFrameByWidth();
    if (msg.checkboxOn === true) {
      figma.closePlugin();
    }
  }

  if (msg.type === "scale-height-value") {
    let result;
    async function resizeFrameByHeight() {
      selection.forEach(async (node) => {
        if (!nodeTypes.includes(node.type)) {
          result = msg.scaleHeightAmount / node.height;
          if (
            node.type === "COMPONENT" ||
            node.type === "COMPONENT_SET" ||
            node.type === "RECTANGLE" ||
            node.type === "ELLIPSE" ||
            node.type === "INSTANCE" ||
            node.type === "STAR" ||
            node.type === "POLYGON"
          ) {
            node.constraints = {
              horizontal: msg.horizontalConstraint as ConstraintType,
              vertical: msg.verticalConstraint as ConstraintType,
            };
          }
          node.rescale(result);
          node.resize(Math.round(node.width), Math.round(node.height));
          figma.notify(`Rescaled to ${node.height}px high`);
        }
      });
    }
    resizeFrameByHeight();
    if (msg.checkboxOn === true) {
      figma.closePlugin();
    }
  }
};
