declare module "typewriter-effect/dist/core" {
    export default class Typewriter {
      constructor(container: HTMLElement | string, options?: any);
      typeString(text: string): Typewriter;
      deleteChars(amount: number): Typewriter;
      deleteAll(speed?: number): Typewriter;
      start(): Typewriter;
      pauseFor(duration: number): Typewriter;
      callFunction(callback: () => void): Typewriter;
    }
  }
  