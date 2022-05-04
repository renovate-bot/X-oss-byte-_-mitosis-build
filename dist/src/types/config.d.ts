import { MitosisComponent } from '..';
import { Plugin } from './plugins';
export declare type Format = 'esm' | 'cjs';
export interface TranspilerOptions {
    format?: Format;
}
declare type Targets = typeof import('../targets').targets;
export declare type Target = keyof Targets;
export declare type GeneratorOptions = {
    [K in keyof Targets]: NonNullable<Parameters<Targets[K]>[0]> & {
        transpiler?: TranspilerOptions;
    };
};
export interface TranspilerArgs {
    path?: string;
    component: MitosisComponent;
}
export declare type Transpiler = (args: TranspilerArgs) => string;
export interface BaseTranspilerOptions {
    prettier?: boolean;
    plugins?: Plugin[];
}
export declare type MitosisConfig = {
    type?: 'library';
    targets: Target[];
    dest?: string;
    files?: string | string[];
    overridesDir?: string;
    options: Partial<GeneratorOptions>;
};
export {};
