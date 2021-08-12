figma.showUI(__html__, { width: 300, height: 500 });
const nodeTypes = ["DOCUMENT", "PAGE", "SLICE"];
figma.ui.onmessage = (msg) => {
    if (msg.type === "set-constraints") {
        async function setConstraints() {
            figma.currentPage.selection.forEach(async (node) => {
                if (node.type === "COMPONENT" ||
                    node.type === "COMPONENT_SET" ||
                    node.type === "RECTANGLE" ||
                    node.type === "ELLIPSE" ||
                    node.type === "INSTANCE" ||
                    node.type === "STAR" ||
                    node.type === "POLYGON" ||
                    node.type === "VECTOR" ||
                    node.type === "FRAME") {
                    node.constraints = {
                        horizontal: msg.horizontalConstraint,
                        vertical: msg.verticalConstraint,
                    };
                }
            });
        }
        setConstraints();
    }
    if (msg.type === "scale-value") {
        let result;
        async function resizeFrame() {
            figma.currentPage.selection.forEach(async (node) => {
                if (!nodeTypes.includes(node.type)) {
                    result = msg.scaleAmount / 100;
                    if (node.type === "COMPONENT" ||
                        node.type === "COMPONENT_SET" ||
                        node.type === "RECTANGLE" ||
                        node.type === "ELLIPSE" ||
                        node.type === "INSTANCE" ||
                        node.type === "STAR" ||
                        node.type === "POLYGON" ||
                        node.type === "VECTOR" ||
                        node.type === "FRAME") {
                        node.constraints = {
                            horizontal: msg.horizontalConstraint,
                            vertical: msg.verticalConstraint,
                        };
                    }
                    node.rescale(result);
                    node.resize(Math.round(node.width), Math.round(node.height));
                    figma.notify(`Rescaled to ${node.width}px wide and ${node.height}px high`);
                }
            });
            console.log(msg.horizontalConstraint, msg.verticalConstraint + " from TS");
        }
        resizeFrame();
        if (msg.checkboxOn === true) {
            figma.closePlugin();
        }
    }
    if (msg.type === "scale-width-value") {
        let result;
        async function resizeFrameByWidth() {
            figma.currentPage.selection.forEach(async (node) => {
                if (!nodeTypes.includes(node.type)) {
                    result = msg.scaleWidthAmount / node.width;
                    if (node.type === "COMPONENT" ||
                        node.type === "COMPONENT_SET" ||
                        node.type === "RECTANGLE" ||
                        node.type === "ELLIPSE" ||
                        node.type === "INSTANCE" ||
                        node.type === "STAR" ||
                        node.type === "POLYGON" ||
                        node.type === "VECTOR" ||
                        node.type === "FRAME") {
                        node.constraints = {
                            horizontal: msg.horizontalConstraint,
                            vertical: msg.verticalConstraint,
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
    if (msg.type === "scale-max-width-value") {
        const { selection } = figma.currentPage;
        async function resizeFrameByMaxWidth() {
            const widths = selection.map((node) => [node.width]);
            const maxWidth = Math.max.apply(null, widths);
            figma.currentPage.selection.forEach(async (node) => {
                if (!nodeTypes.includes(node.type)) {
                    if (node.width !== maxWidth) {
                        const scaleWidth = maxWidth / node.width;
                        node.rescale(scaleWidth);
                        node.resize(Math.round(node.width), Math.round(node.height));
                        figma.notify(`Rescaled to ${node.width}px wide`);
                    }
                }
            });
        }
        resizeFrameByMaxWidth();
        if (msg.checkboxOn === true) {
            figma.closePlugin();
        }
    }
    if (msg.type === "scale-min-width-value") {
        const { selection } = figma.currentPage;
        async function resizeFrameByMinWidth() {
            const widths = selection.map((node) => [node.width]);
            const minWidth = Math.min.apply(null, widths);
            figma.currentPage.selection.forEach(async (node) => {
                if (!nodeTypes.includes(node.type)) {
                    if (node.width !== minWidth) {
                        const scaleWidth = minWidth / node.width;
                        node.rescale(scaleWidth);
                        node.resize(Math.round(node.width), Math.round(node.height));
                        figma.notify(`Rescaled to ${node.width}px wide`);
                    }
                }
            });
        }
        resizeFrameByMinWidth();
        if (msg.checkboxOn === true) {
            figma.closePlugin();
        }
    }
    if (msg.type === "scale-height-value") {
        let result;
        async function resizeFrameByHeight() {
            figma.currentPage.selection.forEach(async (node) => {
                if (!nodeTypes.includes(node.type)) {
                    result = msg.scaleHeightAmount / node.height;
                    if (node.type === "COMPONENT" ||
                        node.type === "COMPONENT_SET" ||
                        node.type === "RECTANGLE" ||
                        node.type === "ELLIPSE" ||
                        node.type === "INSTANCE" ||
                        node.type === "STAR" ||
                        node.type === "POLYGON" ||
                        node.type === "VECTOR" ||
                        node.type === "FRAME") {
                        node.constraints = {
                            horizontal: msg.horizontalConstraint,
                            vertical: msg.verticalConstraint,
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
    if (msg.type === "scale-max-height-value") {
        const { selection } = figma.currentPage;
        async function resizeFrameByMaxHeight() {
            const heights = selection.map((node) => [node.height]);
            const maxHeight = Math.max.apply(null, heights);
            figma.currentPage.selection.forEach(async (node) => {
                if (!nodeTypes.includes(node.type)) {
                    if (node.height !== maxHeight) {
                        const scaleHeight = maxHeight / node.height;
                        node.rescale(scaleHeight);
                        node.resize(Math.round(node.width), Math.round(node.height));
                        figma.notify(`Rescaled to ${node.height}px high`);
                    }
                }
            });
        }
        resizeFrameByMaxHeight();
        if (msg.checkboxOn === true) {
            figma.closePlugin();
        }
    }
    if (msg.type === "scale-min-height-value") {
        const { selection } = figma.currentPage;
        async function resizeFrameByMinHeight() {
            const heights = selection.map((node) => [node.height]);
            const minHeight = Math.min.apply(null, heights);
            figma.currentPage.selection.forEach(async (node) => {
                if (!nodeTypes.includes(node.type)) {
                    if (node.height !== minHeight) {
                        const scaleHeight = minHeight / node.height;
                        node.rescale(scaleHeight);
                        node.resize(Math.round(node.width), Math.round(node.height));
                        figma.notify(`Rescaled to ${node.height}px high`);
                    }
                }
            });
        }
        resizeFrameByMinHeight();
        if (msg.checkboxOn === true) {
            figma.closePlugin();
        }
    }
};
