import * as THREE from 'three';

export class ParticleSystem {
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private particles: THREE.Points;
  private initialPositions: Float32Array;
  private velocities: Float32Array;

  constructor(count: number = 2000) {
    this.geometry = new THREE.BufferGeometry();
    this.initialPositions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      // Create a sphere distribution
      const radius = Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      this.initialPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      this.initialPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      this.initialPositions[i + 2] = radius * Math.cos(phi);

      // Random velocities
      this.velocities[i] = (Math.random() - 0.5) * 0.02;
      this.velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      this.velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.initialPositions, 3));

    const colors = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#FFB7C5'), // k-pink
      new THREE.Color('#8BB7F0'), // k-blue
      new THREE.Color('#E6B8F5')  // k-purple
    ];

    for (let i = 0; i < count * 3; i += 3) {
      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(this.geometry, this.material);
  }

  getMesh(): THREE.Points {
    return this.particles;
  }

  animate(time: number): void {
    const positions = this.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Oscillating movement
      positions[i] += Math.sin(time * 0.001 + i) * 0.01;
      positions[i + 1] += Math.cos(time * 0.001 + i) * 0.01;
      positions[i + 2] += Math.sin(time * 0.001 + i) * 0.01;

      // Apply velocities
      positions[i] += this.velocities[i];
      positions[i + 1] += this.velocities[i + 1];
      positions[i + 2] += this.velocities[i + 2];

      // Boundary check and reset
      const distance = Math.sqrt(
        positions[i] ** 2 + 
        positions[i + 1] ** 2 + 
        positions[i + 2] ** 2
      );

      if (distance > 10) {
        positions[i] = this.initialPositions[i];
        positions[i + 1] = this.initialPositions[i + 1];
        positions[i + 2] = this.initialPositions[i + 2];
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.particles.rotation.y += 0.0005;
  }
}