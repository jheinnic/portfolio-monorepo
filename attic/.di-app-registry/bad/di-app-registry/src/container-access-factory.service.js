"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerAccessFactory {
    bound(id) {
        return (context) => {
            return context.get(id);
        };
    }
    boundNamed(id, name) {
        return (context) => {
            return context.getNamed(id, name);
        };
    }
    boundTagged(id, tag, value) {
        return (context) => {
            return context.getTagged(id, tag, value);
        };
    }
    multiBound(id) {
        return (context) => {
            return context.getAll(id);
        };
    }
}
exports.ContainerAccessFactory = ContainerAccessFactory;
