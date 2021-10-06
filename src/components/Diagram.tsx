/** @jsxImportSource @emotion/react */
function Diagram({ size }: { size: string }) {
  const canvasID = "my-canvas";
  const containerCSS = { border: "1px solid blue", width: size };
  return (
    <div style={containerCSS}>
      <canvas
        id={canvasID}
        width={size}
        height={size}
        onMouseMove={(e) => {
          const canvas: any = e.target;
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - Math.floor(rect.x);
          // console.log("e.clientY, rect.y", e.clientY, rect.y);
          const y = e.clientY - Math.floor(rect.y);
          var ctx = canvas.getContext("2d");
          ctx.font = "16px serif";
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillText(`(x,y)=(${x} ${y} )`, 10, 50);
        }}
      ></canvas>
    </div>
  );
}

export default Diagram;
