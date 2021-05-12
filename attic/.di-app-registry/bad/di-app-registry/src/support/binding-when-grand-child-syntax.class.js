"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const index_1 = require("./index");
class BindingWhenGrandChildSyntax {
    constructor(grandChildBuilder, generationDistance) {
        this.grandChildBuilder = grandChildBuilder;
        this.generationDistance = generationDistance;
        if (!grandChildBuilder) {
            throw new Error();
        }
        if (generationDistance < 1) {
            throw new Error();
        }
        this.noOpBinding = new index_1.NoOpBindingOn(this);
    }
    when(constraint) {
        this.grandChildBuilder.when((grandChildRequest) => {
            return constraint(grandChildRequest.parentRequest);
        });
        return this.noOpBinding;
    }
    whenAnyAncestorIs(ancestor) {
        this.grandChildBuilder.when((request) => {
            return inversify_1.traverseAncerstors(this.getGrandParentRequest(request), inversify_1.typeConstraint(ancestor));
        });
        return this.noOpBinding;
    }
    whenAnyAncestorMatches(constraint) {
        this.grandChildBuilder.when((request) => {
            return constraint(this.getGrandParentRequest(request));
        });
        return this.noOpBinding;
    }
    whenAnyAncestorNamed(name) {
        this.grandChildBuilder.when((request) => {
            return inversify_1.traverseAncerstors(this.getGrandParentRequest(request), inversify_1.namedConstraint(name));
        });
        return this.noOpBinding;
    }
    whenAnyAncestorTagged(tag, value) {
        this.grandChildBuilder.when((request) => {
            return inversify_1.traverseAncerstors(this.getGrandParentRequest(request), inversify_1.taggedConstraint(tag)(value));
        });
        return this.noOpBinding;
    }
    whenInjectedInto(parent) {
        this.grandChildBuilder.when((request) => {
            return inversify_1.typeConstraint(parent)(this.getGrandParentRequest(request).parentRequest);
        });
        return this.noOpBinding;
    }
    whenNoAncestorIs(ancestor) {
        this.grandChildBuilder.when((request) => {
            return !inversify_1.traverseAncerstors(this.getGrandParentRequest(request), inversify_1.typeConstraint(ancestor));
        });
        return this.noOpBinding;
    }
    whenNoAncestorMatches(constraint) {
        this.grandChildBuilder.when((request) => {
            return !inversify_1.traverseAncerstors(this.getGrandParentRequest(request), constraint);
        });
        return this.noOpBinding;
    }
    whenNoAncestorNamed(name) {
        this.grandChildBuilder.when((request) => {
            return !inversify_1.traverseAncerstors(this.getGrandParentRequest(request), inversify_1.namedConstraint(name));
        });
        return this.noOpBinding;
    }
    whenNoAncestorTagged(tag, value) {
        this.grandChildBuilder.when((request) => {
            return !inversify_1.traverseAncerstors(this.getGrandParentRequest(request), inversify_1.taggedConstraint(tag)(value));
        });
        return this.noOpBinding;
    }
    whenParentNamed(name) {
        this.grandChildBuilder.when((request) => {
            return inversify_1.namedConstraint(name)(this.getGrandParentRequest(request));
        });
        return this.noOpBinding;
    }
    whenParentTagged(tag, value) {
        this.grandChildBuilder.when((request) => {
            return inversify_1.taggedConstraint(tag)(value)(this.getGrandParentRequest(request));
        });
        return this.noOpBinding;
    }
    whenTargetIsDefault() {
        this.grandChildBuilder.when((request) => {
            var parentTarget = this.getGrandParentRequest(request).target;
            return (parentTarget !== null) &&
                (!parentTarget.isNamed()) &&
                (!parentTarget.isTagged());
        });
        return this.noOpBinding;
    }
    whenTargetNamed(name) {
        this.grandChildBuilder.when((request) => {
            return inversify_1.namedConstraint(name)(this.getGrandParentRequest(request));
        });
        return this.noOpBinding;
    }
    whenTargetTagged(tag, value) {
        this.grandChildBuilder.when((request) => {
            return inversify_1.taggedConstraint(tag)(value)(this.getGrandParentRequest(request));
        });
        return this.noOpBinding;
    }
    getGrandParentRequest(request) {
        let currentParent = request.parentRequest;
        for (let ii = 1; ii < this.generationDistance; ii++) {
            if (!currentParent) {
                throw new Error(`No parent at generation ${ii}`);
            }
            currentParent = currentParent.parentRequest;
        }
        if (!currentParent) {
            throw new Error(`No parent at generation ${this.generationDistance}`);
        }
        return currentParent;
    }
}
exports.BindingWhenGrandChildSyntax = BindingWhenGrandChildSyntax;
