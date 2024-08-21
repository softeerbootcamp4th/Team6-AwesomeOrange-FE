import { useState, useReducer, useRef, useMemo, useCallback } from "react";
import islandReducer, {getDefaultState} from "./reducer.js";
import useMountDragEvent from "@main/hooks/useMountDragEvent.js";
import useA11yDrag from "@main/hooks/useA11yDrag.js";

const PHONE_INITIAL_X = 150;
const PHONE_INITIAL_Y = 100;
const STEP = 25;

const assistive = {
  univasal : {
    grabText: ()=>"유니버설 아일랜드를 잡았습니다. 위,아래 방향키로 유니버설 아일랜드의 위치를 이동하세요. 스페이스바로 유니버설 아일랜드를 놓으세요.", 
    moveText: ({islandY})=>`유니버설 아일랜드를 이동했습니다. (y: ${islandY})`,
    dropText: ()=>"유니버설 아일랜드를 놓았습니다.",
  },
  phone : {
    grabText: ()=>"스마트폰을 잡았습니다. 방향키로 스마트폰의 위치를 이동하세요. 스페이스바로 스마트폰을 놓으세요", 
    moveText: ({phoneX, phoneY})=>`스마트폰을 이동했습니다. (x: ${phoneX}, y: ${phoneY})`,
    dropText: ({phoneIsSnapping})=>`스마트폰을 놓았습니다. ${phoneIsSnapping ? "스마트폰이 아일랜드에 스냅되었습니다." : "스마트폰이 아일랜드에서 벗어났습니다."}`,
  }
}

function aabbCheck(bound1, bound2) {
  if (bound1.right < bound2.left) return false;
  if (bound1.left > bound2.right) return false;
  if (bound1.top > bound2.bottom) return false;
  if (bound1.bottom < bound2.top) return false;
  return true;
}

function useIslandDrag(enabled=true, interactCallback=null) {
  /**-------------------------------------------------------------------*
   *                                                                    *
   * State - ref : 아일랜드 드래그의 상태입니다.                              *
   *                                                                    * 
   *--------------------------------------------------------------------*/

  // island state
  const islandStartMouseYPosition = useRef(0);
  const islandStartPosition = useRef(0);

  // phone state
  const phoneStartMousePosition = useRef({ x: 0, y: 0 });
  const phoneStartPosition = useRef({ x: PHONE_INITIAL_X, y: PHONE_INITIAL_Y });

  // reducer
  const [state, dispatch] = useReducer(islandReducer, null, getDefaultState);
  const {islandY, phoneX, phoneY, phoneIsSnapping, phoneShouldSnapped, islandKeyControlled} = state;

  // phone snap area
  const phoneSnapArea = useRef(null);

  // A11y subtitle
  const [subtitle, setSubtitle] = useState(()=>()=>"");

  /**-------------------------------------------------------------------*
   *                                                                    *
   * 아일랜드 오브젝트를 드래그 앤 드롭할 때 호출되는 함수입니다.                    *
   *                                                                    *
   *--------------------------------------------------------------------*/

  // mount island drag event
  const islandOnDragStart = useCallback(
    ({ y }) => {
      dispatch({type: "reset-snap"});
      islandStartMouseYPosition.current = y;
      islandStartPosition.current = islandY;
      interactCallback?.();
    },
    [islandY],
  );
  const islandOnDragging = useCallback(
    function ({ y: mouseY }) {
      const rawY = mouseY - islandStartMouseYPosition.current + islandStartPosition.current;
      dispatch({type: "move-island", y:rawY});
    },
    [],
  );
  const { onPointerDown: islandOnPointerDown, dragState: islandIsDrag } = useMountDragEvent({
    onDragStart: islandOnDragStart,
    onDrag: islandOnDragging,
    enabled
  });

  // a11y island keyboard event
  const onKeyGrab = useCallback( ()=>{
    dispatch({type: "grab-key-island", value: true});
  }, []);
  const onIslandKeyMove = useCallback( (_, y)=>{
    dispatch({type: "move-island", mutate: (state)=>state + y * STEP});
    interactCallback?.();
  }, []);
  const onKeyRelease = useCallback( ()=>{
    dispatch({type: "grab-key-island", value: false});
  }, []);
  const islandRef = useA11yDrag({
    ...assistive.univasal,
    onKeyGrab,
    onKeyMove: onIslandKeyMove,
    onKeyRelease,
    enabled,
    setSubtitle
  });

  /**-------------------------------------------------------------------*
   *                                                                    *
   * 스마트폰 오브젝트를 드래그 앤 드롭할 때 호출되는 함수입니다.                    *
   *                                                                    *
   *--------------------------------------------------------------------*/

  // mount phone drag event
  const phoneOnDragStart = useCallback(
    (position) => {
      dispatch({type: "reset-snap"});
      phoneStartMousePosition.current = position;
      phoneStartPosition.current = { x: phoneX, y: phoneY };
      interactCallback?.();
    },
    [phoneX, phoneY],
  );
  const phoneOnDragging = useCallback(function ({ x: mouseX, y: mouseY }) {
    const x = mouseX - phoneStartMousePosition.current.x + phoneStartPosition.current.x;
    const y = mouseY - phoneStartMousePosition.current.y + phoneStartPosition.current.y;
    dispatch({type: "move-phone", x, y});
  }, []);
  const phoneOnDragEnd = useCallback(
    (e) => {
      const isSnapped = aabbCheck(
        e.target.getBoundingClientRect(),
        phoneSnapArea.current.getBoundingClientRect(),
      );
      dispatch({type: "drop-phone", isSnapped});
    },
    [islandY],
  );
  const { onPointerDown: phoneOnPointerDown, dragState: phoneIsDrag } = useMountDragEvent({
    onDragStart: phoneOnDragStart,
    onDrag: phoneOnDragging,
    onDragEnd: phoneOnDragEnd,
    enabled
  });

  // a11y phone keyboard event
  const onPhoneKeyMove = useCallback( (x, y)=>{
    dispatch({type: "move-phone", mutate: (state)=>({x: state.x + x * STEP, y: state.y + y * STEP})});
    interactCallback?.();
  }, []);
  const onPhoneKeyUp = useCallback( (x, y)=>{
    dispatch({type: "drop-phone", valueSnap: true});
  }, []);
  const phoneRef = useA11yDrag({
    ...assistive.phone,
    onKeyGrab, 
    onKeyMove: onPhoneKeyMove,
    onKeyRelease: onPhoneKeyUp,
    enabled,
    setSubtitle
  });

  /**-------------------------------------------------------------------*
   *                                                                    *
   * 상위 컴포넌트에서 호출할 수 있는 reset 인터페이스입니다.                      *
   *                                                                    *
   *--------------------------------------------------------------------*/

  // reset function interface
  const reset = useCallback(() => {
    islandStartMouseYPosition.current = 0;
    phoneStartMousePosition.current = { x: 0, y: 0 };
    islandStartPosition.current = 0;
    phoneStartPosition.current = { x: PHONE_INITIAL_X, y: PHONE_INITIAL_Y };
    dispatch({type: "reset"});
  }, []);

  /**-------------------------------------------------------------------*
   *                                                                    *
   * style - 아일랜드 오브젝트/스마트폰 오브젝트에 적용할 동적 style입니다.         *
   *                                                                    *
   *--------------------------------------------------------------------*/

  // island style
  const islandStyle = useMemo(
    () => ({
      transform: `translateY(${islandY}px)`,
      transition: !islandIsDrag ? "transform 0.2s" : "none",
    }),
    [islandY, islandIsDrag],
  );

  // phone style은 상당히 많은 state 종속성을 가지고 있으므로 useMemo가 의미가 없음
  const phoneStyle = {
    transform: `translate(${phoneX}px, ${phoneY}px)`,
    transition: !islandKeyControlled && phoneShouldSnapped
      ? "transform 0.5s"
      : islandKeyControlled || (!phoneIsSnapping && !phoneIsDrag)
        ? "transform 0.2s"
        : "none",
  };

  return {
    reset,
    islandStyle,
    phoneStyle,

    phoneIsSnapping,
    islandEventListener: { onPointerDown: islandOnPointerDown },
    phoneEventListener: { onPointerDown: phoneOnPointerDown },
    phoneSnapArea,
    isDragging: islandIsDrag || phoneIsDrag,

    islandRef,
    phoneRef,
    subtitle: subtitle({islandY, phoneX, phoneY, phoneIsSnapping}),
  };
}

export default useIslandDrag;
