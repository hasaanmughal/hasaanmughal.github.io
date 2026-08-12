import Matter from 'matter-js';

const { Engine, World, Bodies, Body, Constraint, Composite } = Matter;

export function createPendulumEngine(container, onUpdate) {
  const rect = container.getBoundingClientRect();
  const containerWidth = rect.width;
  const containerHeight = rect.height;
  const engine = Engine.create({ gravity: { x: 0, y: 1.2 } });
  const world = engine.world;

  const anchorX = containerWidth / 2;
  const anchorY = 0;
  const segmentCount = 2;
  const segmentLength = 20;
  const badgeWidth = 140;
  const badgeHeight = 190;

  const anchor = Bodies.circle(anchorX, anchorY, 4, {
    isStatic: true,
    render: { visible: false },
  });

  const segments = [];
  const constraints = [];

  let prevBody = anchor;
  for (let i = 0; i < segmentCount; i++) {
    const seg = Bodies.circle(anchorX, anchorY + (i + 1) * segmentLength, 3, {
      frictionAir: 0.02,
      density: 0.001,
      collisionFilter: { group: -1 },
    });
    segments.push(seg);
    constraints.push(
      Constraint.create({
        bodyA: prevBody,
        bodyB: seg,
        length: segmentLength,
        stiffness: 0.95,
        damping: 0.05,
      })
    );
    prevBody = seg;
  }

  const badge = Bodies.rectangle(
    anchorX,
    anchorY + (segmentCount + 1) * segmentLength,
    badgeWidth,
    badgeHeight,
    {
      frictionAir: 0.015,
      density: 0.0015,
      chamfer: { radius: 6 },
      collisionFilter: { group: -1 },
    }
  );

  constraints.push(
    Constraint.create({
      bodyA: segments[segments.length - 1],
      bodyB: badge,
      pointB: { x: 0, y: -badgeHeight / 2 },
      length: segmentLength,
      stiffness: 0.85,
      damping: 0.08,
    })
  );

  Composite.add(world, [anchor, ...segments, badge, ...constraints]);

  let dragConstraint = null;

  const startDrag = (x, y) => {
    if (dragConstraint) return;
    dragConstraint = Constraint.create({
      pointA: { x, y },
      bodyB: badge,
      pointB: { x: 0, y: -badgeHeight / 2 },
      length: 0,
      stiffness: 0.18,
      damping: 0.08,
    });
    World.add(world, dragConstraint);
  };

  const moveDrag = (x, y) => {
    if (!dragConstraint) return;
    dragConstraint.pointA.x = x;
    dragConstraint.pointA.y = y;
  };

  const endDrag = () => {
    if (!dragConstraint) return;
    World.remove(world, dragConstraint);
    dragConstraint = null;
  };

  let rafId = null;
  let lastScrollY = window.scrollY;

  const tick = () => {
    const scrollDelta = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;

    if (Math.abs(scrollDelta) > 0.5) {
      Body.applyForce(badge, badge.position, {
        x: scrollDelta * 0.00008,
        y: 0,
      });
    }

    Engine.update(engine, 1000 / 60);

    const badgeTop = {
      x: badge.position.x + Math.sin(badge.angle) * (badgeHeight / 2),
      y: badge.position.y - Math.cos(badge.angle) * (badgeHeight / 2),
    };

    const ropePoints = [
      { x: anchor.position.x, y: anchor.position.y },
      ...segments.map((s) => ({ x: s.position.x, y: s.position.y })),
      badgeTop,
    ];

    onUpdate({
      ropePoints,
      badge: {
        x: badge.position.x,
        y: badge.position.y,
        angle: badge.angle,
      },
    });

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  return {
    startDrag,
    moveDrag,
    endDrag,
    destroy: () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (dragConstraint) {
        World.remove(world, dragConstraint);
        dragConstraint = null;
      }
      World.clear(world, false);
      Engine.clear(engine);
    },
  };
}
