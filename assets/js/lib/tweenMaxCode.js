
/*global Draggable, TweenMax, Bounce*/
const tabBar = document.querySelector(".tab-bar");

const tabLinks = document.querySelectorAll(".tab-item-link");

const decoEl = document.querySelector('.tab-bar-deco');

const motionEl = document.querySelector(".tab-bar-motion");

const motionPathEl = motionEl.querySelector(".tab-bar-motion-path");

const indicatorWrapperEl = tabBar.querySelector('.tab-item-indicator-wrapper');

const indicatorEl = tabBar.querySelector('.tab-item-indicator');

let busy = false;

let interacted = false;

let tId = null;

let motionPathHeight = 0;

const clamp = (value, min, max) => {
  return Math.min(max, Math.max(min, value));
}

const transitionTabItem = item => {
  if (busy) return;
  busy = true;
  const activeItem = tabBar.querySelector(".-active");
  if (activeItem === item) return;
  let halfFlag = false;
  transitionMotionPath(activeItem, item, {
    onProgress(progress) {
      if (progress >= 0.5 && !halfFlag) {
        halfFlag = true;
        activeItem.classList.remove("-active");
        item.classList.add("-active");
      }
    },
    onComplete() {
      busy = false;
    }
  });
};

tabLinks.forEach(link => {
  link.addEventListener(
    "click",
    () => {
      if (!interacted) {
        interacted = true;
        clearInterval(tId);
      }
      transitionTabItem(link);
    },
    false
  );
});

const setIndicatorPos = (activeItem) => {
  const pos = activeItem.offsetLeft + activeItem.offsetWidth / 2;
  TweenMax.set(indicatorWrapperEl, {
    left: pos
  });
}

const onResize = () => {
  const boundingRect = decoEl.getBoundingClientRect();
  const { width, height } = boundingRect;
  motionPathHeight = height;
  motionEl.setAttribute("viewBox", `0 0 ${~~width} ${~~height}`);
  setIndicatorPos(tabBar.querySelector('.-active'));
  motionPathEl.setAttribute('stroke-width', Math.max(Math.floor(indicatorEl.offsetHeight * 0.5), 2));
};

onResize();

window.addEventListener('resize', () => {
  onResize();
}, false);

const animateOutIndicator = () => {
  TweenMax.to(indicatorEl, 0.2, {
    scale: 0,
    opacity: 0,
    ease: Power2.easeOut
  });
}

const animateInIndicator = () => {
  new TimelineMax().to(indicatorEl, 0.3, {
    scale: 1.8,
    opacity: 1,
    ease: Power2.easeInOut
  }).to(indicatorEl, 0.2, {
    scale: 1,
    ease: Power2.easeOut
  });
}

const createMotionPath = (origin, destination, height, {
  pulseWidth = 30,
  threshold = 5
} = {}) => {
  const halfHeight = height / 2;
  const direction = Math.sign(destination - origin);
  const points = [[origin, halfHeight]];
  const distance = Math.abs(destination - origin);
  const pulseStart = threshold + Math.floor(Math.random() * (distance - 2 * threshold - pulseWidth + 1));
  const pulseDefs = [
    [0, 0],
    [0.15, -0.3],
    [0.3, 0.2],
    [0.45, -0.5],
    [0.6, 0.6],
    [0.75, -0.9],
    [0.85, 0.3],
    [0.92, -0.2],
    [1, 0]
  ];
  pulseDefs.forEach((p) => {
    points.push([origin + direction * (p[0] * pulseWidth + pulseStart), halfHeight + p[1] * halfHeight]);
  });
  points.push([destination, halfHeight]);
  return `M${points.join("L")}`;
};

const transitionMotionPath = (originItem, destItem, {
  visiblePercent = 0.5,
  minVisibleLength = 10,
  onProgress,
  onComplete
} = {}) => {
  const {
    offsetLeft: originItemLeft,
    offsetWidth: originItemWidth
  } = originItem;
  const { offsetLeft: destItemLeft, offsetWidth: destItemWidth } = destItem;
  const startPoint = originItemLeft + originItemWidth / 2;
  const endPoint = destItemLeft + destItemWidth / 2;
  const motionPath = createMotionPath(startPoint, endPoint, motionPathHeight, {
    pulseWidth: Math.max(20, Math.floor(originItemWidth * 0.3)),
    threshold: 2
  });
  motionPathEl.setAttribute("d", motionPath);
  const length = Math.ceil(motionPathEl.getTotalLength());

  visiblePercent = clamp(visiblePercent, 0, 1);
  const visibleLength = Math.floor(clamp(visiblePercent * length, minVisibleLength, length));
  motionPathEl.setAttribute('stroke-dasharray', `${visibleLength} ${length}`);

  let reachDest = false;
  TweenMax.fromTo(motionPathEl, 1.2, {
    attr: {
      'stroke-dashoffset': visibleLength
    }
  }, {
      attr: {
        'stroke-dashoffset': -length
      },
      ease: Power2.easeOut,
      onStart() {
        TweenMax.set(motionEl, {
          opacity: 1
        });
        animateOutIndicator();
      },
      onUpdate(tween) {
        const offset = +motionPathEl.getAttribute('stroke-dashoffset');
        if (!reachDest && offset < visibleLength - length) {
          reachDest = true;
          setIndicatorPos(destItem);
          animateInIndicator();
        }
        onProgress && onProgress(tween.progress())
      },
      onUpdateParams: ["{self}"],
      onComplete() {
        TweenMax.set(motionEl, { opacity: 0 });
        onComplete && onComplete();
      }
    });
};

const autoTransition = () => {
  const activeItem = tabBar.querySelector('.-active');
  const inactiveItems = [...tabLinks].filter((item) => item !== activeItem);
  const randomIdx = Math.floor(Math.random() * inactiveItems.length);
  transitionTabItem(inactiveItems[randomIdx]);
}

tId = setInterval(() => {
  autoTransition();
}, 5000);

setTimeout(() => {
  autoTransition();
}, 1000);
