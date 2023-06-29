"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODE_PROCESSOR_PLUGIN = exports.createCodeProcessorPlugin = void 0;
var function_1 = require("fp-ts/lib/function");
var nullable_1 = require("../../nullable");
var traverse_nodes_1 = require("../../traverse-nodes");
/**
 * Process code in each node.
 */
var preProcessNodeCode = function (_a) {
    // const propertiesProcessor = codeProcessor('properties');
    // for (const key in json.properties) {
    //   const value = json.properties[key];
    //   if (key !== '_text' && value) {
    //     json.properties[key] = propertiesProcessor(value);
    //   }
    // }
    var json = _a.json, codeProcessor = _a.codeProcessor, parentComponent = _a.parentComponent;
    var bindingsProcessor = codeProcessor('bindings', parentComponent);
    for (var key in json.bindings) {
        var value = json.bindings[key];
        if (value === null || value === void 0 ? void 0 : value.code) {
            value.code = bindingsProcessor(value.code, key);
        }
    }
    json.name = codeProcessor('dynamic-jsx-elements', parentComponent)(json.name, '');
};
var createCodeProcessorPlugin = function (codeProcessor) {
    return function (json) {
        var _a;
        function processHook(key, hook) {
            hook.code = codeProcessor('hooks', json)(hook.code, key);
            if (hook.deps) {
                hook.deps = codeProcessor('hooks-deps', json)(hook.deps, key);
            }
        }
        /**
         * process code in hooks
         */
        for (var key in json.hooks) {
            var typedKey = key;
            var hooks = json.hooks[typedKey];
            if ((0, nullable_1.checkIsDefined)(hooks)) {
                if (Array.isArray(hooks)) {
                    for (var _i = 0, hooks_1 = hooks; _i < hooks_1.length; _i++) {
                        var hook = hooks_1[_i];
                        processHook(typedKey, hook);
                    }
                }
                else {
                    processHook(typedKey, hooks);
                }
            }
        }
        for (var key in json.state) {
            var state = json.state[key];
            if (state) {
                state.code = codeProcessor('state', json)(state.code, key);
                if (state.typeParameter) {
                    state.typeParameter = codeProcessor('types', json)(state.typeParameter, key);
                }
            }
        }
        for (var key in json.context.set) {
            var set = json.context.set[key];
            if (set.ref) {
                set.ref = codeProcessor('context-set', json)(set.ref, key);
            }
            if (set.value) {
                for (var key_1 in set.value) {
                    var value = set.value[key_1];
                    if (value) {
                        value.code = codeProcessor('context-set', json)(value.code, key_1);
                    }
                }
            }
        }
        (0, traverse_nodes_1.traverseNodes)(json, function (node) {
            preProcessNodeCode({ json: node, codeProcessor: codeProcessor, parentComponent: json });
        });
        if (json.types) {
            json.types = (_a = json.types) === null || _a === void 0 ? void 0 : _a.map(function (type) { return codeProcessor('types', json)(type, ''); });
        }
        if (json.propsTypeRef) {
            json.propsTypeRef = codeProcessor('types', json)(json.propsTypeRef, '');
        }
    };
};
exports.createCodeProcessorPlugin = createCodeProcessorPlugin;
/**
 * Given a `codeProcessor` function, processes all code expressions within a Mitosis component.
 */
exports.CODE_PROCESSOR_PLUGIN = (0, function_1.flow)(exports.createCodeProcessorPlugin, function (plugin) {
    return function () { return ({ json: { post: plugin } }); };
});
