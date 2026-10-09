# CoPAIR project page

Static project page for the anonymous AAMAS 2027 submission "Teacher-Guided
Multi-Agent Reinforcement Learning for Cooperative Quadrotor Pursuit".

Plain HTML/CSS/JS, no build step. Serve with GitHub Pages from the `main`
branch root, or preview locally with `python3 -m http.server`.

## Videos

The first carousel tab plays the full submission film automatically, muted, with
playback controls. The original comparisons remain in their existing tabs.
The final tab contains three 10-second clips with short labels. Video files:

- `copair_film.mp4`: the complete submission film, encoded for web playback.
- `simulation.mp4`: logged CoPAIR seed-11 rollouts from evaluation bank 925031;
  the camera reveals the first 900 arenas.
- `deployment_sim.mp4`: logged rollouts of the flown deployment policy in the
  laboratory flight volume.
- `real_world.mp4`: separate flights of the same game, filmed by cameras A and B.
  Camera A plays at full speed; camera B plays at half speed. The two physical
  drones are marked, and pursuer 2 is rendered from its logged virtual state.

Videos use H.264 at 1920×1080, 30 fps, without audio, with fast-start metadata.
Inactive carousel tabs load their videos when selected.
