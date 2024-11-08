import {Container} from "@mantine/core";
import {MouseStoker, MouseStokerCursor, useMousePosition} from "../components/BubbleView.tsx";

function Home() {
  const position = useMousePosition()
  return (
    <Container>
      <MouseStoker x={position.x} y={position.y}>
        <MouseStokerCursor/>
      </MouseStoker>
      <h1>Home</h1>
    </Container>
  );
}

export {Home};