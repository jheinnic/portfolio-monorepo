import {IBagOf} from '@jchptf/api';

type FixtureTypes = 'Library' | 'InitialValue' | 'Widget' | 'Component' | 'Application'

export const FIXTURE_TYPES: IBagOf<symbol, FixtureTypes> = {
   Library: Symbol.for('Library'),
   InitialValue: Symbol.for('InitialValue'),
   Widget: Symbol.for('Widget'),
   Component: Symbol.for('Component'),
   Application: Symbol.for('Application')
};

type FixtureDiTypes = 'LibraryInstaller' | 'WidgetOneModule' | 'WidgetTwoModule' | 'SDKModule' | 'CompleteModule' | 'ApplicationInstaller'
export const FIXTURE_DI_TYPES: IBagOf<symbol, FixtureDiTypes> = {
   LibraryInstaller: Symbol.for('LibraryInstaller'),
   WidgetOneModule: Symbol.for('WidgetOneModule'),
   WidgetTwoModule: Symbol.for('WidgetTwoModule'),
   SDKModule: Symbol.for('SDKModule'),
   CompleteModule: Symbol.for('CompleteModule'),
   ApplicationInstaller: Symbol.for('ApplicationInstaller')
};
