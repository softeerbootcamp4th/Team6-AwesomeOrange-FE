import { useState, useEffect, useRef, useCallback } from "react";
import useMountDragEvent from "@main/hooks/useMountDragEvent";

const FRICTION_RATE = 0.1;
const MOMENTUM_THRESHOLD = 0.6;
const MOMENTUM_RATE = 0.3;

function useAutoCarousel(speed = 1, gap = 0) {
  const childRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [isControlled, setIsControlled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timestamp = useRef(null);
  const prevDragState = useRef({ x: 0, mouseX: 0, prevMouseX: 0 });
  const momentum = useRef(speed);
  const raf = useRef(null);

  const animate = useCallback(
    (time) => {
      if (childRef.current === null) return;

      const width = childRef.current.clientWidth + gap;

      // 마우스 뗐을 때 관성 재계산
      const baseSpeed = isHovered ? 0 : speed;
      momentum.current -= (momentum.current - baseSpeed) * FRICTION_RATE;

      if (Math.abs(momentum.current, baseSpeed) < MOMENTUM_THRESHOLD) momentum.current = baseSpeed;
      const finalSpeed = momentum.current;

      // 인터벌과 실제 x 포지션 계산
      const interval = performance.now() - timestamp.current;
      setPosition((position) => {
        const newPos = position + finalSpeed * interval;
        return newPos % width;
      });

      // 타임스탬프 저장
      timestamp.current = time;
    },
    [isHovered, speed, gap],
  );

  useEffect(() => {
    timestamp.current = performance.now();
    function realAnimate(time) {
      animate(time);
      raf.current = requestAnimationFrame(realAnimate);
    }
    raf.current = requestAnimationFrame(realAnimate);
    return () => {
      cancelAnimationFrame(raf.current);
    };
  }, [isControlled, animate]);

  // 드래그 시작 함수
  const onDragStart = useCallback(
    ({ x }) => {
      setIsControlled(true);
      setIsHovered(true);
      prevDragState.current.x = position;
      prevDragState.current.mouseX = x;
      prevDragState.current.prevMouseX = x;
    },
    [position],
  );

  // 드래그 도중 함수
  const onDrag = useCallback(({ x: mouseX }) => {
    // 새로운 포지션 계산
    let newPos = prevDragState.current.x - mouseX + prevDragState.current.mouseX;
    newPos %= childRef.current.clientWidth;
    setPosition(newPos);

    // 관성 계산
    if (Math.abs(mouseX - prevDragState.current.mouseX) > 10) {
      momentum.current = (prevDragState.current.prevMouseX - mouseX) * MOMENTUM_RATE;
    } else momentum.current = 0;
    prevDragState.current.prevMouseX = mouseX;
  }, []);

  // 드래그 종료 함수
  const onDragEnd = useCallback((e) => {
    setIsControlled(false);
    if (e.pointerType === "touch") setIsHovered(false);
  }, []);

  const { onPointerDown } = useMountDragEvent({
    onDragStart,
    onDrag,
    onDragEnd,
  });

  return {
    position,
    ref: childRef,
    eventListener: {
      onMouseEnter() {
        setIsHovered(true);
      },
      onMouseLeave() {
        setIsHovered(false);
      },
      onPointerDown,
    },
  };
}

export default useAutoCarousel;
