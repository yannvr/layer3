import '@testing-library/jest-dom';
import { TextDecoder as UtilTextDecoder, TextEncoder as UtilTextEncoder } from 'util';

global.TextEncoder = UtilTextEncoder as any;
global.TextDecoder = UtilTextDecoder as any;
