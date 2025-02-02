import { BaseTranspilerOptions } from '../../types/transpiler';
export declare type SolidState = 'mutable' | 'signals' | 'store';
export interface ToSolidOptions extends BaseTranspilerOptions {
    state: SolidState;
    stylesType?: 'styled-components' | 'style-tag';
}
