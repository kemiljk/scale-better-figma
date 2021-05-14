var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 300, height: 255 });
const nodeTypes = ["DOCUMENT", "PAGE"];
const { selection } = figma.currentPage;
figma.ui.onmessage = (msg) => {
    if (msg.type === "scale-value") {
        let result;
        function resizeFrame() {
            return __awaiter(this, void 0, void 0, function* () {
                selection.forEach((node) => __awaiter(this, void 0, void 0, function* () {
                    if (!nodeTypes.includes(node.type)) {
                        result = msg.scaleAmount / 100;
                        node.constraints = {
                            horizontal: msg.horizontalConstraint,
                            vertical: msg.verticalConstraint,
                        };
                        node.rescale(result);
                        node.resize(Math.round(node.width), Math.round(node.height));
                        figma.notify(`Rescaled to ${node.width}px wide and ${node.height}px high`);
                    }
                }));
            });
        }
        resizeFrame();
        if (msg.checkboxOn === true) {
            figma.closePlugin();
        }
    }
    if (msg.type === "scale-width-value") {
        let result;
        function resizeFrameByWidth() {
            return __awaiter(this, void 0, void 0, function* () {
                selection.forEach((node) => __awaiter(this, void 0, void 0, function* () {
                    if (!nodeTypes.includes(node.type)) {
                        result = msg.scaleWidthAmount / node.width;
                        node.constraints = {
                            horizontal: msg.horizontalConstraint,
                            vertical: msg.verticalConstraint,
                        };
                        node.rescale(result);
                        node.resize(Math.round(node.width), Math.round(node.height));
                        figma.notify(`Rescaled to ${node.width}px wide`);
                    }
                }));
            });
        }
        resizeFrameByWidth();
        if (msg.checkboxOn === true) {
            figma.closePlugin();
        }
    }
    if (msg.type === "scale-height-value") {
        let result;
        function resizeFrameByHeight() {
            return __awaiter(this, void 0, void 0, function* () {
                selection.forEach((node) => __awaiter(this, void 0, void 0, function* () {
                    if (!nodeTypes.includes(node.type)) {
                        result = msg.scaleHeightAmount / node.height;
                        node.constraints = {
                            horizontal: msg.horizontalConstraint,
                            vertical: msg.verticalConstraint,
                        };
                        node.rescale(result);
                        node.resize(Math.round(node.width), Math.round(node.height));
                        figma.notify(`Rescaled to ${node.height}px high`);
                    }
                }));
            });
        }
        resizeFrameByHeight();
        if (msg.checkboxOn === true) {
            figma.closePlugin();
        }
    }
};
