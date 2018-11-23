// import chai from 'chai';
// import * as assert from 'assert';
import sinon, {SinonStubbedInstance} from 'sinon';
import ExpectStatic = Chai.ExpectStatic;

import * as dar from '../src/index';
import {IContainerRegistryInternal} from '../build/src/interfaces/container-registry-internal.interface';
import {SpiedUponInstance, spyOn} from '../../unit-testing/src';

const expect: ExpectStatic = chai.expect;


describe('di-app-registry', () => {
   const sandbox: sinon.SinonSandbox = sinon.createSandbox();

   let client: dar.InstallerRegistryClient;
   let registry: SpiedUponInstance<IContainerRegistryInternal>;

   const childId: dar.NestedContainerIdentifier =
      Symbol.for('FirstChildContainer');

   beforeEach(function () {
      registry =
         spyOn(
            dar.ContainerRegistry.getInstance() as
               dar.ContainerRegistry as
               IContainerRegistryInternal
         );
      registry.createNestedContainer.alwaysCalledWith(childId);
      registry.createNestedContainer(childId);
   });
   it('Creates children through registry internals', function() {
      client.createChild(childId)

      registry.createNestedContainer.
   });
});
