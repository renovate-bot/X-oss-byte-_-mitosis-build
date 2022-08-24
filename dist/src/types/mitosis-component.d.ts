import { Dictionary } from '../helpers/typescript';
import { _JSON, JSONObject } from './json';
import { MitosisNode } from './mitosis-node';
/**
 * @example
 *  // import core, { useState, someThing as someAlias } from '@builder.io/mitosis'
 *  {
 *    path: '@builder.io/mitosis',
 *    imports: {
 *      useState: 'useState',
 *      someAlias: 'someThing',
 *      core: 'default',
 *    }
 *  }
 *
 * @example
 *  // import * as core from '@builder.io/mitosis'
 *  {
 *    path: '@builder.io/mitosis',
 *    imports: {
 *      core: '*',
 *    }
 *  }
 */
export interface MitosisImport {
    path: string;
    imports: {
        [key: string]: string | undefined;
    };
}
export interface ContextGetInfo {
    name: string;
    path: string;
}
export interface ContextSetInfo {
    name: string;
    value?: MitosisState;
    ref?: string;
}
export declare type ContextGet = {
    [key: string]: ContextGetInfo;
};
export declare type ContextSet = {
    [key: string]: ContextSetInfo;
};
export declare type extendedHook = {
    code: string;
    deps?: string;
};
export declare type MitosisComponentInput = {
    name: string;
    defaultValue: any;
};
export declare type MitosisExport = {
    [name: string]: {
        code: string;
        usedInLocal?: boolean;
        isFunction?: boolean;
    };
};
export declare type StateValueType = 'function' | 'getter' | 'method' | 'property';
export declare type StateCode = _JSON;
declare type CodeValue = {
    code: string;
    type: Exclude<StateValueType, 'property'>;
};
export declare const checkIsCodeValue: (value: unknown) => value is CodeValue;
export declare type StateValue = CodeValue | {
    code: StateCode;
    type: Extract<StateValueType, 'property'>;
};
export declare type MitosisState = Dictionary<StateValue | undefined>;
export declare type MitosisComponent = {
    '@type': '@builder.io/mitosis/component';
    name: string;
    imports: MitosisImport[];
    exports?: MitosisExport;
    meta: JSONObject & {
        useMetadata?: JSONObject;
    };
    inputs: MitosisComponentInput[];
    state: MitosisState;
    context: {
        get: ContextGet;
        set: ContextSet;
    };
    refs: {
        [useRef: string]: {
            typeParameter?: string;
            argument: string;
        };
    };
    hooks: {
        init?: extendedHook;
        onInit?: extendedHook;
        onMount?: extendedHook;
        onUnMount?: extendedHook;
        preComponent?: extendedHook;
        postComponent?: extendedHook;
        onUpdate?: extendedHook[];
    };
    children: MitosisNode[];
    subComponents: MitosisComponent[];
    types?: string[];
    propsTypeRef?: string;
    defaultProps?: JSONObject;
};
export {};
