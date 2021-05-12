"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const index_1 = require("./index");
class BindingWhenChildSyntax {
    constructor(childBuilder) {
        this.childBuilder = childBuilder;
        this.noOpBinding = new index_1.NoOpBindingOn(this);
    }
    when(constraint) {
        this.childBuilder.when((childRequest) => {
            return constraint(childRequest.parentRequest);
        });
        return this.noOpBinding;
    }
    whenAnyAncestorIs(ancestor) {
        this.childBuilder.when(function (request) {
            return inversify_1.traverseAncerstors(request.parentRequest, inversify_1.typeConstraint(ancestor));
        });
        return this.noOpBinding;
    }
    whenAnyAncestorMatches(constraint) {
        this.childBuilder.when(function (request) {
            return constraint(request.parentRequest);
        });
        return this.noOpBinding;
    }
    whenAnyAncestorNamed(name) {
        this.childBuilder.when(function (request) {
            return inversify_1.traverseAncerstors(request.parentRequest, inversify_1.namedConstraint(name));
        });
        return this.noOpBinding;
    }
    whenAnyAncestorTagged(tag, value) {
        this.childBuilder.when(function (request) {
            return inversify_1.traverseAncerstors(request.parentRequest, inversify_1.taggedConstraint(tag)(value));
        });
        return this.noOpBinding;
    }
    whenInjectedInto(parent) {
        this.childBuilder.when(function (request) {
            return inversify_1.typeConstraint(parent)(request.parentRequest.parentRequest);
        });
        return this.noOpBinding;
    }
    whenNoAncestorIs(ancestor) {
        this.childBuilder.when(function (request) {
            return !inversify_1.traverseAncerstors(request.parentRequest, inversify_1.typeConstraint(ancestor));
        });
        return this.noOpBinding;
    }
    whenNoAncestorMatches(constraint) {
        this.childBuilder.when(function (request) {
            return !inversify_1.traverseAncerstors(request.parentRequest, constraint);
        });
        return this.noOpBinding;
    }
    whenNoAncestorNamed(name) {
        this.childBuilder.when(function (request) {
            return !inversify_1.traverseAncerstors(request.parentRequest, inversify_1.namedConstraint(name));
        });
        return this.noOpBinding;
    }
    whenNoAncestorTagged(tag, value) {
        this.childBuilder.when(function (request) {
            return !inversify_1.traverseAncerstors(request.parentRequest, inversify_1.taggedConstraint(tag)(value));
        });
        return this.noOpBinding;
    }
    whenParentNamed(name) {
        this.childBuilder.when(function (request) {
            return inversify_1.namedConstraint(name)(request.parentRequest);
        });
        return this.noOpBinding;
    }
    whenParentTagged(tag, value) {
        this.childBuilder.when(function (request) {
            return inversify_1.taggedConstraint(tag)(value)(request.parentRequest);
        });
        return this.noOpBinding;
    }
    whenTargetIsDefault() {
        this.childBuilder.when(function (request) {
            var parentTarget = request.parentRequest.target;
            return (parentTarget !== null) &&
                (!parentTarget.isNamed()) &&
                (!parentTarget.isTagged());
        });
        return this.noOpBinding;
    }
    whenTargetNamed(name) {
        this.childBuilder.when((request) => {
            return inversify_1.namedConstraint(name)(request.parentRequest);
        });
        return this.noOpBinding;
    }
    whenTargetTagged(tag, value) {
        this.childBuilder.when((request) => {
            return inversify_1.taggedConstraint(tag)(value)(request.parentRequest);
        });
        return this.noOpBinding;
    }
}
exports.BindingWhenChildSyntax = BindingWhenChildSyntax;
