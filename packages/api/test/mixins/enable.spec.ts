import { expect } from 'chai';
import sinon from 'sinon';
import { ToggleThing, ToggleTalker } from '../fixtures';

import * as api from '@jchptf/api';
import {hasIEnable, IEnable, INotify} from "@jchptf/api";

describe('iEnable', () => {
   describe('hasIEnable guard', () => {
      it('selects instances of classes annotated by @iEnable', () => {
         let sut: ToggleThing = new ToggleThing([1,2,3]);
         expect(hasIEnable(sut)).is.true;
      })

      it('rejects instances of classes not annotated by @iEnable', () => {
         let sut: any = { fakeId: "I have iEnabled" };
         expect(hasIEnable(sut)).is.false;
      })
   });

   let sut: api.IEnable;

   beforeEach(() => {
      sut = new ToggleThing([1, 4, 4]) as unknown as api.IEnable;
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
      let notifySut: INotify & IEnable;

      beforeEach(() => {
         notifySut = new ToggleTalker([7, 2, 2]) as unknown as INotify & IEnable;
      });

      it('Notifies on enable', () => {
         const listenerSpy = sinon.spy();
         notifySut.addListener(api.EVENT_ENABLE, listenerSpy);
         notifySut.enable();
         expect(
            listenerSpy.calledOnceWith(<api.IEvent>{
               id: api.EVENT_ENABLE,
               target: notifySut,
            }),
         ).to.be.true;
      });

      it('Notifies on disable', () => {
         const listenerSpy = sinon.spy();
         notifySut.addListener(api.EVENT_DISABLE, listenerSpy);
         notifySut.disable();
         expect(
            listenerSpy.calledOnceWith(<api.IEvent>{
               id: api.EVENT_DISABLE,
               target: notifySut,
            }),
         ).to.be.true;
      });

      it('Notifies on toggle', () => {
         const listenerSpy = sinon.spy();
         notifySut.addListener(api.EVENT_DISABLE, listenerSpy);
         notifySut.toggle();
         expect(
            listenerSpy.calledOnceWith(<api.IEvent>{
               id: api.EVENT_DISABLE,
               target: notifySut,
            }),
         ).to.be.true;
      });

      it('Notifies on both toggles', () => {
         const listenerSpy = sinon.spy();
         notifySut.addListener(api.EVENT_ALL, listenerSpy);
         notifySut.toggle();
         expect(
            listenerSpy.calledOnceWith(<api.IEvent>{
               id: api.EVENT_DISABLE,
               target: notifySut,
            }),
         ).to.be.true;
         notifySut.toggle();
         expect(
            listenerSpy.calledWith(<api.IEvent>{
               id: api.EVENT_ENABLE,
               target: notifySut,
            }),
         ).to.be.true;
      });
   });
});
