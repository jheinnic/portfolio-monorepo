import {IBagOf} from '@jchptf/api';

type FixtureTypes = 'Library' | 'InitialValue' | 'Widget' | 'Component' | 'Application'

export const FIXTURE_TYPES: IBagOf<symbol, FixtureTypes> = {
   Library: Symbol.for('Library'),
   InitialValue: Symbol.for('InitialValue'),
   Widget: Symbol.for('IWidget'),
   Component: Symbol.for('Component'),
   Application: Symbol.for('Application')
};

type FixtureDiTypes = 'LibraryInstaller' | 'LibraryRequest' | 'WidgetOneInstaller' | 'WidgetTwoInstaller' |
 'WidgetOneRequest' | 'WidgetTwoRequest' | 'ComponentInstaller' | 'ComponentRequest' | 'ApplicationInstaller'
export const FIXTURE_DI_TYPES: IBagOf<symbol, FixtureDiTypes> = {
   LibraryInstaller: Symbol.for('LibraryInstaller'),
   LibraryRequest: Symbol.for('LibraryRequest'),
   WidgetOneInstaller: Symbol.for('WidgetOneInstaller'),
   WidgetTwoInstaller: Symbol.for('WidgetTwoInstaller'),
   WidgetOneRequest: Symbol.for('WidgetOneRequest'),
   WidgetTwoRequest: Symbol.for('WidgetTwoRequest'),
   ComponentInstaller: Symbol.for('ComponentInstaller'),
   ComponentRequest: Symbol.for('ComponentRequest'),
   ApplicationInstaller: Symbol.for('ApplicationInstaller')
};
