import {expect} from 'chai';
import sinon from 'sinon';
import {ToggleThing, ToggleTalker} from '../fixtures';

import * as api from '../../src/api';


describe('iEnable', () => {
   let sut: ToggleThing;

   beforeEach(() => {
      sut = new ToggleThing([1, 4, 4]);
   });

   it('Begins enabled', () => {
      expect(sut.isEnabled()).is.true;
   });

   it('Toggles once to disabled', () => {
      sut.toggle();
      expect(sut.isEnabled()).is.false;
   });

   it('Toggles twice to enabled', () => {
      sut.toggle();
      sut.toggle();
      expect(sut.isEnabled()).is.true;
   });

   it('Toggles to enabled if set disabled', () => {
      sut.disable();
      sut.toggle();
      expect(sut.isEnabled()).is.true;
      sut.toggle();
      sut.toggle();
      expect(sut.isEnabled()).is.true;
      sut.disable();
      sut.toggle();
      expect(sut.isEnabled()).is.true;
   });

   describe('with iNotify', () => {
      let notifySut: ToggleTalker;

      beforeEach(() => {
         notifySut = new ToggleTalker([7, 2, 2]);
      });

      it('Notifies on enable', () => {
         let listenerSpy = sinon.spy();
         notifySut.addListener(api.EVENT_ENABLE, listenerSpy);
         notifySut.enable();
         expect(
            listenerSpy.calledOnceWith(<api.Event>{
               id: api.EVENT_ENABLE,
               target: notifySut
            })
         ).to.be.true;
      });

      it('Notifies on disable', () => {
         let listenerSpy = sinon.spy();
         notifySut.addListener(api.EVENT_DISABLE, listenerSpy);
         notifySut.disable();
         expect(
            listenerSpy.calledOnceWith(<api.Event>{
               id: api.EVENT_DISABLE,
               target: notifySut
            })
         ).to.be.true;
      });

      it('Notifies on toggle', () => {
         let listenerSpy = sinon.spy();
         notifySut.addListener(api.EVENT_DISABLE, listenerSpy);
         notifySut.toggle();
         expect(
            listenerSpy.calledOnceWith(<api.Event>{
               id: api.EVENT_DISABLE,
               target: notifySut
            })
         ).to.be.true;
      });

      it('Notifies on both toggles', () => {
         let listenerSpy = sinon.spy();
         notifySut.addListener(api.EVENT_ALL, listenerSpy);
         notifySut.toggle();
         expect(
            listenerSpy.calledOnceWith(<api.Event>{
               id: api.EVENT_DISABLE,
               target: notifySut
            })
         ).to.be.true;
         notifySut.toggle();
         expect(
            listenerSpy.calledWith(<api.Event>{
               id: api.EVENT_ENABLE,
               target: notifySut
            })
         ).to.be.true;
      });
   });
});
