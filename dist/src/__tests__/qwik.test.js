"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_promise_1 = require("fs-extra-promise");
var path_1 = require("path");
var strip_ansi_1 = __importDefault(require("strip-ansi"));
var qwik_1 = require("../generators/qwik");
var component_generator_1 = require("../generators/qwik/component-generator");
var index_1 = require("../generators/qwik/index");
var builder_1 = require("../parsers/builder");
var jsx_1 = require("../parsers/jsx");
var compile_away_builder_components_1 = require("../plugins/compile-away-builder-components");
var symbol_processor_1 = require("../symbols/symbol-processor");
var test_generator_1 = require("./test-generator");
var todo_lite_tsx_raw_1 = __importDefault(require("../../../../examples/todo/src/components/todo.lite.tsx?raw"));
var todos_lite_tsx_raw_1 = __importDefault(require("../../../../examples/todo/src/components/todos.lite.tsx?raw"));
var debugFiles = true;
var debugOutput = function (fileSet) { return __awaiter(void 0, void 0, void 0, function () {
    var testName, base, _a, _b, _i, key, file;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                testName = (0, strip_ansi_1.default)(expect.getState().currentTestName);
                base = 'dist/test/' + testName.split(/[\s>]+/g).join('/') + '/';
                if (!debugFiles) return [3 /*break*/, 4];
                _a = [];
                for (_b in fileSet)
                    _a.push(_b);
                _i = 0;
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                key = _a[_i];
                file = fileSet[key];
                return [4 /*yield*/, (0, fs_extra_promise_1.outputFileAsync)((0, path_1.resolve)(base, file.path), file.contents)];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
describe('qwik', function () {
    (0, test_generator_1.runTestsForTarget)({ options: {}, target: 'qwik', generator: component_generator_1.componentToQwik });
    describe('todo', function () {
        test('Todo.tsx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var json, fileSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = (0, jsx_1.parseJsx)(todo_lite_tsx_raw_1.default);
                        fileSet = (0, index_1.createFileSet)({ output: 'ts' });
                        (0, index_1.addComponent)(fileSet, json);
                        return [4 /*yield*/, debugOutput(fileSet)];
                    case 1:
                        _a.sent();
                        expect(toObj(fileSet)).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        test('Todo.cjs', function () { return __awaiter(void 0, void 0, void 0, function () {
            var json, fileSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = (0, jsx_1.parseJsx)(todo_lite_tsx_raw_1.default);
                        fileSet = (0, index_1.createFileSet)({ output: 'cjs', jsx: false });
                        (0, index_1.addComponent)(fileSet, json);
                        return [4 /*yield*/, debugOutput(fileSet)];
                    case 1:
                        _a.sent();
                        expect(toObj(fileSet)).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        test('Todo.js', function () { return __awaiter(void 0, void 0, void 0, function () {
            var json, fileSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = (0, jsx_1.parseJsx)(todo_lite_tsx_raw_1.default);
                        fileSet = (0, index_1.createFileSet)({
                            output: 'mjs',
                            jsx: false,
                        });
                        (0, index_1.addComponent)(fileSet, json);
                        return [4 /*yield*/, debugOutput(fileSet)];
                    case 1:
                        _a.sent();
                        expect(toObj(fileSet)).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('todos', function () {
        test('Todo.tsx', function () { return __awaiter(void 0, void 0, void 0, function () {
            var json, fileSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = (0, jsx_1.parseJsx)(todos_lite_tsx_raw_1.default);
                        fileSet = (0, index_1.createFileSet)({ output: 'ts' });
                        (0, index_1.addComponent)(fileSet, json);
                        return [4 /*yield*/, debugOutput(fileSet)];
                    case 1:
                        _a.sent();
                        expect(toObj(fileSet)).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('hello_world', function () {
        test('stylesheet', function () { return __awaiter(void 0, void 0, void 0, function () {
            var component, fileSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        component = (0, builder_1.builderContentToMitosisComponent)(require('./qwik/specs/qwik.test.hello_world.json'));
                        fileSet = (0, index_1.createFileSet)({ output: 'mjs' });
                        (0, index_1.addComponent)(fileSet, component);
                        return [4 /*yield*/, debugOutput(fileSet)];
                    case 1:
                        _a.sent();
                        expect(toObj(fileSet)).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    test('page-with-symbol', function () { return __awaiter(void 0, void 0, void 0, function () {
        var component, fileSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    component = (0, builder_1.builderContentToMitosisComponent)(require('./qwik/specs/qwik.test.page-with-symbol.json'));
                    fileSet = (0, index_1.createFileSet)({ output: 'mjs', jsx: false });
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test('button', function () { return __awaiter(void 0, void 0, void 0, function () {
        var component, fileSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    component = (0, builder_1.builderContentToMitosisComponent)(require('./qwik/specs/qwik.test.button.json'));
                    fileSet = (0, index_1.createFileSet)({ output: 'mjs', jsx: false });
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test('svg', function () { return __awaiter(void 0, void 0, void 0, function () {
        var component, fileSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    component = (0, builder_1.builderContentToMitosisComponent)(require('./qwik/specs/qwik.test.svg.json'), {
                        includeBuilderExtras: true,
                        preserveTextBlocks: true,
                    });
                    fileSet = (0, index_1.createFileSet)({ output: 'mjs', jsx: false });
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Image', function () { return __awaiter(void 0, void 0, void 0, function () {
        var component, fileSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    component = (0, builder_1.builderContentToMitosisComponent)(require('./qwik/specs/qwik.test.image.json'), {
                        includeBuilderExtras: true,
                        preserveTextBlocks: true,
                    });
                    fileSet = (0, index_1.createFileSet)({ output: 'mjs', jsx: false });
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Image.slow', function () { return __awaiter(void 0, void 0, void 0, function () {
        var component, fileSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    component = (0, builder_1.builderContentToMitosisComponent)(require('./qwik/specs/qwik.test.image.json'), {
                        includeBuilderExtras: true,
                        preserveTextBlocks: true,
                    });
                    fileSet = (0, index_1.createFileSet)({ output: 'mjs', jsx: false });
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Accordion', function () { return __awaiter(void 0, void 0, void 0, function () {
        var component, fileSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    component = (0, builder_1.builderContentToMitosisComponent)(require('./qwik/specs/qwik.test.accordion.json'), {
                        includeBuilderExtras: true,
                        preserveTextBlocks: true,
                    });
                    (0, compile_away_builder_components_1.compileAwayBuilderComponentsFromTree)(component, compile_away_builder_components_1.components);
                    fileSet = (0, index_1.createFileSet)({ output: 'mjs', jsx: true });
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test('For', function () { return __awaiter(void 0, void 0, void 0, function () {
        var component, fileSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    component = (0, builder_1.builderContentToMitosisComponent)(require('./qwik/specs/qwik.test.for-loop.json'), {
                        includeBuilderExtras: true,
                        preserveTextBlocks: true,
                    });
                    (0, compile_away_builder_components_1.compileAwayBuilderComponentsFromTree)(component, compile_away_builder_components_1.components);
                    fileSet = (0, index_1.createFileSet)({ output: 'mjs', jsx: true });
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('component', function () {
        test('bindings', function () { return __awaiter(void 0, void 0, void 0, function () {
            var content, state, hierarchy, fileSet, component;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = require('./qwik/specs/qwik.test.component-binding.json');
                        state = {};
                        hierarchy = (0, symbol_processor_1.convertBuilderContentToSymbolHierarchy)(content, {
                            collectComponentState: state,
                        });
                        expect(state).toMatchSnapshot();
                        fileSet = (0, index_1.createFileSet)({ output: 'mjs', jsx: true });
                        hierarchy.depthFirstSymbols.forEach(function (builderComponent) {
                            var mitosisComponent = (0, symbol_processor_1.convertBuilderElementToMitosisComponent)(builderComponent);
                            mitosisComponent && (0, index_1.addComponent)(fileSet, mitosisComponent, { isRoot: false });
                        });
                        component = (0, builder_1.builderContentToMitosisComponent)(content, {
                            includeBuilderExtras: true,
                            preserveTextBlocks: true,
                        });
                        (0, compile_away_builder_components_1.compileAwayBuilderComponentsFromTree)(component, compile_away_builder_components_1.components);
                        (0, index_1.addComponent)(fileSet, component);
                        return [4 /*yield*/, debugOutput(fileSet)];
                    case 1:
                        _a.sent();
                        expect(toObj(fileSet)).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        test('component inputs', function () { return __awaiter(void 0, void 0, void 0, function () {
            var content, state, fileSet, component;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = require('./qwik/specs/qwik.test.component-inputs.json');
                        state = {};
                        expect(state).toMatchSnapshot();
                        fileSet = (0, index_1.createFileSet)({ output: 'cjs', jsx: true });
                        component = (0, builder_1.builderContentToMitosisComponent)(content, {
                            includeBuilderExtras: true,
                            preserveTextBlocks: true,
                        });
                        (0, index_1.addComponent)(fileSet, component);
                        return [4 /*yield*/, debugOutput(fileSet)];
                    case 1:
                        _a.sent();
                        expect(toObj(fileSet)).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    test('show-hide', function () { return __awaiter(void 0, void 0, void 0, function () {
        var content, state, fileSet, component;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = require('./qwik/specs/qwik.test.show-hide.json');
                    state = {};
                    expect(state).toMatchSnapshot();
                    fileSet = (0, index_1.createFileSet)({ output: 'mjs', jsx: true });
                    component = (0, builder_1.builderContentToMitosisComponent)(content, {
                        includeBuilderExtras: true,
                        preserveTextBlocks: true,
                    });
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test('bindings', function () { return __awaiter(void 0, void 0, void 0, function () {
        var content, fileSet, component;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = require('./qwik/specs/qwik.test.bindings.json');
                    fileSet = (0, index_1.createFileSet)({ output: 'cjs', jsx: false });
                    component = (0, builder_1.builderContentToMitosisComponent)(content, {
                        includeBuilderExtras: true,
                        preserveTextBlocks: true,
                    });
                    (0, compile_away_builder_components_1.compileAwayBuilderComponentsFromTree)(component, compile_away_builder_components_1.components);
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test('for-loop.bindings', function () { return __awaiter(void 0, void 0, void 0, function () {
        var component, fileSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    component = require('./qwik/specs/qwik.test.for-loop.binding.json');
                    fileSet = (0, index_1.createFileSet)({ output: 'cjs', jsx: false });
                    (0, compile_away_builder_components_1.compileAwayBuilderComponentsFromTree)(component, compile_away_builder_components_1.components);
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    test('mount', function () { return __awaiter(void 0, void 0, void 0, function () {
        var content, fileSet, component;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = require('./qwik/specs/qwik.test.mount.json');
                    fileSet = (0, index_1.createFileSet)({ output: 'cjs', jsx: false });
                    component = (0, builder_1.builderContentToMitosisComponent)(content, {
                        includeBuilderExtras: true,
                        preserveTextBlocks: true,
                    });
                    (0, compile_away_builder_components_1.compileAwayBuilderComponentsFromTree)(component, compile_away_builder_components_1.components);
                    (0, index_1.addComponent)(fileSet, component);
                    return [4 /*yield*/, debugOutput(fileSet)];
                case 1:
                    _a.sent();
                    expect(toObj(fileSet)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('src-generator', function () {
        var file;
        beforeEach(function () {
            file = new qwik_1.File('test.js', {
                isPretty: true,
                isTypeScript: false,
                isJSX: true,
                isModule: true,
                isBuilder: true,
            }, '', '');
        });
        test('should format code', function () {
            file.src.emit('const x=1');
            expect(file.toString()).toEqual('const x = 1;\n');
        });
        test('should deal with empty bindings', function () {
            file.src.jsxBegin('Image', {}, { image: '' });
            file.src.jsxEnd('Image');
            expect(file.toString()).toEqual('<Image></Image>;\n');
        });
    });
});
function toObj(fileSet) {
    var obj = {};
    for (var key in fileSet) {
        if (Object.prototype.hasOwnProperty.call(fileSet, key)) {
            var file = fileSet[key];
            obj[file.path] = file.contents;
        }
    }
    return obj;
}
