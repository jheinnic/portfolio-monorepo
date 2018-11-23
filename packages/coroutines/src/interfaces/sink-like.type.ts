/*
import {AsyncSink} from '@reactivex/ix-ts';
import {Subject} from 'rxjs';
import {IDirector} from '@jchptf/api';
import {Chan, put} from 'medium';

export type SinkLike<T> = Chan<T, any> | Subject<T> | AsyncSink<T> | IDirector<T>

export function isChan<T>(sink: SinkLike<T>): sink is Chan<T, any> {
   return sink.hasOwnProperty('xduce') && sink.hasOwnProperty('isClosed');
}

export function isSubject<T>(sink: SinkLike<T>): sink is Subject<T> {
   return sink.hasOwnProperty('observers');
}

export function isQueue<T>(sink: SinkLike<T>): sink is AsyncSink<T> {
   return sink instanceof AsyncSink;
}

export function isDirector<T>(sink: SinkLike<T>): sink is IDirector<T> {
   return !isChan(sink) && !isSubject(sink) && !isQueue(sink)
}

export function * callSink<T>(sink: SinkLike<T>, arg: T): IterableIterator<any> {
   if (isChan(sink)) {
      yield put(sink, arg);
   } else if(isQueue(sink)) {
      yield sink.write(arg);
   } else if(isSubject(sink)) {
      yield;
      sink.next(arg);
   } else {
      yield;
      sink(arg);
   }
}

export function asGenerator<T>(sink: SinkLike<T>): (arg: T) => IterableIterator<any>
{
   let retVal: (arg: T) => IterableIterator<any>;

   if (isChan(sink)) {
      retVal = function* (arg: T) {
         yield put(sink, arg);
      };
   } else if (isQueue(sink)) {
      retVal = function* (arg: T) {
         yield sink.write(arg);
      };
   } else if (isSubject(sink)) {
      retVal = function* (arg: T) {
         yield;
         sink.next(arg);
      }
   } else {
      retVal = function* (arg: T) {
         yield;
         sink(arg);
      }
   }

   return retVal;
}
*/

import {AsyncSink} from 'ix';
import {Subject} from 'rxjs';
import {IDirector} from '@jchptf/api';

export type SinkLike<T> = Subject<T> | AsyncSink<T> | IDirector<T>

// export function isChan<T>(sink: SinkLike<T>): sink is Chan<T> {
//    return sink.hasOwnProperty('close');
// }

export function isSubject<T>(sink: SinkLike<T>): sink is Subject<T> {
   return sink instanceof Subject;
}

export function isQueue<T>(sink: SinkLike<T>): sink is AsyncSink<T> {
   return sink instanceof AsyncSink;
}

export function isDirector<T>(sink: SinkLike<T>): sink is IDirector<T> {
   return sink instanceof Function;
}

export function callSink<T>(sink: SinkLike<T>, arg: T): void
{
   if(isQueue(sink)) {
      sink.write(arg);
   } else if(isSubject(sink)) {
      sink.next(arg);
   } else {
      sink(arg);
   }
}

export function asFunction<T>(sink: SinkLike<T>): IDirector<T>
{
   let retVal: (arg: T) => void;

   if (isQueue(sink)) {
      retVal = function (arg: T): void {
         sink.write(arg);
      };
   } else if (isSubject(sink)) {
      retVal = function (arg: T): void {
         sink.next(arg);
      }
   } else {
      retVal = sink;
   }

   return retVal;
}
