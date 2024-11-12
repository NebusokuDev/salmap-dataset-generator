import React, {useEffect, useRef} from "react";

interface BubbleViewStyle {
  blurAmount: number;
  imageSrc: string;
}

interface BubbleViewEvent {
  onImageClick?: (coordinates: Coordinates) => void;
}

interface Coordinates {
  x: number;
  y: number;
}

type BubbleViewProps = BubbleViewEvent & BubbleViewStyle;

function BubbleView(props: BubbleViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();
    image.src = props.imageSrc;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      context.filter = `blur(${props.blurAmount}px)`;
      context.drawImage(image, 0, 0, image.width, image.height);
    }
  }, [props]);

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    if (canvasRef.current) {
      // divの位置とサイズを取得
      const rect = canvasRef.current.getBoundingClientRect();

      // 左下を(0, 0)とする座標系で位置を計算
      const x = event.clientX - rect.left;
      const y = rect.bottom - event.clientY;

      const u = x / rect.width;
      const v = y / rect.height;
      props.onImageClick?.({x: u, y: v});
    }
  };

  return <canvas onClick={handleClick} style={{width: "100%", objectFit: "contain"}} ref={canvasRef}/>;
}

export {BubbleView}