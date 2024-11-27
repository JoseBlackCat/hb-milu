import * as THREE from 'three';
import { ParticleSystem } from './particles';

export class Scene3D {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particles: ParticleSystem;
  private animationId: number = 0;
  private mousePosition: THREE.Vector2;
  private targetRotation: THREE.Vector2;
  private currentRotation: THREE.Vector2;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Mouse interaction setup
    this.mousePosition = new THREE.Vector2();
    this.targetRotation = new THREE.Vector2();
    this.currentRotation = new THREE.Vector2();

    // Add particles
    this.particles = new ParticleSystem();
    this.scene.add(this.particles.getMesh());

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Event listeners
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('touchmove', this.handleTouchMove.bind(this));
  }

  private handleResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private handleMouseMove(event: MouseEvent): void {
    this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.updateTargetRotation();
  }

  private handleTouchMove(event: TouchEvent): void {
    if (event.touches.length > 0) {
      this.mousePosition.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      this.updateTargetRotation();
    }
  }

  private updateTargetRotation(): void {
    this.targetRotation.x = this.mousePosition.y * 0.5;
    this.targetRotation.y = this.mousePosition.x * 0.5;
  }

  private updateCameraRotation(): void {
    // Smooth camera movement
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;

    this.camera.position.x = Math.sin(this.currentRotation.y) * 5;
    this.camera.position.z = Math.cos(this.currentRotation.y) * 5;
    this.camera.position.y = this.currentRotation.x * 2;
    this.camera.lookAt(0, 0, 0);
  }

  animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    this.updateCameraRotation();
    this.particles.animate(performance.now());
    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    window.removeEventListener('resize', this.handleResize.bind(this));
    window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    window.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    
    this.scene.clear();
    this.renderer.dispose();
  }
}