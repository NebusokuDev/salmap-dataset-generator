import React, {useState, useRef} from 'react';

interface Coordinates {
  x: number;
  y: number;
}

interface ClickableDivEvent {
  onClick?: (coordinates: Coordinates) => void;
}

function ClickableDiv(props: ClickableDivEvent) {
  const [coordinates, setCoordinates] = useState<Coordinates>({x: 0, y: 0});
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (divRef.current) {
      // divの位置とサイズを取得
      const rect = divRef.current.getBoundingClientRect();

      // 左下を(0, 0)とする座標系で位置を計算
      const x = event.clientX - rect.left;
      const y = rect.bottom - event.clientY;
      props.onClick?.({x, y});
      setCoordinates({x, y});
    }
  };

  return (
    <div
      ref={divRef}
      onClick={handleClick}
      style={{
        width: '600px',
        height: '500px',
        backgroundColor: '#f0f0f0',
        position: 'relative',
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>クリック座標: X: {coordinates.x}, Y: {coordinates.y}</p>
    </div>
  );
}

export {ClickableDiv}