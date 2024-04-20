export type IsFalse<T extends boolean> = [T] extends [false] ? true : false;

export type IsNotFalse<T extends boolean> = [T] extends [false] ? false : true;


export type IsTrue<T extends boolean> = [T] extends [true] ? true : false;

export type IsNotTrue<T extends boolean> = [T] extends [true] ? false : true;

