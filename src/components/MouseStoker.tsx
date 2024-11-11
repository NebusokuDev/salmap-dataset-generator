import {CSSProperties, ReactElement, useEffect, useState} from "react";

// マウス位置の型定義
interface MousePosition {
  x: number;
  y: number;
}

interface MouseStokerCursorProps {
  color?: string;
  borderColor?: string;
  radius?: number;
  border?: number;
  hideMouseCursor?: boolean;
}

// スタイルの型定義
interface MouseStokerStyle {
  children?: ReactElement;
  duration?: number;
  ease?: string;
}

// イベントの型定義
interface MouseStokerEvent {
  onLinkHover?: (e: MouseEvent) => void;
  onLinkClick?: (e: MouseEvent) => void;
}

// MouseStokerのプロパティ型
type MouseStokerProps = MousePosition & MouseStokerStyle & MouseStokerEvent;

function MouseStokerCursor({
                             radius = 50,
                             border = 2,
                             color = "gray",
                             borderColor = "#333",
                             hideMouseCursor = true
                           }: MouseStokerCursorProps) {
  const cursorStyle: CSSProperties = {
    borderRadius: "50%",
    backgroundColor: color,
    width: `${radius}px`,
    height: `${radius}px`,
    border: `solid ${borderColor} ${border}px`,
    cursor: hideMouseCursor ? "none" : "default",
  }

  return <div style={cursorStyle}/>
}

function MouseStoker({x, y, duration = 300, children, onLinkHover, onLinkClick, ease}: MouseStokerProps) {
  // リンク要素のホバーを監視
  useMouseStokerEvent(onLinkHover, onLinkClick);

  const stokerStyle: CSSProperties = {
    position: "fixed",
    left: x,
    top: y,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    transition: `all ${duration}ms ${ease || 'ease-out'}`,  // duration と ease をまとめて指定
  };


  return <div style={stokerStyle}>{children}</div>;
}

// マウス位置を取得するカスタムフック
const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({x: event.clientX, y: event.clientY});
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

const useMouseStokerEvent = (
  onLinkHover?: (e: MouseEvent) => void,
  onLinkClick?: (e: MouseEvent) => void
) => {
  useEffect(() => {
    // イベントハンドラーが必要な場合のみイベントリスナーを登録
    if (!onLinkHover && !onLinkClick) return;

    const handleMouseOver = (event: MouseEvent) => {
      if (event.target instanceof HTMLAnchorElement && onLinkHover) {
        onLinkHover(event);
      }
    };

    const handleMouseClick = (event: MouseEvent) => {
      if (event.target instanceof HTMLAnchorElement && onLinkClick) {
        onLinkClick(event);
      }
    };

    // マウスオーバーとクリックイベントの登録
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleMouseClick);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [onLinkHover, onLinkClick]);
};



export {MouseStoker, useMousePosition, MouseStokerCursor};
