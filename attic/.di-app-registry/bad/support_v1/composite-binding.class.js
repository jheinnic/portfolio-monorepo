"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class CompositeBinding {
    constructor(hostBuilder) {
        this.hostBuilder = hostBuilder;
        this.CompositeBindingWhenSyntax = class CompositeBindingWhenOnSyntax extends index_1.UnsupportedBindingWhenOnSyntax {
            constructor(constraintList, bindingOnSyntax) {
                super();
                this.constraintList = constraintList;
                if (!!bindingOnSyntax) {
                    this.bindingOnSyntax = bindingOnSyntax;
                }
                else {
                    this.bindingOnSyntax = new index_1.NoOpBindingOn(this);
                }
            }
            when(constraint) {
                this.constraintList.push(constraint);
                return this.bindingOnSyntax;
            }
            onActivation(_fn) {
                this.bindingOnSyntax.onActivation(_fn);
                return this;
            }
        };
        this.constraintList = [];
    }
    apply(director) {
        director(this);
        this.hostBuilder.when((request) => this.constraintList.every((constraint) => constraint(request)));
    }
    bindHost(director) {
        const builder = new this.CompositeBindingWhenSyntax(this.constraintList, this.hostBuilder);
        director(builder);
        return this;
    }
    bindParent(director) {
        const delegate = new this.CompositeBindingWhenSyntax(this.constraintList);
        const builder = new index_1.BindingWhenOnChildSyntax(delegate);
        director(builder);
        return this;
    }
    bindAncestor(generationDistance, director) {
        const delegate = new this.CompositeBindingWhenSyntax(this.constraintList);
        const builder = new index_1.BindingWhenOnGrandChildSyntax(delegate, generationDistance);
        director(builder);
        return this;
    }
}
exports.CompositeBinding = CompositeBinding;
