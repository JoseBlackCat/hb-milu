declare module "lottie-web" {
    interface AnimationItem {
      play(): void;
      stop(): void;
      pause(): void;
      destroy(): void;
      setSpeed(speed: number): void;
      goToAndPlay(value: number, isFrame?: boolean): void;
      goToAndStop(value: number, isFrame?: boolean): void;
    }
  
    interface AnimationConfig {
      container: HTMLElement;
      renderer?: "svg" | "canvas" | "html";
      loop?: boolean | number;
      autoplay?: boolean;
      animationData?: object;
      path?: string;
    }
  
    function loadAnimation(options: AnimationConfig): AnimationItem;
    export = { loadAnimation };
  }
  