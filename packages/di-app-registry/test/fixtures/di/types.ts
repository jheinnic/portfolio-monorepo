import {IBagOf} from '@jchptf/api';

type FixtureTypes = 'Library' | 'InitialValue' | 'Widget' | 'Component' | 'Application'

export const FIXTURE_TYPES: IBagOf<symbol, FixtureTypes> = {
   Library: Symbol.for('Library'),
   InitialValue: Symbol.for('InitialValue'),
   Widget: Symbol.for('IWidget'),
   Component: Symbol.for('Component'),
   Application: Symbol.for('Application')
};

type FixtureDiTypes = 'LibraryInstaller' | 'WidgetOneInstaller' | 'WidgetTwoInstaller' | 'SDKInstaller' | 'CompleteInstaller' | 'ApplicationInstaller'
export const FIXTURE_DI_TYPES: IBagOf<symbol, FixtureDiTypes> = {
   LibraryInstaller: Symbol.for('LibraryInstaller'),
   WidgetOneInstaller: Symbol.for('WidgetOneInstaller'),
   WidgetTwoInstaller: Symbol.for('WidgetTwoInstaller'),
   SDKInstaller: Symbol.for('SDKInstaller'),
   CompleteInstaller: Symbol.for('CompleteInstaller'),
   ApplicationInstaller: Symbol.for('ApplicationInstaller')
};
